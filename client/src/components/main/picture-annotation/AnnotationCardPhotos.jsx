import styles from "./styles/AnnotationCardPhotos.module.css";
import React, {useState} from "react";
import {PlusIcon} from "lucide-react";
import AnnotationCardUrlUpload from "./AnnotationCardUrlUpload.jsx";
import AnnotationCardThumbnails from "./AnnotationCardThumbnails.jsx";

export default function AnnotationCardPhotos() {
    const [imagePreview, setImagePreview] = useState([]);
    const [urlInput, setUrlInput] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.photosText}> Photos</div>
            <AnnotationCardThumbnails setImagePreview={setImagePreview} imagePreview={imagePreview} />
            <AnnotationCardUrlUpload setUrlInput={setUrlInput} urlInput={urlInput} setImagePreview={setImagePreview} />
        </div>
    )
}