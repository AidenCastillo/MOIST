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
    data?: { hydration: number; soilNutrience: number; temperature: number };
}

interface ProbeHistoryEntry {
    id: number;
    action: 'watered' | string;
    timestamp: number;
}

export default function ProbesPage() {
    const [probes, setProbes] = useState<ProbeType[]>([]);

    useEffect(() => {
        const demo: ProbeType[] = [
            { id: 1, x: 20, y: 30, data: { hydration: 75, soilNutrience: 60, temperature: 22 } },
            { id: 2, x: 50, y: 60, data: { hydration: 80, soilNutrience: 65, temperature: 24 } },
            { id: 3, x: 80, y: 20, data: { hydration: 90, soilNutrience: 30, temperature: 20 } },
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
                    soilNutrience: p.data?.soilNutrience ?? 0,
                    temperature: p.data?.temperature ?? 0,
                };
                // defer history update to avoid blocking UI
                setTimeout(() => {
                    try {
                        const parsed = JSON.parse(localStorage.getItem('demoProbeHistory') || '[]');
                        const existing = Array.isArray(parsed) ? (parsed as ProbeHistoryEntry[]) : [] as ProbeHistoryEntry[];
                        existing.push({ id, action: 'watered', timestamp: Date.now() });
                        localStorage.setItem('demoProbeHistory', JSON.stringify(existing));
                    } catch {}
                }, 0);
                return { ...p, data: newData };
            }
            return p;
        });
        setProbes(updated);
        localStorage.setItem('demoProbes', JSON.stringify(updated));
    };

    return (
        <div className={styles.probesPage}>
            {/* <SideBar /> */}
            <h1>Irrigation Probes Overview</h1>
            <p>This page will provide a summary of all irrigation probes.</p>
            <div className={styles.OverviewSection}>
                <h2>Overall Summary</h2>
                <p>Total Probes: {probes.length}</p>
                <p>
                    Average Hydration: {probes.length > 0 ? (probes.reduce((sum, p) => sum + (p.data?.hydration ?? 0), 0) / probes.length).toFixed(2) : 'N/A'}%
                </p>
                <p>
                    Average Soil Nutrience: {probes.length > 0 ? (probes.reduce((sum, p) => sum + (p.data?.soilNutrience ?? 0), 0) / probes.length).toFixed(2) : 'N/A'}%
                </p>
                <p>
                    Average Temperature: {probes.length > 0 ? (probes.reduce((sum, p) => sum + (p.data?.temperature ?? 0), 0) / probes.length).toFixed(2) : 'N/A'}°C
                </p>
            </div>
            <div className={styles.probesGrid}>
                {probes.map((probe) => (
                    <div key={probe.id} className={styles.probeCard}>
                        <h2>Probe ID: {probe.id}</h2>
                        <p>Hydration: {probe.data?.hydration}%</p>
                        <p>Soil Nutrience: {probe.data?.soilNutrience}%</p>
                        <p>Temperature: {probe.data?.temperature}°C</p>
                        <button className={styles.waterButton} onClick={() => waterProbe(probe.id)}>Water now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
