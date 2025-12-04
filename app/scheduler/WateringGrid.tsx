"use client";
import React from 'react';
import styles from './WateringGrid.module.css';

type Level = 0 | 1 | 2 | 3 | 4;

function randomLevel(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280 % 1;
  return (Math.abs(x) * 5) | 0;
}

export default function WateringGrid({ year, month }:{ year?: number; month?: number }){
  const now = new Date();
  const m = month ?? now.getMonth();
  const y = year ?? now.getFullYear();

  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const levels: Level[] = React.useMemo(() => {
    const arr: Level[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      // seed with month/day/year to get repeatable values per month
      const seed = y * 10000 + (m+1) * 100 + d;
      const level = Math.min(4, Math.max(0, randomLevel(seed)) ) as Level;
      arr.push(level);
    }
    return arr;
  }, [y, m, daysInMonth]);

  return (
    <div className={styles.gridWrap}>
      <h3 className={styles.gridTitle}>Monthly Watering Effectiveness</h3>
      <div className={styles.grid} role="grid" aria-label="Monthly watering grid">
        {levels.map((lvl, idx) => (
          <div
            key={idx}
            role="gridcell"
            aria-label={`Day ${idx+1}: level ${lvl}`}
            title={`Day ${idx+1}: level ${lvl}`}
            className={`${styles.day} ${styles[`level${lvl}` as keyof typeof styles]}`}
          />
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}><span className={styles.legendSwatch + ' ' + styles.level0}></span> none</div>
        <div className={styles.legendItem}><span className={styles.legendSwatch + ' ' + styles.level1}></span> low</div>
        <div className={styles.legendItem}><span className={styles.legendSwatch + ' ' + styles.level2}></span> moderate</div>
        <div className={styles.legendItem}><span className={styles.legendSwatch + ' ' + styles.level3}></span> good</div>
        <div className={styles.legendItem}><span className={styles.legendSwatch + ' ' + styles.level4}></span> excellent</div>
      </div>
    </div>
  )
}
