import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, User, Bell, Info, Shield, Wifi, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Domain Components
import Sidebar from './components/Sidebar';
import SensorCard from './components/Dashboard/SensorCard';
import RFIDScanner from './components/Scanner/RFIDScanner';

// Services & Types
import { petDatabase, healthHistory } from './services/mockData';
import { SensorData, PetProfile } from './types';

// Styles
import './App.css';

const App: React.FC = () => {
  // State
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: '--',
    heartRate: '--',
    rfid: 'None',
    rfidStatus: 'INACTIVE',
    rfidActive: false
  });
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [esp32IP, setEsp32IP] = useState<string>('10.209.67.103');
  const [currentPet, setCurrentPet] = useState<PetProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');


  // Fetch Logic
  const fetchData = async (): Promise<void> => {
    if (!esp32IP) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(`http://${esp32IP}/data`, { signal: controller.signal });
      const data = await response.json();
      clearTimeout(timeoutId);

      const fullData: SensorData = {
        temperature: data.temperature?.toString() || '--',
        heartRate: data.heartRate?.toString() || '--',
        rfid: data.rfid || 'None',
        rfidStatus: data.rfidStatus || 'UNKNOWN',
        rfidActive: data.rfidActive || false,
        healthStatus: data.healthStatus,
        signalStrength: data.signalStrength
      };

      setSensorData(fullData);
      setIsConnected(true);

      // Auto-login if RFID detected and matches database
      if (fullData.rfid !== 'None' && petDatabase[fullData.rfid] && !isLoggedIn) {
        setCurrentPet(petDatabase[fullData.rfid]);
        setIsLoggedIn(true);
      }

    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // Poll regardless of login state to detect RFID
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [esp32IP, isLoggedIn]);

  // Auth Handlers
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPet(null);
    setActiveTab('dashboard');
  };

  const handleDemoLogin = () => {
    setCurrentPet(petDatabase['A1B2C3D4']); // Mapping to local ID for demo
    setIsLoggedIn(true);
  };

  // Status Helpers
  const getHeartStatus = (hr: string) => {
    if (hr === '--' || hr === '0') return { status: 'measuring', message: 'No Signal' };
    const num = parseInt(hr);
    if (num < 60) return { status: 'warning', message: 'Low Heart Rate' };
    if (num > 140) return { status: 'danger', message: 'High Heart Rate' };
    return { status: 'normal', message: 'Optimal' };
  };

  const getTempStatus = (temp: string) => {
    if (temp === '--' || temp === '0') return { status: 'measuring', message: 'Measuring...' };
    const num = parseFloat(temp);
    if (num < 37.5) return { status: 'warning', message: 'Low Temp' };
    if (num > 39.2) return { status: 'danger', message: 'High Temp' };
    return { status: 'normal', message: 'Optimal' };
  };

  // Render Login
  if (!isLoggedIn) {
    return (
      <RFIDScanner 
        rfid={sensorData.rfid}
        isConnected={isConnected}
        esp32IP={esp32IP}
        setEsp32IP={setEsp32IP}
        onDemoLogin={handleDemoLogin}
        onAddNewPet={() => alert('New pet registration coming soon!')}
      />
    );
  }

  // Render Dashboard
  return (
    <div className="dashboard-root">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />

      <main className="main-content-premium">
        <header className="premium-header">
          <div className="header-text">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </motion.h1>
            <p>Monitoring {currentPet?.name}'s vitals in real-time</p>
          </div>
          
          <div className="status-badges-group">
            <div className={`connection-pill ${isConnected ? 'online' : 'offline'}`}>
              <div className="dot" />
              {isConnected ? 'Live Sync' : 'Reconnecting...'}
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="dashboard-view"
            >
              {sensorData.heartRate === '0' && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="alert-banner warning"
                >
                  <Bell size={20} />
                  <span>Collar not detected. Please ensure PawSense is properly attached.</span>
                </motion.div>
              )}

              <div className="stats-grid-premium">
                <SensorCard 
                  icon={Heart}
                  title="Heart Rate"
                  value={sensorData.heartRate}
                  unit="BPM"
                  status={getHeartStatus(sensorData.heartRate)}
                  color="#ef4444"
                />
                <SensorCard 
                  icon={Thermometer}
                  title="Body Temp"
                  value={sensorData.temperature}
                  unit="°C"
                  status={getTempStatus(sensorData.temperature)}
                  color="#6366f1"
                />
              </div>

              <div className="history-section-premium">
                <h3>Recent Readings</h3>
                <div className="history-list-premium">
                  {healthHistory.map((reading, i) => (
                    <div key={i} className="history-item-premium">
                      <span className="time">{reading.time}</span>
                      <span className="vitals">{reading.heartRate} BPM / {reading.temperature}°C</span>
                      <span className={`status-tag ${reading.status}`}>{reading.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && currentPet && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="profile-view-premium"
            >
              <div className="profile-hero premium-card">
                <div className="avatar-large">
                  <User size={64} />
                </div>
                <div className="hero-content">
                  <h2>{currentPet.name}</h2>
                  <p>{currentPet.breed} • {currentPet.age}</p>
                  <div className="quick-stats-row">
                    <div className="stat-pill">Weight: {currentPet.weight}</div>
                    <div className="stat-pill">Owner: {currentPet.owner}</div>
                  </div>
                </div>
              </div>

              <div className="profile-grid">
                <div className="info-card premium-card">
                  <h3>🍖 Food & Diet</h3>
                  <p><strong>Type:</strong> {currentPet.foodPreferences.type}</p>
                  <p><strong>Schedule:</strong> {currentPet.foodPreferences.feedingSchedule}</p>
                </div>
                <div className="info-card premium-card">
                  <h3>🛡️ Medical</h3>
                  <p><strong>Last Checkup:</strong> {currentPet.lastCheckup}</p>
                  <p><strong>Medications:</strong> {currentPet.medicalHistory.medications.join(', ')}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="history-view-premium"
            >
              <div className="chart-container premium-card">
                <h3>Vitals Trend (Last 24h)</h3>
                <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                  <ResponsiveContainer>
                    <AreaChart data={healthHistory}>
                      <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="heartRate" stroke="#ef4444" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="history-list-full premium-card" style={{ marginTop: '32px' }}>
                <h3>Complete Log</h3>
                <div className="history-table">
                  {healthHistory.map((reading, i) => (
                    <div key={i} className="history-row">
                      <div className="row-time">{reading.time}</div>
                      <div className="row-vitals">
                        <Heart size={14} style={{ color: '#ef4444' }} /> {reading.heartRate} BPM
                        <Thermometer size={14} style={{ color: '#6366f1', marginLeft: '12px' }} /> {reading.temperature} °C
                      </div>
                      <div className={`row-status ${reading.status}`}>{reading.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="settings-view-premium"
            >
              <div className="settings-grid">
                <div className="settings-card premium-card">
                  <div className="card-icon-title">
                    <Wifi size={20} className="text-primary" />
                    <h3>Hardware Gateway</h3>
                  </div>
                  <div className="setting-control">
                    <label>ESP32 Controller IP</label>
                    <div className="input-with-button">
                      <input 
                        type="text" 
                        value={esp32IP}
                        onChange={(e) => setEsp32IP(e.target.value)}
                        placeholder="192.168.1.xxx"
                      />
                      <button onClick={() => fetchData()}>Test Connection</button>
                    </div>
                    <p className="setting-desc">Enter the IP address shown in your Arduino Serial Monitor.</p>
                  </div>
                </div>

                <div className="settings-card premium-card">
                  <div className="card-icon-title">
                    <Bell size={20} className="text-warning" />
                    <h3>Alert Thresholds</h3>
                  </div>
                  <div className="threshold-controls">
                    <div className="threshold-item">
                      <span>Max Heart Rate</span>
                      <input type="number" defaultValue={140} />
                    </div>
                    <div className="threshold-item">
                      <span>Min Heart Rate</span>
                      <input type="number" defaultValue={60} />
                    </div>
                  </div>
                </div>

                <div className="settings-card premium-card">
                  <div className="card-icon-title">
                    <Shield size={20} className="text-success" />
                    <h3>System Status</h3>
                  </div>
                  <div className="system-status-list">
                    <div className="status-item">
                      <Info size={16} />
                      <span>Software Version: 1.0.4 Premium</span>
                    </div>
                    <div className="status-item">
                      <Database size={16} />
                      <span>Local Storage: Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;