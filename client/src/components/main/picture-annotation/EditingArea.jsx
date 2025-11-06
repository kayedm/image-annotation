import styles from "./styles/EditingArea.module.css";
import ToolMenu from "./ToolMenu.jsx";
import ImagePreview from "./ImagePreview.jsx";
import React from "react";

export default function EditingArea({toolState, pointState}) {
    const { selectedTool, setSelectedTool } = toolState;
    const { points, setPoints, hidePoints, setHidePoints } = pointState;

    return (
        <div className={styles.container}>
            <div className={styles.toolMenu}>
                <ToolMenu setHidePoints={setHidePoints} selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
            </div>
            <div className={styles.imagePreview}>
                <ImagePreview hidePoints={hidePoints} points={points} setPoints={setPoints} selectedTool={selectedTool}/>
            </div>
        </div>
    )
}