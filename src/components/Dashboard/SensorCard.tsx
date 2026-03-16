import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  unit: string;
  status: { status: string; message: string };
  color: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ icon: Icon, title, value, unit, status, color }) => {
  const getStatusColor = (statusStr: string) => {
    switch (statusStr) {
      case 'normal': return '#48bb78';
      case 'warning': return '#ecc94b';
      case 'danger': return '#f56565';
      default: return '#4299e1';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="stat-card premium"
    >
      <div className="stat-header">
        <div className="icon-wrapper" style={{ backgroundColor: `${color}15` }}>
          <Icon className="stat-icon" style={{ color }} />
        </div>
        <span className="stat-title">{title}</span>
      </div>
      
      <div className="stat-main">
        <div className="stat-value-group">
          <span className="stat-value">{value}</span>
          <span className="stat-unit">{unit}</span>
        </div>
        
        <div className="health-bar-container">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: value === '--' ? '0%' : '70%' }} // Mock percentage for visual
            className="health-bar-fill"
            style={{ backgroundColor: getStatusColor(status.status) }}
          />
        </div>
      </div>

      <div className={`status-badge-premium ${status.status}`}>
        <div className="status-dot-pulse" style={{ backgroundColor: getStatusColor(status.status) }} />
        {status.message}
      </div>
    </motion.div>
  );
};

export default SensorCard;
