import AnnotationCardInfo from "./AnnotationCardInfo";
import styles from "./styles/AnnotationCard.module.css"
import {Delete, Shirt} from "lucide-react";
import AnnotationCardPhotos from "./AnnotationCardPhotos.jsx";

export default function AnnotationCard({point, setPoints}) {

    return (
        <div className={styles.container} data-label={point.label}>
            <AnnotationCardInfo setPoints={setPoints} point={point} />
            <AnnotationCardPhotos setPoints={setPoints} point={point} />
        </div>
    )
}