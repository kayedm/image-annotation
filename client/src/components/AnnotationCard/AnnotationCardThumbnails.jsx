import styles from "../styles/AnnotationCardThumbnails.module.css";
import CardCrop from "./CardCrop.jsx";
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";

export default function AnnotationCardThumbnails({setImagePreview, imagePreview}) {
    const [showCrop, setShowCrop] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImagePreview(prev => [...prev, url]);
    }

    function handleImageClick(image) {
        setSelectedImage(image);
        setShowCrop(true);
    }

    return (
        <div className={styles.photos}>

            {showCrop && (
                <div className={styles.crop}>
                    <CardCrop selectedImage={selectedImage} setShowCrop={setShowCrop} imagePreview={imagePreview} setImagePreview={setImagePreview}/>
                </div>
            )}

            <label className={styles.uploadImg}>
                <span className={styles.addIcon}><PlusIcon/></span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </label>

            {imagePreview.map((image) => (
                <img src={image} alt="Selected Image" className={styles.image} onClick={() => handleImageClick(image)}/>
            ))}
        </div>
    )
}