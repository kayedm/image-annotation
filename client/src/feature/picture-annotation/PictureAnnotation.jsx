import styles from "./PictureAnnotation.module.css";
import React from "react";
import AnnotationPanel from "../../components/AnnotationCard/AnnotationPanel.jsx";
import EditingArea from "../../components/EditingArea/EditingArea.jsx";
import ImagePreview from "../../components/ImagePreview/ImagePreview.jsx";

export default function PictureAnnotation() {


    return (
        <div className={styles.container}>
            <div className={styles.editingArea}>
                <div className={styles.leftSide}>
                    <EditingArea>
                        <ImagePreview/>
                    </EditingArea>
                </div>
                <div className={styles.rightSide}>
                    <AnnotationPanel/>
                </div>
            </div>
        </div>
    )
}

