import React from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';

const headers = [
  'student id',
  'student name',
  'warden id',
  'complain',
  'date'
];

const rows = [
  {
    'student id': 'S001',
    'student name': 'John Doe',
    'warden id': 'W01',
    'complain': 'Leaking tap',
    'date': '2025-06-20',
  },
  {
    'student id': 'S002',
    'student name': 'Jane Smith',
    'warden id': 'W02',
    'complain': 'Broken window',
    'date': '2025-06-19',
  }
];

export default function Complain() {
  return (
    <Box>
      <Box>
        This Is Complain Page
      </Box>
      
      <TableTemplate headers={headers} rows={rows} />
    </Box>
    
  )
}
