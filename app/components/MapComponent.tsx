"use client";

import { useEffect, useRef, useState } from 'react';
import ProbeMenu from './probeMenu';
import React from 'react';

import styles from './MapComponent.module.css';

// using farm-land.jpg from public folder as map
// when probe is clicked, a menu should open showing probe data

function ProbeComponent({ id, x, y, data }: { id: number; x: number; y: number; data: { hydration: number; soilMoisture: number; temperature: number } }) {
    // use styles from MapComponent.module.css
    const probeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (probeRef.current) {
            probeRef.current.title = `Hydration: ${data.hydration}%, Soil Moisture: ${data.soilMoisture}%, Temperature: ${data.temperature}°C`;
        }
    }, [x, y, data]);
    return (
        <div ref={probeRef} className={styles.probeMarker} style={{ left: `${x}%`, top: `${y}%` }}>
            {/* have probe number */}
            <button onClick={() => openProbeMenu()}>{id}</button>
        </div>
    );
    function openProbeMenu() {
        // open probeMenu.tsx
        const menuContainer = document.createElement('div');
        document.body.appendChild(menuContainer);
        const closeMenu = () => {
            document.body.removeChild(menuContainer);
        }
        
        import('react-dom/client').then((ReactDOM) => {
            const root = ReactDOM.createRoot(menuContainer);
            root.render(<ProbeMenu data={data} onClose={closeMenu} />);
        });

    }
}

export default function MapComponent() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            // load map image
            const img = document.createElement('img');
            img.src = '/farm-land.jpg';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            mapRef.current.appendChild(img);
        }
        
    }, []);

    // Sample probe data
    const probes = [
        { id: 1, x: 20, y: 30, data: { hydration: 70, soilMoisture: 40, temperature: 22 } },
        { id: 2, x: 50, y: 60, data: { hydration: 50, soilMoisture: 60, temperature: 25 } },
        { id: 3, x: 80, y: 20, data: { hydration: 90, soilMoisture: 30, temperature: 20 } },
    ];

    return (
        <div ref={mapRef} className={styles.mapContainer}>
            {probes.map((probe, index) => (
                <ProbeComponent key={index} {...probe} />
            ))}
        </div>
    );
}
