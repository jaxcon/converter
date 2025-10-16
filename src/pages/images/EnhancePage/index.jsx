import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import MainLayout from "../../../components/MainLayout";
import { Card, PageContainer } from "../../commonStyles";
import ImageUpload from "../../../components/Upload/ImageUpload";
import PageManual from "../../../components/PageManual";
import {
    Canvas,
    CanvasWrapper,
    FilterButton,
    ButtonGroup,
    UploadSection,
    DownloadButton
} from "./styles";
import GIF from "gif.js";
import { MAX_PARALLEL } from "../../../utils/parallelProcessor";
import { ANIMATED_FILTERS, vertexShaderSrc, fragmentShaderSrcs } from "./webGlpresets";
import { createProgram } from "./utils";

export default function WebGLEnhancePage({ pageKey }) {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [filter, setFilter] = useState("normal");

    const { t } = useTranslation();

    const initWebGL = useCallback((img) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        canvas.width = img.width;
        canvas.height = img.height;

        imgRef.current = img;
        glRef.current = gl;

        drawFilter(filter);
    }, [filter]);

    const drawFilter = useCallback((filterName) => {
        const gl = glRef.current;
        const img = imgRef.current;
        const canvas = canvasRef.current;
        if (!gl || !img) return;

        const program = createProgram(gl, vertexShaderSrc, fragmentShaderSrcs[filterName]);
        if (!program) return;
        gl.useProgram(program);
        programRef.current = program;

        canvas.width = img.width;
        canvas.height = img.height;

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );
        const aPos = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const texBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
            gl.STATIC_DRAW
        );
        const aTex = gl.getAttribLocation(program, "a_texCoord");
        gl.enableVertexAttribArray(aTex);
        gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        if (filterName === "pixelate") {
            const uPixelSize = gl.getUniformLocation(program, "u_pixelSize");
            gl.uniform1f(uPixelSize, 10.0);
            const uTexSize = gl.getUniformLocation(program, "u_texSize");
            gl.uniform2f(uTexSize, canvas.width, canvas.height);
        } else if (filterName === "edgeDetect") {
            const uTexSize = gl.getUniformLocation(program, "u_texSize");
            gl.uniform2f(uTexSize, canvas.width, canvas.height);
        }
        if (filterName === "bulge") {
            const uStrength = gl.getUniformLocation(program, "u_strength");
            gl.uniform1f(uStrength, 0.5);
        } else if (filterName === "zoomPulse") {
            const uSpeed = gl.getUniformLocation(program, "u_speed");
            gl.uniform1f(uSpeed, 2.0);
        } else if (filterName === "duotone") {
            const uColor1 = gl.getUniformLocation(program, "u_color1");
            const uColor2 = gl.getUniformLocation(program, "u_color2");
            gl.uniform3f(uColor1, 1.0, 1.0, 0.0);
            gl.uniform3f(uColor2, 0.5, 0.0, 1.0);
        }

        if (filterName === "vignette") {
            const uColor = gl.getUniformLocation(program, "u_color");
            gl.uniform3f(uColor, 0.0, 0.0, 0.0);
        }

        if (filterName === "bgRemove") {
            const uKeyColor = gl.getUniformLocation(program, "u_keyColor");
            const uThreshold = gl.getUniformLocation(program, "u_threshold");
            gl.uniform3f(uKeyColor, 0.0, 1.0, 0.0);
            gl.uniform1f(uThreshold, 0.4);
        } else if (filterName === "emboss3D") {
            const uTexSize = gl.getUniformLocation(program, "u_texSize");
            gl.uniform2f(uTexSize, canvas.width, canvas.height);
        }

        const uTime = gl.getUniformLocation(program, "u_time");
        if (uTime) {
            let start = performance.now();
            const animate = () => {
                const now = performance.now();
                gl.uniform1f(uTime, (now - start) / 1000);
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(animate);
            };
            animate();
        } else {
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }, []);

    useEffect(() => {
        if (!uploadedFiles.length) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => initWebGL(img);
        img.src = uploadedFiles[0].preview;
    }, [uploadedFiles, initWebGL]);

    useEffect(() => {
        drawFilter(filter);
    }, [filter, drawFilter]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const gl = glRef.current;
        const program = programRef.current;

        if (!gl || !program) return;

        if (ANIMATED_FILTERS.includes(filter)) {
            const gif = new GIF({
                workers: MAX_PARALLEL,
                quality: 30,
                workerScript: process.env.PUBLIC_URL + "/gif.worker.js",
                transparent: null,
                color: 128
            });

            const uTime = gl.getUniformLocation(program, "u_time");

            let frameCount = 70;
            let frameDelay = 40;

            for (let i = 0; i < frameCount; i++) {
                const t = i * 0.052;
                if (uTime) {
                    gl.uniform1f(uTime, t);
                }
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 6);

                const tmpCanvas = document.createElement("canvas");
                const scale = 0.66;
                tmpCanvas.width = canvas.width * scale;
                tmpCanvas.height = canvas.height * scale;
                const tmpCtx = tmpCanvas.getContext("2d");
                tmpCtx.drawImage(canvas, 0, 0, tmpCanvas.width, tmpCanvas.height);

                gif.addFrame(tmpCanvas, { delay: frameDelay, copy: true });
            }

            gif.on("finished", (blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "webgl-enhanced.gif";
                link.click();
            });

            gif.render();
        } else {
            gl.useProgram(program);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            const link = document.createElement("a");
            link.download = "webgl-enhanced.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        }
    };

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <UploadSection>
                        <ImageUpload setFiles={setUploadedFiles} multiple={false} disabled={false} />
                    </UploadSection>

                    {!uploadedFiles.length ? (
                        <PageManual pageKey={pageKey} />
                    ) : (
                        <>
                            <ButtonGroup>
                                {Object.keys(fragmentShaderSrcs).map((f) => (
                                    <FilterButton
                                        key={f}
                                        $active={filter === f}
                                        onClick={() => setFilter(f)}
                                    >
                                        {f}
                                    </FilterButton>
                                ))}
                            </ButtonGroup>

                            <CanvasWrapper>
                                <Canvas ref={canvasRef} />
                            </CanvasWrapper>

                            <ButtonGroup>
                                <DownloadButton onClick={handleDownload}>
                                    {t("save")}
                                </DownloadButton>
                            </ButtonGroup>
                        </>
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}
