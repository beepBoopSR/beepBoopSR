// App.jsx (Sandbox Offline Preview Mode)
import React, { useState, useEffect } from 'react';

const SURINAME_EBS_TARIFF = 1.47; // SRD per kWh

export default function App() {
  // Set up mock initial dashboard data
  const [reading, setReading] = useState({
    voltage: 115,
    circuit_1_w: 240,
    circuit_2_w: 110,
    circuit_3_w: 45,
    circuit_4_w: 0
  });

  const [tip, setTip] = useState([
    "Zet de inverter airco (Circuit 1) overdag op 24°C in plaats van 18°C om direct tot 30% op uw EBS-factuur te besparen.",
    "Sluipverbruik gedetecteerd in de keuken (Circuit 2) rond 02:00u s nachts. Overweeg een slimme tijdschakelaar voor de hydrofoorpomp."
  ]);

  const [isSimulating, setIsSimulating] = useState(true);

  // Automatically simulate moving numbers every 3 seconds so it looks live!
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setReading(prev => ({
        voltage: Math.floor(Math.random() * (117 - 113 + 1)) + 113,
        circuit_1_w: Math.max(0, prev.circuit_1_w + Math.floor(Math.random() * 41) - 20),
        circuit_2_w: Math.max(0, prev.circuit_2_w + Math.floor(Math.random() * 21) - 10),
        circuit_3_w: Math.max(0, prev.circuit_3_w + Math.floor(Math.random() * 11) - 5),
        circuit_4_w: 0
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Derive mathematical computations for pitch metrics
  const cumulativeWatts = reading.circuit_1_w + reading.circuit_2_w + reading.circuit_3_w + reading.circuit_4_w;
  const continuousKw = cumulativeWatts / 1000;
  const projectedHourlyCostSrd = continuousKw * SURINAME_EBS_TARIFF;
  const projectedMonthlyCostSrd = projectedHourlyCostSrd * 24 * 30;

  return (
    <div style={styles.container}>
      {/* Pitch Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={styles.logo}>⚡ beepBoop <span style={styles.badge}>Suriname Energy Hub</span></h1>
            <p style={styles.subtitle}>Real-time IoT grid observation and localized optimization algorithms</p>
          </div>
          {/* Visual Indicator for presentation mode */}
          <div style={{ padding: '8px 12px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {isSimulating ? "🔄 Live Demo Modus Actief" : "⏸️ Demo Gepauzeerd"}
          </div>
        </div>
      </header>

      {/* Main Presentation Metrics Matrix */}
      <div style={styles.grid}>
        {/* Core Live Gauge */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🔴 Live Ingestion Matrix</h2>
          <div style={styles.bigStat}>{cumulativeWatts.toLocaleString()} <span style={styles.unit}>W</span></div>
          <p style={styles.label}>Total Demand Across 4 Clamps</p>
          <div style={styles.divider} />
          <div style={styles.subFlex}>
            <div><strong>Grid Voltage:</strong> {reading.voltage}V</div>
            <div><strong>Status:</strong> <span style={styles.online}>Online</span></div>
          </div>
        </section>

        {/* Financial Projections Container */}
        <section style={{...styles.card, borderColor: '#059669'}}>
          <h2 style={{...styles.cardTitle, color: '#059669'}}>💰 Financial Forecasting</h2>
          <div style={styles.bigStat}>SRD {projectedMonthlyCostSrd.toFixed(2)}</div>
          <p style={styles.label}>Projected Monthly Consumption (EBS Tariff Split)</p>
          <div style={styles.divider} />
          <p style={styles.miniLabel}>Current rate benchmark: <strong>SRD {projectedHourlyCostSrd.toFixed(2)} / uur</strong></p>
        </section>
      </div>

      {/* Circuit Breakdown Matrix Table */}
      <section style={styles.sectionCard}>
        <h2 style={styles.cardTitle}>📊 Sub-Circuit Telemetry Channels</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Circuit Line</th>
              <th style={styles.th}>Active Load (W)</th>
              <th style={styles.th}>Monthly Cap Goal</th>
              <th style={styles.th}>System State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>⚡ Circuit 1: Inverter AC System</td>
              <td style={styles.td}>{reading.circuit_1_w} W</td>
              <td style={styles.td}>200 W</td>
              <td style={styles.td}>
                {(reading.circuit_1_w > 200) ? <span style={styles.danger}>Cap Exceeded</span> : <span style={styles.safe}>Nominal</span>}
              </td>
            </tr>
            <tr>
              <td style={styles.td}>🍳 Circuit 2: Kitchen Infrastructure & Hydrofoor</td>
              <td style={styles.td}>{reading.circuit_2_w} W</td>
              <td style={styles.td}>150 W</td>
              <td style={styles.td}>
                {(reading.circuit_2_w > 150) ? <span style={styles.danger}>Cap Exceeded</span> : <span style={styles.safe}>Nominal</span>}
              </td>
            </tr>
            <tr>
              <td style={styles.td}>💡 Circuit 3: Main Illumination & Outlets</td>
              <td style={styles.td}>{reading.circuit_3_w} W</td>
              <td style={styles.td}>80 W</td>
              <td style={styles.td}>
                {(reading.circuit_3_w > 80) ? <span style={styles.danger}>Cap Exceeded</span> : <span style={styles.safe}>Nominal</span>}
              </td>
            </tr>
            <tr>
              <td style={styles.td}>⚙️ Circuit 4: Generator Transfer Switch / Heavy Loads</td>
              <td style={styles.td}>{reading.circuit_4_w} W</td>
              <td style={styles.td}>400 W</td>
              <td style={styles.td}>
                {(reading.circuit_4_w > 400) ? <span style={styles.danger}>Cap Exceeded</span> : <span style={styles.safe}>Nominal</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Claude AI Expert Analytics Pane */}
      <section style={{...styles.sectionCard, backgroundColor: '#fef3c7', borderColor: '#d97706'}}>
        <h2 style={{...styles.cardTitle, color: '#b45309'}}>🧠 Claude 3.5 Sonnet — Live Advisory Engine</h2>
        <ul style={styles.tipList}>
          {tip.map((sentence, idx) => (
            <li key={idx} style={styles.tipItem}>💡 {sentence}</li>
          ))}
        </ul>
      </section>

      {/* Pitch Features Section Roadmap Showcase */}
      <section style={styles.sectionCard}>
        <h2 style={styles.cardTitle}>🚀 Platform Value Propositions (Pitch Deck Features)</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureItem}>
            <h4>⚠️ Phase Shift Alerting</h4>
            <p>Monitors voltage drops or load spikes on your circuits to protect sensitive appliances like inverter ACs from damage.</p>
          </div>
          <div style={styles.featureItem}>
            <h4>📊 Automated EBS Invoicing Simulator</h4>
            <p>Calculates your current consumption tier in real time, showing you exactly how much your bill will be before the paper invoice arrives.</p>
          </div>
          <div style={styles.featureItem}>
            <h4>🔋 Generator Smart-Toggle Analytics</h4>
            <p>Detects when your system switches to backup power, automatically tracking generator fuel efficiency and load balancing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '1100px', margin: '0 auto', padding: '30px', color: '#1f2937', backgroundColor: '#ffffff' },
  header: { borderBottom: '3px solid #e5e7eb', paddingBottom: '20px', marginBottom: '30px' },
  logo: { fontSize: '2.4rem', color: '#1e3a8a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' },
  badge: { fontSize: '0.9rem', backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '12px' },
  subtitle: { color: '#6b7280', fontSize: '1.1rem', marginTop: '6px' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '25px' },
  card: { flex: '1 1 350px', padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  sectionCard: { padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  cardTitle: { fontSize: '1.3rem', margin: '0 0 15px 0', color: '#1e3a8a' },
  bigStat: { fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-1px', color: '#111827' },
  unit: { fontSize: '1.5rem', color: '#9ca3af' },
  label: { color: '#6b7280', margin: '5px 0 0 0', fontSize: '0.95rem' },
  miniLabel: { color: '#374151', margin: 0 },
  divider: { height: '1px', backgroundColor: '#e5e7eb', margin: '20px 0' },
  subFlex: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' },
  online: { color: '#059669', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  thRow: { borderBottom: '2px solid #e5e7eb', textAlign: 'left' },
  th: { padding: '12px', color: '#4b5563', fontWeight: '600' },
  td: { padding: '12px', borderBottom: '1px solid #f3f4f6', color: '#374151' },
  danger: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' },
  safe: { backgroundColor: '#d1fae5', color: '#059669', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' },
  tipList: { margin: 0, paddingLeft: '20px' },
  tipItem: { fontSize: '1.1rem', color: '#78350f', marginBottom: '10px', lineHeight: '1.5', listStyleType: 'none' },
  featureGrid: { display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '15px' },
}
