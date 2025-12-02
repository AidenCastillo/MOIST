"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import styles from './page.module.css';
// Small landing page that explains what MOIST is about and links to the dashboard
// load example probe data for demo purposes so the dashboard is not empty
// formate { id: 1, x: 20, y: 30, data: { hydration: 70, soilNutrience: 40, temperature: 22 } }
function loadDemoDataClientSide() {
  const demoProbes = [
    { id: 1, x: 20, y: 30, data: { hydration: 75, soilNutrience: 60, temperature: 22 } },
    { id: 2, x: 50, y: 60, data: { hydration: 80, soilNutrience: 65, temperature: 24 } },
    { id: 3, x: 80, y: 20, data: { hydration: 90, soilNutrience: 30, temperature: 20 } },
  ];
  try { localStorage.setItem("demoProbes", JSON.stringify(demoProbes)); 
    localStorage.setItem("demoProbeHistory", JSON.stringify([]));
  } catch {}
}

export default function Home() {
  useEffect(() => {
    loadDemoDataClientSide();
  }, []);
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <Image src="/moist-complex.png" alt="MOIST Logo" width={150} height={150} className={styles.heroImage} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Welcome to MOIST</h1>
          <p className={styles.lead}>We strive to help your farms; fast, friendly, and with your future in mind. We are aiming to prevent water waste and promote sustainable agriculture.</p>
          <a href="/dashboard" className={styles.cta}>Go to Dashboard</a>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2>Installation</h2>
          <p className={styles.small}>Farmers install MOIST irrigation probes on their fields. They will continuously measure environmental factors such as:</p>
          <ul className={styles.installationList}>
            <li>Soil moisture levels</li>
            <li>Temperature</li>
            <li>Sunlight exposure</li>
            <li>Nutrient levels</li>
          </ul>
          <p className={styles.small}>Collected data is transmitted to the MOIST dashboard at moist-mu.vercel.app, where farmers can view real-time data about their land.</p>
        </section>

        <section className={styles.section}>
          <h2>Dashboard Features</h2>
          <ul className={styles.featuresList}>
            <li><strong>Weather Forecast</strong> – View rainfall or temperature changes to optimize irrigation schedules.</li>
            <li><strong>Watering Scheduler</strong> – Reminders for irrigation based on soil conditions and weather predictions.</li>
            <li><strong>Farm Overview</strong> – View your farmland from above based on satellite data, and accurately view where your probes are located.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Gamified Leaderboard</h2>
          <p className={styles.small}>To encourage sustainable practices, MOIST has incorporated a gamified leaderboard system. Based on their water/fertilizer conservation efforts and consistently following safe agricultural practices, users are ranked against each other:</p>
          <ul className={styles.leaderboardList}>
            <li>Top performers can earn sponsorships or grants from organizations.</li>
            <li>Any farm can win, as long as they are demonstrating responsible agricultural practices and minimizing waste.</li>
          </ul>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>By combining real-time monitoring, predictive tools, and gamified incentives, MOIST helps farmers reduce unnecessary water consumption and increase crop efficiency.</p>
      </footer>
    </main>
  );
}
