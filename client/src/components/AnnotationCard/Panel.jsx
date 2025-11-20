import AnnotateCard from './Card.jsx';
import styles from './styles/Panel.module.css'

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