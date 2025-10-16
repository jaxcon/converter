export const DRAG_THRESHOLD = 5;

export const SUPPORTED_FORMATS = {
    mp3: { codec: "libmp3lame", params: ["-q:a", "2"] },
    wav: { codec: "pcm_s16le", params: [] },
    m4a: { codec: "aac", params: ["-b:a", "192k"] },
    aac: { codec: "aac", params: ["-b:a", "192k"] },
    ogg: { codec: "libvorbis", params: ["-q:a", "3"] },
    flac: { codec: "flac", params: ["-compression_level", "5"] },
    opus: { codec: "libopus", params: ["-b:a", "128k"] },
};

export const MIME_TYPES = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    m4a: "audio/mp4",
    aac: "audio/aac",
    ogg: "audio/ogg",
    flac: "audio/flac",
    opus: "audio/opus",
};