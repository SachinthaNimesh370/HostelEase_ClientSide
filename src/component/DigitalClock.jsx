import * as React from 'react';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

export default function DigitalClock({ fontSize = 32, color = '#1976d2', ...props }) {
  const [currentTime, setCurrentTime] = React.useState(dayjs().format('HH:mm:ss'));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography
      variant="h4"
      fontWeight={700}
      color={color}
      letterSpacing={2}
      sx={{
        mt: 1,
        fontSize,
        px: 3,
        py: 1,
        borderRadius: 3,
        color: '#3EA8F5', // match TableTemplate header blue
        boxShadow: 'none',
        fontFamily: 'Roboto Mono, monospace',
        textShadow: '0 2px 8px rgba(62, 168, 245, 0.10)',
        letterSpacing: 4,
        width: 'fit-content',
        minWidth: 180,
        textAlign: 'center',
        userSelect: 'none',
        border: '2px solid #3EA8F5',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        
      }}
      {...props}
    >
      {currentTime}
    </Typography>
  );
}
