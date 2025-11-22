import styles from "./ImagePreviewPoints.module.css";

export default function ImagePreviewPoints({ points, hidePoints  }) {

    return (
        <div>
            {points.map((p) => (
                <div
                    key={p.id}
                    className={!hidePoints ? styles.point : styles.hidePoints}
                    data-label={p.label}
                    style={{
                        left: `${p.xPercent}%`,
                        top: `${p.yPercent}%`,
                    }}
                    title={p.label}
                />
            ))}
        </div>
    )
}