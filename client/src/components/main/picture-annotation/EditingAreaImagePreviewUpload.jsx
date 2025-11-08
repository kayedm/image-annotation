import styles from "./styles/ImagePreview.module.css";
import React from "react";

export default function EditingAreaImagePreviewUpload({ setPreview }) {

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    return (
        <label className={styles.uploadBox}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.input}
            />
            <span>Upload Image</span>
        </label>
    )
}