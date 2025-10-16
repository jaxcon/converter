let fileCounter = 0;
let globalCounter = 0;

export const generateFileId = () => {
    return `${Date.now()}_${fileCounter++}`;
};

export const generateUniqueId = () => {
    return `${Date.now()}_${globalCounter++}`;
};

export const resetCounters = () => {
    fileCounter = 0;
    globalCounter = 0;
};

export const generateUniqueFileName = (originalName, prefix = 'file') => {
    const ext = originalName.includes('.')
        ? originalName.substring(originalName.lastIndexOf('.'))
        : '';
    const base = originalName.includes('.')
        ? originalName.substring(0, originalName.lastIndexOf('.'))
        : originalName;

    return `${prefix}_${base}_${generateFileId()}${ext}`;
};

export const getUniqueName = (originalName, operation = 'converted') => {
    const dotIndex = originalName.lastIndexOf(".");
    const base = dotIndex > 0 ? originalName.substring(0, dotIndex) : "file";
    const ext = dotIndex > 0 ? originalName.substring(dotIndex) : "";
    return `${operation}_${base}_${generateFileId()}${ext}`;
};