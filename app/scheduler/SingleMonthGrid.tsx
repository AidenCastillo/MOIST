"use client";
import React from 'react';
import styles from './SingleMonthGrid.module.css';

type ProbeReading = { id: number; soilMoisture: number; temperature: number };

function seededRandom(seed:number){
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function makeDayDetail(seed:number){
  // deterministic fake detail
  const waterLiters = Math.round((seed % 7 + 1) * (seed % 13 + 1) * 2);
  const probes: ProbeReading[] = [];
  const count = (seed % 3) + 1;
  for(let i=0;i<count;i++){
    const s = seededRandom(seed * (i+1) + 31);
    probes.push({ id: i+1, soilMoisture: Math.round(20 + s * 70), temperature: Math.round(10 + seededRandom(seed + i) * 25) });
  }
  return { waterLiters, probes };
}

export default function SingleMonthGrid({ year, month }:{ year?:number; month?:number }){
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth();
  const days = new Date(y, m+1, 0).getDate();

  const [selected, setSelected] = React.useState<number | null>(null);

  const cells = React.useMemo(()=>{
    const arr = [] as {day:number, level:number, detail:ReturnType<typeof makeDayDetail>}[];
    for(let d=1; d<=days; d++){
      const seed = y*10000 + (m+1)*100 + d;
      const level = Math.min(4, Math.floor(seededRandom(seed*7 + 13) * 5));
      const detail = makeDayDetail(seed);
      arr.push({ day:d, level, detail });
    }
    return arr;
  },[y,m,days]);

  const close = ()=> setSelected(null);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Month Detail (click a day)</h3>
      <div className={styles.grid} role="grid" aria-label="Month watering grid">
        {cells.map((c, idx) => (
          <div key={idx}
            role="gridcell"
            tabIndex={0}
            onClick={()=> setSelected(idx)}
            onKeyDown={(e)=> { if(e.key === 'Enter' || e.key === ' ') setSelected(idx); }}
            title={`Day ${c.day}: water ${c.detail.waterLiters}L`}
            className={`${styles.cell} ${styles['level'+c.level as keyof typeof styles]}`}
          >
            {c.day}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>Day {cells[selected].day} details</h4>
              <div>
                <button className="btn closeBtn" onClick={close}>Close</button>
              </div>
            </div>
            <div className={styles.modalBody}>
              <p><strong>Water volume:</strong> {cells[selected].detail.waterLiters} L</p>
              <p><strong>Probe readings:</strong></p>
              <ul className={styles.probeList}>
                {cells[selected].detail.probes.map((p:ProbeReading)=> (
                  <li key={p.id}>Probe {p.id}: soil {p.soilMoisture}% — {p.temperature}°C</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
