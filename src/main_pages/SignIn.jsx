
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
    const navigate = useNavigate();
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = () => {
        if (regNo === null || password === null) {
            alert("Passwords do not match");
            return;
        }
        const userData = {
            regNo: regNo,
            password: password
        };
        
        axios.post('http://localhost:8090/api/v1/user/signin', userData)
            .then(response => {
                const message = response.data;

                const token = response.data.data.massage; // JWT token
                const role = response.data.role.role;     // User role

                // Store in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                console.log("token is : " + token)
                console.log("role is : " + role)

                console.log("SignIn successful:", message);
                navigate('/drawer');
        })
        .catch(error => {
            const errorMessage = error.response?.data?.data || "Signin failed.";
            alert(errorMessage);
            console.error("SignIn failed:", errorMessage);
        });
        
    };


  return (
    <Box>
        <Box
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            {/* Form Field */}
            <Box
                border={1}
                borderColor="grey.400"
                borderRadius="7px"
                sx={{ width: '400px', padding: '20px' }}
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
