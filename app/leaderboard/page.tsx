// Shows a leaderboard of top users or farms based on irrigation efficiency or other metrics.
import React from 'react';

import styles from './LeaderboardPage.module.css';
import { LeaderboardItem } from '../components/LeaderboardItem';
import itemStyles from '../components/LeaderboardItem.module.css';

const sampleData = [
    { rank: 1, name: 'Farm A', score: 95 },
    { rank: 2, name: 'Farm B', score: 90 },
    { rank: 3, name: 'Farm X', score: 88 },
    { rank: 4, name: 'Farm Y', score: 85 },
    { rank: 5, name: 'Farm C', score: 80 },
    { rank: 6, name: 'Farm Z', score: 75 },
    { rank: 7, name: 'Farm D', score: 70 },
    { rank: 8, name: 'Farm W', score: 65 },
];

export default function LeaderboardPage() {
  return (
    <div className={styles.leaderboard}>
        <h1>Irrigation Leaderboard</h1>
        <p>Top users and farms based on irrigation efficiency will be displayed here.</p>
        <div className={styles.leaderboard_container}>
            {/* List users */}
            <div className={styles.leaderboard_header}>
                <span className={itemStyles.rank} style={{ fontWeight: 'bold' }}>Rank</span>
                <span className={itemStyles.name} style={{ fontWeight: 'bold' }}>Name</span>
                <span className={itemStyles.score} style={{ fontWeight: 'bold' }}>Score</span>
                <span className={itemStyles.progressBarTitle} style={{ fontWeight: 'bold' }}>Progress</span>
            </div>
            {sampleData.map(({ rank, name, score }) => (
                <LeaderboardItem key={rank} rank={rank} name={name} score={score} />
            ))}
        </div>
    </div>
  );
}
