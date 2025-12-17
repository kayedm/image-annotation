import styles from "./styles/CardCropPreview.module.css";
import {useState} from "react";
import usePanZoom from "../../hooks/usePanZoom.js";
import useCrop from "../../hooks/useCrop.js";
import CropBox from "./CropBox.jsx";

export default function CardCropPreview({referenceImages, selectedImage, cropPoints, setCropPoints, imgRef}) {

    const [isCropping, setIsCropping] = useState(false);
    const {handlers, offset, scale, didDrag} = usePanZoom();
    const {onMouseDown, onMouseMove} = useCrop({didDrag, isCropping, setCropPoints, setIsCropping});
    const previewImage = referenceImages.find(img => img.id === selectedImage);

    function handleMouseMove(e) {
        if(!isCropping) {
           handlers.onMouseMove(e);
            return;
        }
        onMouseMove(e);
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.previewBox}
            >
                <div
                    className={styles.imageWrapper}
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: "top left",
                    }}
                    {...handlers}
                    onMouseMove={handleMouseMove}
                    onClick={onMouseDown}
                >
                    <img src={previewImage?.src} alt={"Preview Image"} className={styles.image} draggable={false}
                         ref={imgRef}/>
                    <CropBox cropPoints={cropPoints} />
                </div>
            </div>
        </div>
    )
        ;
}
