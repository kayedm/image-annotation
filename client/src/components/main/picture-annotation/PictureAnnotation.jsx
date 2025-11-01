import ImagePreview from "./ImagePreview.jsx";
import ToolMenu from "./ToolMenu.jsx";
import styles from "./styles/PictureAnnotation.module.css";
import React from "react";
import AnnotationPanel from "./AnnotationPanel.jsx";

export default function PictureAnnotation() {
    const [selectedTool, setSelectedTool] = React.useState(null);
    const [hidePoints, setHidePoints] = React.useState(false);
    const [points, setPoints] = React.useState([]);

    return (
        <div className={styles.container}>
            <div className={styles.editingArea}>
                <div className={styles.leftSide}>
                        <div className={styles.toolMenu}>
                            <ToolMenu  setHidePoints={setHidePoints} selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
                        </div>
                        <div className={styles.imagePreview}>
                            <ImagePreview  hidePoints={hidePoints} points={points} setPoints={setPoints} selectedTool={selectedTool}/>
                        </div>
                </div>

                <div className={styles.rightSide}>
                    <AnnotationPanel group={points.label} points={points} setPoints={setPoints}/>
                </div>
            </div>
        </div>
    )
}

