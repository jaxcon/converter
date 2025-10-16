export const getFileFormat = (fileName) =>
    formatMap[fileName.toLowerCase().split(".").pop()] || fileName.split(".").pop().toUpperCase();

export const getTargetFormat = (format) =>
    ["WAV", "AIFF", "FLAC", "ALAC"].includes(format.toUpperCase()) ? "MP3" : format;

export const formatMap = {
    mp3: "MP3",
    wav: "WAV",
    aac: "AAC",
    m4a: "AAC",
    flac: "FLAC",
    ogg: "OGG",
    aiff: "AIFF",
    aif: "AIFF",
    opus: "OPUS",
    alac: "ALAC",
    wma: "WMA",
};

export const getProgressColor = (progress) => {
    if (progress === -1) return "#ff4757";
    if (progress === 100) return "#10ac84";
    return "#007bff";
};

export const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const getTargetCompressFormat = (format) =>
    ["WAV", "AIFF", "FLAC", "ALAC"].includes(format.toUpperCase())
        ? "MP3"
        : format;

export const getBitrate = (format, compressionLevel = 70) => {
    const f = format.toUpperCase();
    if (["FLAC", "WAV", "AIFF"].includes(f)) return 320;
    const [min, max] = f === "OPUS" ? [32, 160] : [64, 256];
    return Math.round(min + ((max - min) * compressionLevel) / 100);
};