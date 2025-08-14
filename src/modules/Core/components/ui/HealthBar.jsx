import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, Zap, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const HealthBar = ({ 
  label = 'Health',
  current = 100,
  max = 100,
  type = 'health',
  showNumbers = true,
  showIcon = true,
  animated = true,
  size = 'medium',
  className = '',
  color,
  backgroundColor
}) => {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState(current);

  useEffect(() => {
    if (animated) {
      const duration = 500;
      const steps = 20;
      const stepSize = (current - displayValue) / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setDisplayValue(prev => {
          const newValue = prev + stepSize;
          if (step >= steps) {
            clearInterval(timer);
            return current;
          }
          return newValue;
        });
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(current);
    }
  }, [current, animated, displayValue]);

  const percentage = Math.min((displayValue / max) * 100, 100);

  const typeConfig = {
    health: {
      icon: Heart,
      defaultColor: '#EF4444',
      bgColor: '#FEE2E2',
    },
    mana: {
      icon: Zap,
      defaultColor: '#3B82F6',
      bgColor: '#DBEAFE',
    },
    energy: {
      icon: Zap,
      defaultColor: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    shield: {
      icon: Shield,
      defaultColor: '#10B981',
      bgColor: '#D1FAE5',
    },
  };

  const config = typeConfig[type] || typeConfig.health;
  const IconComponent = config.icon;

  const sizes = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const barColor = color || config.defaultColor;
  const barBackgroundColor = backgroundColor || (theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB');

  const getLabelColor = () => {
    if (percentage > 60) return barColor;
    if (percentage > 30) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showNumbers) && (
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center space-x-1">
            {showIcon && (
              <IconComponent 
                className="w-4 h-4" 
                style={{ color: getLabelColor() }}
              />
            )}
            {label && (
              <span 
                className="text-sm font-medium"
                style={{ color: theme.palette.text.primary }}
              >
                {label}
              </span>
            )}
          </div>
          
          {showNumbers && (
            <span 
              className="text-sm font-medium"
              style={{ color: theme.palette.text.secondary }}
            >
              {Math.round(displayValue)}/{max}
            </span>
          )}
        </div>
      )}
      
      <div 
        className={`${sizes[size]} rounded-full overflow-hidden relative`}
        style={{ backgroundColor: barBackgroundColor }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${current} out of ${max}`}
      >
        <div 
          className={`h-full rounded-full transition-all ${animated ? 'duration-500' : 'duration-200'} relative overflow-hidden`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        >
          {/* Animated shine effect */}
          {animated && percentage > 0 && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"
              style={{
                animation: 'shine 2s infinite',
              }}
            />
          )}
        </div>

        {/* Critical threshold indicator */}
        {percentage <= 25 && percentage > 0 && (
          <div 
            className={`absolute inset-0 rounded-full ${animated ? 'animate-pulse' : ''}`}
            style={{ 
              backgroundColor: theme.palette.error.main,
              opacity: 0.3 
            }}
          />
        )}
      </div>

      {/* Percentage text overlay for large bars */}
      {size === 'large' && (
        <div className="relative -mt-4 flex justify-center">
          <span 
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{
              backgroundColor: theme.palette.background.paper + '90',
              color: theme.palette.text.primary,
            }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};

HealthBar.propTypes = {
  label: PropTypes.string,
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['health', 'mana', 'energy', 'shield']),
  showNumbers: PropTypes.bool,
  showIcon: PropTypes.bool,
  animated: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default HealthBar;