// get css styles
import styles from './SideBar.module.css';

export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <h2>Sidebar Navigation</h2>
            <ul>
                <li>Home</li>
                <li>Map</li>
                <li>Settings</li>
            </ul>
        </div>
    )
}
