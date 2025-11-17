import styles from './styles/SidebarFooter.module.css'
import avatar from '../../assets/avatar.gif'
import React from "react";
import {useAuth} from "../../context/AuthContext.jsx"
import {Settings2} from "lucide-react";
import SidebarSettings from "./SidebarSettings.jsx"

export default function SidebarFooter({role}) {
    const [showSettings, setShowSettings] = React.useState(false);
    const {user} = useAuth();

    return (
            <div className={styles.container}>
                <div className={styles.settings}>
                    {showSettings && <SidebarSettings onClose={() => setShowSettings(false)} />}
                </div>
            <div className={styles.footer} onClick={() => setShowSettings(true)}>
                <img className={styles.avatar} src={avatar} alt="avatar"/>
                <div className={styles.text}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.role}>{role}</span>
                </div>
            </div>

        </div>
    )

}