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
import Calander from './Calander';
import DashboardCard from './DashboardCard';


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
          background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
          height: 715,
        }}
      >
        <Typography display='flex' justifyContent='center' fontSize={40} fontWeight={700} color="#1976d2" mb={2}>
          Hostel Ease
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          {/* Students */}
          <Grid item>
            <DashboardCard
              icon={<PeopleAltIcon fontSize="large" />}
              value={studentCount !== null ? studentCount : '...'}
              label="Students"
              avatarColor="#FA5A7D"
              valueColor="#FA5A7D"
              labelColor="#FA5A7D"
              bgGradient="linear-gradient(135deg,rgb(255, 212, 216) , #ffffff)"
              progress={80}
              progressColor="#ffe2e5"
            />
          </Grid>
          {/* Rooms */}
          <Grid item>
            <DashboardCard
              icon={<MeetingRoomIcon fontSize="large" />}
              value={roomCount !== null ? roomCount : '...'}
              label="Rooms"
              avatarColor="#FF947A"
              valueColor="#FF947A"
              labelColor="#FF947A"
              bgGradient="linear-gradient(135deg, #FFF4DE 60%, #fff 100%)"
              progress={60}
              progressColor="#fff4de"
            />
          </Grid>
          {/* Available Rooms */}
          <Grid item>
            <DashboardCard
              icon={<TrendingUpIcon fontSize="large" />}
              value={availableRoomCount !== null ? availableRoomCount : '...'}
              label="Available Rooms"
              avatarColor="#FFD600"
              valueColor="#FFA000"
              labelColor="#FFA000"
              bgGradient="linear-gradient(135deg,rgb(253, 248, 205) 60%, #fff 100%)"
              progress={50}
              progressColor="#fff9c4"
            />
          </Grid>
          {/* Complaints Pending */}
          <Grid item>
            <DashboardCard
              icon={<ErrorOutlineIcon fontSize="large" />}
              value={pendingComplainCount !== null ? pendingComplainCount : '...'}
              label="Complaints Pending"
              avatarColor="#BF83FF"
              valueColor="#BF83FF"
              labelColor="#BF83FF"
              bgGradient="linear-gradient(135deg, #F3E8FF 60%, #ffffff 100%)"
              progress={30}
              progressColor="#f3e8ff"
            />
          </Grid>
          {/* Pending Visitors */}
          <Grid item>
            <DashboardCard
              icon={<GroupAddIcon fontSize="large" />}
              value={pendingVisitorCount !== null ? pendingVisitorCount : '...'}
              label="Pending Visitors"
              avatarColor="#29B6F6"
              valueColor="#29B6F6"
              labelColor="#29B6F6"
              bgGradient="linear-gradient(135deg, #E3F2FD 60%, #fff 100%)"
              progress={20}
              progressColor="#e3f2fd"
            />
          </Grid>
          {/* Pending Payments */}
          <Grid item>
            <DashboardCard
              icon={<CheckCircleIcon fontSize="large" />}
              value={pendingPaymentCount !== null ? pendingPaymentCount : '...'}
              label="Pending Payments"
              avatarColor="#00ACC1"
              valueColor="#00ACC1"
              labelColor="#00ACC1"
              bgGradient="linear-gradient(135deg, #E0F7FA 60%, #fff 100%)"
              progress={70}
              progressColor="#e0f7fa"
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        {/* Pie Chart: Hostel Occupancy */}
        <Box display="flex" 
        justifyContent="center" alignItems="center" my={2} gap={8} 
        sx={{
          p: 3,
          borderRadius: 4,
          minWidth: 700 ,
          maxHeight: 600,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8, // increased gap for more space between
        }}>
          <PieChartWithCenterLabel data={occupancyData} centerLabel={occupancyLabel.split(' ')[0]} label={occupancyLabel} />
          <Box>
            <Calander />
          </Box>
        </Box>
        
      </Box>
    </Box>
  )
}
