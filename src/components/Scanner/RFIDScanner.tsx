import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Wifi, WifiOff } from 'lucide-react';

interface RFIDScannerProps {
  rfid: string;
  isConnected: boolean;
  esp32IP: string;
  setEsp32IP: (ip: string) => void;
  onDemoLogin: () => void;
  onAddNewPet: () => void;
}

const RFIDScanner: React.FC<RFIDScannerProps> = ({ 
  rfid, 
  isConnected, 
  esp32IP, 
  setEsp32IP, 
  onDemoLogin, 
  onAddNewPet 
}) => {
  return (
    <div className="login-container-premium">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="login-glass-premium"
      >
        <div className="login-header">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="logo-wrapper"
          >
            <Shield className="logo-icon-large" />
          </motion.div>
          <h1>PawSense</h1>
          <p>Advanced Pet Health Monitoring</p>
        </div>

        <div className="scanner-vault">
          <div className="scanner-ring">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="orbit-line"
            />
            <div className="scanner-center">
              <User size={40} className="scanner-user-icon" />
              <AnimatePresence>
                {isConnected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="pulse-success"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="scanner-status-text">
            <h3>{rfid !== 'None' ? 'Tag Detected' : 'Scanning for Tag...'}</h3>
            <p>{rfid !== 'None' ? `ID: ${rfid}` : 'Place pet collar near the reader'}</p>
          </div>
        </div>

        <div className="connection-config-card">
          <div className="connection-status-row">
            {isConnected ? <Wifi size={18} className="text-success" /> : <WifiOff size={18} className="text-danger" />}
            <span>System {isConnected ? 'Online' : 'Offline'}</span>
          </div>
          
          <div className="ip-field">
            <label>ESP32 IP Gateway</label>
            <input 
              type="text" 
              value={esp32IP}
              onChange={(e) => setEsp32IP(e.target.value)}
              placeholder="192.168.1.xxx"
            />
          </div>
        </div>

        <div className="action-buttons-group">
          <button className="btn-primary-glow" onClick={onDemoLogin}>
            Demo Login (Max)
          </button>
          <button className="btn-secondary-outline" onClick={onAddNewPet}>
            Register New Pet
          </button>
        </div>
      </motion.div>
      
      {/* Background Decorative Blobs */}
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />
    </div>
  );
};

export default RFIDScanner;
