import { lazy } from "react";

export const routes = {
    home: {
        path: "/:lng",
        component: lazy(() => import("./pages/info/HomePage")),
        pageKey: "home"
    },
    about: {
        path: "/about/:lng",
        component: lazy(() => import("./pages/info/AboutPage")),
        pageKey: "about"
    },
    terms: {
        path: "/terms/:lng",
        component: lazy(() => import("./pages/info/TermsOfUsePage")),
        pageKey: "terms"
    },
    privacy: {
        path: "/privacy/:lng",
        component: lazy(() => import("./pages/info/PrivacyPolicyPage")),
        pageKey: "privacy"
    },

    compressImage: {
        path: "/images/compress/:lng",
        component: lazy(() => import("./pages/images/CompressPage")),
        pageKey: "compressImage"
    },
    clipImage: {
        path: "/images/clip/:lng",
        component: lazy(() => import("./pages/images/ClipPage")),
        pageKey: "cropImage"
    },
    resizeImage: {
        path: "/images/resize/:lng",
        component: lazy(() => import("./pages/images/ResizePage")),
        pageKey: "resizeImage"
    },
    convertImage: {
        path: "/images/convert/:lng",
        component: lazy(() => import("./pages/images/ConvertPage")),
        pageKey: "convertImage"
    },
    filterImage: {
        path: "/images/filter/:lng",
        component: lazy(() => import("./pages/images/FilterPage")),
        pageKey: "filterImage"
    },
    watermarkImage: {
        path: "/images/watermark/:lng",
        component: lazy(() => import("./pages/images/WatermarkPage")),
        pageKey: "watermarkImage"
    },
    enhanceImage: {
        path: "/images/enhance/:lng",
        component: lazy(() => import("./pages/images/EnhancePage")),
        pageKey: "enhanceImage"
    },

    compressVideo: {
        path: "/video/compress/:lng",
        component: lazy(() => import("./pages/videos/CompressVideosPage")),
        pageKey: "compressVideo"
    },
    convertVideo: {
        path: "/video/convert/:lng",
        component: lazy(() => import("./pages/videos/ConvertVideosPage")),
        pageKey: "convertVideo"
    },
    clipVideo: {
        path: "/video/clip/:lng",
        component: lazy(() => import("./pages/videos/ClipVideoPage")),
        pageKey: "clipVideo"
    },
    createThumbnail: {
        path: "/video/thumbnail/:lng",
        component: lazy(() => import("./pages/videos/CreateThumbnailPage")),
        pageKey: "createThumbnail"
    },

    mergePdf: {
        path: "/pdf/merge/:lng",
        component: lazy(() => import("./pages/pdf/MergePdfPage")),
        pageKey: "mergePdf"
    },
    splitPdf: {
        path: "/pdf/split/:lng",
        component: lazy(() => import("./pages/pdf/SplitPdfPage")),
        pageKey: "splitPdf"
    },
    convertPdf: {
        path: "/pdf/convert/:lng",
        component: lazy(() => import("./pages/pdf/ConvertPdfPage")),
        pageKey: "convertPdf"
    },

    clipAudio: {
        path: "/audio/clip/:lng",
        component: lazy(() => import("./pages/audio/ClipAudioPage")),
        pageKey: "clipAudio"
    },
    compressAudio: {
        path: "/audio/compress/:lng",
        component: lazy(() => import("./pages/audio/CompressAudioPage")),
        pageKey: "compressAudio"
    },
    convertAudio: {
        path: "/audio/convert/:lng",
        component: lazy(() => import("./pages/audio/ConvertAudioPage")),
        pageKey: "convertAudio"
    }
};