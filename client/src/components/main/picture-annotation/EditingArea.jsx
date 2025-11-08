import styles from "./styles/EditingArea.module.css";
import EditingAreaImageToolMenu from "./EditingAreaImageToolMenu.jsx";
import EditingAreaImagePreview from "./EditingAreaImagePreview.jsx";
import React from "react";

export default function EditingArea({toolState, pointState}) {
    const { selectedTool, setSelectedTool } = toolState;
    const { points, setPoints, hidePoints, setHidePoints } = pointState;

    return (
        <div className={styles.container}>
            <div className={styles.toolMenu}>
                <EditingAreaImageToolMenu setHidePoints={setHidePoints} selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
            </div>
            <div className={styles.imagePreview}>
                <EditingAreaImagePreview hidePoints={hidePoints} points={points} setPoints={setPoints} selectedTool={selectedTool}/>
            </div>
        </div>
    )
}