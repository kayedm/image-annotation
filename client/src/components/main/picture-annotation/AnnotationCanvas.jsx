import AnnotateCard from './AnnotationCard';
import styles from '../../styles/picture-annotation/AnnotationCanvas.module.css'

export default function AnnotationCanvas({points, setPoints}) {

    console.log(points);
    return (
        <div className={styles.container}>
            {
                points.map((point) => (
                    <AnnotateCard key={point.id} point={point} setPoints={setPoints}/>
                ))}
        </div>
    )
}