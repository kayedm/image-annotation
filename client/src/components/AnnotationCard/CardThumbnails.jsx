import styles from "./styles/CardThumbnails.module.css";
import CardCrop from "./CardCrop.jsx";
import React, {useState} from "react";
import CardThumbnailUpload from "./CardThumbnailUpload.jsx";
import CardThumbnailImages from "./CardThumbnailImages.jsx";

export default function CardThumbnails({annotation}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCrop, setShowCrop] = useState(false);

    return (
        <div className={styles.photos}>
            {showCrop && (
                <div className={styles.crop}>
                    <CardCrop annotation={annotation} setShowCrop={setShowCrop} selectedImage={selectedImage}/>
                </div>
            )}
            <CardThumbnailUpload annotation={annotation}/>
            <CardThumbnailImages referenceImages={annotation.referenceImages} setShowCrop={setShowCrop}
                                 setSelectedImage={setSelectedImage}/>
        </div>
    )
}