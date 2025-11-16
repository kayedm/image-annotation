import styles from "../../components/styles/PictureAnnotation.module.css";
import React from "react";
import AnnotationPanel from "../../components/AnnotationCard/AnnotationPanel.jsx";
import EditingArea from "../../components/EditingArea/EditingArea.jsx";

export default function VideoAnnotation() {
    const [selectedTool, setSelectedTool] = React.useState(null);
    const [hidePoints, setHidePoints] = React.useState(false);
    const [points, setPoints] = React.useState([]);

    const toolState = { selectedTool, setSelectedTool };
    const pointState = { points, setPoints, hidePoints, setHidePoints };

    return (
        <div className={styles.container}>
            <div className={styles.editingArea}>
                <div className={styles.leftSide}>
                    <EditingArea toolState={toolState} pointState={pointState} />
                </div>
                <div className={styles.rightSide}>
                    <AnnotationPanel pointState={pointState}/>
                </div>
            </div>
        </div>
    )
}

