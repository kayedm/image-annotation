import styles from "./styles/CardCropButtons.module.css";
import saveCrop from "../../utils/crop.js"
import {imageStore} from "../../store/imageStore.js";

export default function CardCropButtons({annotation, selectedImage, setShowCrop, cropPoints}) {

    const deleteAnnotationRefImage = imageStore(state => state.deleteAnnotationRefImage);

    const handleSaveCrop = () => {
        saveCrop(cropPoints, annotation, selectedImage);
        setShowCrop(false);
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