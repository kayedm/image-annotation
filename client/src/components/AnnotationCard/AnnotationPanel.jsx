import Card from './Card.jsx';
import styles from './styles/Panel.module.css'
import {imageStore} from "../../store/imageStore.js";
import {Button} from "react-bootstrap";

export default function AnnotationPanel() {

    const annotations = imageStore(state => state.annotations);

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {
                    annotations.map((ann) => (
                        <Card key={ann.id} annotation={ann}/>
                    ))}
            </div>
            <Button>Save</Button>
        </div>
    )
}