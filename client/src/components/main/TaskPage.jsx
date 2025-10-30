import Card from "./Card.jsx";
import styles from "../styles/TaskPage.module.css"


export default function TaskPage () {
    return (
        <div className={styles.taskPage}>
            <Card color="grey" to="/test-page" title="Test Page"/>
        </div>
    )
}