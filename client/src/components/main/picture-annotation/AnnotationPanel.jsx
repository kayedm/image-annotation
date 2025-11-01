import AnnotateCard from './AnnotationCard';
import styles from './styles/AnnotationCanvas.module.css'

export default function AnnotationCanvas({points, setPoints}) {
    return (
        <div className={styles.container}>
            {
                points.map((point) => (
                    <AnnotateCard key={point.id} point={point} setPoints={setPoints}/>
                ))}
        </div>
    )
}