import styles from "./styles/CardCropButtons.module.css";
import {imageStore} from "../../store/imageStore.js";

export default function CardCropButtons({ annotation, selectedImage, setShowCrop, cropPoints }) {

    const updateAnnotationRefImage = imageStore(state => state.updateAnnotationRefImage);
    const deleteAnnotationRefImage = imageStore(state => state.deleteAnnotationRefImage);

    const handleSaveCrop = () => {

        if (cropPoints.length < 2) return;

        const [p1, p2] = cropPoints;
        const crop = {
            xPercent: Math.min(p1.x, p2.x),
            yPercent: Math.min(p1.y, p2.y),
            wPercent: Math.abs(p1.x - p2.x),
            hPercent: Math.abs(p1.y - p2.y),
        };

        const refImg = annotation.referenceImages.find(img => img.id === selectedImage);
        if (!refImg) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = refImg.src;

        img.onload = () => {

            const naturalW = img.naturalWidth;
            const naturalH = img.naturalHeight;

            const sx = crop.xPercent * naturalW;
            const sy = crop.yPercent * naturalH;
            const sw = crop.wPercent * naturalW;
            const sh = crop.hPercent * naturalH;


            const canvas = document.createElement("canvas");
            canvas.width = sw;
            canvas.height = sh;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

            canvas.toBlob((blob) => {
                if (!blob) return;
                const img = URL.createObjectURL(blob);
                updateAnnotationRefImage(annotation.id, selectedImage, img);
                setShowCrop(false);
            }, "image/png");
        };
    };


    const handleDeleteImage = () => {
        deleteAnnotationRefImage(annotation.id, selectedImage);
        setShowCrop(false);
    };

    return (
        <div className={styles.buttons}>
            <button onClick={handleSaveCrop} className={styles.saveBtn}>Save Crop</button>
            <button onClick={handleDeleteImage} className={styles.deleteBtn}>Delete Image</button>
        </div>
    )
}