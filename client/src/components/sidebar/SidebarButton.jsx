import {NavLink} from "react-router-dom";
import styles from "./styles/SidebarButton.module.css";

export default function SidebarButton({children, to, color}) {
    return (
        <NavLink
            data-color={color}
            to={to}
            className={({isActive}) => isActive ? `${styles.button} ${styles.active}` : styles.button}>
            {children}
        </NavLink>
    );
}
