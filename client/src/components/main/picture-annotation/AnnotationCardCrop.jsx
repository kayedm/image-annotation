import {
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave
} from "../utils/ImagePreviewUtils.jsx";
import styles from "./picture-annotation/AnnotationCardCrop.module.css";
import {useRef, useState} from "react";

export default function AnnotationCardCrop({selectedImage, setShowCrop, setImagePreview}) {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const wasDragging = useRef(false);
    const startPos = useRef({x: 0, y: 0});


    function handleDeleteImage() {
        setImagePreview(prev => prev.filter(img => img !== selectedImage));
        setShowCrop(false);
    }

    return (
        <div className={styles.container} onClick={() => setShowCrop(false)}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>

                <div className={styles.imagePreview}>
                    <img
                        className={styles.image}
                        src={selectedImage}
                        onWheel={(e) => handleWheel(e, setScale)}
                        onMouseDown={(e) => handleMouseDown(e, setDragging, wasDragging, startPos, offset)}
                        onMouseMove={(e) => handleMouseMove(e, dragging, wasDragging, setOffset, startPos)}
                        onMouseUp={() => handleMouseUp(setDragging)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}

                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                            cursor: dragging ? "grabbing" : "grab",
                        }}
                    />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.saveBtn}>Save Crop</button>
                    <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
                </div>
            </div>
        </div>
    )
}