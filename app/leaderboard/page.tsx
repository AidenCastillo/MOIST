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
        <p>To move up the leaderboard, improve your irrigation efficiency by optimizing water usage and reducing waste.</p>
        <p>Remember, efficient irrigation not only saves water but also enhances crop yield and sustainability.</p>
        {/* add some indicator about your own farm */}
        <div className={styles.leaderboard_container}>
            <div className={styles.leaderboard_list}>
                {/* List users */}
                <div className={styles.leaderboard_header}>
                    <span className={itemStyles.rank} style={{ fontWeight: 'bold' }}>Rank</span>
                    <span className={itemStyles.name} style={{ fontWeight: 'bold' }}>Name</span>
                    <span className={itemStyles.score} style={{ fontWeight: 'bold' }}>Score</span>
                    <span className={itemStyles.progressBarTitle} style={{ fontWeight: 'bold',  }}>Progress</span>
                </div>
                {/* mark the user's farm by name (replace with real user data as available) */}
                {(() => {
                    const myFarmName = 'Farm X';
                    return sampleData.map(({ rank, name, score }) => (
                        <LeaderboardItem key={rank} rank={rank} name={name} score={score} isCurrent={name === myFarmName} />
                    ));
                })()}
            </div>
            <aside className={styles.leaderboardBenefitsCard}>
            <p>Farms that rank high on the leaderboard may be eligible for sponsorships or grants from agricultural organizations. Keep up the good work!</p>
            <p>Tips to improve your ranking:</p>
            <ul className={styles.leaderboardBenefitsList}>
                <li>Regularly monitor and adjust your irrigation schedules based on weather forecasts.</li>
                <li>Implement soil moisture sensors to optimize water usage.</li>
                <li>Adopt water-efficient irrigation technologies such as drip irrigation.</li>
            </ul>

            </aside>
        </div>
    </div>
  );
}
