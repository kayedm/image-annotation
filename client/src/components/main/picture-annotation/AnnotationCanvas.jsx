import AnnotateCard from './AnnotationCard';

export default function AnnotationCanvas({points, setPoints}) {

    console.log(points);
    return (
        <div>
            {
                points.map((point) => (
                <AnnotateCard key={point.id} point={point} setPoints={setPoints}/>
            ))}
        </div>
    )
}