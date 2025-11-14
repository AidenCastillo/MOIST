"use client";
// Overall probe summary page
import SideBar from '@/app/components/SideBar';
import React from 'react';

import { useEffect, useState } from 'react';

import styles from './ProbesPage.module.css';

// load probe data from localStorage
function loadProbes(): Array<{
    id: number;
    x: number;
    y: number;
    data?: {
        hydration: number;
        soilMoisture: number;
        temperature: number;
    };
}> {
    const stored = localStorage.getItem('demoProbes');
    if (!stored) {
        return [];
    }
    try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            return parsed as unknown as Array<{
                id: number;
                x: number;
                y: number;
                data?: {
                    hydration: number;
                    soilMoisture: number;
                    temperature: number;
                };
            }>;
        }
    } catch (error) {
        console.error('failed to parse demoProbes from localStorage:', error);
    }
    return [];
}

export default function ProbesPage() {
  return (
    <div className={styles.probesPage}>
        {/* <SideBar /> */}
        <h1>Irrigation Probes Overview</h1>
        <p>This page will provide a summary of all irrigation probes.</p>
        <div className={styles.probesGrid}>
            {loadProbes().map((probe) => (
                <div key={probe.id} className={styles.probeCard}>
                    <h2>Probe ID: {probe.id}</h2>
                    <p>Hydration: {probe.data?.hydration}%</p>
                    <p>Soil Moisture: {probe.data?.soilMoisture}%</p>
                    <p>Temperature: {probe.data?.temperature}°C</p>
                    <button className={styles.waterButton} onClick={() => {
                        // water the probe
                        // update the probe data in localStorage
                        const probes = loadProbes();
                        const updatedProbes = probes.map((p) => {
                            if (p.id === probe.id) {
                                return {
                                    ...p,
                                    data: {
                                        ...p.data,
                                        hydration: 100
                                    }
                                };
                            }
                            return p;
                        });
                        localStorage.setItem('demoProbes', JSON.stringify(updatedProbes));
                        // trigger a re-render
                        window.location.reload();
                    }}>Water now</button>
                </div>
            ))}
        </div>
    </div>
  );
}
