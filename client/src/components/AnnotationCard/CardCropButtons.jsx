import styles from "./styles/CardCropButtons.module.css";
import {imageStore} from "../../store/imageStore.js";

export default function CardCropButtons({ annotation, selectedImage, setShowCrop, cropPoints, imgRef }) {

    const updateAnnotationRefImage = imageStore(state => state.updateAnnotationRefImage);

    const handleSaveCrop = () => {

        if (cropPoints.length < 2) return;

        const [p1, p2] = cropPoints;
        const crop = {
            x: Math.min(p1.x, p2.x),
            y: Math.min(p1.y, p2.y),
            w: Math.abs(p1.x - p2.x),
            h: Math.abs(p1.y - p2.y)
        };

        const img = new Image();
        img.crossOrigin = "anonymous";

        const refImgObj = annotation.referenceImages.find(img => img.id === selectedImage);
        if (!refImgObj) return;
        img.src = refImgObj.src;

        img.onload = () => {
            const rect = imgRef.current.getBoundingClientRect();

            const scaleX = img.naturalWidth / rect.width;
            const scaleY = img.naturalHeight / rect.height;

            const canvas = document.createElement("canvas");
            canvas.width = crop.w * scaleX;
            canvas.height = crop.h * scaleY;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.w * scaleX,
                crop.h * scaleY,
                0,
                0,
                canvas.width,
                canvas.height
            );

            canvas.toBlob((blob) => {
                if (!blob) return;
                const img = URL.createObjectURL(blob);
                updateAnnotationRefImage(annotation.id, selectedImage, img);
                setShowCrop(false);
            }, "image/png");
        };
    };


    const handleDeleteImage = () => {
        setShowCrop(false);
    };

    return (
        <div className={styles.buttons}>
            <button onClick={handleSaveCrop} className={styles.saveBtn}>Save Crop</button>
            <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
        </div>
    )
}