import styles from "./ImagePreviewPoints.module.css";
import {imageStore} from "../../store/imageStore.js";

export default function ImagePreviewPoints() {

    const hidePoints = imageStore(state => state.hidePoints);
    const points = imageStore(state => state.annotations);

    return (
        <div>
            {points.map((p) => (
                <div
                    className={!hidePoints ? styles.point : styles.hidePoints}
                    data-label={p.label}
                    style={{
                        left: `${p.point.x}%`,
                        top: `${p.point.y}%`,
                    }}
                    title={p.label}
                />
            ))}
        </div>
    )
}