import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        detection: {
            order: ["path"],
            lookupFromPathIndex: -1,
        },
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    imageLoadingError: "Some files are not images",
                    dragFiles: "Drag images or click to select",
                    dragFile: "Drag image or click to select",
                    processing: "Processing...",
                    "/compress": "Compression",
                    "/clip": "Cropping",
                    "/resize": "Resizing",
                    "/convert": "Conversion",
                    "/filter": "Filters",
                    "/en": "File processing",
                    "/compress/": "Compression",
                    "/clip/": "Cropping",
                    "/resize/": "Resizing",
                    "/convert/": "Conversion",
                    "/filter/": "Filters",
                    "/en/": "File processing",
                    "/about/en": "About us",
                    "/about/en/": "About us",
                    "/privacy/en": "Privacy Policy",
                    "/privacy/en/": "Privacy Policy",
                    "/terms/en/": "Terms of use",
                    "/terms/en": "Terms of use",
                    "/thumbnail": "Thumbnail creation",
                    enhance: "Webgl filters",
                    thumbnail: "Thumbnail",
                    compress: "Compress",
                    clip: "Crop",
                    resize: "Resize",
                    convert: "Convert",
                    filters: "Filters",
                    compressionValue: "Compression level",
                    changeBlocked: "⏳ Changes blocked during compression",
                    resizeAndDownload: "Crop and download",
                    compressing: "Compressing...",
                    converting: "Converting...",
                    separateDownload: "Download separately",
                    downloadZIP: "Download ZIP",
                    error: "Error",
                    finished: "Finished",
                    formatSelect: "Select format for conversion:",
                    in: "To ",
                    reset: "🔄 Reset",
                    save: "💾 Save",
                    selectTool: "Select tool",
                    compressTitle: "Compression",
                    clipTitle: "Cropping",
                    resizeTitle: "Resize",
                    convertTitle: "Conversion",
                    filtersTitle: "Filters",
                    compressDesc: "Reduce image weight",
                    clipDesc: "Crop frame area",
                    resizeDesc: "Set width and height",
                    convertDesc: "PNG ⇄ JPG ⇄ WEBP etc.",
                    filtersDesc: "Brightness, contrast, etc.",
                    resizingError: "An error occurred while resizing the image",
                    loadingError: "Image loading error",
                    freeAspect: "Free",
                    changeAndDownload: "Apply and download",
                    width: "Width (px)",
                    heigth: "Height (px)",
                    aspect: "Aspect ratio",
                    apply: "Apply",
                    sourceSize: "Original size: ",
                    supportedFormats: "Supported file formats: JPG, PNG, GIF, WEBP, BMP, TIFF",
                    inputDesc: "or paste image from clipboard ",
                    "mergePdfDesc": "Merge PDF files",
                    "splitPdfDesc": "Split PDF files",
                    "convertPdfDesc": "Convert PDF to other formats",
                    "videoLoadingError": "Some files are not videos",
                    "supportedVideoFormats": "Supported formats: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V, MPEG",
                    "dragVideoFiles": "Drag videos or click to select",
                    "dragVideoFile": "Drag video or click to select",
                    images: "Images",
                    video: "Video",
                    convertVideoDesc: "MP4 ⇄ MOV ⇄ WEBM etc.",
                    clipVideoDesc: "Crop video",
                    compressVideoDesc: "Reduce video size",
                    videoInputDesc: "or paste video from clipboard ",
                    '/merge': "Merging",
                    '/merge/': "Merging",
                    'merge': "Merge",
                    '/split': "Splitting",
                    '/split/': "Splitting",
                    'split': "Split",
                    inputPDFDesc: 'or paste PDF from clipboard ',
                    dragPDFFiles: 'Drag PDF files or click to select',
                    dragPDFFile: 'Drag PDF file or click to select',
                    clipAudio: "Crop",
                    audio: "Audio",
                    compressAudioDesc: "Reduce audio file size",
                    convertAudioDesc: "MP3 ⇄ WAV ⇄ AAC etc.",
                    supportedAudioFormats: "Supported formats: MP3, WAV, AAC, FLAC, OGG, AIFF",
                    "audioLoadingError": "Please upload only audio files",
                    "dragAudioFiles": "Drag audio files or click to select",
                    "dragAudioFile": "Drag audio file or click to select",
                    "audioInputDesc": "or paste file from clipboard ",
                    "cropAndDownload": "Crop and download",
                    start: "Start",
                    end: "End",
                    duration: "Duration",
                    cropHint1: "🎯 Drag the borders to select a fragment",
                    cropHint2: "🎧 Click on the timeline to seek",
                    pause: "⏸️ Pause",
                    play: "▶️ Play",
                    errorCrop: "Processing error",
                    needConvertToMp3: "FLAC, WAV, AIFF files will be converted to MP3 for compression",
                    noNeedConvert: "Files will be compressed in their original format",
                    mergePdf: "Merge into one PDF",
                    readyToMerge: "Ready to merge:",
                    filesOf: " files, ",
                    pagesOf: " pages",
                    minimumMerge: "Add at least 2 PDF files to merge",
                    pages: " p.",
                    loading: "Loading...",
                    "videoCropHint1": "Drag the handles to select the start and end of cropping",
                    "videoCropHint2": "Drag the middle of the selected area to move",
                    "loadingVideo": "Preparing video...",
                    "supported": "Supported formats: ",
                    "selectedFiles": "Selected files: ",
                    "selectPages": ". Select pages to extract.",
                    "selectPagesShort": "Select pages: ",
                    "outputFormat": "Output format:",
                    from: "from",
                    all: "All",
                    NoPages: "None",
                    dividePdf: "Split PDF",
                    confidentiality: "🔒 Confidentiality",
                    free: "💯 Free",
                    fast: "⚡ Fast",
                    aviable: "🌍 Available",
                    info: "Info",
                    aboutUs: "About us",
                    privacyPolicy: "Privacy Policy",
                    termsOfUse: "Terms Of Use",
                    closeMenu: "Close navigation menu",
                    openMenu: "Open navigation menu",
                    goToHomePage: "Go to home page",
                    "mainNavigation": "Main navigation",
                    createThumbnail: "Generate Thumbnail",
                    uploadThumbnail: "Upload Thumbnail",
                    thumbnailPreview: "Thumbnail Preview",
                    downloadThumbnail: "Download Thumbnail",
                    downloadThumbnailWithVideo: "Download Video with Thumbnail",
                    "watermarkTitle": "Watermark text",
                    "watermarkDesc": "The text will be added to the bottom-right corner of the image",
                    "watermarkInputHint": "Enter watermark text",
                    "downloadWithWatermark": "Download with watermark",
                    "watermarkInitText": "© My site",
                    watermark: "Watermark",
                    "/watermark": "Add watermark",
                    watermarkPageDesc: "Add text",
                    webglFilters: "WEBgl filters",
                    webglFiltersDesc: "Photo filter editor",
                    thumbnailDesc: "Change thumbnail",
                    "pageNotFound": "Page not found",
                    "goHome": "Go to homepage",

                    "cookiesDesc": "We use cookies to improve your experience. By continuing to use our site, you agree to our cookie policy.",
                    "cookiesAccept": "I understand",

                    seo: {
                        "defaultSeoTitle": "EasyConvert – Free Online File Converter",
                        "defaultSeoDesc": "Online service for compressing, converting, and editing images, videos, audio, and PDF.",

                        home: {
                            title: "EasyConvert – Free Online File Converter",
                            description: "Online service for compressing, converting, and editing images, videos, audio, and PDF.",
                            canonical: "https://easyconvert.space/en"
                        },

                        cropImage: {
                            title: "Crop Image Online – EasyConvert",
                            description: "Crop images online for free. Support for JPG, PNG, GIF, WEBP, BMP, TIFF. Simple photo cropping tool.",
                            canonical: "https://easyconvert.space/images/clip/en"
                        },
                        compressImage: {
                            title: "Compress Image Online – EasyConvert",
                            description: "Compress images online for free without quality loss. Support for JPG, PNG, GIF, WEBP, BMP, TIFF. Reduce file size quickly and easily.",
                            canonical: "https://easyconvert.space/images/compress/en"
                        },
                        resizeImage: {
                            title: "Resize Image Online – EasyConvert",
                            description: "Resize images online for free. Support for JPG, PNG, GIF, WEBP, BMP, TIFF, SVG. Change width and height while maintaining proportions.",
                            canonical: "https://easyconvert.space/images/resize/en"
                        },
                        convertImage: {
                            title: "Convert Image Online – EasyConvert",
                            description: "Convert images between formats online for free. Support for JPG, PNG, GIF, WEBP, BMP, TIFF. Fast conversion without quality loss.",
                            canonical: "https://easyconvert.space/images/convert/en"
                        },
                        filterImage: {
                            title: "Image Filters Online – EasyConvert",
                            description: "Apply filters and effects to images online for free. Support for JPG, PNG, GIF, WEBP, BMP, TIFF, SVG. Wide selection of artistic filters.",
                            canonical: "https://easyconvert.space/images/filter/en"
                        },
                        watermarkImage: {
                            title: "Add Watermark to Images Online – EasyConvert",
                            description: "Protect your photos and pictures by adding a custom text watermark online for free. Works with JPG, PNG, GIF, WEBP, BMP, TIFF, SVG. Simple and fast watermark generator.",
                            canonical: "https://easyconvert.space/images/watermark/en"
                        },
                        enhanceImage: {
                            title: "AI Image Enhancement Online – EasyConvert",
                            description: "Enhance photo quality with AI filters: sharpness, contrast, brightness, noise reduction, color enhancement and upscaling. Works directly in browser without server.",
                            canonical: "https://easyconvert.space/images/enhance/en"
                        },

                        convertPdf: {
                            title: "Convert PDF Online – EasyConvert",
                            description: "Convert PDF to JPG, PNG, DOCX, XLSX, HTML, TXT and other formats online for free. High quality conversion.",
                            canonical: "https://easyconvert.space/pdf/convert/en"
                        },
                        mergePdf: {
                            title: "Merge PDF Files Online – EasyConvert",
                            description: "Merge multiple PDF files into one online for free. Simple document merging without quality loss. No registration required.",
                            canonical: "https://easyconvert.space/pdf/merge/en"
                        },
                        splitPdf: {
                            title: "Split PDF into Pages Online – EasyConvert",
                            description: "Split PDF files into separate pages for free. Extract specific pages and save as PDF or images. No registration required.",
                            canonical: "https://easyconvert.space/pdf/split/en"
                        },

                        clipAudio: {
                            title: "Audio Trimming - EasyConvert",
                            description: "Trim audio files online. Supported formats: MP3, WAV, AAC, FLAC, OGG, AIFF. Free and no registration required.",
                            canonical: "https://easyconvert.space/audio/clip/en"
                        },
                        compressAudio: {
                            title: "Audio Compression - EasyConvert",
                            description: "Compress audio files without quality loss. Supported formats: MP3, WAV, AAC, FLAC, OGG, AIFF. Reduce audio file size online.",
                            canonical: "https://easyconvert.space/audio/compress/en"
                        },
                        convertAudio: {
                            title: "Audio Conversion - EasyConvert",
                            description: "Convert audio files between formats: MP3, WAV, AAC, FLAC, OGG, AIFF. Online audio converter without quality loss.",
                            canonical: "https://easyconvert.space/audio/convert/en"
                        },

                        clipVideo: {
                            title: "Cut Video Fragment Online – Free MP4, MOV, WebM Trimming",
                            description: "Cut fragments from video files for free. Supported formats: MP4, WebM, OGG, MOV, M4V, MKV. Precise video trimming online without quality loss.",
                            canonical: "https://easyconvert.space/video/clip/en"
                        },
                        compressVideo: {
                            title: "Compress Video Online – Free MP4, AVI, MOV Compression",
                            description: "Compress video files for free without quality loss. Supported formats: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Fast online compression.",
                            canonical: "https://easyconvert.space/video/compress/en"
                        },
                        convertVideo: {
                            title: "Convert Video Online – MP4, AVI, MOV, WebM and Other Formats Conversion",
                            description: "Convert video files between formats for free. Supported formats: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Fast online video conversion.",
                            canonical: "https://easyconvert.space/video/convert/en"
                        },
                        createThumbnail: {
                            title: "Create Video Thumbnail Online – Free Preview Generator for MP4, AVI, MOV and More",
                            description: "Generate video thumbnails (preview images) online for free. Supported formats: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Quick and easy preview creation online.",
                            canonical: "https://easyconvert.space/video/thumbnail/en"
                        }
                    },

                    none: "None",
                    grayscale: "Grayscale",
                    sepia: "Sepia",
                    invert: "Invert",
                    blur: "Blur",
                    contrast: "Contrast",
                    brightness: "Brightness",
                    saturate: "Saturation",
                    hue: "Hue rotate",
                    custom: "Custom",

                    about: {
                        "pageTitle": "About Us - EasyConvert: Free Online PDF Tools",
                        "metaDescription": "Learn about EasyConvert's mission to provide free and user-friendly PDF tools. No registration, no watermarks.",
                        "schemaName": "About Us - EasyConvert",
                        "schemaDescription": "Information about EasyConvert service and our mission",

                        "title": "About EasyConvert",

                        "mission": {
                            "title": "Our Mission",
                            "text": "We make working with PDF files simple, fast and accessible for everyone. Free, no hidden fees or limitations."
                        },

                        "whyChoose": {
                            "title": "Why Choose Us?",
                            "confidentiality": "All files are processed in your browser. We don't have access to your data.",
                            "free": "Completely free service without hidden fees or subscriptions.",
                            "fast": "Instant file processing without delays or waiting.",
                            "available": "Works on any device without installing software."
                        },

                        "howWeWork": {
                            "title": "How We Work?",
                            "text": "EasyConvert uses modern web technologies to process PDF files directly in your browser. This means:",
                            "points": {
                                "point1": "Files are not uploaded to our servers",
                                "point2": "Maximum processing speed",
                                "point3": "Complete confidentiality of your data"
                            }
                        },

                        "cta": {
                            "title": "Join Us!",
                            "text": "Every day, thousands of users trust us with their PDF files. Join our community!",
                            "button": "Start Using"
                        },

                        "contact": {
                            "title": "Contact Us",
                            "text": "Have questions or suggestions? We always welcome feedback!"
                        }
                    },

                    "terms": {
                        "pageTitle": "Terms of Use - EasyConvert",
                        "metaDescription": "Terms of Use for EasyConvert service. Conditions for using our online file processing tools.",
                        "schemaName": "Terms of Use",
                        "schemaDescription": "Terms of Use for EasyConvert service",

                        "title": "Terms of Use",
                        "noticeText": "By using the EasyConvert service, you agree to the terms of this agreement. Please read them carefully before using our services.",

                        "section1": {
                            "title": "1. General Provisions",
                            "text": "EasyConvert service provides online tools for processing images, videos, PDF and audio files. All processing is done directly in your browser."
                        },

                        "section2": {
                            "title": "2. User Responsibility",
                            "text": "You are solely responsible for the content you upload (images, videos, PDF, audio files). We do not store or have access to your files.",
                            "items": {
                                "item1": "You guarantee that you have rights to the uploaded materials",
                                "item2": "You are responsible for the compliance of content with the law"
                            }
                        },

                        "section3": {
                            "title": "3. Terms of Service",
                            "text1": "The service is provided \"as is\". We strive to ensure uninterrupted operation, but do not guarantee absolute reliability and 24/7 availability.",
                            "text2": "We reserve the right to temporarily suspend the service for maintenance."
                        },

                        "section4": {
                            "title": "4. Prohibited Actions",
                            "text": "It is prohibited to use the service for:",
                            "items": {
                                "item1": "Uploading illegal materials",
                                "item2": "Actions that violate third-party rights",
                                "item3": "Automated requests and scraping",
                                "item4": "Distributing malware"
                            }
                        },

                        "section5": {
                            "title": "5. Privacy",
                            "text1": "All files are processed locally in your browser. We do not save or transfer your data to third parties.",
                            "text2": "We may collect anonymous usage statistics to improve the service."
                        },

                        "important": {
                            "title": "Important",
                            "text": "By continuing to use the EasyConvert service, you confirm that you have read and agree to the terms of this user agreement."
                        },

                        "footer": {
                            "updated": "Last updated:",
                            "rights": "All rights reserved."
                        }
                    },
                    "privacy": {
                        "metaTitle": "Privacy Policy - EasyConvert",
                        "metaDescription": "EasyConvert Privacy Policy. We do not collect personal data. All file processing happens in your browser.",
                        "schemaName": "Privacy Policy",
                        "schemaDescription": "Data processing policy of EasyConvert service",

                        "title": "Privacy Policy",
                        "banner": "✅ Your data is safe. All processing happens locally in your browser.",

                        "principlesTitle": "1. Privacy Principles",
                        "principlesText": "At EasyConvert, we adhere to the principle of minimal data collection. We do not collect, store, or transfer users' personal data to third parties.",

                        "cookiesTitle": "2. Use of Cookies",
                        "cookiesIntro": "We use cookies only for technically necessary functions:",
                        "cookiesList1": "Remembering the selected interface language",
                        "cookiesList2": "Saving consent for cookie usage",
                        "cookiesOutro": "These cookies do not contain personal information and are used solely to improve user experience.",

                        "filesTitle": "3. File Processing",
                        "filesText1": "All file operations (conversion, compression, editing) happen directly in your browser. We do not upload your files to our servers.",
                        "filesText2": "After closing the browser tab, all processed files are automatically deleted from memory.",

                        "statsTitle": "4. Anonymous Statistics",
                        "statsIntro": "We may collect completely anonymous usage data for analysis and service improvement:",
                        "statsList1": "Page visit counts",
                        "statsList2": "User countries (without precise geolocation)",
                        "statsList3": "Browser and device types used",

                        "cookieManageTitle": "5. Cookie Management",
                        "cookieManageText": "You can delete saved cookies at any time through your browser settings:",
                        "cookieManageList1": "Chrome: Settings → Privacy and security → Clear browsing data",
                        "cookieManageList2": "Firefox: Settings → Privacy & Security → Cookies and Site Data",
                        "cookieManageList3": "Safari: Preferences → Privacy → Manage Website Data",

                        "thirdTitle": "6. Third-Party Services",
                        "thirdText1": "We do not use third-party analytics services (Google Analytics, Yandex.Metrica, etc.) to collect user data.",
                        "thirdText2": "The site may contain advertising network elements, but they do not have access to your files or personal data.",

                        "rightsTitle": "Your Rights",
                        "rightsText": "You have the right to access, correct, and delete your data. For any questions, contact support@easyconvert.com",

                        "lastUpdated": "Last updated:",
                        "allRightsReserved": "All rights reserved."
                    },
                    "manual": {
                        "subtitle": "Follow the simple steps below to complete the task quickly and easily.",
                        "convertImage": {
                            "title": "How to use the Image Converter",
                            "steps": [
                                "Upload one or more images from your computer or phone. Supported formats include JPG, PNG, WEBP, GIF, BMP, and TIFF.",
                                "After uploading, the files will appear in the list. You can remove unwanted images before conversion.",
                                "Choose the format you want to convert your image(s) to: JPG, PNG, WEBP, GIF, BMP, or TIFF.",
                                "If only one file is uploaded, click the format button and the converted file will download automatically.",
                                "If multiple files are uploaded, you will see two buttons: convert files individually or batch convert (download all as a ZIP archive).",
                                "During conversion, you will see a progress bar for each file and a global progress indicator at the top.",
                                "All conversions are performed directly in your browser — files are never uploaded to a server and remain private."
                            ]
                        },
                        "cropImage": {
                            "title": "How to use the Crop Tool",
                            "steps": [
                                "Upload an image from your computer or phone. JPG, PNG and other formats are supported.",
                                "Select the crop area: move the frame and resize it using the corners.",
                                "Preview the selected area – everything outside will be removed.",
                                "Click 'Crop and Download' to save the result as a PNG file.",
                                "All operations are done locally in your browser, files are never uploaded."
                            ]
                        },
                        "compressImage": {
                            "title": "How to use the Compress Tool",
                            "steps": [
                                "This page allows you to compress images and reduce their file size without noticeable quality loss.",
                                "Click on the upload area or drag and drop files to add one or more images.",
                                "After uploading, you will see a list of files with a progress indicator for each image.",
                                "Use the 'Compression Level' slider to adjust how much the file size should be reduced. Higher values mean stronger compression.",
                                "You can remove any unwanted file from the list before compression by clicking the remove button.",
                                "To save your results, choose one of the two options: 'Download separately' (each file individually) or 'Download ZIP' (all images in a single archive).",
                                "During processing, both overall progress and per-file progress are displayed in real time."
                            ]
                        },
                        "filterImage": {
                            "title": "How to use the Filter Tool",
                            "steps": [
                                "This page allows you to apply different visual filters to your images directly in the browser.",
                                "Click on the upload area or drag and drop a single image to start editing.",
                                "After uploading, the image will appear on the canvas where filters can be applied in real time.",
                                "Choose one of the predefined filters such as grayscale, sepia, invert, blur, contrast, brightness, saturation, or hue rotation by clicking on the corresponding button.",
                                "If you select 'Custom', you will be able to manually adjust brightness, contrast, saturation, hue, and blur using the sliders.",
                                "Use the 'Reset' button to return all custom settings to their default values.",
                                "Once you are satisfied with the result, click 'Save' to download the filtered image in PNG format."
                            ]
                        },
                        "resizeImage": {
                            "title": "How to use the Resize Tool",
                            "steps": [
                                "This page allows you to resize images by changing their width and height with precision.",
                                "Click on the upload area or drag and drop a file to add an image.",
                                "Once uploaded, the original dimensions of the image are displayed automatically.",
                                "Enter new values for width and height manually, or select a predefined aspect ratio (such as 16:9, 4:3, 1:1, 21:9).",
                                "If 'Free aspect' is selected, you can set width and height independently. With fixed aspect ratios, one dimension is adjusted automatically to preserve proportions.",
                                "Maximum allowed size depends on your device capabilities, but the tool automatically prevents exceeding safe limits.",
                                "Click 'Change and Download' (desktop) or 'Apply' (mobile) to process the image and save the resized version.",
                                "A live preview shows how the image will look before saving, and the original dimensions are displayed for reference."
                            ]
                        },
                        "watermarkImage": {
                            "title": "How to use the Watermark Tool",
                            "steps": [
                                "This page allows you to protect your images by adding a text watermark.",
                                "Click on the upload area or drag and drop a file to add an image.",
                                "Once uploaded, the image is displayed in the preview area with a default watermark text.",
                                "Enter your own text in the input field to customize the watermark.",
                                "The watermark is automatically placed in the bottom-right corner of the image, with size adjusted for readability.",
                                "You can change the text at any time and see the updated preview instantly.",
                                "When satisfied, click 'Download with Watermark' to save the processed image.",
                                "Supported formats: JPG, PNG, GIF, WEBP, BMP, TIFF, SVG."
                            ]
                        },
                        "enhanceImage": {
                            "title": "How to use the Image Enhancement Tool",
                            "steps": [
                                "This page allows you to enhance your image quality using AI filters.",
                                "Click on the upload area or drag and drop a file to add an image.",
                                "Once uploaded, the image is displayed in the preview area.",
                                "Use the sliders to adjust enhancement parameters: sharpness, clarity, contrast, brightness, and others.",
                                "Changes are applied in real-time - you see the results immediately.",
                                "Experiment with different filter combinations to achieve optimal results.",
                                "The upscaling feature allows you to scale images up to 200% of the original size.",
                                "When satisfied with the result, click 'Download' to save the enhanced image.",
                                "Supported formats: JPG, PNG, GIF, WEBP, BMP, TIFF."
                            ]
                        },

                        "compressVideo": {
                            "title": "How to Use the Video Compression Tool",
                            "steps": [
                                "This page allows you to compress video files, reducing their size without significant quality loss.",
                                "Click on the upload area or drag and drop files to add videos.",
                                "After uploading, video previews and file size information will appear.",
                                "Choose how to download: save compressed files separately or download them all in a ZIP archive.",
                                "The compression process runs directly in your browser using FFmpeg, with progress shown in the bar.",
                                "When finished, you can download each compressed video with a unique name or all at once as a ZIP.",
                                "If an error occurs during compression, the original video will be saved instead so you don’t lose data.",
                                "Compression quality and strength are automatically adjusted for most formats (MP4, WEBM, AVI, MOV, etc.)."
                            ]
                        },
                        "clipVideo": {
                            "title": "How to Use the Video Cropping Tool",
                            "steps": [
                                "This page allows you to cut out a selected part of a video file and save it separately.",
                                "Click on the upload area or drag and drop a file to add a video.",
                                "After uploading, a video player and a timeline will appear where you can set the start and end points.",
                                "Use the handles on the timeline to adjust the range or drag the entire selection to move it.",
                                "You can preview the selected fragment using the play and pause buttons.",
                                "The current position, start time, end time, and fragment duration are displayed.",
                                "Click the “Crop and Download” button to process the video and save the selected fragment.",
                                "The process runs in your browser using FFmpeg, and a progress indicator will show the conversion status.",
                                "The result will be saved in the same format as the original file, with a new name."
                            ]
                        },
                        "convertVideo": {
                            "title": "How to Use the Video Conversion Tool",
                            "steps": [
                                "This page allows you to convert video files into different formats (MP4, WEBM, AVI, MOV, MKV, etc.).",
                                "Click on the upload area or drag and drop files to add videos.",
                                "After uploading, video previews, file names, and file sizes will be displayed.",
                                "Select the target format you want to convert the video into — buttons are located at the bottom of the page.",
                                "If only one file is uploaded, the result will be saved in the chosen format with a new name.",
                                "If multiple files are uploaded, you can either convert them separately or download all results in a single ZIP archive.",
                                "The conversion process runs directly in your browser using FFmpeg, with progress shown in the indicator.",
                                "When the conversion is finished successfully, a download button for the converted file will appear.",
                                "If an error occurs during conversion, a notification will be displayed and the original file will remain unchanged."
                            ]
                        },
                        "convertPdf": {
                            "title": "How to Use the PDF Conversion Tool",
                            "steps": [
                                "This page allows you to convert PDF files into different formats (JPG, PNG, TXT, DOCX, HTML, XLSX).",
                                "Click on the upload area or drag and drop files to add PDFs.",
                                "After uploading, page previews or file icons will be displayed along with file names and sizes.",
                                "Select the target format you want to convert the PDF into — buttons are located below the file list.",
                                "If only one file is uploaded, it will be converted and saved in the chosen format with a new name.",
                                "If multiple files are uploaded, you can convert them individually or download all results in a single ZIP archive.",
                                "The conversion process runs in your browser, and progress is displayed for each file.",
                                "When the conversion is finished, you can download the converted file or archive.",
                                "If an error occurs, the original PDF will remain unchanged so you can try again."
                            ]
                        },
                        "mergePdf": {
                            "title": "How to Use the PDF Merge Tool",
                            "steps": [
                                "This page allows you to merge multiple PDF files into a single document.",
                                "Click on the upload area or drag and drop PDF files to add them.",
                                "After uploading, file icons, names, sizes, and page counts will be displayed.",
                                "You can drag and drop files to reorder them before merging.",
                                "Click the “×” button next to a file to remove it from the list.",
                                "At least two files are required for merging. If only one file is uploaded, the button will remain disabled.",
                                "Once all files are uploaded and ordered, click the “Merge PDF” button.",
                                "The merging process is performed directly in your browser. Progress is shown for each file.",
                                "When merging is finished, you can download the combined PDF with a new filename.",
                                "If an error occurs, the original files remain unchanged, and you can try again."
                            ]
                        },
                        "splitPdf": {
                            "title": "How to Use the PDF Split Tool",
                            "steps": [
                                "This page allows you to split PDF documents into individual pages or save selected pages as new files.",
                                "Click on the upload area or drag and drop a PDF file to add it.",
                                "After uploading, the file name, total page count, and page thumbnails will be displayed.",
                                "You can select all pages or mark only the ones you want to save.",
                                "Use the “Clear selection” button to deselect all pages if needed.",
                                "If necessary, you can choose the output format (e.g., PDF, JPG, PNG).",
                                "Once the pages are selected, click the “Split PDF” button.",
                                "The splitting process runs directly in your browser, and progress is shown for each page.",
                                "When splitting is finished, you can download the selected pages either as separate files or in a single archive.",
                                "If an error occurs, the original PDF remains unchanged, and you can try again."
                            ]
                        },
                        "clipAudio": {
                            "title": "How to use the Audio Crop Tool",
                            "steps": [
                                "This tool allows you to cut and save any part of an audio file with precision.",
                                "Click on the upload area or drag and drop a file to add audio.",
                                "Once uploaded, the audio waveform will appear with a timeline for easy navigation.",
                                "Use the selection area on the waveform to mark the start and end points of the desired fragment.",
                                "You can also preview playback and adjust the selection to find the exact moment.",
                                "The start time, end time, and selected duration are displayed for reference.",
                                "When ready, click 'Crop and Download' to process the audio and save the trimmed version.",
                                "The tool ensures high-quality cropping without re-encoding issues."
                            ]
                        },
                        "compressAudio": {
                            "title": "How to use the Audio Compression Tool",
                            "steps": [
                                "This page allows you to reduce the size of audio files while keeping good sound quality.",
                                "Click on the upload area or drag and drop files to start.",
                                "Once uploaded, each file will be displayed with its format and original size.",
                                "For large formats such as WAV, AIFF, FLAC, or ALAC, the tool automatically converts them to MP3 for better compression.",
                                "You can track progress with a visual bar and percentage indicator for each file.",
                                "Use the ✕ button to remove a file from the list before or during processing.",
                                "When ready, you can choose to download files separately or pack them into a ZIP archive.",
                                "Compression is performed directly in the browser, ensuring fast and secure processing without uploading files to a server."
                            ]
                        },
                        "convertAudio": {
                            "title": "How to use the Audio Conversion Tool",
                            "steps": [
                                "This page allows you to convert audio files into different formats such as MP3, WAV, AAC, FLAC, OGG, or AIFF.",
                                "Click on the upload area or drag and drop files to add them.",
                                "Once uploaded, each file will be displayed with its format, size, and progress bar.",
                                "Choose the target format by clicking one of the available buttons.",
                                "If multiple files are uploaded, you can convert them individually or download all results together as a ZIP archive.",
                                "Conversion is performed locally in your browser with FFmpeg, ensuring speed and privacy — your files are not uploaded to a server.",
                                "You can remove files from the list at any time using the ✕ button.",
                                "When processing is complete, you can download the converted file(s) directly."
                            ]
                        },
                        "createThumbnail": {
                            "title": "How to use the Video Thumbnail Generator",
                            "steps": [
                                "This page allows you to create a thumbnail (preview image) for your video online.",
                                "Click on the upload area or drag and drop a video file to add it.",
                                "Once uploaded, the video will be available for preview.",
                                "Click the “Create Thumbnail” button to generate a preview image from the video.",
                                "The generated thumbnail will be displayed below the video.",
                                "You can download the thumbnail as an image or download the video with the new thumbnail.",
                                "All processing is done locally in your browser using FFmpeg — your files are never uploaded to a server.",
                                "You can remove the file and upload another video at any time."
                            ]
                        }
                    }
                },
            },
            ru: {
                translation: {
                    imageLoadingError: "Некоторые файлы не являются изображениями",
                    dragFiles: "Перетащите изображения или нажмите для выбора",
                    dragFile: "Перетащите изображение или нажмите для выбора",
                    processing: "Идет обработка...",
                    "/compress": "Сжатие",
                    "/clip": "Обрезка",
                    "/resize": "Изменение",
                    "/convert": "Конвертация",
                    "/filter": "Фильтры",
                    "/": "Работа с файлами",
                    "/compress/": "Сжатие",
                    "/clip/": "Обрезка",
                    "/resize/": "Изменение",
                    "/convert/": "Конвертация",
                    "/filter/": "Фильтры",
                    "/ru": "Работа с файлами",
                    "/ru/": "Работа с файлами",
                    "/about/ru/": "О нас",
                    "/about/ru": "О нас",
                    "/thumbnail": "Создание обложки",
                    thumbnail: "Обложка",
                    compress: "Сжать",
                    clip: "Обрезать",
                    resize: "Изменить",
                    convert: "Конвертировать",
                    filters: "Фильтры",
                    compressionValue: "Степень сжатия",
                    changeBlocked: "⏳ Изменение заблокировано во время сжатия",
                    resizeAndDownload: "Обрезать и скачать",
                    compressing: "Сжимаем...",
                    converting: "Конвертируем...",
                    separateDownload: "Скачать отдельно",
                    downloadZIP: "Скачать ZIP",
                    error: "Ошибка",
                    finished: "Готово",
                    formatSelect: "Выберите формат для конвертации:",
                    in: "В ",
                    reset: "🔄 Сбросить",
                    save: "💾 Сохранить",
                    selectTool: "Выберите инструмент",
                    compressTitle: "Сжатие",
                    clipTitle: "Обрезка",
                    resizeTitle: "Изменить размер",
                    convertTitle: "Конвертация",
                    filtersTitle: "Фильтры",
                    compressDesc: "Уменьшить вес изображений",
                    clipDesc: "Обрезать область кадра",
                    resizeDesc: "Задать ширину и высоту",
                    convertDesc: "PNG ⇄ JPG ⇄ WEBP и др.",
                    filtersDesc: "Яркость, контраст и т. п.",
                    resizingError: "Произошла ошибка при изменении размера изображения",
                    loadingError: "Ошибка загрузки изображения",
                    freeAspect: "Произвольное",
                    changeAndDownload: "Изменить и скачать",
                    width: "Ширина (px)",
                    heigth: "Высота (px)",
                    aspect: "Соотношение",
                    apply: "Применить",
                    sourceSize: "Исходный размер: ",
                    supportedFormats: "Поддерживаемые форматы: JPG, PNG, GIF, WEBP, BMP, TIFF",
                    inputDesc: "или вставьте изображение из буфера обмена ",
                    images: "Изображения",
                    video: "Видео",
                    "mergePdfDesc": "Объединение PDF файлов",
                    "splitPdfDesc": "Разделение PDF файлов",
                    "convertPdfDesc": "Конвертация PDF в другие форматы",
                    "videoLoadingError": "Некоторые файлы не являются видео",
                    "supportedVideoFormats": "Поддерживаемые форматы: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V, MPEG",
                    "dragVideoFiles": "Перетащите видео или нажмите для выбора",
                    "dragVideoFile": "Перетащите видео или нажмите для выбора",
                    convertVideoDesc: "MP4 ⇄ MOV ⇄ WEBM и др.",
                    clipVideoDesc: "Обрезать видео",
                    compressVideoDesc: "Уменьшить вес видео",
                    videoInputDesc: "или вставьте видео из буфера обмена ",
                    '/merge': "Соединение",
                    '/merge/': "Соединение",
                    'merge': "Соединенить",
                    '/split': "Разделение",
                    'split': "Разделить",
                    watermark: "Водяной знак",
                    watermarkPageDesc: "Добавить водяной знак",
                    thumbnailDesc: "Сменить превью",
                    "/watermark": "Наложение текста",
                    webglFilters: "WEBgl фильтры",
                    webglFiltersDesc: "Редактор фото-фильтров",
                    inputPDFDesc: 'или вставьте PDF из буфера обмена ',
                    dragPDFFiles: 'Перетащите PDF или нажмите для выбора',
                    dragPDFFile: 'Перетащите PDF или нажмите для выбора',
                    clipAudio: "Вырезать",
                    audio: "Звук",
                    compressAudioDesc: "Уменьшить размер аудиофайла",
                    convertAudioDesc: "MP3 ⇄ WAV ⇄ AAC и др.",
                    supportedAudioFormats: "Поддерживаемые форматы: MP3, WAV, AAC, FLAC, OGG, AIFF",
                    "audioLoadingError": "Пожалуйста, загружайте только аудиофайлы",
                    "dragAudioFiles": "Перетащите аудиофайлы или нажмите для выбора",
                    "dragAudioFile": "Перетащите аудиофайл или нажмите для выбора",
                    "audioInputDesc": "или вставьте файл из буфера обмена ",
                    "cropAndDownload": "Вырезать и скачать",
                    start: "Начало",
                    end: "Конец",
                    duration: "Длительность",
                    cropHint1: "🎯 Перетащите границы для выбора фрагмента",
                    cropHint2: "🎧 Нажмите на timeline для перемотки",
                    pause: "⏸️ Пауза",
                    play: "▶️ Воспроизвести",
                    errorCrop: "Ошибка обработки",
                    needConvertToMp3: "FLAC, WAV, AIFF файлы будут конвертированы в MP3 для сжатия",
                    noNeedConvert: "Файлы будут сжаты в исходном формате",
                    mergePdf: "Объединить в один PDF",
                    readyToMerge: "Готово к слиянию:",
                    filesOf: " файлов, ",
                    pagesOf: " страниц",
                    minimumMerge: "Добавьте минимум 2 PDF файла для слияния",
                    pages: " стр.",
                    loading: "Загрузка...",
                    "videoCropHint1": "Перетащите ручки для выбора начала и конца обрезки",
                    "videoCropHint2": "Перетащите середину выделенной области для перемещения",
                    loadingVideo: "Подготовка видео...",
                    supported: "Поддерживаемые форматы: ",
                    dividePdf: "Разделить PDF",
                    selectedFiles: "Выбрано файлов: ",
                    selectPages: ". Выберите страницы для извлечения.",
                    selectPagesShort: "Выберите страницы: ",
                    outputFormat: "Формат вывода:",
                    from: "из",
                    all: "Все",
                    NoPages: 'Ни одной',
                    confidentiality: "🔒 Приватность",
                    free: "💯 Бесплатно",
                    fast: "⚡ Быстро",
                    aviable: "🌍 Доступно",
                    info: "Информация",
                    aboutUs: "О нас",
                    privacyPolicy: "Политика Приватности",
                    termsOfUse: "Условия Использования",
                    "/privacy/ru": "Политика приватности",
                    "/privacy/ru/": "Политика приватности",
                    "/terms/ru/": "Условия использования",
                    "/terms/ru": "Условия использования",
                    closeMenu: "Закрыть навигационное меню",
                    openMenu: "Открыть навигационное меню",
                    "goToHomePage": "Перейти на главную страницу",
                    "mainNavigation": "Основная навигация",
                    createThumbnail: "Сделать обложку",
                    uploadThumbnail: "Загрузить обложку",
                    thumbnailPreview: "Предпросмотр обложки",
                    downloadThumbnail: "Скачать обложку",
                    downloadThumbnailWithVideo: "Скачать видео с обложкой",
                    watermarkTitle: "Текст вотермарки",
                    watermarkDesc: "Текст будет добавлен в правый нижний угол изображения",
                    watermarkInputHint: "Введите текст вотермарки",
                    downloadWithWatermark: "Скачать с вотермаркой",
                    "watermarkInitText": "© Мой сайт",
                    "pageNotFound": "Страница не найдена",
                    "goHome": "Вернуться на главную",
                    enhance: "Webgl фильтры",

                    "cookiesDesc": "Мы используем файлы cookie для улучшения работы сервиса. Продолжая использовать сайт, вы соглашаетесь с нашей политикой использования cookie.",
                    "cookiesAccept": "Понятно",


                    seo: {
                        "defaultSeoTitle": "EasyConvert – Бесплатный онлайн конвертер файлов",
                        "defaultSeoDesc": "Онлайн-сервис для сжатия, конвертации и редактирования изображений, видео, аудио и PDF.",

                        home: {
                            title: "EasyConvert – Бесплатный онлайн конвертер файлов",
                            description: "Онлайн-сервис для сжатия, конвертации и редактирования изображений, видео, аудио и PDF.",
                            canonical: "https://easyconvert.space/ru"
                        },

                        cropImage: {
                            title: "Обрезать изображение онлайн – EasyConvert",
                            description: "Бесплатно обрезайте изображения онлайн. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF. Простой инструмент для кадрирования фотографий.",
                            canonical: "https://easyconvert.space/images/clip/ru"
                        },
                        compressImage: {
                            title: "Сжать изображение онлайн – EasyConvert",
                            description: "Бесплатно сжимайте изображения без потери качества. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF. Уменьшите размер файла быстро и легко.",
                            canonical: "https://easyconvert.space/images/compress/ru"
                        },
                        resizeImage: {
                            title: "Изменить размер изображения онлайн – EasyConvert",
                            description: "Бесплатно изменяйте размер изображений. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF, SVG. Изменяйте ширину и высоту с сохранением пропорций.",
                            canonical: "https://easyconvert.space/images/resize/ru"
                        },
                        convertImage: {
                            title: "Конвертировать изображение онлайн – EasyConvert",
                            description: "Бесплатно конвертируйте изображения между форматами. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF. Быстрое преобразование без потери качества.",
                            canonical: "https://easyconvert.space/images/convert/ru"
                        },
                        filterImage: {
                            title: "Фильтры для изображений онлайн – EasyConvert",
                            description: "Бесплатно применяйте фильтры и эффекты к изображениям. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF. Широкий выбор художественных фильтров.",
                            canonical: "https://easyconvert.space/images/filter/ru"
                        },
                        watermarkImage: {
                            title: "Нанести вотермарк на изображение онлайн – EasyConvert",
                            description: "Защитите свои фото и картинки, добавив текстовый вотермарк онлайн бесплатно. Поддержка JPG, PNG, GIF, WEBP, BMP, TIFF, SVG. Удобный и быстрый инструмент.",
                            canonical: "https://easyconvert.space/images/watermark/ru"
                        },
                        enhanceImage: {
                            title: "Улучшение изображения AI онлайн – EasyConvert",
                            description: "Улучшите качество фотографий с помощью AI-фильтров: резкость, контраст, яркость, шумоподавление, улучшение цветов. Работает прямо в браузере без сервера.",
                            canonical: "https://easyconvert.space/images/enhance/ru"
                        },

                        convertPdf: {
                            title: "Конвертировать PDF онлайн – EasyConvert",
                            description: "Бесплатно конвертируйте PDF в JPG, PNG, DOCX, XLSX, HTML, TXT и другие форматы. Высокое качество преобразования.",
                            canonical: "https://easyconvert.space/pdf/convert/ru"
                        },
                        mergePdf: {
                            title: "Объединить PDF файлы онлайн – EasyConvert",
                            description: "Бесплатно объединяйте несколько PDF файлов в один. Простое слияние документов без потери качества. Без регистрации.",
                            canonical: "https://easyconvert.space/pdf/merge/ru"
                        },
                        splitPdf: {
                            title: "Разделить PDF на страницы онлайн – EasyConvert",
                            description: "Бесплатно разделяйте PDF файлы на отдельные страницы. Извлекайте нужные страницы и сохраняйте в PDF или изображения. Без регистрации.",
                            canonical: "https://easyconvert.space/pdf/split/ru"
                        },

                        clipAudio: {
                            title: "Обрезка аудио - EasyConvert",
                            description: "Обрежьте аудиофайлы онлайн. Поддерживаемые форматы: MP3, WAV, AAC, FLAC, OGG, AIFF. Бесплатно и без регистрации.",
                            canonical: "https://easyconvert.space/audio/clip/ru"
                        },
                        compressAudio: {
                            title: "Сжатие аудио - EasyConvert",
                            description: "Сожмите аудиофайлы без потери качества. Поддерживаемые форматы: MP3, WAV, AAC, FLAC, OGG, AIFF. Уменьшите размер аудио файлов онлайн.",
                            canonical: "https://easyconvert.space/audio/compress/ru"
                        },
                        convertAudio: {
                            title: "Конвертация аудио - EasyConvert",
                            description: "Конвертируйте аудиофайлы между форматами: MP3, WAV, AAC, FLAC, OGG, AIFF. Онлайн конвертер аудио без потери качества.",
                            canonical: "https://easyconvert.space/audio/convert/ru"
                        },

                        clipVideo: {
                            title: "Вырезать фрагмент видео онлайн – Бесплатное обрезание MP4, MOV, WebM",
                            description: "Бесплатно вырезайте фрагменты из видео файлов. Поддерживаемые форматы: MP4, WebM, OGG, MOV, M4V, MKV. Точное обрезание видео онлайн без потери качества.",
                            canonical: "https://easyconvert.space/video/clip/ru"
                        },
                        compressVideo: {
                            title: "Сжать видео онлайн – Бесплатное сжатие MP4, AVI, MOV и других форматов",
                            description: "Бесплатно сжимайте видео файлы без потери качества. Поддерживаемые форматы: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Быстрое сжатие онлайн.",
                            canonical: "https://easyconvert.space/video/compress/ru"
                        },
                        convertVideo: {
                            title: "Конвертировать видео онлайн – Конвертация MP4, AVI, MOV, WebM и других форматов",
                            description: "Бесплатно конвертируйте видео файлы между форматами. Поддерживаемые форматы: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Быстрая конвертация видео онлайн.",
                            canonical: "https://easyconvert.space/video/convert/ru"
                        },
                        createThumbnail: {
                            title: "Создать обложку для видео онлайн – Бесплатное создание превью для MP4, AVI, MOV и других форматов",
                            description: "Бесплатно создавайте обложки (thumbnails) для ваших видео. Поддерживаемые форматы: MP4, WebM, OGG, MOV, AVI, WMV, MPEG, 3GP, FLV, M4V. Простое и быстрое создание превью онлайн.",
                            canonical: "https://easyconvert.space/video/thumbnail/ru"
                        }
                    },

                    none: "Без фильтра",
                    grayscale: "Чернобелое",
                    sepia: "Старина",
                    invert: "Негатив",
                    blur: "Размытие",
                    contrast: "Контраст",
                    brightness: "Яркость",
                    saturate: "Насыщенный",
                    hue: "Оттенок",
                    custom: "Пользовательский",

                    "about": {
                        "pageTitle": "О нас - EasyConvert: Бесплатные онлайн инструменты для работы с PDF",
                        "metaDescription": "Узнайте о миссии EasyConvert - предоставлять бесплатные и удобные инструменты для работы с PDF файлами. Без регистрации, без водяных знаков.",
                        "schemaName": "О нас - EasyConvert",
                        "schemaDescription": "Информация о сервисе EasyConvert и нашей миссии",

                        "title": "О EasyConvert",

                        "mission": {
                            "title": "Наша миссия",
                            "text": "Мы делаем работу с PDF файлами простой, быстрой и доступной для каждого. Бесплатно, без скрытых платежей и ограничений."
                        },

                        "whyChoose": {
                            "title": "Почему выбирают нас?",
                            "confidentiality": "Все файлы обрабатываются в вашем браузере. Мы не имеем доступа к вашим данным.",
                            "free": "Полностью бесплатный сервис без скрытых платежей и подписок.",
                            "fast": "Мгновенная обработка файлов без задержек и ожидания.",
                            "available": "Работает на любом устройстве без установки программ."
                        },

                        "howWeWork": {
                            "title": "Как мы работаем?",
                            "text": "EasyConvert использует современные веб-технологии для обработки PDF файлов непосредственно в вашем браузере. Это означает:",
                            "points": {
                                "point1": "Файлы не загружаются на наши серверы",
                                "point2": "Максимальная скорость обработки",
                                "point3": "Полная конфиденциальность ваших данных"
                            }
                        },

                        "cta": {
                            "title": "Присоединяйтесь к нам!",
                            "text": "Ежедневно тысячи пользователей доверяют нам обработку своих PDF файлов. Присоединяйтесь к нашему сообществу!",
                            "button": "Начать использовать"
                        },

                        "contact": {
                            "title": "Свяжитесь с нами",
                            "text": "Есть вопросы или предложения? Мы всегда рады обратной связи!"
                        }
                    },

                    "terms": {
                        "pageTitle": "Пользовательское соглашение - EasyConvert",
                        "metaDescription": "Пользовательское соглашение сервиса EasyConvert. Условия использования наших онлайн инструментов для работы с файлами.",
                        "schemaName": "Пользовательское соглашение",
                        "schemaDescription": "Условия использования сервиса EasyConvert",

                        "title": "Пользовательское соглашение",
                        "noticeText": "Используя сервис EasyConvert, вы соглашаетесь с условиями данного соглашения. Пожалуйста, внимательно ознакомьтесь с ними перед началом работы.",

                        "section1": {
                            "title": "1. Общие положения",
                            "text": "Сервис EasyConvert предоставляет онлайн инструменты для обработки изображений, видео, PDF и аудиофайлов. Все обработки производятся непосредственно в вашем браузере."
                        },

                        "section2": {
                            "title": "2. Ответственность пользователя",
                            "text": "Вы несете полную ответственность за загружаемый контент (изображения, видео, PDF, аудиофайлы). Мы не храним и не имеем доступа к вашим файлам.",
                            "items": {
                                "item1": "Гарантируете, что имеете права на загружаемые материалы",
                                "item2": "Несете ответственность за соответствие контента законодательству"
                            }
                        },

                        "section3": {
                            "title": "3. Условия предоставления услуг",
                            "text1": "Сервис предоставляется «как есть». Мы стараемся обеспечить бесперебойную работу, но не гарантируем абсолютной безошибочности и доступности 24/7.",
                            "text2": "Мы оставляем за собой право временно приостанавливать работу сервиса для технического обслуживания."
                        },

                        "section4": {
                            "title": "4. Запрещённые действия",
                            "text": "Запрещается использовать сервис для:",
                            "items": {
                                "item1": "Загрузки незаконных материалов",
                                "item2": "Действий, нарушающих права третьих лиц",
                                "item3": "Автоматизированных запросов и скрапинга",
                                "item4": "Распространения вредоносного ПО"
                            }
                        },

                        "section5": {
                            "title": "5. Конфиденциальность",
                            "text1": "Все файлы обрабатываются локально в вашем браузере. Мы не сохраняем и не передаем ваши данные третьим лицам.",
                            "text2": "Мы можем собирать анонимную статистику использования для улучшения сервиса."
                        },

                        "important": {
                            "title": "Важно",
                            "text": "Продолжая использовать сервис EasyConvert, вы подтверждаете, что ознакомились и согласны с условиями данного пользовательского соглашения."
                        },

                        "footer": {
                            "updated": "Последнее обновление:",
                            "rights": "Все права защищены."
                        }
                    },

                    "privacy": {
                        "metaTitle": "Политика конфиденциальности - EasyConvert",
                        "metaDescription": "Политика конфиденциальности EasyConvert. Мы не собираем персональные данные. Все обработки файлов происходят в вашем браузере.",
                        "schemaName": "Политика конфиденциальности",
                        "schemaDescription": "Политика обработки данных сервиса EasyConvert",

                        "title": "Политика конфиденциальности",
                        "banner": "✅ Ваши данные в безопасности. Все обработки происходят локально в вашем браузере.",

                        "principlesTitle": "1. Принципы конфиденциальности",
                        "principlesText": "В EasyConvert мы придерживаемся принципа минимального сбора данных. Мы не собираем, не храним и не передаём третьим лицам персональные данные пользователей.",

                        "cookiesTitle": "2. Использование cookies",
                        "cookiesIntro": "Мы используем файлы cookie только для технически необходимых функций:",
                        "cookiesList1": "Запоминание выбранного языка интерфейса",
                        "cookiesList2": "Сохранение согласия на использование cookies",
                        "cookiesOutro": "Эти cookie не содержат персональной информации и используются исключительно для улучшения пользовательского опыта.",

                        "filesTitle": "3. Обработка файлов",
                        "filesText1": "Все операции с файлами (конвертация, сжатие, редактирование) происходят непосредственно в вашем браузере. Мы не загружаем ваши файлы на наши серверы.",
                        "filesText2": "После закрытия вкладки браузера все обработанные файлы автоматически удаляются из памяти.",

                        "statsTitle": "4. Анонимная статистика",
                        "statsIntro": "Мы можем собирать полностью анонимные данные об использовании сервиса для анализа и улучшения работы:",
                        "statsList1": "Количество посещений страниц",
                        "statsList2": "Страны пользователей (без точной геолокации)",
                        "statsList3": "Типы используемых браузеров и устройств",

                        "cookieManageTitle": "5. Управление cookies",
                        "cookieManageText": "Вы можете в любой момент удалить сохранённые cookie через настройки вашего браузера:",
                        "cookieManageList1": "Chrome: Настройки → Конфиденциальность и безопасность → Очистить историю",
                        "cookieManageList2": "Firefox: Настройки → Конфиденциальность и защита → Куки и данные сайтов",
                        "cookieManageList3": "Safari: Настройки → Конфиденциальность → Управление данными сайтов",

                        "thirdTitle": "6. Сторонние сервисы",
                        "thirdText1": "Мы не используем сторонние аналитические сервисы (Google Analytics, Yandex.Metrica и подобные) для сбора данных о пользователях.",
                        "thirdText2": "На сайте могут присутствовать элементы рекламных сетей, но они не имеют доступа к вашим файлам или персональным данным.",

                        "rightsTitle": "Ваши права",
                        "rightsText": "Вы имеете право на доступ, исправление и удаление ваших данных. По всем вопросам обращайтесь на support@easyconvert.com",

                        "lastUpdated": "Последнее обновление:",
                        "allRightsReserved": "Все права защищены."
                    },

                    "manual": {
                        "subtitle": "Следуйте простым шагам ниже, чтобы быстро и удобно выполнить задачу.",
                        "convertImage": {
                            "title": "Как пользоваться конвертером изображений",
                            "steps": [
                                "Загрузите одно или несколько изображений с компьютера или телефона. Поддерживаются форматы JPG, PNG, WEBP, GIF, BMP и TIFF.",
                                "После загрузки файлы появятся в списке. Вы можете удалить ненужные изображения перед конвертацией.",
                                "Выберите формат, в который хотите преобразовать изображение: JPG, PNG, WEBP, GIF, BMP или TIFF.",
                                "Если загружен только один файл, нажмите кнопку формата, и конвертированный файл автоматически скачается.",
                                "Если загружено несколько файлов, у вас появятся две кнопки: конвертация по одному или пакетная конвертация (ZIP-архив со всеми файлами).",
                                "Во время процесса вы увидите индикатор прогресса для каждого файла и общий прогресс сверху.",
                                "Все преобразования выполняются прямо в вашем браузере — изображения не загружаются на сервер и остаются приватными."
                            ]
                        },
                        "cropImage": {
                            "title": "Как пользоваться инструментом обрезки",
                            "steps": [
                                "Загрузите изображение с компьютера или телефона. Поддерживаются форматы JPG, PNG и другие.",
                                "Выберите область для обрезки: перемещайте рамку и изменяйте её размер за углы.",
                                "Просмотрите выделенную область, всё вне рамки будет обрезано.",
                                "Нажмите «Обрезать и скачать», чтобы сохранить результат в формате PNG.",
                                "Все операции выполняются в вашем браузере, файлы никуда не загружаются."
                            ]
                        },
                        "compressImage": {
                            "title": "Как пользоваться инструментом сжатия изображений",
                            "steps": [
                                "Эта страница предназначена для сжатия изображений и уменьшения их размера без заметной потери качества.",
                                "Нажмите на область загрузки или перетащите файлы, чтобы добавить одно или несколько изображений.",
                                "После загрузки вы увидите список файлов с индикатором прогресса для каждого изображения.",
                                "Используйте ползунок «Уровень сжатия», чтобы настроить степень уменьшения размера файлов. Чем выше значение — тем сильнее сжатие.",
                                "Вы можете удалить ненужный файл из списка перед сжатием, нажав на кнопку удаления.",
                                "Чтобы сохранить изображения, используйте одну из двух кнопок: «Скачать отдельно» (каждый файл отдельно) или «Скачать ZIP» (все изображения в одном архиве).",
                                "Во время обработки отображается общий прогресс и прогресс по каждому файлу."
                            ]
                        },
                        "filterImage": {
                            "title": "Как пользоваться инструментом фильтров",
                            "steps": [
                                "Эта страница позволяет применять различные визуальные фильтры к изображениям прямо в браузере.",
                                "Нажмите на область загрузки или перетащите одно изображение, чтобы начать редактирование.",
                                "После загрузки изображение появится на холсте, где можно применять фильтры в реальном времени.",
                                "Выберите один из предустановленных фильтров, таких как чёрно-белый, сепия, инверсия, размытие, контраст, яркость, насыщенность или вращение оттенков, нажав на соответствующую кнопку.",
                                "Если выбрать «Пользовательский», вы сможете вручную настроить яркость, контраст, насыщенность, оттенок и размытие с помощью ползунков.",
                                "Кнопка «Сбросить» возвращает все пользовательские настройки к значениям по умолчанию.",
                                "Когда результат вас устроит, нажмите «Сохранить», чтобы скачать обработанное изображение в формате PNG."
                            ]
                        },
                        "resizeImage": {
                            "title": "Как пользоваться инструментом изменения размеров",
                            "steps": [
                                "Эта страница позволяет изменить размеры изображения, задав новую ширину и высоту.",
                                "Нажмите на область загрузки или перетащите файл, чтобы добавить изображение.",
                                "После загрузки автоматически отобразятся исходные размеры изображения.",
                                "Введите новые значения ширины и высоты вручную или выберите предустановленное соотношение сторон (например, 16:9, 4:3, 1:1, 21:9).",
                                "При выборе режима 'Свободное соотношение' можно задавать ширину и высоту независимо. При фиксированных пропорциях одна из сторон будет рассчитана автоматически.",
                                "Максимальные допустимые размеры зависят от возможностей устройства, но инструмент не позволит выйти за безопасные пределы.",
                                "Нажмите кнопку 'Изменить и скачать' (на ПК) или 'Применить' (на мобильных устройствах), чтобы обработать изображение и сохранить результат.",
                                "В окне предпросмотра можно увидеть, как будет выглядеть изменённое изображение, а также сравнить его с исходными размерами."
                            ]
                        },
                        "watermarkImage": {
                            "title": "Как пользоваться инструментом Вотермарка",
                            "steps": [
                                "Эта страница позволяет защитить изображения, добавив на них текстовый вотермарк.",
                                "Нажмите на область загрузки или перетащите файл, чтобы добавить картинку.",
                                "После загрузки изображение отобразится в зоне предпросмотра с текстом вотермарка по умолчанию.",
                                "Введите свой текст в поле ввода, чтобы настроить надпись.",
                                "Вотермарк автоматически размещается в правом нижнем углу изображения, а размер подстраивается для удобного чтения.",
                                "Вы можете изменить текст в любой момент и сразу увидеть обновлённый предпросмотр.",
                                "Когда результат вас устроит, нажмите «Скачать с вотермаркой», чтобы сохранить готовое изображение.",
                                "Поддерживаемые форматы: JPG, PNG, GIF, WEBP, BMP, TIFF, SVG."
                            ]
                        },
                        "enhanceImage": {
                            "title": "Как использовать инструмент улучшения изображений",
                            "steps": [
                                "Эта страница позволяет улучшить качество ваших изображений с помощью AI-фильтров.",
                                "Нажмите на область загрузки или перетащите файл, чтобы добавить изображение.",
                                "После загрузки изображение отображается в области предпросмотра.",
                                "Используйте слайдеры для настройки параметров улучшения: резкость, четкость, контраст, яркость и другие.",
                                "Изменения применяются в реальном времени - вы сразу видите результат.",
                                "Экспериментируйте с разными комбинациями фильтров для достижения оптимального результата.",
                                "Функция увеличения разрешения позволяет масштабировать изображение до 200% от оригинала.",
                                "Когда результат вас устроит, нажмите 'Скачать' чтобы сохранить улучшенное изображение.",
                                "Поддерживаемые форматы: JPG, PNG, GIF, WEBP, BMP, TIFF."
                            ]
                        },

                        "compressVideo": {
                            "title": "Как пользоваться инструментом сжатия видео",
                            "steps": [
                                "Эта страница позволяет сжать видеофайлы, уменьшая их размер без критической потери качества.",
                                "Нажмите на область загрузки или перетащите файлы, чтобы добавить видео.",
                                "После загрузки появятся превью видео и информация о его размере.",
                                "Выберите вариант сжатия: сохранить файлы по отдельности или скачать их в одном ZIP-архиве.",
                                "Процесс сжатия выполняется прямо в браузере с помощью FFmpeg, прогресс можно отслеживать на индикаторе.",
                                "По завершении вы можете скачать сжатое видео с новым именем или все файлы сразу в ZIP.",
                                "Если возникла ошибка при сжатии, видео будет сохранено в исходном виде, чтобы вы не потеряли данные.",
                                "Качество и степень сжатия подбираются автоматически для большинства форматов (MP4, WEBM, AVI, MOV и др.)."
                            ]
                        },
                        "clipVideo": {
                            "title": "Как пользоваться инструментом вырезки видео",
                            "steps": [
                                "Эта страница позволяет вырезать нужный фрагмент из видеофайла и сохранить его отдельно.",
                                "Нажмите на область загрузки или перетащите файл, чтобы добавить видео.",
                                "После загрузки появится видеоплеер и временная шкала с возможностью выделить начало и конец отрезка.",
                                "Для изменения диапазона используйте маркеры на шкале или перетаскивайте выделенную область целиком.",
                                "Можно просматривать выбранный отрезок, используя кнопки воспроизведения и паузы.",
                                "Отображаются текущая позиция, время начала, конца и продолжительность выбранного фрагмента.",
                                "Нажмите кнопку «Обрезать и скачать», чтобы обработать видео и сохранить выбранный фрагмент.",
                                "Процесс выполняется в браузере с помощью FFmpeg, индикатор покажет прогресс обработки.",
                                "Результат сохраняется в том же формате, что и исходный файл, с новым именем."
                            ]
                        },
                        "convertVideo": {
                            "title": "Как пользоваться инструментом конвертации видео",
                            "steps": [
                                "Эта страница позволяет конвертировать видеофайлы в разные форматы (MP4, WEBM, AVI, MOV, MKV и др.).",
                                "Нажмите на область загрузки или перетащите файлы, чтобы добавить видео.",
                                "После загрузки появятся превью видео, их имена и размер файлов.",
                                "Выберите формат, в который нужно преобразовать видео — кнопки расположены внизу страницы.",
                                "Если добавлен только один файл, результат будет сохранён в выбранном формате под новым именем.",
                                "Если файлов несколько, можно конвертировать их отдельно или скачать все в одном ZIP-архиве.",
                                "Процесс конвертации выполняется в браузере с помощью FFmpeg, прогресс отображается на индикаторе.",
                                "Если конвертация завершена успешно, появится кнопка скачивания готового файла.",
                                "В случае ошибки конвертации будет показано уведомление, а исходный файл сохранится без изменений."
                            ]
                        },

                        "convertPdf": {
                            "title": "Как пользоваться инструментом конвертации PDF",
                            "steps": [
                                "Эта страница позволяет конвертировать PDF-файлы в различные форматы (JPG, PNG, TXT, DOCX, HTML, XLSX).",
                                "Нажмите на область загрузки или перетащите файлы, чтобы добавить PDF.",
                                "После загрузки отобразятся превью страниц или иконки файлов, а также их имена и размеры.",
                                "Выберите формат, в который хотите преобразовать PDF — кнопки расположены ниже списка файлов.",
                                "Если добавлен один файл, он будет преобразован и сохранён в выбранном формате под новым именем.",
                                "Если загружено несколько файлов, можно конвертировать их по отдельности или скачать все результаты в одном ZIP-архиве.",
                                "Процесс конвертации выполняется в браузере, прогресс отображается на индикаторе для каждого файла.",
                                "Когда конвертация завершена, появляется возможность скачать готовый файл или архив.",
                                "В случае ошибки исходный PDF останется без изменений, и вы сможете попробовать снова."
                            ]
                        },
                        "mergePdf": {
                            "title": "Как пользоваться инструментом слияния PDF",
                            "steps": [
                                "Эта страница позволяет объединять несколько PDF-файлов в один.",
                                "Нажмите на область загрузки или перетащите PDF-файлы, чтобы добавить их.",
                                "После загрузки отобразятся иконки файлов, их названия, размеры и количество страниц.",
                                "Файлы можно перетаскивать мышью или пальцем, чтобы изменить порядок перед объединением.",
                                "Нажмите на кнопку «×» рядом с файлом, чтобы удалить его из списка.",
                                "Для объединения требуется минимум два файла. Если загружен только один, кнопка будет недоступна.",
                                "Когда все файлы загружены и порядок установлен, нажмите кнопку «Объединить PDF».",
                                "Процесс слияния выполняется в вашем браузере. Для каждого файла отображается прогресс.",
                                "После завершения вы сможете скачать объединённый PDF-документ с новым именем.",
                                "В случае ошибки исходные файлы останутся без изменений, и вы сможете попробовать снова."
                            ]
                        },
                        "splitPdf": {
                            "title": "Как пользоваться инструментом разделения PDF",
                            "steps": [
                                "Эта страница позволяет разделять PDF-документы на отдельные страницы или сохранять выбранные страницы в новые файлы.",
                                "Нажмите на область загрузки или перетащите PDF-файл, чтобы добавить его.",
                                "После загрузки отобразятся название файла, количество страниц и миниатюры страниц.",
                                "Вы можете выбрать все страницы или отметить только нужные для сохранения.",
                                "Для отмены выбора используйте кнопку «Снять выделение».",
                                "При необходимости можно указать формат выходных файлов (например, PDF, JPG, PNG).",
                                "После того как страницы выбраны, нажмите кнопку «Разделить PDF».",
                                "Процесс выполняется прямо в вашем браузере, для каждой страницы отображается прогресс.",
                                "Когда разделение завершится, вы сможете скачать выбранные страницы в отдельном архиве или отдельными файлами.",
                                "В случае ошибки исходный PDF не изменяется, и вы сможете попробовать снова."
                            ]
                        },

                        "clipAudio": {
                            "title": "Как пользоваться инструментом обрезки аудио",
                            "steps": [
                                "Этот инструмент позволяет вырезать и сохранить любой фрагмент аудиофайла с точностью до секунды.",
                                "Нажмите на область загрузки или перетащите файл, чтобы добавить аудио.",
                                "После загрузки появится форма волны с таймлайном для удобной навигации.",
                                "Используйте область выделения на таймлайне, чтобы задать точку начала и конца нужного отрезка.",
                                "Вы можете воспроизвести аудио и подкорректировать выделение, чтобы найти точное место.",
                                "Для удобства отображаются время начала, время окончания и общая длительность выделенного фрагмента.",
                                "Когда всё готово, нажмите кнопку 'Обрезать и скачать', чтобы обработать аудио и сохранить результат.",
                                "Инструмент обрезает аудио без потери качества и лишнего перекодирования."
                            ]
                        },
                        "compressAudio": {
                            "title": "Как пользоваться инструментом сжатия аудио",
                            "steps": [
                                "Эта страница позволяет уменьшить размер аудиофайлов без заметной потери качества звучания.",
                                "Нажмите на область загрузки или перетащите файлы, чтобы начать работу.",
                                "После загрузки каждый файл отобразится со своим форматом и исходным размером.",
                                "Для больших форматов (WAV, AIFF, FLAC, ALAC) инструмент автоматически конвертирует их в MP3 для лучшего сжатия.",
                                "Ход обработки можно отслеживать по индикатору прогресса и процентам напротив каждого файла.",
                                "Кнопкой ✕ можно удалить файл из списка до или во время обработки.",
                                "Когда всё готово, выберите вариант: скачать файлы по отдельности или сохранить все в одном ZIP-архиве.",
                                "Сжатие выполняется прямо в браузере, без загрузки на сервер — быстро и безопасно."
                            ]
                        },
                        "convertAudio": {
                            "title": "Как пользоваться инструментом конвертации аудио",
                            "steps": [
                                "Эта страница позволяет конвертировать аудиофайлы в разные форматы: MP3, WAV, AAC, FLAC, OGG или AIFF.",
                                "Нажмите на область загрузки или перетащите файлы, чтобы добавить их.",
                                "После загрузки каждый файл отображается с указанием формата, размера и полосы прогресса.",
                                "Выберите нужный формат, нажав на соответствующую кнопку.",
                                "Если загружено несколько файлов, вы можете конвертировать их по отдельности или скачать все сразу в одном ZIP-архиве.",
                                "Конвертация выполняется локально в браузере с помощью FFmpeg — быстро и безопасно, файлы не передаются на сервер.",
                                "Файлы можно удалить из списка в любой момент кнопкой ✕.",
                                "После завершения обработки вы сможете скачать готовый конвертированный файл(ы)."
                            ]
                        },
                        "createThumbnail": {
                            "title": "Как пользоваться инструментом создания обложки для видео",
                            "steps": [
                                "На этой странице вы можете создать обложку (thumbnail) для вашего видео онлайн.",
                                "Нажмите на область загрузки или перетащите видеофайл, чтобы добавить его.",
                                "После загрузки видео появится возможность предварительного просмотра.",
                                "Нажмите кнопку «Создать обложку», чтобы сгенерировать превью из видео.",
                                "Сгенерированная обложка отобразится под видео.",
                                "Вы можете скачать обложку как изображение или скачать видео уже с новой обложкой.",
                                "Вся обработка выполняется локально в вашем браузере с помощью FFmpeg, ваши файлы не загружаются на сервер.",
                                "Вы можете удалить файл и загрузить другое видео в любое время."
                            ]
                        }

                    }

                },
            },
        },
    });

export default i18n;