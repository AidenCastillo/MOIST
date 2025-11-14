"use client";

import { useEffect, useRef, useState } from 'react';
import ProbeMenu from './probeMenu';
import React from 'react';

import styles from './MapComponent.module.css';

// using farm-land.jpg from public folder as map
// when probe is clicked, a menu should open showing probe data

interface Probe {
    id: number;
    x: number;
    y: number;
    data?: {
        hydration: number;
        soilMoisture: number;
        temperature: number;
    };
}

function ProbeComponent({ id, x, y, data }: Probe) {
    // use styles from MapComponent.module.css
    const probeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (probeRef.current) {
            // guard for possibly-missing data coming from localStorage
            const safe = data ?? { hydration: 0, soilMoisture: 0, temperature: 0 };
            probeRef.current.title = `Hydration: ${safe.hydration}%, Soil Moisture: ${safe.soilMoisture}%, Temperature: ${safe.temperature}°C`;
        }
    }, [x, y, data]);
    return (
        <div ref={probeRef} className={styles.probeMarker} style={{ left: `${x}%`, top: `${y}%` }}>
            <button onClick={() => openProbeMenu()}>{id}</button>
        </div>
    );
    function openProbeMenu() {
        // open probeMenu.tsx
        // if already open close and reopen with new data
        const existingMenu = document.querySelector('#probe-menu-container');
        if (existingMenu) {
            document.body.removeChild(existingMenu);
        }
        const menuContainer = document.createElement('div');
        menuContainer.id = 'probe-menu-container';
        document.body.appendChild(menuContainer);
        const closeMenu = () => {
            document.body.removeChild(menuContainer);
        }
        
        import('react-dom/client').then((ReactDOM) => {
            const root = ReactDOM.createRoot(menuContainer);
            // ProbeMenu expects data or null — pass null when missing
            root.render(<ProbeMenu data={data ?? null} onClose={closeMenu} />);
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

    // initialize probes from localStorage 'demoProbes' using lazy state initializer
    const probes = useState<Probe[]>(() => {
        const demo: Probe[] = [
            { id: 1, x: 20, y: 30, data: { hydration: 78, soilMoisture: 42, temperature: 22 } },
            { id: 2, x: 50, y: 50, data: { hydration: 53, soilMoisture: 36, temperature: 19 } },
            { id: 3, x: 75, y: 20, data: { hydration: 61, soilMoisture: 44, temperature: 20 } }
        ];

        try {
            const stored = localStorage.getItem('demoProbes');
            if (!stored) {
                localStorage.setItem('demoProbes', JSON.stringify(demo));
                return demo;
            }

            const parsed = JSON.parse(stored) as unknown;
            if (Array.isArray(parsed)) {
                const normalized: Probe[] = parsed.map((p: unknown, i: number) => {
                    const obj = (p as Record<string, unknown>) || {};
                    const id = typeof obj.id === 'number' ? (obj.id as number) : i + 1;
                    const x = typeof obj.x === 'number' ? (obj.x as number) : 10 * (i + 1);
                    const y = typeof obj.y === 'number' ? (obj.y as number) : 10 * (i + 1);
                    const dataObj = (obj.data as Record<string, unknown>) || {};
                    return {
                        id,
                        x,
                        y,
                        data: {
                            hydration: typeof dataObj.hydration === 'number' ? (dataObj.hydration as number) : 0,
                            soilMoisture: typeof dataObj.soilMoisture === 'number' ? (dataObj.soilMoisture as number) : 0,
                            temperature: typeof dataObj.temperature === 'number' ? (dataObj.temperature as number) : 0,
                        }
                    } as Probe;
                });
                // ensure localStorage is normalized as well
                localStorage.setItem('demoProbes', JSON.stringify(normalized));
                return normalized;
            }
        } catch (error) {
            // log and fallthrough to demo
            console.error('failed to read demoProbes from localStorage:', error);
        }

        // fallback
        try {
            localStorage.setItem('demoProbes', JSON.stringify(demo));
        } catch {
            // ignore write failures
        }
        return demo;
    })[0];

    return (
        <div ref={mapRef} className={styles.mapContainer}>
            {probes.map((probe) => (
                <ProbeComponent key={probe.id} {...probe} />
            ))}
        </div>
    );
}
