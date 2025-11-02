import styles from "./styles/AnnotationCardCrop.module.css";
import {useState, useRef} from "react";

export default function AnnotationCardCrop({selectedImage, setShowCrop, setImagePreview}) {
    const [cropPoints, setCropPoints] = useState([]);
    const [hoverBox, setHoverBox] = useState(null);
    const imgRef = useRef(null);
    const [imgRect, setImgRect] = useState(null);

    const handleDeleteImage = () => {
        setImagePreview(prev => prev.filter(i => i !== selectedImage));
        setShowCrop(false);
    };

    const handleImageLoad = e => {
        const rect = e.target.getBoundingClientRect();
        setImgRect({
            width: rect.width,
            height: rect.height,
            naturalWidth: e.target.naturalWidth,
            naturalHeight: e.target.naturalHeight
        });
    };

    const getImageCoords = e => {
        const rect = e.target.getBoundingClientRect();
        const xRatio = e.target.naturalWidth / rect.width;
        const yRatio = e.target.naturalHeight / rect.height;
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        return {
            imgX: screenX * xRatio,
            imgY: screenY * yRatio,
            viewX: screenX,
            viewY: screenY
        };
    };

    const handleImageClick = e => {
        const {imgX, imgY, viewX, viewY} = getImageCoords(e);
        const point = {imgX, imgY, viewX, viewY};

        if (cropPoints.length === 0) setCropPoints([point]);
        else if (cropPoints.length === 1) setCropPoints(p => [...p, point]);
        else setCropPoints([point]);
    };

    const handleHoverMove = e => {
        if (cropPoints.length !== 1) return;
        const {viewX, viewY} = getImageCoords(e);
        const p1 = cropPoints[0];
        setHoverBox({
            x: Math.min(p1.viewX, viewX),
            y: Math.min(p1.viewY, viewY),
            w: Math.abs(p1.viewX - viewX),
            h: Math.abs(p1.viewY - viewY)
        });
    };

    const handleSaveCrop = () => {
        if (cropPoints.length !== 2) return;

        const [p1, p2] = cropPoints;
        const crop = {
            x: Math.min(p1.imgX, p2.imgX),
            y: Math.min(p1.imgY, p2.imgY),
            w: Math.abs(p1.imgX - p2.imgX),
            h: Math.abs(p1.imgY - p2.imgY)
        };

        const img = new Image();
        img.src = selectedImage;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = crop.w;
            canvas.height = crop.h;
            ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
            const out = canvas.toDataURL("image/png");
            setImagePreview(prev => prev.map(i => (i === selectedImage ? out : i)));
            setShowCrop(false);
        };
    };

    return (
        <div className={styles.container} onClick={() => setShowCrop(false)}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <div
                    className={styles.imagePreview}
                    onClick={handleImageClick}
                    onMouseMove={handleHoverMove}
                >
                    <img
                        ref={imgRef}
                        src={selectedImage}
                        onLoad={handleImageLoad}
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
                                height: hoverBox.h
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
                                height: Math.abs(cropPoints[0].viewY - cropPoints[1].viewY)
                            }}
                        />
                    )}
                </div>

                <div className={styles.buttons}>
                    <button onClick={handleSaveCrop} className={styles.saveBtn}>Save Crop</button>
                    <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
                </div>
            </div>
        </div>
    );
}
