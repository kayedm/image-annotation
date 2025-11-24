import Card from './Card.jsx';
import styles from './styles/Panel.module.css'
import {imageStore} from "../../store/imageStore.js";

export default function AnnotationPanel() {

    const annotations = imageStore(state => state.annotations);

    return (
        <div className={styles.container}>
            {
                annotations.map((ann) => (
                    <Card key={ann.id} annotation={ann}/>
                ))}
        </div>
    )
}