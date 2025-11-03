import styles from "./styles/AnnotationCardInfo.module.css";
import { toolLookup } from '../data/tools.jsx'
import {Trash2} from "lucide-react";

export default function AnnotationCardInfo({point, setPoints}) {

    function handleTitleChange(e) {
        const title = e.target.value;
        if (!title) return;
        setPoints((prev) => prev.map((p => (p.id === point.id ? {...p, title} : p))))
    }

    const tool = toolLookup(point);
    const Icon = tool.icon;

    return (
        <div className={styles.info}>
            <span className={styles.icon}> <Icon size={20}/></span>
            <div className={styles.text}>
                <div className={styles.label}>{point.label}</div>
                <input onChange={e => handleTitleChange(e)} placeholder="Title"></input>
            </div>
            <button
                className={styles.deleteBtn}
                onClick={() => setPoints((prev) => prev.filter((p) => p.id !== point.id))}
            >
                <Trash2 size={15} />
            </button>
        </div>
    )
}