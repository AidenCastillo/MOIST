"use client";

import { useEffect, useState } from "react";

export default function ProbeMenu({ data, onClose }: { data: { hydration: number; soilMoisture: number; temperature: number } | null; onClose: () => void }) {
    if (!data) return null;
    return (
        <div style={{ position: 'absolute', top: '10%', left: '10%', backgroundColor: 'white', padding: '20px', border: '1px solid black', zIndex: 1000, color: 'black' }}>
            <button style={{ position: 'absolute', top: '5px', right: '5px' }} onMouseDown={moveMenu()}>&#x2630;</button>
            <h2>Probe Data</h2>
            <p>Hydration: {data.hydration}%</p>
            <p>Soil Moisture: {data.soilMoisture}%</p>
            <p>Temperature: {data.temperature}°C</p>
            <button onClick={onClose}>Close</button>
        </div>
    );

    // click once to move, click again to stop moving
    function moveMenu() {
        return (e: React.MouseEvent) => {
            e.stopPropagation();
            const menu = e.currentTarget.parentElement as HTMLDivElement;
            if (!menu) return;
            let isMoving = false;
            const onMouseMove = (e: MouseEvent) => {
                if (isMoving) {
                    menu.style.left = `${e.clientX - offsetX}px`;
                    menu.style.top = `${e.clientY - offsetY}px`;
                }
            }
            let offsetX = e.clientX - menu.getBoundingClientRect().left;
            let offsetY = e.clientY - menu.getBoundingClientRect().top;
            const onMouseUp = () => {
                isMoving = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            if (!isMoving) {
                isMoving = true;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            } else {
                onMouseUp();
            }
        }
    }
}
