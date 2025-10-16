export const MENU_ITEMS = [
    {
        key: "images",
        label: "images",
        items: [
            { label: "compress", path: "/images/compress" },
            { label: "clip", path: "/images/clip" },
            { label: "resize", path: "/images/resize" },
            { label: "convert", path: "/images/convert" },
            { label: "filters", path: "/images/filter" },
            { label: "watermark", path: "./images/watermark"},
            { label: "enhance", path: "./images/enhance"},
        ]
    },
    {
        key: "video",
        label: "video",
        items: [
            { label: "compress", path: "/video/compress" },
            { label: "clip", path: "/video/clip" },
            { label: "convert", path: "/video/convert" },
            { label: "thumbnail", path: "/video/thumbnail"}
        ]
    },
    {
        key: "pdf",
        label: "PDF",
        items: [
            { label: "merge", path: "/pdf/merge" },
            { label: "split", path: "/pdf/split" },
            { label: "convert", path: "/pdf/convert" },
        ]
    },
    {
        key: "audio",
        label: "audio",
        items: [
            { label: "clipTitle", path: "/audio/clip" },
            { label: "compressTitle", path: "/audio/compress" },
            { label: "convert", path: "/audio/convert" },
        ]
    },
    {
        key: "info",
        label: "info",
        items: [
            { label: "aboutUs", path: "/about" },
            { label: "privacyPolicy", path: "/privacy" },
            { label: "termsOfUse", path: "/terms" },
        ]
    }
];