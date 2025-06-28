import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Alert from '../component/Alert';

export default function SignIn() {
    const navigate = useNavigate();
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });


    const handleSignIn = () => {
        if (regNo === null || password === null) {
            setAlert({ open: true, severity: 'error', message: 'Passwords do not match' });
            return;
        }
        const userData = {
            regNo: regNo,
            password: password
        };
        // Always save regNo to localStorage on button click
        localStorage.setItem("regNo", regNo);
        axios.post('http://localhost:8090/api/v1/user/signin', userData)
            .then(response => {
                const res = response.data;
                if (res.code === 200) {
                    const token = res.data.massage;
                    const role = res.role.role;
                    localStorage.setItem("token", token);
                    localStorage.setItem("role", role);
                    setAlert({ open: true, severity: 'success', message: 'Sign in successful!' });
                    setTimeout(() => {
                        if (role === 'student' || role === 'Student') {
                            navigate('/drawerstu/complainStudent');
                        } else if (role === 'security' || role === 'Security') {
                            navigate('/drawersec/securityVisitorLog');
                        } else {
                            navigate('/drawer/dashboard');
                        }
                    }, 800);
                } else {
                    // If code is not 200, show error from data.massage if present
                    localStorage.removeItem("regNo");
                    const errorMsg = res.data?.massage || res.message || 'Signin failed.';
                    setAlert({ open: true, severity: 'error', message: errorMsg });
                }
            })
            .catch(error => {
                // Remove regNo from localStorage if request fails (not 200)
                localStorage.removeItem("regNo");
                // Try to get error message from backend response (prefer data.massage)
                let errorMessage = error.response?.data?.data?.massage || error.response?.data?.message || error.response?.data?.massage || "Signin failed.";
                setAlert({ open: true, severity: 'error', message: errorMessage });
            });
    };


  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f6fa',
      }}
    >
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {alert.open && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}
        {/* Form Field */}
        <Box
          border={1}
          borderColor="grey.400"
          borderRadius="7px"
          sx={{ width: '400px', padding: '20px', background: 'rgb(255, 255, 255)' }}
        >
            <Box>
                <Typography align="center" sx={{ fontSize: '35px', fontFamily: 'Roboto, sans-serif' }}>
                        Sign In
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    label="Reg No"
                    type="search"
                    onChange={(e) => setRegNo(e.target.value)}
                />
                <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Button fullWidth variant="contained" onClick={handleSignIn}>
                Sign In
                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
                sx={{ marginTop: '5px' }}
            >
                <Typography>Don't have an account?</Typography>
                <Button variant="text" onClick={() => navigate('/signup')}>Sign Up</Button>
            </Box>

            
            
            </Box>
                
        </Box>
        
        
                    
                
    </Box>
  );
}
