import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar.jsx";
import SidebarContent from "./sidebar/SidebarContent.jsx";
import SidebarButton from "./sidebar/SidebarButton.jsx";
import SidebarHeader from "./sidebar/SidebarHeader.jsx";
import SidebarFooter from "./sidebar/SidebarFooter.jsx";
import {Flame} from "lucide-react";
import styles from "./styles/AppLayout.module.css";
import {useState} from "react";
import React from "react";

export default function AppLayout() {

    const [onClose, setOnClose] = useState(false);

    console.log(onClose);

    return (
        <div className={styles.layout}>

            <div className={styles.sidebar}>
                <Sidebar collapsed={onClose}>
                    <SidebarHeader logo={<Flame/>} onClose={onClose} setOnClose={setOnClose}/>
                        <SidebarContent>
                            <SidebarButton to="task-page" collapsed={onClose}> List </SidebarButton>
                        </SidebarContent>
                    <div className={styles.footer}>
                        <SidebarFooter username="Test User" role="Contributer"/>
                    </div>
                </Sidebar>
            </div>
            <div className={styles.main}>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
