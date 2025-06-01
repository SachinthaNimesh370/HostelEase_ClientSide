import { Box,Button,TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useState } from 'react';



export default function SignUp() {
    const navigate = useNavigate();

    // State for all input fields
    const [regNo, setRegNo] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');

    // Dropdown handlers
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };



    const handleSignUp = () => {
        if (password !== confirmPassword || password===null) {
            alert("Passwords do not match");
            return;
        }
        const userData = {
            //id: 0, // let backend auto-generate if needed
            regNo: regNo,
            f_Name: fName,
            l_Name: lName,
            email: email,
            contactNo: contactNo,
            role: role,
            gender: gender,
            password: password
        };
        axios.post('http://localhost:8090/api/v1/user/signup', userData)
            .then(response => {
        const message = response.data.data; // this is massage.getObject() on success
        alert(message);                     // show success message in alert
        console.log("Signup successful:", message);
        navigate('/');
    })
    .catch(error => {
        const errorMessage = error.response?.data?.data || "Signup failed.";
        alert(errorMessage);                // show error message in alert
        console.error("Signup failed:", errorMessage);
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
                    id="First_Name" 
                    label="First Name" 
                    type="search" 
                    onChange={(e) => setFName(e.target.value)}
                />
                <TextField 
                    sx={{width:'49%'}}
                    size='small'
                    margin='normal'
                    id="Last_Name" 
                    label="Last Name" 
                    type="search"
                    onChange={(e) => setLName(e.target.value)} 
                />

            </Box>

            
            <TextField 
                fullWidth
                size='small'
                margin='dense'
                id="Reg_No" 
                label="Reg No" 
                type="search" 
                onChange={(e) => setRegNo(e.target.value)}
            />
            <TextField 
                fullWidth
                size='small'
                margin='dense'
                id="Email_Address" 
                label="Email Address" 
                type="search" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
                fullWidth
                size='small'
                margin='dense'
                id="Contact_Number" 
                label="Contact Number" 
                type="search" 
                onChange={(e) => setContactNo(e.target.value)}
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
                        labelId="Role"
                        id="Role"
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
                id="Password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                fullWidth
                size='small'
                margin='dense'
                id="Confirm_Password"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
