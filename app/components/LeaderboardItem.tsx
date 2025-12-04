import styles from './LeaderboardItem.module.css';

function ProgressBar({ score }: { score: number }) {
    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${score}%`, height: '100%', backgroundColor: '#2563eb' }}></div>
        </div>
    );
}

export function LeaderboardItem({ rank, name, score, isCurrent }: { rank: number; name: string; score: number; isCurrent?: boolean }) {
    return (
        <div className={`${styles.leaderboardItem} ${isCurrent ? styles.current : ''}`}>
            <span className={styles.rank}>{rank}</span>
            <span className={styles.name} title={name}>{name}</span>
            <span className={styles.score}>{score}</span>
            <ProgressBar score={score} />
            {/* badge to the right of progress */}
            {/* remove the bottom border after progress so the you badge doesnt have it */}
            {isCurrent && <span className={styles.youBadge}>You</span>}
        </div>
    );
}
