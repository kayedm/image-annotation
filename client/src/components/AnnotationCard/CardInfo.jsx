import styles from "./styles/CardInfo.module.css";
import {toolLookup} from '../Data/tools.jsx';
import {Trash2} from "lucide-react";
import {imageStore} from "../../store/imageStore.js";

export default function CardInfo({annotation}) {

    const updateAnnotationTitle = imageStore(state => state.updateAnnotationTitle);
    const deleteAnnotation = imageStore(state => state.deleteAnnotation);

    function handleTitleChange(e) {
        updateAnnotationTitle(annotation.id, {title: e.target.value});
    }

    const tool = toolLookup(annotation);
    const Icon = tool.icon;

    return (
        <div className={styles.info}>
            <span className={styles.icon} data-label={annotation.label}>
                <Icon size={20}/>
            </span>

            <div className={styles.text}>
                <div className={styles.label}>{annotation.label}</div>
                <input
                    className={styles.title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                />
            </div>

            <button
                className={styles.deleteBtn}
                onClick={() => deleteAnnotation(annotation.id)}
            >
                <Trash2 size={15}/>
            </button>
        </div>
    );
}
