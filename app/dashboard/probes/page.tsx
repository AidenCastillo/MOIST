// Overall probe summary page
import SideBar from '@/app/components/SideBar';
import React from 'react';

import styles from './ProbesPage.module.css';


export default function ProbesPage() {
  return (
    <div className={styles.probesPage}>
        {/* <SideBar /> */}
        <h1>Irrigation Probes Overview</h1>
        <p>This page will provide a summary of all irrigation probes.</p>
    </div>
  );
}
