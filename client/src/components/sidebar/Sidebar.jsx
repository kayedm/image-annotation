import styles from "./styles/Sidebar.module.css";

export default function Sidebar({ children, collapsed }) {
    return (
        <aside className={styles.sidebar} data-collapsed={collapsed}>
            {children}
        </aside>
    );
}
