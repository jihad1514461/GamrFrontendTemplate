import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Home, User, Package, Target, Zap, Settings, Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/character', label: 'Character', icon: User },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/quests', label: 'Quests', icon: Target },
    { path: '/spells', label: 'Spells', icon: Zap },
    { path: '/api-demo', label: 'API Demo', icon: Globe },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false);
  };

  const navbarStyle = {
    backgroundColor: theme.palette.background.card,
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB'}`,
    boxShadow: theme.shadows.card,
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      expanded={expanded}
      style={navbarStyle}
      className="py-3"
    >
      <Container fluid>
        <Navbar.Brand 
          onClick={() => handleNavClick('/')}
          className="fw-bold d-flex align-items-center cursor-pointer"
          style={{ color: theme.palette.primary.main }}
        >
          <div 
            className="me-2 p-2 rounded-circle d-flex align-items-center justify-content-center"
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="fs-4">RPG Interface</span>
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn p-2 me-3 rounded-circle border-0"
            style={{
              backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6',
              color: theme.palette.text.primary,
            }}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Toggle */}
          <Navbar.Toggle 
            onClick={() => setExpanded(!expanded)}
            className="border-0 p-2"
            style={{ backgroundColor: 'transparent' }}
          >
            {expanded ? (
              <X className="w-6 h-6" style={{ color: theme.palette.text.primary }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: theme.palette.text.primary }} />
            )}
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse>
          <Nav className="ms-auto">
            {navigationItems.map(({ path, label, icon: IconComponent }) => (
              <Nav.Link
                key={path}
                onClick={() => handleNavClick(path)}
                className={`px-3 py-2 mx-1 rounded-lg d-flex align-items-center transition-all ${
                  isActive(path) ? 'fw-semibold' : ''
                }`}
                style={{
                  color: isActive(path) ? theme.palette.primary.main : theme.palette.text.primary,
                  backgroundColor: isActive(path) 
                    ? theme.palette.primary.main + '20' 
                    : 'transparent',
                }}
              >
                <IconComponent className="w-4 h-4 me-2" />
                {label}
              </Nav.Link>
            ))}
            
            {/* Settings */}
            <Nav.Link
              className="px-3 py-2 mx-1 rounded-lg d-flex align-items-center"
              style={{ color: theme.palette.text.secondary }}
              title="Settings (Coming Soon)"
            >
              <Settings className="w-4 h-4 me-2" />
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;