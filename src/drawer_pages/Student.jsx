import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'Student ID',
  'Duration',
  'Admin ID',
  'Warden ID',
  'Room ID'
];

const colWidths = ['18%', '18%', '18%', '18%', '18%'];

export default function Student() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Student ID': '',
    'Duration': '',
    'Admin ID': '',
    'Warden ID': '',
    'Room ID': ''
  });

  // Get role and regNo from localStorage
  const role = localStorage.getItem('role');
  const regNo = localStorage.getItem('regNo');

  useEffect(() => {
    fetchStudents();
    // Set Admin ID or Warden ID based on role and regNo
    if (role === 'Admin') {
      setSelectedRow(prev => ({ ...prev, 'Admin ID': regNo }));
    } else if (role === 'Warden') {
      setSelectedRow(prev => ({ ...prev, 'Warden ID': regNo }));
    }
  }, []);

  const fetchStudents = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/student/getallstudent', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(student => ({
          'Student ID': student.student_id || '',
          'Duration': student.duration || '',
          'Admin ID': student.admin_id || '',
          'Warden ID': student.warden_id || '',
          'Room ID': student.room_id || ''
        }));
        setRows(tableRows);
      })
      .catch(err => {
        setRows([]);
      });
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleClear = () => {
    // Set Admin ID or Warden ID based on role and regNo on clear
    if (role === 'Admin') {
      setSelectedRow({
        'Student ID': '',
        'Duration': '',
        'Admin ID': regNo,
        'Warden ID': '',
        'Room ID': ''
      });
    } else if (role === 'Warden') {
      setSelectedRow({
        'Student ID': '',
        'Duration': '',
        'Admin ID': '',
        'Warden ID': regNo,
        'Room ID': ''
      });
    } else {
      setSelectedRow({
        'Student ID': '',
        'Duration': '',
        'Admin ID': '',
        'Warden ID': '',
        'Room ID': ''
      });
    }
  };

  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
 
    const payload = {
      student_id: selectedRow['Student ID'],
      duration: selectedRow['Duration'],
      admin_id: selectedRow['Admin ID'],
      warden_id: selectedRow['Warden ID'],
      room_id: selectedRow['Room ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/student/updatestudent', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); 
      fetchStudents();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TableTemplate
        headers={headers}
        rows={rows}
        tableWidth={1080}
        tableHeight={650}
        colWidths={colWidths}
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header, idx) => (
          header === 'Duration' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="1 Year">1 Year</MenuItem>
              <MenuItem value="2 Year">2 Year</MenuItem>
              <MenuItem value="3 Year">3 Year</MenuItem>
              <MenuItem value="4 Year">4 Year</MenuItem>
            </TextField>
          ) : header === 'Warden ID' || header === 'Admin ID' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
            />
          ) : (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: header === 'Student ID'
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}