import React, {useRef, useState} from "react";
import styles from "../../styles/picture-annotation/ImagePreview.module.css";

export default function ImagePreview({hidePoints, setSelectedTool, onImageSelect, selectedTool, points, setPoints}) {
    const [preview, setPreview] = useState(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const startPos = useRef({x: 0, y: 0});

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        onImageSelect?.({file, url});
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        setScale((prev) => Math.min(Math.max(prev + delta, 0.3), 5));
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        startPos.current = {x: e.clientX - offset.x, y: e.clientY - offset.y};
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setOffset({
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y,
        });
    };

    // stops page scrolling when inside the preview box
    const handleMouseEnter = () => {
        document.body.style.overflow = "hidden";
    };

    const handleMouseLeave = () => {
        document.body.style.overflow = "auto";
    };


    const handleMouseUp = () => setDragging(false);

    const handleClick = (e) => {
        if (!preview || dragging || !selectedTool) return;
        const img = e.currentTarget.querySelector("img");
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect);
        const x = (e.clientX - rect.left - offset.x) / scale;
        const y = (e.clientY - rect.top - offset.y) / scale;

        // stops points from being placed outside image
        if (x < 0 || y < 0 || x > img.naturalWidth || y > img.naturalHeight) return;

        const newPoint = {id: Date.now(), x, y, label: selectedTool || "point"};
        setPoints((prev) => [...prev, newPoint]);
        setSelectedTool(null);
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
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
