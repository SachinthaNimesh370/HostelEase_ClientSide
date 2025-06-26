import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography, Avatar, Divider, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PieChartWithCenterLabel from './PieChatr';

export default function DashbordPaper() {
  const [studentCount, setStudentCount] = useState(null);
  const [roomCount, setRoomCount] = useState(null);
  const [availableRoomCount, setAvailableRoomCount] = useState(null);
  const [pendingComplainCount, setPendingComplainCount] = useState(null);
  const [pendingVisitorCount, setPendingVisitorCount] = useState(null);
  const [pendingPaymentCount, setPendingPaymentCount] = useState(null);
  const [occupancyData, setOccupancyData] = useState(null);
  const [occupancyLabel, setOccupancyLabel] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8090/api/v1/student/getnostudent', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setStudentCount(data.data.massage);
        }
      })
      .catch(() => setStudentCount('N/A'));

    fetch('http://localhost:8090/api/v1/room/getnoroom', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setRoomCount(data.data.massage);
        }
      })
      .catch(() => setRoomCount('N/A'));

    fetch('http://localhost:8090/api/v1/room/getnoroomavailable', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setAvailableRoomCount(data.data.massage);
        }
      })
      .catch(() => setAvailableRoomCount('N/A'));

    fetch('http://localhost:8090/api/v1/complain/getpendingcomplain', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setPendingComplainCount(data.data.massage);
        }
      })
      .catch(() => setPendingComplainCount('N/A'));

    fetch('http://localhost:8090/api/v1/visitor/getpendingvisitor', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setPendingVisitorCount(data.data.massage);
        }
      })
      .catch(() => setPendingVisitorCount('N/A'));

    fetch('http://localhost:8090/api/v1/payment/getpendingpayment', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage != null) {
          setPendingPaymentCount(data.data.massage);
        }
      })
      .catch(() => setPendingPaymentCount('N/A'));

    // Fetch occupancy data for pie chart
    fetch('http://localhost:8090/api/v1/room/getoccupancy', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.massage) {
          setOccupancyData(data.data.massage);
          const available = Number(data.data.massage.availableCount) || 0;
          const current = Number(data.data.massage.currentCount) || 0;
          const total = available + current;
          const percent = total > 0 ? Math.round((current / total) * 100) : 0;
          setOccupancyLabel(`${percent}% occupied (${current}/${total} beds)`);
        }
      })
      .catch(() => {
        setOccupancyData(null);
        setOccupancyLabel('No data');
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 3,
          p: 3,
          background: 'linear-gradient(135deg, #fafcff 0%, #fafcff 100%)',
          height: 715,
        }}
      >
        <Typography display='flex' justifyContent='center' fontSize={40} fontWeight={700} color="#1976d2" mb={2}>
          Hostel Ease
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          {/* Students */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #FFE2E5 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#FA5A7D', width: 48, height: 48, mb: 1 }}>
                  <PeopleAltIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#FA5A7D" fontWeight={700}>Students</Typography>
                <Typography fontSize={32} color="#FA5A7D" fontWeight={700}>
                  {studentCount !== null ? studentCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={80} sx={{ width: '80%', mt: 1, bgcolor: '#ffe2e5', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
          {/* Rooms */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #FFF4DE 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#FF947A', width: 48, height: 48, mb: 1 }}>
                  <MeetingRoomIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#FF947A" fontWeight={700}>Rooms</Typography>
                <Typography fontSize={32} color="#FF947A" fontWeight={700}>
                  {roomCount !== null ? roomCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={60} sx={{ width: '80%', mt: 1, bgcolor: '#fff4de', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
          
          {/* Available Rooms */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #F3E8FF 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#BF83FF', width: 48, height: 48, mb: 1 }}>
                  <TrendingUpIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#BF83FF" fontWeight={700}>Available Rooms</Typography>
                <Typography fontSize={32} color="#BF83FF" fontWeight={700}>
                  {availableRoomCount !== null ? availableRoomCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={50} sx={{ width: '80%', mt: 1, bgcolor: '#f3e8ff', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
          {/* Complaints Pending */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #FFF9C4 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#FFD600', width: 48, height: 48, mb: 1 }}>
                  <ErrorOutlineIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#FFA000" fontWeight={700}>Complaints Pending</Typography>
                <Typography fontSize={32} color="#FFA000" fontWeight={700}>
                  {pendingComplainCount !== null ? pendingComplainCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={30} sx={{ width: '80%', mt: 1, bgcolor: '#fff9c4', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
          {/* Pending Visitors */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #E3F2FD 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#29B6F6', width: 48, height: 48, mb: 1 }}>
                  <GroupAddIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#29B6F6" fontWeight={700}>Pending Visitors</Typography>
                <Typography fontSize={32} color="#29B6F6" fontWeight={700}>
                  {pendingVisitorCount !== null ? pendingVisitorCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={20} sx={{ width: '80%', mt: 1, bgcolor: '#e3f2fd', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
          {/* Pending Payments */}
          <Grid item>
            <Paper elevation={4} sx={{ background: 'linear-gradient(135deg, #E0F7FA 60%, #fff 100%)', borderRadius: 2, minWidth: 200 }}>
              <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                <Avatar sx={{ bgcolor: '#00ACC1', width: 48, height: 48, mb: 1 }}>
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
                <Typography fontSize={18} color="#00ACC1" fontWeight={700}>Pending Payments</Typography>
                <Typography fontSize={32} color="#00ACC1" fontWeight={700}>
                  {pendingPaymentCount !== null ? pendingPaymentCount : '...'}
                </Typography>
                <LinearProgress variant="determinate" value={70} sx={{ width: '80%', mt: 1, bgcolor: '#e0f7fa', height: 6, borderRadius: 3 }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        {/* Pie Chart: Hostel Occupancy */}
        <Box display="flex" justifyContent="center" alignItems="center" my={2} gap={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 260, background: 'linear-gradient(135deg, #e3f0ff 60%, #fafcff 100%)' }}>
            <Typography fontWeight={600} color="#1976d2" mb={1} textAlign="center">
              Hostel Occupancy
            </Typography>
            <PieChartWithCenterLabel data={occupancyData} centerLabel={occupancyLabel.split(' ')[0]} />
            <Typography fontSize={14} color="#1976d2" mt={1} textAlign="center">
              {occupancyLabel}
            </Typography>
          </Paper>

           {/* Pie Chart: Payment */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 260, background: 'linear-gradient(135deg, #e3f0ff 60%, #fafcff 100%)' }}>
            <Typography fontWeight={600} color="#1976d2" mb={1} textAlign="center">
              Hostel Occupancy
            </Typography>
            <PieChartWithCenterLabel />
            <Typography fontSize={14} color="#1976d2" mt={1} textAlign="center">
              80% occupied (160/200 beds)
            </Typography>
          </Paper>
        </Box>
        
      </Box>
    </Box>
  )
}
