import styles from "../styles/AnnotationCardPhotos.module.css";
import React, {useState} from "react";
import AnnotationCardUrlUpload from "./AnnotationCardUrlUpload.jsx";
import AnnotationCardThumbnails from "./AnnotationCardThumbnails.jsx";
import {ArrowDown} from "lucide-react";

export default function AnnotationCardPhotos() {
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
                <AnnotationCardThumbnails setImagePreview={setImagePreview} imagePreview={imagePreview} />
                <AnnotationCardUrlUpload setUrlInput={setUrlInput} urlInput={urlInput} setImagePreview={setImagePreview} />
            </div>
        </div>
    )
}