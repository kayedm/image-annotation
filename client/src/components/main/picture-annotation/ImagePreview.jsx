import React, { useRef, useState } from "react";
import usePanZoom from "../../../hooks/usePanZoom";
import styles from "./styles/ImagePreview.module.css";

export default function ImagePreview({ hidePoints, selectedTool, points, setPoints }) {
    const { scale, offset, containerRef, imgRef, handlers, wasDragging } = usePanZoom();
    const [preview, setPreview] = useState(null);
    const nextId = useRef(1);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleClick = (e) => {
        if (wasDragging.current) {
            wasDragging.current = false;
            return;
        }

        if (!preview || !selectedTool) return;
        const img = imgRef.current;
        if (!img) return;

        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

        const newPoint = {
            id: nextId.current++,
            xPercent,
            yPercent,
            label: selectedTool,
            title: "",
        };
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
                    {...handlers}
                    onClick={handleClick}
                >
                    <div
                        ref={containerRef}
                        className={styles.imageWrapper}
                        style={{
                            position: "relative",
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                            transformOrigin: "top left",
                            touchAction: "none",
                        }}
                    >
                        <img
                            ref={imgRef}
                            src={preview}
                            alt="preview"
                            className={styles.image}
                            draggable={false}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
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
                </div>
            )}
        </div>
    );
}
