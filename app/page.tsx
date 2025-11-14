"use client";
import React from "react";
import { useEffect } from "react";
// Small landing page that explains what MOIST is about and links to the dashboard
// load example probe data for demo purposes so the dashboard is not empty
// formate { id: 1, x: 20, y: 30, data: { hydration: 70, soilMoisture: 40, temperature: 22 } }
function loadDemoDataClientSide() {
  const demoProbes = [
    { id: 1, x: 20, y: 30, data: { hydration: 75, soilMoisture: 60, temperature: 22 } },
    { id: 2, x: 50, y: 60, data: { hydration: 80, soilMoisture: 65, temperature: 24 } },
    { id: 3, x: 80, y: 20, data: { hydration: 90, soilMoisture: 30, temperature: 20 } },
  ];
  try { localStorage.setItem("demoProbes", JSON.stringify(demoProbes)); } catch {}
}

export default function Home() {
  useEffect(() => {
    loadDemoDataClientSide();
  }, []);
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to MOIST</h1>
      <p>Your solution for monitoring and managing irrigation probes on farmland.</p>
      <a href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Dashboard
      </a>
    </div>
  );
}
