import { useState, useRef, useEffect, useCallback } from "react";
import { PageContainer, Card } from "../../commonStyles";
import {
    ImagePreviewContainer,
    ActionButtonsContainer,
    Button,
    ControlsContainer,
    Input
} from "./styles";
import ImageUpload from "../../../components/Upload/ImageUpload";
import MainLayout from "../../../components/MainLayout";
import PageManual from "../../../components/PageManual";
import { useTranslation } from "react-i18next";
import { generateUniqueFileName } from "../../../utils/uniqueIdGenerator";

export default function WatermarkPage({ pageKey }) {
    const { t } = useTranslation();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [watermark, setWatermark] = useState(t("watermarkInitText"));

    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setImageFile(uploadedFiles[0] || null);
    }, [uploadedFiles]);

    const drawCanvas = useCallback(() => {
        if (!canvasRef.current || !imgRef.current) return;
        const img = imgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const width = img.naturalWidth || img.width || 800;
        const height = img.naturalHeight || img.height || Math.floor(width * 0.6);

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const fontSize = Math.max(14, Math.floor(canvas.width / 24));
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";

        const padding = Math.floor(fontSize / 2) + 12;
        ctx.fillText(watermark, canvas.width - padding, canvas.height - padding);
    }, [watermark]);

    const handleImgLoad = () => {
        drawCanvas();
    };

    useEffect(() => {
        if (!imageFile) return;
        if (imgRef.current && imgRef.current.complete) {
            drawCanvas();
        }
    }, [watermark, imageFile, drawCanvas]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.href = canvasRef.current.toDataURL("image/png");
        link.download = generateUniqueFileName(imageFile.file.name, "watermark");
        link.click();
    };

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <ImageUpload multiple={false} setFiles={setUploadedFiles} />
                    {!imageFile ? (
                        <PageManual pageKey={pageKey} />
                    ) : (
                        <>
                            <ControlsContainer>
                                <label style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                                    {t("watermarkTitle")}
                                </label>
                                <Input
                                    type="text"
                                    value={watermark}
                                    onChange={(e) => setWatermark(e.target.value)}
                                    placeholder={t("watermarkInputHint")}
                                />
                                <small style={{ marginTop: "4px", fontSize: "12px", color: "#666" }}>
                                    {t("watermarkDesc")}
                                </small>
                            </ControlsContainer>

                            <ImagePreviewContainer>
                                <img
                                    ref={imgRef}
                                    src={imageFile.preview}
                                    alt="preview"
                                    style={{ display: "none" }}
                                    onLoad={handleImgLoad}
                                />
                                <canvas ref={canvasRef} />
                            </ImagePreviewContainer>

                            <ActionButtonsContainer>
                                <Button variant="secondary" onClick={handleDownload}>
                                    {t("downloadWithWatermark")}
                                </Button>
                            </ActionButtonsContainer>
                        </>
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}
