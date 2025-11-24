import styles from "./ImagePreview.module.css";
import React from "react";
import {imageStore} from "../../store/imageStore.js";

export default function ImagePreviewUpload() {

    const setImage = imageStore((state) => state.setImage);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImage(url);
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