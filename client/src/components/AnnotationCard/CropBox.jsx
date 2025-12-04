import styles from "./styles/CardCropPreview.module.css";

export default function CropBox({cropPoints}) {
    if (cropPoints.length !== 2) return null;

    const [p1, p2] = cropPoints;

    return (
        <div
            className={styles.cropBox}
            style={{
                left: `${Math.min(p1.x, p2.x) * 100}%`,
                top: `${Math.min(p1.y, p2.y) * 100}%`,
                width: `${Math.abs(p1.x - p2.x) * 100}%`,
                height: `${Math.abs(p1.y - p2.y) * 100}%`,
                userSelect: "none",
                pointerEvents: "none",
            }}
        />
    )
}