import styles from "./styles/AnnotationCardCrop.module.css";
import {useState} from "react";
import AnnotationCardCropButtons from "./AnnotationCardCropButtons.jsx";
import AnnotationCardCropPreview from "./AnnotationCardCropPreview.jsx";

export default function AnnotationCardCrop({selectedImage, setShowCrop, setImagePreview}) {
    const [cropPoints, setCropPoints] = useState([]);

    return (
        <div className={styles.container} onClick={() => setShowCrop(false)}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <AnnotationCardCropPreview selectedImage={selectedImage} setCropPoints={setCropPoints} cropPoints={cropPoints} />
                <AnnotationCardCropButtons selectedImage={selectedImage} setImagePreview={setImagePreview} setShowCrop={setShowCrop} cropPoints={cropPoints}/>
            </div>
        </div>
    );
}
