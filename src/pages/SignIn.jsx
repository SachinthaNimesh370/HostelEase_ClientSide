
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();


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
                label="User Name"
                type="search"
                />
                <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Password"
                type="password"
                autoComplete="new-password"
                />
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Button fullWidth variant="contained">
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
