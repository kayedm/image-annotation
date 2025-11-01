import styles from './styles/SidebarFooter.module.css'
import avatar from '../../assets/avatar.gif'
import React from "react";
import {useAuth} from "../context/AuthContext.jsx"
import {Settings2} from "lucide-react";
import SidebarSettings from "./SidebarSettings.jsx"

export default function SidebarFooter({role}) {
    const [dropDown, setDropDown] = React.useState(false);
    const [showSettings, setShowSettings] = React.useState(false);
    const {user} = useAuth();

    return (

            <div className={styles.dropdown}>
                {showSettings && <SidebarSettings onClose={() => setShowSettings(false)} />}
                {dropDown && <div className={styles.menu}>
                <div className={styles.email}>{user.email}</div>
                <hr className={styles.linebreak}/>
                <div className={styles.menuItems}>
                    <button onClick={() => setShowSettings(true)}>
                        <Settings2 size={18} className={styles.icon}/>
                        <span>Settings</span>
                    </button>
                </div>
            </div>}

            <div className={styles.footer} onClick={() => setDropDown(!dropDown)}>
                <img className={styles.avatar} src={avatar} alt="avatar"/>
                <div className={styles.text}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.role}>{role}</span>
                </div>
            </div>

        </div>
    )

}