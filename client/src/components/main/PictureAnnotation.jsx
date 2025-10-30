import ImagePreview from "./picture-annotation/ImagePreview.jsx";
import ToolMenu from "./picture-annotation/ToolMenu.jsx";
import styles from "../styles/picture-annotation/PictureAnnotation.module.css";
import React from "react";
import AnnotationCanvas from "./picture-annotation/AnnotationCanvas.jsx";

export default function PictureAnnotation() {
    const [selectedTool, setSelectedTool] = React.useState(null);
    const [points, setPoints] = React.useState([]);

    return (
        <div className={styles.container}>

            <div className={styles.leftSide}>
                <div className={styles.toolMenu}>
                    <ToolMenu selectedTool={selectedTool} setSelectedTool={setSelectedTool}/></div>
                <div className={styles.image}>
                    <ImagePreview points={points} setPoints={setPoints} selectedTool={selectedTool}/></div>
            </div>

            <div className={styles.rightSide}>
                <AnnotationCanvas group={points.label} points={points} setPoints={setPoints}/>
            </div>

        </div>
    )
}
