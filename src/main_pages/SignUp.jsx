import { Box,Button,TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';


export default function SignUp() {
    const navigate = useNavigate();
    const [role, setRole] = React.useState('');
    const [gender, setGender] = React.useState('');

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
     const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleSignUp = () => {
        axios.get('http://localhost:8090/api/v1/home/get')
            .then(response => {
                console.log('Data received:', response.data);
                // You can handle the response (e.g., navigate, show success message, etc.)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Optionally show an error message
            });
    };
  return (
    <Box
    display='flex'
    justifyContent='center'   //    horizontal alighnment
    alignItems='center'       //    vertical alighnment
    minHeight="100vh"         //    vertical alighnment
    >
        {/* Form Area */}
        <Box
            border={1}
            borderColor="grey.400"
            borderRadius="7px"
            sx={{ width: '400px', padding: '20px' }}
        >
            <Typography align="center" sx={{ fontSize: '35px', fontFamily: 'Roboto, sans-serif' }}>
                        Sign In
            </Typography>

            <Box
                display='flex'
                flexDirection='row'
                justifyContent="space-between"
            >
                <TextField 
                    sx={{width:'49%'}} 
                    margin='normal'
                    size='small'
                    id="outlined-search" 
                    label="First Name" 
                    type="search" 
                />
                <TextField 
                    sx={{width:'49%'}}
                    size='small'
                    margin='normal'
                    id="outlined-search" 
                    label="Last Name" 
                    type="search" 
                />

            </Box>

            
            <TextField 
                fullWidth
                size='small'
                margin='dense'
                id="outlined-search" 
                label="Email Address" 
                type="search" 
            />
            <TextField 
                fullWidth
                size='small'
                margin='dense'
                id="outlined-search" 
                label="Contact Number" 
                type="search" 
            />
            {/* Specialize */}
            <Box marginTop='8px' marginBottom='5px'>
                <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role-select"
                        size='small'
                        sx={{display:'flex',alignItems:'center'}}
                        value={role}
                        label="Role"
                        onChange={handleChangeRole}
                    >
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        <MenuItem value={'Worden'}>Worden</MenuItem>
                        <MenuItem value={'Student'}>Student</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box marginTop='12px' marginBottom='5px'>
                <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        size='small'
                        value={gender}
                        label="Role"
                        onChange={handleChangeGender}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TextField
                fullWidth
                size='small'
                margin='dense'
                id="outlined-password-input1"
                label="Password"
                type="password"
                autoComplete="new-password"
            />
            <TextField
                fullWidth
                size='small'
                margin='dense'
                id="outlined-password-input2"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
            />
            <Box sx={{ marginTop: '20px' }}>
                <Button fullWidth variant="contained" onClick={handleSignUp}>
                Sign Up
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
                <Typography>Already have an account?</Typography>
                <Button variant="text" onClick={() => navigate('/')}>Sign In</Button>
        </Box>
        </Box>
        
        
        
    </Box>
    
  )
}
