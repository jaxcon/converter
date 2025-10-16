export const FILTERS = {
    none: "none",
    grayscale: "grayscale(100%)",
    sepia: "sepia(100%)",
    invert: "invert(100%)",
    blur: "blur(3px)",
    contrast: "contrast(200%)",
    brightness: "brightness(150%)",
    saturate: "saturate(200%)",
    hue: "hue-rotate(90deg)",
    custom: "custom",
};

export const CUSTOM_FILTER = [
    { key: "brightness", min: 50, max: 200, unit: "%" },
    { key: "contrast", min: 50, max: 200, unit: "%" },
    { key: "saturate", min: 0, max: 300, unit: "%" },
    { key: "hue", min: 0, max: 360, unit: "°" },
    { key: "blur", min: 0, max: 20, unit: "px" },
];

export const DEFAULT_CUSTOM = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hue: 0,
    blur: 0,
};