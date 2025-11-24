import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.jsx";
import styles from "./AppLayout.module.css";
import {useState} from "react";
import React from "react";

export default function AppLayout() {

    const [onClose, setOnClose] = useState(false);

    return (
        <div className={styles.layout}>
            <div className={styles.sidebarShell} data-collapsed={onClose}>
                <Sidebar setOnClose={setOnClose} onClose={onClose} />
            </div>
            <div className={styles.main}>
                <div className={styles.container} data-collapsed={onClose}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
