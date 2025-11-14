// Where user will be able to view their irrigation probes on a farm land map.
// Will need a map component and a sidebar for navigation. will do inline for now.
// Probes will provide data such as hydration levels, soil moisture, and temperature.
import React from 'react';

// const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
import MapComponent from '../components/MapComponent';
import SideBar from '../components/SideBar';

import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
        {/* <SideBar /> */}
        <h1>Farm Land Irrigation Dashboard</h1>
        <p>View and monitor your irrigation probes on the map below.</p>
        <MapComponent />
    </div>
  );
}
