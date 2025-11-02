import styles from "./styles/AnnotationCardCrop.module.css";
import { useRef, useState } from "react";

export default function AnnotationCardCropPreview({selectedImage, cropPoints , setCropPoints}) {
    const [hoverBox, setHoverBox] = useState(null);
    const imgRef = useRef(null);

    const getImageCoords = (e) => {
        const rect = e.target.getBoundingClientRect();
        const xRatio = e.target.naturalWidth / rect.width;
        const yRatio = e.target.naturalHeight / rect.height;
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        return {
            imgX: screenX * xRatio,
            imgY: screenY * yRatio,
            viewX: screenX,
            viewY: screenY,
        };
    };

    const handleImageClick = (e) => {
        const { imgX, imgY, viewX, viewY } = getImageCoords(e);
        const point = { imgX, imgY, viewX, viewY };

        if (cropPoints.length === 0) setCropPoints([point]);
        else if (cropPoints.length === 1) setCropPoints((p) => [...p, point]);
        else setCropPoints([point]);
    };

    const handleHoverMove = (e) => {
        if (cropPoints.length !== 1) return;
        const { viewX, viewY } = getImageCoords(e);
        const p1 = cropPoints[0];
        setHoverBox({
            x: Math.min(p1.viewX, viewX),
            y: Math.min(p1.viewY, viewY),
            w: Math.abs(p1.viewX - viewX),
            h: Math.abs(p1.viewY - viewY),
        });
    };


    return (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <div
                className={styles.imagePreview}
                onClick={handleImageClick}
                onMouseMove={handleHoverMove}
            >
                <img
                    ref={imgRef}
                    src={selectedImage}
                    className={styles.image}
                    alt="Selected"
                    draggable={false}
                />

                {hoverBox && cropPoints.length === 1 && (
                    <div
                        className={styles.hoverBox}
                        style={{
                            left: hoverBox.x,
                            top: hoverBox.y,
                            width: hoverBox.w,
                            height: hoverBox.h,
                        }}
                    />
                )}

                {cropPoints.length === 2 && (
                    <div
                        className={styles.cropBox}
                        style={{
                            left: Math.min(cropPoints[0].viewX, cropPoints[1].viewX),
                            top: Math.min(cropPoints[0].viewY, cropPoints[1].viewY),
                            width: Math.abs(cropPoints[0].viewX - cropPoints[1].viewX),
                            height: Math.abs(cropPoints[0].viewY - cropPoints[1].viewY),
                        }}
                    />
                )}
            </div>
        </div>
    );
}
