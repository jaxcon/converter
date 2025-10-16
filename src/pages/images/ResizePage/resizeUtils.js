const getMaxCanvasSize = () => {
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (gl) {
            return gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }

        return 8192;
    } catch (error) {
        console.warn("WebGL not available, using safe limit");
        return 4096;
    }
};

export const MAX_DIMENSION = getMaxCanvasSize();