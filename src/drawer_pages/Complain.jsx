import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '../component/Alert';

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
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

 
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
   
    const role = localStorage.getItem('role');
    const regNo = localStorage.getItem('regNo');
    setSelectedRow(prev => ({
      ...prev,
      'Warden ID': role === 'Warden' ? regNo : ''
    }));
    fetchComplains();
  }, []);

  
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  
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

 
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

 
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
      const res = await fetch('http://localhost:8090/api/v1/complain/updatecomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await fetchComplains();
      handleClear();
      setAlert({ open: true, message: data?.data?.massage || 'Complain updated successfully!', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: error?.message || 'Failed to update complain', severity: 'error' });
    }
  };

  
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
      const res = await fetch('http://localhost:8090/api/v1/complain/deletecomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await fetchComplains();
      handleClear();
      setAlert({ open: true, message: data?.data?.massage || 'Complain deleted successfully!', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: error?.message || 'Failed to delete complain', severity: 'error' });
    }
  };

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => setAlert(a => ({ ...a, open: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.open]);

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
      {alert.open && alert.message && (
        <Alert severity={alert.severity} onClose={() => setAlert(a => ({ ...a, open: false }))}>
          {alert.message}
        </Alert>
      )}
    </Box>
  )
}