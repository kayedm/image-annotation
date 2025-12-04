import styles from "./styles/CardCrop.module.css";
import {useRef, useState} from "react";
import CardCropButtons from "./CardCropButtons.jsx";
import CardCropPreview from "./CardCropPreview.jsx";

export default function CardCrop({annotation, selectedImage, setShowCrop}) {
    const [cropPoints, setCropPoints] = useState([]);
    const [isCropping, setIsCropping] = useState(false);
    const imgRef = useRef(null);

    return (
        <div className={styles.container} onClick={() => setShowCrop(false)}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <CardCropPreview isCropping={isCropping} selectedImage={selectedImage} setCropPoints={setCropPoints} cropPoints={cropPoints} imgRef={imgRef} referenceImages={annotation.referenceImages}/>
                <CardCropButtons isCropping={isCropping} setIsCropping={setIsCropping} annotation={annotation} selectedImage={selectedImage} setShowCrop={setShowCrop} cropPoints={cropPoints} imgRef={imgRef}/>
            </div>
        </div>
    );
}
