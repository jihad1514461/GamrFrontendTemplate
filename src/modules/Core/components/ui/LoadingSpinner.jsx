import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';

const LoadingSpinner = ({ size = 'medium', color, message, overlay = false }) => {
  const { theme } = useTheme();

  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
  };

  const spinnerColor = color || theme.palette.primary.main;

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2 border-t-2 border-gray-200`}
        style={{
          borderTopColor: spinnerColor,
          borderRightColor: spinnerColor,
        }}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p 
          className="mt-2 text-sm font-medium"
          style={{ color: theme.palette.text.secondary }}
        >
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div 
          className="p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.string,
  message: PropTypes.string,
  overlay: PropTypes.bool,
};

export default LoadingSpinner;