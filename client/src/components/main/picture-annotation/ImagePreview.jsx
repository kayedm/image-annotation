import React, {useRef, useState} from "react";
import styles from "./styles/ImagePreview.module.css";
import {
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave
} from "../utils/ImagePreviewUtils.jsx";

export default function ImagePreview({hidePoints, selectedTool, points, setPoints}) {
    const [preview, setPreview] = useState(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const wasDragging = useRef(false);
    const startPos = useRef({x: 0, y: 0});

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleClick = (e) => {

        if(wasDragging.current) {
            wasDragging.current = false;
            return;
        }

        if (!preview || dragging || !selectedTool ) return;
        const img = e.currentTarget.querySelector("img");
        const rect = img.getBoundingClientRect();
        console.log(rect);
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        // stops points from being placed outside image
        if (x < 0 || y < 0 || x > img.naturalWidth || y > img.naturalHeight) return;

        const newPoint = {id: Date.now(), x, y, label: selectedTool, title: "" };
        setPoints((prev) => [...prev, newPoint]);
    };

    return (
        <div className={styles.container}>
            {!preview ? (
                <label className={styles.uploadBox}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.input}
                    />
                    <span>Upload Image</span>
                </label>
            ) : (
                <div
                    className={styles.previewBox}
                    onWheel={(e) => handleWheel(e, setScale)}
                    onMouseDown={(e) => handleMouseDown(e, setDragging, wasDragging, startPos, offset)}
                    onMouseMove={(e) => handleMouseMove(e, dragging, wasDragging, setOffset, startPos)}
                    onMouseUp={() => handleMouseUp(setDragging)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <div
                        className={styles.imageWrapper}
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                            cursor: dragging ? "grabbing" : " ",
                        }}
                    >
                        <img src={preview} alt="preview" className={styles.image}/>
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className={!hidePoints ? styles.point : styles.hidePoints}
                                data-label={p.label}
                                style={{
                                    left: `${p.x}px`,
                                    top: `${p.y}px`,
                                }}
                                title={p.label}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
