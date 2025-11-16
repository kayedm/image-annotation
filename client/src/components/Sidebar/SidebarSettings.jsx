import styles from "./styles/SidebarSettings.module.css"
import {useAuth} from "../../context/AuthContext.jsx";


export default function SidebarSettings({ onClose }) {
    const { logout } = useAuth()

    return (
        <div className={styles.settings}   onClick={onClose}>
            <div className={styles.menu} onClick={ (e) => e.stopPropagation() }>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}