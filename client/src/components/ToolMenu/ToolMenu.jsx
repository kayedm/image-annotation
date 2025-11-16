import styles from '../styles/ToolMenu.module.css'
import { tools } from '../Data/tools.jsx'

export default function ToolMenu({setHidePoints, setSelectedTool, selectedTool}) {

    /* eslint-disable no-unused-vars */
    return (
        <div className={styles.container}>

            {tools.map(({label, icon: Icon }) => (
                <button
                    key={label}
                    onClick={() => setSelectedTool(prev => prev === label ? null : label)}
                    className={selectedTool === label ? styles.active : ""}>
                    <Icon size={14}/>{label}
                </button>
            ))}
            <button className={styles.hideBtn} onClick={ () => setHidePoints((prev) => !prev)}> Hide Points</button>
        </div>
    );
}
