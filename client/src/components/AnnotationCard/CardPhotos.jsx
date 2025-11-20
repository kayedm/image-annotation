import styles from "./styles/CardPhotos.module.css";
import React, {useState} from "react";
import CardUrlUpload from "./CardUrlUpload.jsx";
import CardThumbnails from "./CardThumbnails.jsx";
import {ArrowDown} from "lucide-react";

export default function CardPhotos() {
    const [imagePreview, setImagePreview] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [urlInput, setUrlInput] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.photosText}>
                Photos
                <span className={styles.icon} onClick={() => setCollapsed(!collapsed)}><ArrowDown size={12}/></span>
            </div>
            <div className={`${styles.contentWrapper} ${collapsed ? styles.hidden : ""}`}>
                <CardThumbnails setImagePreview={setImagePreview} imagePreview={imagePreview} />
                <CardUrlUpload setUrlInput={setUrlInput} urlInput={urlInput} setImagePreview={setImagePreview} />
            </div>
        </div>
    )
}