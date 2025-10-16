export const getMimeTypeForFormat = (format) => {
    const mimeTypes = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'wmv': 'video/x-ms-wmv',
        'mkv': 'video/x-matroska',
        'flv': 'video/x-flv',
        '3gp': 'video/3gpp',
        'm4v': 'video/mp4',
        'mpeg': 'video/mpeg',
        'mpg': 'video/mpeg'
    };
    return mimeTypes[format] || 'video/mp4';
};

export const getVideoFormat = (fileType, fileName) => {
    const extension = fileName.toLowerCase().split('.').pop();

    const formatMap = {
        'mp4': 'mp4',
        'webm': 'webm',
        'avi': 'avi',
        'mov': 'mov',
        'wmv': 'wmv',
        'mkv': 'mkv',
        'flv': 'flv',
        '3gp': '3gp',
        '3gpp': '3gp',
        'm4v': 'mp4',
        'mpeg': 'mp4',
        'mpg': 'mp4'
    };

    if (formatMap[extension]) {
        return formatMap[extension];
    }

    if (fileType.includes('mp4')) return 'mp4';
    if (fileType.includes('webm')) return 'webm';
    if (fileType.includes('avi')) return 'avi';
    if (fileType.includes('quicktime')) return 'mov';
    if (fileType.includes('x-ms-wmv')) return 'wmv';
    if (fileType.includes('x-matroska')) return 'mkv';
    if (fileType.includes('x-flv')) return 'flv';
    if (fileType.includes('3gpp')) return '3gp';

    return 'mp4';
};

export const getProgressColor = (progress) => {
    if (progress === -1) return '#ff4757';
    if (progress === 100) return '#10ac84';
    return '#007bff';
};