import { useState, useRef, useEffect, useCallback } from "react";
import { generateFileId } from "../../utils/uniqueIdGenerator";

export const useFileInput = ({ setFiles, multiple = true, disabled = false, accept, validate }) => {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const objectURLs = useRef(new Map());

    const showError = useCallback((msg) => setError(msg), []);
    useEffect(() => {
        if (error) {
            const id = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(id);
        }
    }, [error]);

    const revokeObjectURLs = useCallback((idsToKeep = []) => {
        const idsSet = new Set(idsToKeep);
        for (const [id, url] of objectURLs.current.entries()) {
            if (!idsSet.has(id)) {
                URL.revokeObjectURL(url);
                objectURLs.current.delete(id);
            }
        }
    }, []);

    const filterFiles = (files) => {
        if (validate) return files.filter(validate);

        if (accept) {
            const patterns = accept.split(",").map(a => a.trim());

            return files.filter(file => {
                const ext = file.name.toLowerCase().split(".").pop();

                if (file.type.startsWith("audio/") && ["webm", "weba"].includes(ext)) {
                    return false;
                }

                return patterns.some(pattern => {
                    if (pattern.endsWith("/*")) {
                        return file.type.startsWith(pattern.slice(0, -1));
                    }
                    if (pattern.startsWith(".")) {
                        return file.name.toLowerCase().endsWith(pattern.toLowerCase());
                    }
                    return file.type === pattern;
                });
            });
        }

        return files;
    };

    const createFileObject = (file) => {
        const id = generateFileId();
        const preview = (file.type.startsWith("image/") || file.type.startsWith("video/"))
            ? URL.createObjectURL(file)
            : undefined;

        if (preview) objectURLs.current.set(id, preview);

        return {
            file,
            id,
            shortName: file.name.length > 20
                ? file.name.slice(0, 17) + "..."
                : file.name,
            preview
        };
    };

    const processFiles = useCallback((files) => {
        if (disabled) return;

        const validFiles = filterFiles(files);
        const invalidFiles = files.filter(f => !validFiles.includes(f));

        if (invalidFiles.length) {
            const invalidNames = invalidFiles.map(f => f.name).join(", ");
            showError(`Invalid file type: ${invalidNames}`);
        }

        if (!validFiles.length) return;

        setFiles(prev => {
            const newFiles = validFiles
                .filter(file => !prev.some(f =>
                    f.file.name === file.name &&
                    f.file.size === file.size &&
                    f.file.type === file.type
                ))
                .map(createFileObject);

            if (!newFiles.length) return prev;

            const newIds = [...prev.map(f => f.id), ...newFiles.map(f => f.id)];
            revokeObjectURLs(newIds);

            return multiple ? [...prev, ...newFiles] : [newFiles[0]];
        });
    }, [disabled, multiple, setFiles, showError, filterFiles, revokeObjectURLs]);

    const removeFile = useCallback((id) => {
        setFiles(prev => {
            const newFiles = prev.filter(f => f.id !== id);

            if (objectURLs.current.has(id)) {
                URL.revokeObjectURL(objectURLs.current.get(id));
                objectURLs.current.delete(id);
            }
            return newFiles;
        });
    }, [setFiles]);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        processFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileChange = (e) => {
        processFiles(Array.from(e.target.files));
        e.target.value = "";
    };

    const handleClick = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handlePaste = useCallback((e) => {
        if (disabled) return;
        if (e.clipboardData.files.length) {
            processFiles(Array.from(e.clipboardData.files));
        }
    }, [disabled, processFiles]);

    useEffect(() => {
        if (!disabled) {
            window.addEventListener("paste", handlePaste);
            return () => window.removeEventListener("paste", handlePaste);
        }
    }, [disabled, handlePaste]);

    useEffect(() => {
        return () => {
            for (const url of objectURLs.current.values()) {
                URL.revokeObjectURL(url);
            }
            objectURLs.current.clear();
        };
    }, []);

    return {
        inputRef,
        isDragging,
        error,
        setIsDragging,
        handleDrop,
        handleFileChange,
        handleClick,
        removeFile,
        revokeObjectURLs
    };
};