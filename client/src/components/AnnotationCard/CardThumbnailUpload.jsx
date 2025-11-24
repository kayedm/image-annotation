import styles from "./styles/CardThumbnailUpload.module.css";
import {PlusIcon} from "lucide-react";
import React from "react";
import {imageStore} from "../../store/imageStore.js";

export default function CardThumbnailUpload({ annotation }) {

    const addAnnotationRefImage = imageStore(state => state.addAnnotationRefImage);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const img = URL.createObjectURL(file);
        addAnnotationRefImage(annotation.id, img);
    }

    return (
        <label className={styles.uploadImg}>
            <span className={styles.addIcon}><PlusIcon/></span>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
        </label>
    )
}