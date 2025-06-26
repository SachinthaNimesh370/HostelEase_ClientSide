import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'Complain ID',
  'Student Reg No',
  'Category',
  'Content',
  'Date',
  'Time',
  'Status',
  'Warden ID'
];

export default function Complain() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Complain ID': '',
    'Student Reg No': '',
    'Category': '',
    'Content': '',
    'Date': '',
    'Time': '',
    'Status': '',
    'Warden ID': ''
  });

  // Move fetchComplains outside useEffect so it can be called after update
  const fetchComplains = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/v1/complain/getallcomplain', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.code === 200 && data.data && data.data.massage) {
        const mappedRows = data.data.massage.map(item => ({
          'Complain ID': item.complain_id || '',
          'Student Reg No': item.student?.student_id || '',
          'Category': item.catagory || '',
          'Content': item.content || '',
          'Date': item.date || '',
          'Time': item.time || '',
          'Status': item.status || '',
          'Warden ID': item.warden?.warden_id || '',
        }));
        setRows(mappedRows);
      }
    } catch (error) {
      setRows([]);
    }
  };

  useEffect(() => {
    // On mount, set Warden ID if role is Warden
    const role = localStorage.getItem('role');
    const regNo = localStorage.getItem('regNo');
    setSelectedRow(prev => ({
      ...prev,
      'Warden ID': role === 'Warden' ? regNo : ''
    }));
    fetchComplains();
  }, []);

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    const role = localStorage.getItem('role');
    const regNo = localStorage.getItem('regNo');
    setSelectedRow({
      'Complain ID': '',
      'Student Reg No': '',
      'Category': '',
      'Content': '',
      'Date': '',
      'Time': '',
      'Status': '',
      'Warden ID': role === 'Warden' ? regNo : ''
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
      complain_id: selectedRow['Complain ID'],
      catagory: selectedRow['Category'],
      content: selectedRow['Content'],
      date: selectedRow['Date'],
      time: selectedRow['Time'],
      status: selectedRow['Status'],
      student_id: selectedRow['Student Reg No'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      await fetch('http://localhost:8090/api/v1/complain/updatecomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      // Refresh table and clear fields
      await fetchComplains();
      handleClear();
    } catch (error) {
      // Handle error as needed
    }
  };

  // Handler for Delete button
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      complain_id: selectedRow['Complain ID'],
      catagory: selectedRow['Category'],
      content: selectedRow['Content'],
      date: selectedRow['Date'],
      time: selectedRow['Time'],
      status: selectedRow['Status'],
      student_id: selectedRow['Student Reg No'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      await fetch('http://localhost:8090/api/v1/complain/deletecomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      await fetchComplains();
      handleClear();
    } catch (error) {
      
    }
  };

  // Determine if buttons should be disabled based on role
  const role = localStorage.getItem('role');
  const isAdmin = role === 'Admin';

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TableTemplate
        headers={headers}
        rows={rows}
        tableWidth={1080}
        tableHeight={700}
        colWidths={["12%", "14%", "15%", "22%", "10%", "9%", "8%", "10%"]}
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header) => (
          header === 'Status' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Solved">Solved</MenuItem>
            </TextField>
          ) : header === 'Warden ID' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value={localStorage.getItem('regNo') || ''}>{localStorage.getItem('regNo') || 'Warden RegNo'}</MenuItem>
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
                readOnly: [
                  'Complain ID',
                  'Student Reg No',
                  'Category',
                  'Content',
                  'Date',
                  'Time'
                ].includes(header)
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="warning" onClick={handleUpdate} disabled={isAdmin}>Update</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={isAdmin}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear} disabled={isAdmin}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}