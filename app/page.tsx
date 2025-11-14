"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
// Small landing page that explains what MOIST is about and links to the dashboard
// load example probe data for demo purposes so the dashboard is not empty
// formate { id: 1, x: 20, y: 30, data: { hydration: 70, soilNutrience: 40, temperature: 22 } }
function loadDemoDataClientSide() {
  const demoProbes = [
    { id: 1, x: 20, y: 30, data: { hydration: 75, soilNutrience: 60, temperature: 22 } },
    { id: 2, x: 50, y: 60, data: { hydration: 80, soilNutrience: 65, temperature: 24 } },
    { id: 3, x: 80, y: 20, data: { hydration: 90, soilNutrience: 30, temperature: 20 } },
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
      <p>We strive to help your farms; fast, friendly, and with your future in mind.</p>
      <Image src="/moist-complex.png" alt="MOIST Logo" width={150} height={150} style={{ marginTop: '1rem', display: 'block', margin: '0 auto' }} />
      <a href="/dashboard" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        Go to Dashboard
      </a>
    </div>
  );
}
