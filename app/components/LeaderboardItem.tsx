import styles from './LeaderboardItem.module.css';

function ProgressBar({ score }: { score: number }) {
    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${score}%`, height: '100%', backgroundColor: '#2563eb' }}></div>
        </div>
    );
}

export function LeaderboardItem({ rank, name, score }) {
    return (
        <div className={styles.leaderboardItem}>
            <span className={styles.rank}>{rank}</span>
            <span className={styles.name}>{name}</span>
            <span className={styles.score}>{score}</span>
            <ProgressBar score={score} />
        </div>
    );
}
