import { memo } from "react";

const PDFIcon = memo(() => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        role="img"
        aria-label="PDF document"
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M9 13h6"></path>
        <path d="M9 17h6"></path>
        <path d="M9 9h1"></path>
    </svg>
));

export default PDFIcon;