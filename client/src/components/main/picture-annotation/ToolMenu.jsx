import styles from '../../styles/picture-annotation/ToolMenu.module.css'

export default function ToolMenu({setHidePoints, setSelectedTool, selectedTool}) {
    const tools = ["Person", "Product", "Object", "Animal"];

    return (
        <div className={styles.container}>
            {tools.map((tool) => (
                <button
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className={selectedTool === tool ? styles.active : ""}>
                    {tool}
                </button>
            ))}
            <button className={styles.hideBtn} onClick={ () => setHidePoints((prev) => !prev)}> Hide Points</button>
        </div>
    );
}
