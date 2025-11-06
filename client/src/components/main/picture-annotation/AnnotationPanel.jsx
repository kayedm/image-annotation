import AnnotateCard from './AnnotationCard';
import styles from './styles/AnnotationPanel.module.css'

export default function AnnotationCanvas({pointState}) {
    const { points, setPoints } = pointState;

    return (
        <div className={styles.container}>
            {
                points.map((point) => (
                    <AnnotateCard key={point.id} point={point} setPoints={setPoints}/>
                ))}
        </div>
    )
}