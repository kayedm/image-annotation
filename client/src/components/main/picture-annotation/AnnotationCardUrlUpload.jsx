import styles from "./styles/AnnotationCardUrlUpload.module.css";
import React from "react";

export default function AnnotationCardUrlUpload({setUrlInput, urlInput, setImagePreview}) {

    function handleImageUrl() {
        const trimmed = urlInput.trim();
        if (!trimmed) return;
        setImagePreview(prev => [...prev, trimmed])
        setUrlInput("");
    }

    return (
        <div className={styles.uploadUrl}>
            <input
                type="text"
                onChange={e => setUrlInput(e.target.value)}
                value={urlInput}
                className={styles.uploadUrlInput}
            />
            <button className={styles.uploadBtn} onClick={handleImageUrl}> Upload Url</button>
        </div>
    )

}