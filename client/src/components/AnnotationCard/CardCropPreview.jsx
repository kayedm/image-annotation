import styles from "./styles/CardCropPreview.module.css";
import {useState} from "react";
import usePanZoom from "../../hooks/usePanZoom.js";

export default function CardCropPreview({referenceImages, selectedImage, cropPoints, setCropPoints, imgRef}) {
    const {handlers, offset, scale, didDrag} = usePanZoom();
    const [isCropping, setIsCropping] = useState(false);
    const previewImage = referenceImages.find( img => img.id === selectedImage);

    function getLocalCoords(e) {

        const rect = e.currentTarget.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        x = (x - offset.x) / scale;
        y = (y - offset.y) / scale;

        return {x, y}
    }

    function handleMouseUp(e) {
        const cropPoint = getLocalCoords(e)
        if (didDrag.current) return;
        if (!isCropping) {
            setCropPoints([cropPoint]);
            setIsCropping(true)
        }
        if (isCropping) {
            setCropPoints(prev => [prev[0], cropPoint]);
            setIsCropping(false)
        }
    }

    function handleMouseMove(e) {
        if (!isCropping) return;
        const cropPoint = getLocalCoords(e)
        setCropPoints(prev => [prev[0], cropPoint]);
    }


    let rect = null;
    if (cropPoints.length === 2) {
        const [start, end] = cropPoints;
        rect = {
            x: Math.min(start.x, end.x),
            y: Math.min(start.y, end.y),
            w: Math.abs(start.x - end.x),
            h: Math.abs(start.y - end.y),
        };
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.previewBox}
            >
                <div

                    className={styles.imageWrapper}
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: "top left",
                    }}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <img src={previewImage?.src} alt={"Preview Image"} className={styles.image} draggable={false} ref={imgRef} />
                    {rect && (
                        <div
                            className={styles.cropBox}
                            style={{
                                left: rect.x,
                                top: rect.y,
                                width: rect.w,
                                height: rect.h,
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
