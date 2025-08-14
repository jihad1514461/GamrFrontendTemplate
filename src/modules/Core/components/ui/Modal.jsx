import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CustomModal = ({ 
  show, 
  onHide, 
  title, 
  children, 
  size = 'md', 
  centered = true,
  backdrop = true,
  keyboard = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer
}) => {
  const { theme } = useTheme();

  const modalStyle = {
    '--bs-modal-bg': theme.palette.background.paper,
    '--bs-modal-border-color': theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
    '--bs-modal-header-border-color': theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
    '--bs-modal-footer-border-color': theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
  };

  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop={backdrop}
      keyboard={keyboard}
      className={className}
      style={modalStyle}
    >
      {title && (
        <BootstrapModal.Header 
          className={`border-0 ${headerClassName}`}
          style={{ 
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary 
          }}
        >
          <BootstrapModal.Title 
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            {title}
          </BootstrapModal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onHide}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: theme.palette.text.secondary,
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </BootstrapModal.Header>
      )}
      
      <BootstrapModal.Body 
        className={`${bodyClassName}`}
        style={{ 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary 
        }}
      >
        {children}
      </BootstrapModal.Body>

      {footer && (
        <BootstrapModal.Footer 
          className={`border-0 ${footerClassName}`}
          style={{ 
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary 
          }}
        >
          {footer}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  centered: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  keyboard: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  footer: PropTypes.node,
};

export default CustomModal;