import styles from './ToolMenu.module.css'
import {tools} from '../Data/tools.jsx'
import {imageStore} from "../../store/imageStore.js";
import {EyeOff} from "lucide-react";

export default function ToolMenu() {

    const selectedTool = imageStore((state) => state.selectedTool);
    const setSelectedTool = imageStore((state) => state.setSelectedTool);
    const toggleHidePoints = imageStore((state) => state.toggleHidePoints);
    const hidePoints = imageStore((state) => state.hidePoints);

    /* eslint-disable no-unused-vars */
    return (
        <div className={styles.container}>
            <div className={styles.toolMenu}>
                {tools.map(({label, icon: Icon}) => (
                    <button
                        key={label}
                        onClick={() => setSelectedTool(label)}
                        className={selectedTool === label ? styles.active : ""}>
                        <Icon className={styles.icon} size={14}/>{label}
                    </button>
                ))}
            </div>
            <button onClick={toggleHidePoints}
                    className={hidePoints ? styles.active : ""}> <EyeOff size={14}/>
            </button>
        </div>
    );
}
