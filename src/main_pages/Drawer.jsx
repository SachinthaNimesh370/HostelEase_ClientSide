import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  flexDirection: 'column',  
  padding: theme.spacing(2, 2, 1, 2),
  minHeight: 80,
  background: 'transparent',
  borderBottom: '1px solid #e3f0ff',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)',
  borderRight: 'none',
  boxShadow: '2px 0 16px 0 rgba(32,116,212,0.10)',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)',
    borderRight: 'none',
    boxShadow: '2px 0 16px 0 rgba(32,116,212,0.10)',
    color: '#1976d2',
  },
}));

export default function DrawerLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); 

  // Provide open state to children via context
  const DrawerContext = React.createContext({ open: true });

  const drawerItems1 = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
    { text: 'Rooms', icon: <MeetingRoomIcon />, path: 'rooms' },
    { text: 'Complain', icon: <ReportProblemIcon />, path: 'complain' },
    { text: 'Payment', icon: <PaymentIcon />, path: 'payment' },
    { text: 'Visitors Log', icon: <Diversity3RoundedIcon />, path: 'visitors' },
    { text: 'Room Allocation', icon: <SchoolIcon />, path: 'students' },
  ];

  const drawerItems2 = [

    
    { text: 'Warden', icon: <PersonRoundedIcon />, path: 'warden' },
    { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: 'admin' },
    { text: 'Security', icon: <SecurityRoundedIcon />, path: 'security' },
    { text: 'Users', icon: <SupervisorAccountIcon />, path: 'users' },
    
  ];

  const handleNavigate = (path) => {
    navigate(`/drawer/${path}`);
  };

  const isActive = (path) => location.pathname === `/drawer/${path}`;


  const handleSignOut = () => {
    localStorage.clear(); 
    navigate('/', { replace: true }); 
  };

  const regNo = localStorage.getItem('regNo');

  return (
    <Box sx={{ display: 'flex',background: '#FCFFFF',height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ marginRight: 5 }}
          >
           
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hostel Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent">
        <DrawerHeader>
          <AccountCircleRoundedIcon sx={{ fontSize: 40, color: '#1976d2', mb: 0.5 }} />
          <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 600, fontSize: 18, mt: 0.5 }}>
            {regNo || 'Profile'}
          </Typography>
        </DrawerHeader>
        <Divider sx={{ background: '#e3f0ff' }} />
        <List>
          {drawerItems1.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: true ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 2,
                  margin: '6px 8px',
                  background: isActive(item.path)
                    ? 'linear-gradient(90deg, #1976d2 60%, #509AE3 100%)'
                    : 'transparent',
                  color: isActive(item.path) ? '#fff' : '#1976d2',
                  boxShadow: isActive(item.path)
                    ? '0 2px 8px 0 rgba(25,118,210,0.10)'
                    : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: isActive(item.path)
                      ? 'linear-gradient(90deg, #1976d2 60%, #509AE3 100%)'
                      : 'rgba(25,118,210,0.08)',
                    color: '#509AE3',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: true ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isActive(item.path) ? '#fff' : '#1976d2',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: true ? 1 : 0,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: '#e3f0ff' }} />
        <List sx={{ flexGrow: 1 }}>
          {drawerItems2.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: true ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 2,
                  margin: '6px 8px',
                  background: isActive(item.path)
                    ? 'linear-gradient(90deg, #1976d2 60%, #509AE3 100%)'
                    : 'transparent',
                  color: isActive(item.path) ? '#fff' : '#1976d2',
                  boxShadow: isActive(item.path)
                    ? '0 2px 8px 0 rgba(25,118,210,0.10)'
                    : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: isActive(item.path)
                      ? 'linear-gradient(90deg, #1976d2 60%, #509AE3 100%)'
                      : 'rgba(25,118,210,0.08)',
                    color: '#509AE3',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: true ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isActive(item.path) ? '#fff' : '#1976d2',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: true ? 1 : 0,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* Sign Out as a drawer item at the bottom */}
        <Box sx={{ flexGrow: 0, mt: 'auto', mb: 2 }}>
          <Divider sx={{ background: '#e3f0ff' }} />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={handleSignOut} sx={{ borderRadius: 2, margin: '6px 8px', color: '#d32f2f', '&:hover': { background: 'rgba(211,47,47,0.08)' } }}>
                <ListItemIcon sx={{ minWidth: 0, mr: true ? 3 : 'auto', justifyContent: 'center', color: '#d32f2f' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" sx={{ opacity: true ? 1 : 0, fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <DrawerContext.Provider value={{ open: true }}>
          <Outlet />
        </DrawerContext.Provider>
      </Box>
    </Box>
  );
}
