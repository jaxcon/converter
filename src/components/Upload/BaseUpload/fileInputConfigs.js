import { Upload, Image, Film, FileText } from "lucide-react";

export const FILE_CONFIGS = {
    audio: {
        accept: ".mp3,.wav,.aac,.m4a,.flac,.ogg,.aiff,.opus,.alac",
        icon: Upload,
        i18n: {
            formats: "supportedAudioFormats",
            dragMany: "dragAudioFiles",
            dragOne: "dragAudioFile",
            desc: "audioInputDesc",
            processing: "processing",
            error: "audioLoadingError",
        },
    },
    image: {
        accept: "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff",
        icon: Image,
        i18n: {
            formats: "supportedFormats",
            dragMany: "dragFiles",
            dragOne: "dragFile",
            desc: "inputDesc",
            processing: "processing",
            error: "imageLoadingError",
        },
    },
    video: {
        accept: "video/*,.mp4,.avi,.mov,.mkv,.webm,.flv,.wmv",
        icon: Film,
        i18n: {
            formats: "supportedVideoFormats",
            dragMany: "dragVideoFiles",
            dragOne: "dragVideoFile",
            desc: "videoInputDesc",
            processing: "processing",
            error: "videoLoadingError",
        },
    },
    pdf: {
        accept: ".pdf",
        icon: FileText,
        i18n: {
            dragMany: "dragPDFFiles",
            dragOne: "dragPDFFile",
            desc: "inputPDFDesc",
            processing: "processing",
            error: "pdfLoadingError",
        },
    },
};
