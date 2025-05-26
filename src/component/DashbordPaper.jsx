import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function DashbordPaper() {
  return (
    <Box>
        <Box
            
            sx={{
            
            boxShadow: 3, // elevation-like effect
            borderRadius: 1, // optional: soft corners like Paper
            p: 2, // shorthand for padding
            
            }}
            padding={2}
              
        >   
            <Typography display='flex' justifyContent='center' fontSize={22}>Today Summery</Typography>
            <Box
                justifyContent="space-between"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 200,
                    height: 125,   
                },

                }}
            >
                <Paper elevation={3} sx={{backgroundColor:'#FFE2E5'}}>

                    {/* Title */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'15px', fontSize:'18px',color:'#FA5A7D',fontWeight:'600'}}
                    
                    >
                    Students
                    </Box>

                    {/* Content */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'8px', fontSize:'30px',color:'#FA5A7D',fontWeight:'600'}}
                    >
                    20
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{backgroundColor:'#FFF4DE'}}>

                    {/* Title */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'15px', fontSize:'18px',color:'#FF947A',fontWeight:'600'}}
                    
                    >
                    Available Rooms
                    </Box>

                    {/* Content */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'8px', fontSize:'30px',color:'#FF947A',fontWeight:'600'}}
                    >
                    20
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{backgroundColor:'#DCFCE7'}}>

                    {/* Title */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'15px', fontSize:'18px',color:'#3CD856',fontWeight:'600'}}
                    
                    >
                    Complains
                    </Box>

                    {/* Content */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'8px', fontSize:'30px',color:'#3CD856',fontWeight:'600'}}
                    >
                    20
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{backgroundColor:'#F3E8FF'}}>

                    {/* Title */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'15px', fontSize:'18px',color:'#BF83FF',fontWeight:'600'}}
                    
                    >
                    Late Payment
                    </Box>

                    {/* Content */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'8px', fontSize:'30px',color:'#BF83FF',fontWeight:'600'}}
                    >
                    20
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{backgroundColor:'yellow'}}>

                    {/* Title */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'15px', fontSize:'18px',color:'red',fontWeight:'600'}}
                    
                    >
                    Visitors Count
                    </Box>

                    {/* Content */}
                    <Box
                    display='flex'
                    justifyContent='center'
                    sx={{margin:'8px', fontSize:'30px',color:'red',fontWeight:'600'}}
                    >
                    20
                    </Box>
                </Paper>
                
            
            
            </Box>
        </Box>
    </Box>
  )
}
