import React from "react";
import usePanZoom from "../../hooks/usePanZoom.js";
import styles from "./ImagePreview.module.css";
import ImagePreviewUpload from "./ImagePreviewUpload.jsx";
import ImagePreviewPoints from "./ImagePreviewPoints.jsx";
import {imageStore} from "../../store/imageStore.js";

export default function ImagePreview() {
    const {scale, offset, handlers, didDrag} = usePanZoom();

    const addAnnotation = imageStore((state) => state.addAnnotation);
    const selectedTool = imageStore((state) => state.selectedTool);
    const image = imageStore((state) => state.image);

    function getPointCoords(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
        return {xPercent, yPercent}
    }

    const handleClick = (e) => {
        if (didDrag.current) return;
        if (!image || !selectedTool) return;

        const pointCoords = getPointCoords(e);
        if (!pointCoords) return;

        const point = {
            x: pointCoords.xPercent,
            y: pointCoords.yPercent,
            label: selectedTool,
            title: ""
        };
        addAnnotation(point);
    };

    return (<div className={styles.container}>
        {!image ? <ImagePreviewUpload/> : (<div
            className={styles.previewBox}
            {...handlers}
        >
            <div className={styles.imageWrapper} onClick={handleClick}
                 style={{
                     transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "top left",
                 }}>
                <img src={image} alt={"Image Preview"} className={styles.image} draggable={false}/>
                <ImagePreviewPoints/>
            </div>
        </div>)}
    </div>);
}
