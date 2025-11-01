import React from "react";
import styles from "./styles/SidebarHeader.module.css"
import {PanelLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarHeader({logo, onClose, setOnClose, to}) {
    const navigate = useNavigate();

    function handleClick() {
        if(onClose) {
            setOnClose(!onClose);
        } else {
            navigate(to);
        }
    }

    return (
        <div className={styles.header}>
            <button className={styles.logo} onClick={handleClick}>{logo}</button>
            <button className={styles.button} onClick={() => setOnClose(!onClose)}>
                <span className={styles.icon}><PanelLeft size={15} /></span>
            </button>
        </div>
    )
}