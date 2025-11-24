import styles from "./styles/CardPhotos.module.css";
import React, {useState} from "react";
import CardUrlUpload from "./CardUrlUpload.jsx";
import CardThumbnails from "./CardThumbnails.jsx";
import {ArrowDown} from "lucide-react";

export default function CardPhotos({annotation}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.photosText}>
                Photos
                <span className={styles.icon} onClick={() => setCollapsed(!collapsed)}><ArrowDown size={12}/></span>
            </div>
            <div className={`${styles.contentWrapper} ${collapsed ? styles.hidden : ""}`}>
                <CardThumbnails annotation={annotation}/>
                <CardUrlUpload annotation={annotation}/>
            </div>
        </div>
    )
}