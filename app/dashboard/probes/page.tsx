"use client";
// Overall probe summary page
import React from 'react';
import { useEffect, useState } from 'react';

import styles from './ProbesPage.module.css';

// client-side probe summary page — read localStorage inside an effect
interface ProbeType {
    id: number;
    x: number;
    y: number;
    data?: { hydration: number; soilMoisture: number; temperature: number };
}

export default function ProbesPage() {
    const [probes, setProbes] = useState<ProbeType[]>([]);

    useEffect(() => {
        const demo: ProbeType[] = [
            { id: 1, x: 20, y: 30, data: { hydration: 75, soilMoisture: 60, temperature: 22 } },
            { id: 2, x: 50, y: 60, data: { hydration: 80, soilMoisture: 65, temperature: 24 } },
            { id: 3, x: 80, y: 20, data: { hydration: 90, soilMoisture: 30, temperature: 20 } },
        ];

        try {
            const stored = localStorage.getItem('demoProbes');
            if (!stored) {
                localStorage.setItem('demoProbes', JSON.stringify(demo));
                // defer update to avoid synchronous setState in effect
                setTimeout(() => setProbes(demo), 0);
                return;
            }
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                setTimeout(() => setProbes(parsed as ProbeType[]), 0);
                return;
            }
        } catch (error) {
            console.error('failed to parse demoProbes from localStorage:', error);
        }
        setTimeout(() => setProbes(demo), 0);
    }, []);

    const waterProbe = (id: number) => {
        const updated = probes.map(p => {
            if (p.id === id) {
                const newData = {
                    hydration: 100,
                    soilMoisture: p.data?.soilMoisture ?? 0,
                    temperature: p.data?.temperature ?? 0,
                };
                return { ...p, data: newData };
            }
            return p;
        });
        try { localStorage.setItem('demoProbes', JSON.stringify(updated)); } catch {}
        setProbes(updated);
    };

    return (
        <div className={styles.probesPage}>
            {/* <SideBar /> */}
            <h1>Irrigation Probes Overview</h1>
            <p>This page will provide a summary of all irrigation probes.</p>
            <div className={styles.probesGrid}>
                {probes.map((probe) => (
                    <div key={probe.id} className={styles.probeCard}>
                        <h2>Probe ID: {probe.id}</h2>
                        <p>Hydration: {probe.data?.hydration}%</p>
                        <p>Soil Moisture: {probe.data?.soilMoisture}%</p>
                        <p>Temperature: {probe.data?.temperature}°C</p>
                        <button className={styles.waterButton} onClick={() => waterProbe(probe.id)}>Water now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
