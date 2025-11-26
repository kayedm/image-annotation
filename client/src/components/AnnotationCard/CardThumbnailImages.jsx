import styles from "./styles/CardThumbnailImages.module.css";
import React from "react";

export default function CardThumbnailImages({referenceImages, setSelectedImage, setShowCrop}) {

    function handleImageClick(image) {
        setSelectedImage(image.id);
        setShowCrop(true);
    }

    return (
        <div className={styles.container}>
            {referenceImages.map((image) => (
                <div className={styles.imageWrapper} key={image.id}>
                    <img src={image.src} alt="Reference Image" className={styles.image}
                         onClick={() => handleImageClick(image)}/>
                </div>
            ))}
        </div>
    )
}