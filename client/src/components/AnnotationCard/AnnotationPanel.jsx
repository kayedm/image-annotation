import Card from './Card.jsx';
import styles from './styles/Panel.module.css'
import {imageStore} from "../../store/imageStore.js";
import {Button} from "react-bootstrap";
export default function AnnotationPanel() {

    const annotations = imageStore(state => state.annotations);
    const buildPayload = imageStore(state => state.buildPayload);

    function saveAnnotation() {
        const blob = new Blob([buildPayload()], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'annotation.json';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {
                    annotations.map((ann) => (
                        <Card key={ann.id} annotation={ann}/>
                    ))}
            </div>
            <Button className={styles.saveBtn} onClick={saveAnnotation}>Save</Button>
        </div>
    )
}