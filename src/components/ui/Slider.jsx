import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  className = '',
  size = 'medium'
}) => {
  const { theme } = useTheme();

  const sizes = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  };

  const thumbSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const percentage = ((value - min) / (max - min)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} ${percentage}%, ${theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB'} ${percentage}%, ${theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB'} 100%)`,
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label 
            className="text-sm font-medium"
            style={{ color: theme.palette.text.primary }}
          >
            {label}
          </label>
          {showValue && (
            <span 
              className="text-sm font-medium"
              style={{ color: theme.palette.text.secondary }}
            >
              {value}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`w-full appearance-none rounded-lg cursor-pointer ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={sliderStyle}
        />
        
        {/* Custom thumb styling */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: ${thumbSizes[size].split(' ')[0].replace('w-', '') * 4}px;
            height: ${thumbSizes[size].split(' ')[1].replace('h-', '') * 4}px;
            border-radius: 50%;
            background: ${theme.palette.primary.main};
            cursor: pointer;
            border: 2px solid ${theme.palette.background.paper};
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: ${thumbSizes[size].split(' ')[0].replace('w-', '') * 4}px;
            height: ${thumbSizes[size].split(' ')[1].replace('h-', '') * 4}px;
            border-radius: 50%;
            background: ${theme.palette.primary.main};
            cursor: pointer;
            border: 2px solid ${theme.palette.background.paper};
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );
};

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  showValue: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Slider;