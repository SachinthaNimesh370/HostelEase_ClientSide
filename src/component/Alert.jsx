import MuiAlert from '@mui/material/Alert';
import React from 'react';

/**
 * Modern reusable Alert component
 * @param {object} props
 * @param {'success'|'error'|'info'|'warning'} props.severity - The alert type
 * @param {string|React.ReactNode} props.children - The alert message
 * @param {function} [props.onClose] - Optional close handler
 * @param {object} [props.sx] - Optional style overrides
 */
const Alert = ({ severity = 'info', children, onClose, sx }) => (
  <div
    style={{
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 1400, 
      minWidth: 320,
      maxWidth: 'calc(100vw - 48px)',
      pointerEvents: 'none', 
      display: 'flex',
      justifyContent: 'flex-end',
    }}
  >
    <MuiAlert
      severity={severity}
      onClose={onClose}
      variant="filled"
      iconMapping={{
        success: <span style={{ fontWeight: 700, fontSize: 22, color: '#388e3c' }}>✔</span>,
        error: <span style={{ fontWeight: 700, fontSize: 22, color: '#d32f2f' }}>✖</span>,
        info: <span style={{ fontWeight: 700, fontSize: 22, color: '#1976d2' }}>ℹ️</span>,
        warning: <span style={{ fontWeight: 700, fontSize: 22, color: '#ed6c02' }}>!</span>,
      }}
      sx={{
        borderRadius: 2.5 ,
        border: '1px solid rgb(185, 185, 185)',
        fontWeight: 500,
        fontSize: 16,
        color:
          severity === 'success' ? '#388e3c' :
          severity === 'error' ? 'rgb(232, 24, 24)' :
          severity === 'info' ? '#1976d2' :
          severity === 'warning' ? '#ed6c02' :
          'inherit',
        boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.10)',
        letterSpacing: 0.2,
        alignItems: 'center',
        background: severity === 'success'
          ? 'linear-gradient(90deg,rgb(190, 255, 211) 0%,rgb(255, 255, 255) 100%)'
          : severity === 'error'
          ? 'linear-gradient(90deg,rgb(255, 158, 158) 0%, rgb(255, 255, 255) 100%)'
          : severity === 'info'
          ? 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)'
          : 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
        pointerEvents: 'auto',
        ...sx,
      }}
    >
      {children}
    </MuiAlert>
  </div>
);

export default Alert;
