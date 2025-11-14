"use client";

import { useEffect, useState } from "react";
import style from './ProbeMenu.module.css';

export default function ProbeMenu({ data, onClose }: { data: { hydration: number; soilNutrience: number; temperature: number } | null; onClose: () => void }) {
    if (!data) return null;
    return (
        <div className={style.probeMenu}>
            <button className={style.moveHandle} onMouseDown={moveMenu()}>&#x2630;</button>
            <h2>Probe Data</h2>
            <p>Hydration: {data.hydration}%</p>
            <p>Soil Nutrience: {data.soilNutrience}%</p>
            <p>Temperature: {data.temperature}°C</p>
            <button className={style.closeButton} onClick={onClose}>Close</button>
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
