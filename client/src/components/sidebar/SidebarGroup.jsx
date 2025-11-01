import {useState} from "react";
import styles from "./styles/SidebarGroup.module.css";

export default function SidebarGroup({label, children}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.group}>
            <button
                className={styles.groupButton}
                onClick={() => setOpen(!open)}>
                {label}
            </button>

            {open && (
                <div className={styles.groupContent}>
                    {children}
                </div>
            )}
        </div>
    );
}
