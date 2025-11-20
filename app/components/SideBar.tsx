// get css styles
import styles from './SideBar.module.css';
import Image from 'next/image';

function NavigationButton(title: string, link: string) {
    return (
        <a href={link} className={styles.navItem}>{title}</a>
    )
}

export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src="/favicon.ico" alt="App Logo" width={100} height={100} />
            </div>
            <h2>Sidebar Navigation</h2>
            <ul>
                <li>{NavigationButton('Home', '/')}</li>
                <li>{NavigationButton('Dashboard', '/dashboard')}</li>
                <li>{NavigationButton('Probes', '/probes')}</li>
                <li>{NavigationButton('Leaderboard', '/leaderboard')}</li>
            </ul>
        </div>
    )
}
