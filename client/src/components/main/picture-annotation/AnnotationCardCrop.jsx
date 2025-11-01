import {
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave
} from "../utils/ImagePreviewUtils.jsx";
import styles from "./styles/AnnotationCardCrop.module.css";
import {useRef, useState} from "react";

export default function AnnotationCardCrop({selectedImage, setShowCrop, setImagePreview}) {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const [cropPoints, setCropPoints] = useState([]);
    const [hoverPoints, setHoverPoints] = useState([{x:"", y:"", height:"", width:""}]);
    const [cropMode, setCropMode] = useState(false);
    const wasDragging = useRef(false);
    const startPos = useRef({x: 0, y: 0});

    function handleDeleteImage() {
        setImagePreview(prev => prev.filter(img => img !== selectedImage));
        setShowCrop(false);
    }



    function handleImageClick (e) {
        const rect = e.target.getBoundingClientRect();
        const x = (e.clientX - rect.left - offset.x) / scale;
        const y = (e.clientY - rect.top - offset.y) / scale;

        if (cropPoints.length === 0) setCropPoints([{x, y}]);
        else if (cropPoints.length === 1) setCropPoints(prev => [...prev, {x, y}]);
        else setCropPoints([{x, y}]);
        console.log(cropPoints);
    }


    function handleHoverMove() {

    }

    function handleSaveCrop() {

    }

    return (
        <div className={styles.container} onClick={() => setShowCrop(false)}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>

                <div className={styles.imagePreview} onClick={(e) => handleImageClick(e)}>
                    <div className={styles.cropBox}>
                    </div>
                    <img
                        className={styles.image}
                        src={selectedImage}
                        onWheel={(e) => handleWheel(e, setScale)}
                        onMouseDown={(e) => handleMouseDown(e, setDragging, wasDragging, startPos, offset)}
                        onMouseMove={(e) => handleMouseMove(e, dragging, wasDragging, setOffset, startPos)}
                        onMouseUp={() => handleMouseUp(setDragging)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        alt="Selected Image"

                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                            cursor: dragging ? "grabbing" : "grab",
                        }}
                    />

                    <div className={styles.points}>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.saveBtn}>Save Crop</button>
                    <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
                </div>
            </div>
        </div>
    )
}