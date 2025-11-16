import styles from "../styles/AnnotationCardCropButtons.module.css";

export default function AnnotationCardCropButtons({ selectedImage, setImagePreview, setShowCrop, cropPoints }) {

    const handleSaveCrop = () => {
        if (cropPoints.length !== 2) return;
        console.log(cropPoints.length);
        const [p1, p2] = cropPoints;
        const crop = {
            x: Math.min(p1.imgX, p2.imgX),
            y: Math.min(p1.imgY, p2.imgY),
            w: Math.abs(p1.imgX - p2.imgX),
            h: Math.abs(p1.imgY - p2.imgY)
        };

        const img = new Image();
        img.src = selectedImage;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = crop.w;
            canvas.height = crop.h;
            ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
            const out = canvas.toDataURL("image/png");
            setImagePreview(prev => prev.map(i => (i === selectedImage ? out : i)));
            setShowCrop(false);
            setShowCrop(null);
        };
    };

    const handleDeleteImage = () => {
        setImagePreview((prev) => prev.filter((i) => i !== selectedImage));
        setShowCrop(false);
    };

    return (
        <div className={styles.buttons}>
            <button onClick={handleSaveCrop} className={styles.saveBtn}>Save Crop</button>
            <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
        </div>
    )
}