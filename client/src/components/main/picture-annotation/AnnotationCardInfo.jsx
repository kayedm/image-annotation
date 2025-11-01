import styles from "./styles/AnnotationCardInfo.module.css";
import {Delete, Shirt} from "lucide-react";

export default function AnnotationCardInfo({point, setPoints }) {

    function handleTitleChange(e) {
        const title = e.target.value;
        if (!title) return;
        setPoints((prev) => prev.map((p => (p.id === point.id ? {...p, title} : p))))
    }

    return (
        <div className={styles.info}>
            <span><Shirt size={20}/></span>
            <div className={styles.text}>
                <div className={styles.label}>{point.label}</div>
                <input onChange={e => handleTitleChange(e)} placeholder="Title"></input>
            </div>
            <button className={styles.deleteBtn} onClick={() => setPoints((prev) => prev.filter((p) => p.id !== point.id))}><Delete/></button>
        </div>
    )
}