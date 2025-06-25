import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'student_id',
  'duration',
  'admin_id',
  'warden_id',
  'room_id'
];

const colWidths = ['18%', '18%', '18%', '18%', '18%'];

export default function Student() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    student_id: '',
    duration: '',
    admin_id: '',
    warden_id: '',
    room_id: ''
  });

  useEffect(() => {
    fetchStudents();
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
          student_id: student.student_id || '',
          duration: student.duration || '',
          admin_id: student.admin_id || '',
          warden_id: student.warden_id || '',
          room_id: student.room_id || ''
        }));
        setRows(tableRows);
      })
      .catch(err => {
        setRows([]);
      });
  };

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    setSelectedRow({
      student_id: '',
      duration: '',
      admin_id: '',
      warden_id: '',
      room_id: ''
    });
  };

  // Handler for text field change
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  // Handler for Update button
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      student_id: selectedRow.student_id,
      duration: selectedRow.duration,
      admin_id: selectedRow.admin_id,
      warden_id: selectedRow.warden_id,
      room_id: selectedRow.room_id
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/student/updatestudent', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
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
          header === 'duration' ? (
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
          ) : (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: header === 'student_id'
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