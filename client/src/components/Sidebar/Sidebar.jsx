import styles from "./styles/Sidebar.module.css";
import SidebarHeader from "./SidebarHeader.jsx";
import {Flame} from "lucide-react";
import SidebarContent from "./SidebarContent.jsx";
import SidebarButton from "./SidebarButton.jsx";
import SidebarFooter from "./SidebarFooter.jsx";
import React from "react";

export default function Sidebar({ onClose, setOnClose }) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar} >
                <div className={styles.header}>
                    <SidebarHeader logo={<Flame/>} onClose={onClose} setOnClose={setOnClose}/>
                </div>
                <div className={styles.content}>
                    <SidebarContent>
                        <SidebarButton to="task-page" > List </SidebarButton>
                    </SidebarContent>
                </div>
                <div className={styles.footer}>
                    <SidebarFooter username="Test User" role="Contributer"/>
                </div>
            </aside>
        </div>
    );
}
