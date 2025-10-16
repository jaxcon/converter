export const FORMAT_CONFIG = {
    JPG: { mimeType: "image/jpeg", quality: 0.92 },
    PNG: { mimeType: "image/png", quality: 1.0 },
    WEBP: { mimeType: "image/webp", quality: 0.92 },
    GIF: { mimeType: "image/gif", quality: 1.0 },
    BMP: { mimeType: "image/bmp", quality: 1.0 },
    TIFF: { mimeType: "image/tiff", quality: 1.0 },
    DEFAULT: { mimeType: "image/png", quality: 1.0 }
};

export const SUPPORTED_FORMATS = Object.keys(FORMAT_CONFIG).filter(f => f !== "DEFAULT");