"use client";
import React from 'react';
import styles from './SchedulerPage.module.css'

interface ProbeHistoryEntry {
    id: number;
    action: 'watered' | string;
    timestamp: number;
}

function RecommendationCard() {
    const recommendations = [
        "Water the plants if the soil moisture is below 30%",
        "Check the weather forecast for rain",
        "Adjust the watering schedule based on plant growth"
    ];
    return (
        <div className={styles.recommendationCard}>
            <h2>Recommendation</h2>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
}

function History() {
    // local storage key: demoProbeHistory
    const [history, setHistory] = React.useState<ProbeHistoryEntry[]>([]);
    
    React.useEffect(() => {
        try {
            const stored = localStorage.getItem('demoProbeHistory');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setHistory(parsed);
                }
            }
        } catch (error) {
            console.error('Failed to parse demoProbeHistory from localStorage:', error);
        }
    }, []);

    return (
        <div className={styles.history}>
            <h2>History</h2>
            {history.length === 0 ? (
                <p>No history available.</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{`Probe ID: ${entry.id}, Action: ${entry.action}, Timestamp: ${new Date(entry.timestamp).toLocaleString()}`}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function ScheduleCard() {
    // Simulated schedule card for demonstration purposes
    const [nextWatering, setNextWatering] = React.useState<Date | null>(null);

    React.useEffect(() => {
        setNextWatering(new Date(Date.now() + 3600000));
    }, []);

    return (
        <div className={styles.scheduleCard}>
            <h2>Schedule</h2>
            <p>Next watering scheduled for: {nextWatering ? nextWatering.toLocaleString() : 'Loading...'}</p>
            <p>Current schedule: Every 1 hour</p>
        </div>
    );
}

export default function SchedulerPage() {
    return (
        <div className={styles.schedulerPage}>
            <h1>Scheduler Page</h1>
            <RecommendationCard />
            <ScheduleCard />
            <History />
        </div>
    );
}
