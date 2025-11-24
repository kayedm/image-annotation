import styles from "./styles/CardUrlUpload.module.css";
import React, {useState} from "react";
import {imageStore} from "../../store/imageStore.js";

export default function CardUrlUpload({annotation}) {
    const [urlInput, setUrlInput] = useState("");
    const addAnnotationRefImage = imageStore(state => state.addAnnotationRefImage);

    function handleImageUrl() {
        const img = urlInput.trim();
        if (!img) return;
        addAnnotationRefImage(annotation.id, img);
        setUrlInput("");
    }

    return (
        <div className={styles.container}>
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