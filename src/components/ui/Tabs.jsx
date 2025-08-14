import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';

const Tabs = ({ 
  tabs, 
  defaultTab = 0, 
  onChange,
  variant = 'standard',
  className = '',
  tabClassName = '',
  contentClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { theme } = useTheme();

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  const getTabStyle = (isActive) => ({
    backgroundColor: isActive 
      ? theme.palette.primary.main 
      : 'transparent',
    color: isActive 
      ? '#ffffff' 
      : theme.palette.text.primary,
    borderColor: variant === 'bordered' 
      ? theme.palette.primary.main 
      : 'transparent',
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className={`flex ${variant === 'bordered' ? 'border-b' : ''}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${tabClassName}`}
            style={{
              ...getTabStyle(activeTab === index),
              focusRing: theme.palette.primary.main,
            }}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span 
                className="ml-2 px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: '#ffffff',
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`mt-4 ${contentClassName}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? 'block' : 'hidden'}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tabpanel-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  defaultTab: PropTypes.number,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'bordered']),
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default Tabs;