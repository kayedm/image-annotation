import styles from "./EditingArea.module.css";
import ToolMenu from "../ToolMenu/ToolMenu.jsx";
import React from "react";

export default function EditingArea({children}) {

    return (
        <div className={styles.container}>
            <div className={styles.toolMenu}>
                <ToolMenu/>
            </div>
            <div className={styles.editingAreaPreview}>
                {children}
            </div>
        </div>
    )
}