import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import DigitalClock from './DigitalClock';

export default function Calander({ value, onChange, label = 'Select Date' }) {
  const [selectedDate, setSelectedDate] = React.useState(value ? dayjs(value) : dayjs());
  const [currentTime, setCurrentTime] = React.useState(dayjs().format('HH:mm:ss'));
  const timeBoxRef = React.useRef(null);
  const [timeBoxWidth, setTimeBoxWidth] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (timeBoxRef.current) {
      setTimeBoxWidth(timeBoxRef.current.offsetWidth);
    }
  }, [currentTime]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={0}
        sx={{
          minWidth: 700 ,
          maxHeight: 600,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          boxShadow: 'none',
          border: 'none',
          '&:hover': {
          boxShadow: '0 15px 40px 0 rgba(30, 64, 175, 0.18)',
        },
        }}
      >
        
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            width: 420,
            minWidth: 390,
            maxWidth: 390,
            maxHeight: 310,
            background: 'linear-gradient(135deg,rgb(236, 244, 255) ,rgb(255, 255, 255))', // light blue background
            borderRadius: 3,
            boxShadow: 2,
            p: 1,
            '& .MuiPickersDay-root': {
              fontWeight: 600,
              fontSize: 16,
              color: '#1976d2', // main blue text
              '&.Mui-selected': {
                bgcolor: '#1976d2', // main blue
                color: '#fff',
              },
              '&:hover': {
                bgcolor: '#bbdefb', // lighter blue
              },
            },
            '& .MuiPickersCalendarHeader-label': {
              fontWeight: 700,
              color: '#1976d2',
              fontSize: 18,
            },
            '& .MuiPickersDay-today': {
              border: '2px solid #1976d2',
            },
            '& .MuiPickersArrowSwitcher-root': {
              color: '#1976d2',
            },
            '& .MuiPickersCalendarHeader-switchViewButton': {
              color: '#1976d2',
            },
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" ref={timeBoxRef} sx={{ mt: 2, width: '80%' }}>
          <Typography variant="h6" fontWeight={700} color="#1976d2" letterSpacing={1}>
            Time
          </Typography>
          <DigitalClock fontSize={36} />
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}
