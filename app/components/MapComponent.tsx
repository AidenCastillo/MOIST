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
        soilNutrience: number;
        temperature: number;
    };
}

function ProbeComponent({ id, x, y, data }: Probe) {
    // use styles from MapComponent.module.css
    const probeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (probeRef.current) {
            // guard for possibly-missing data coming from localStorage
            const safe = data ?? { hydration: 0, soilNutrience: 0, temperature: 0 };
            probeRef.current.title = `Hydration: ${safe.hydration}%, Soil Nutrience: ${safe.soilNutrience}%, Temperature: ${safe.temperature}°C`;
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

function addProbe() {
    // add a new probe at given postion by prompting user to click on map
    const mapElement = document.querySelector(`.${styles.mapContainer}`) as HTMLElement | null;
    if (!mapElement) return;
    const handleClick = (event: MouseEvent) => {
        const rect = mapElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        // add probe to localStorage
        try {
            const stored = localStorage.getItem('demoProbes');
            let probes: Probe[] = [];
            if (stored) {
                const parsed = JSON.parse(stored) as unknown;
                if (Array.isArray(parsed)) {
                    probes = parsed.map((p: unknown, i: number) => {
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
                                hydration: typeof dataObj.hydration === 'number' ? (dataObj.hydration as number) : 50,
                                soilNutrience: typeof dataObj.soilNutrience === 'number' ? (dataObj.soilNutrience as number) : 50,
                                temperature: typeof dataObj.temperature === 'number' ? (dataObj.temperature as number) : 20,
                            }
                        } as Probe;
                    });
                }
            }
            probes.push({ id: probes.length + 1, x, y, data: { hydration: 50, soilNutrience: 50, temperature: 20 } });
            localStorage.setItem('demoProbes', JSON.stringify(probes));
        } catch (error) {
            console.error('Failed to add probe:', error);
        }
        // cleanup
        mapElement.removeEventListener('click', handleClick);
        mapElement.style.cursor = 'default';
        // refresh the page to show the new probe
        window.location.reload();
    };
    mapElement.style.cursor = 'crosshair';
    mapElement.addEventListener('click', handleClick);

    

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

    // client-only probe loading: read localStorage inside an effect to avoid SSR issues
    const [probes, setProbes] = useState<Probe[]>([]);

    useEffect(() => {
        const demo: Probe[] = [
            { id: 1, x: 20, y: 30, data: { hydration: 78, soilNutrience: 42, temperature: 22 } },
            { id: 2, x: 50, y: 50, data: { hydration: 53, soilNutrience: 36, temperature: 19 } },
            { id: 3, x: 75, y: 20, data: { hydration: 61, soilNutrience: 44, temperature: 20 } }
        ];

        try {
            const stored = localStorage.getItem('demoProbes');
            if (!stored) {
                localStorage.setItem('demoProbes', JSON.stringify(demo));
                setTimeout(() => setProbes(demo), 0);
                return;
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
                            soilNutrience: typeof dataObj.soilNutrience === 'number' ? (dataObj.soilNutrience as number) : 0,
                            temperature: typeof dataObj.temperature === 'number' ? (dataObj.temperature as number) : 0,
                        }
                    } as Probe;
                });
                // ensure localStorage is normalized as well
                try { localStorage.setItem('demoProbes', JSON.stringify(normalized)); } catch {}
                // defer state update to avoid calling setState synchronously inside the effect
                setTimeout(() => setProbes(normalized), 0);
                return;
            }
        } catch (error) {
            console.error('failed to read demoProbes from localStorage:', error);
        }

        // fallback
        try { localStorage.setItem('demoProbes', JSON.stringify(demo)); } catch {}
        setTimeout(() => setProbes(demo), 0);
    }, []);

    return (
        <div ref={mapRef} className={styles.mapContainer}>
            <div className={styles.addProbe}>
                <button onClick={() => addProbe()}>+ Add Probe</button>
            </div>
            {probes.map((probe) => (
                <ProbeComponent key={probe.id} {...probe} />
            ))}
        </div>
    );
}
