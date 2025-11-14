// get css styles
import styles from './SideBar.module.css';
import Image from 'next/image';

export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src="/favicon.ico" alt="App Logo" width={100} height={100} />
            </div>
            <h2>Sidebar Navigation</h2>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/dashboard/settings">Settings</a></li>
                <li><a href="/dashboard/probes">Probes Overview</a></li>
            </ul>
        </div>
    )
}
