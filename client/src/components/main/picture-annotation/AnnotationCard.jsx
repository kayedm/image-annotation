import styles from "../../styles/picture-annotation/AnnotationCard.module.css"
import {Delete, Shirt} from "lucide-react";

export default function AnnotationCard({point, setPoints}) {

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span><Shirt size={20}/></span>
                <div className={styles.text}>{point.label}</div>
                <button className={styles.deleteBtn} onClick={() => setPoints((prev) => prev.filter((p) => p.id !== point.id))}><Delete /></button>
            </div>
            <div className={styles.images}>
                <div className={styles.photosText}> Photos </div>
                <div className={styles.photo}>
                </div>
            </div>

        </div>
    )
}