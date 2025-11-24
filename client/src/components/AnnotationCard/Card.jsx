import CardInfo from "./CardInfo.jsx";
import styles from "./styles/Card.module.css"
import CardPhotos from "./CardPhotos.jsx";

export default function Card({annotation}) {

    return (
        <div className={styles.container} data-label={annotation.label}>
            <CardInfo annotation={annotation} />
            <CardPhotos annotation={annotation} />
        </div>
    )
}