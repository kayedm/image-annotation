import styles from "./styles/CardCropPreview.module.css";
import {useState} from "react";
import usePanZoom from "../../hooks/usePanZoom.js";

export default function CardCropPreview({referenceImages, selectedImage, cropPoints, setCropPoints, imgRef}) {
    const {handlers, offset, scale, didDrag} = usePanZoom();
    const [isCropping, setIsCropping] = useState(false);
    const previewImage = referenceImages.find(img => img.id === selectedImage);

    function getLocalCoords(e) {

        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect);

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width;
        const yPercent = y / rect.height;

        return {xPercent, yPercent}
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
            x: Math.min(start.xPercent, end.xPercent),
            y: Math.min(start.yPercent, end.yPercent),
            w: Math.abs(start.xPercent - end.xPercent),
            h: Math.abs(start.yPercent - end.yPercent)
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
                    {...handlers}
                    onClick={handleMouseUp}
                >
                    <img src={previewImage?.src} alt={"Preview Image"} className={styles.image} draggable={false}
                         ref={imgRef}/>
                    {rect && (
                        <div
                            className={styles.cropBox}
                            style={{
                                left: `${rect.x * 100}%`,
                                top: `${rect.y * 100}%`,
                                width: `${rect.w * 100}%`,
                                height: `${rect.h * 100}%`,
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
        ;
}
