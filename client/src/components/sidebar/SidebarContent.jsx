import React from "react";
import styles from "../styles/SidebarContent.module.css"

export default function SidebarContent({children}) {
    return <div className={styles.content}>{children}</div>
}