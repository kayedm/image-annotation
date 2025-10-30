import styles from '../styles/Card.module.css';
import {NavLink} from "react-router-dom";

export default function Card({to, title, color}) {
    return (
        <div className={styles.card} data-color={color}>
            <NavLink
                to={to}
                className={styles.text}>
                {title} <br/>
            </NavLink>
        </div>
    )
}