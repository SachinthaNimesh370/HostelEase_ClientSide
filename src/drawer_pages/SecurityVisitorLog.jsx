import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'Visitor ID',
  'NIC',
  'Name',
  'Student ID',
  'Date',
  'Entry Time',
  'Exit Time',
  'Status',
  'Warden ID',
  'Security ID' 
];

const colWidths = ['10%', '10%', '15%', '11%', '12%', '10%', '10%', '8%', '12%', '12%'];

export default function SecurityVisitorLog() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Visitor ID': '',
    'NIC': '',
    'Name': '',
    'Student ID': '',
    'Date': '',
    'Entry Time': '',
    'Exit Time': '',
    'Status': 'Pending',
    'Warden ID': '',
    'ID': localStorage.getItem('regNo') || '' 
  });

  useEffect(() => {
    
    setSelectedRow(prev => {
      let newDate = prev['Date'];
      if (!newDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        newDate = `${yyyy}-${mm}-${dd}`;
      }
      return { ...prev, 'Date': newDate, 'Security ID': localStorage.getItem('regNo') || '' };
    });
    
    const interval = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const currentTime = `${hh}:${min}:${ss}`;
      setSelectedRow(prev => ({ ...prev, 'Entry Time': currentTime }));
    }, 1000);
    fetchVisitors();
    return () => clearInterval(interval);
  }, []);

  const fetchVisitors = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/visitor/getallvisitor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(visitor => ({
          'Visitor ID': visitor.visitor_id || '',
          'NIC': visitor.nic || '',
          'Name': visitor.name || '',
          'Student ID': visitor.student?.student_id || '',
          'Date': visitor.date || '',
          'Entry Time': visitor.entryTime || '',
          'Exit Time': visitor.exitTime || '',
          'Status': visitor.state || '',
          'Warden ID': visitor.warden?.warden_id || '',
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
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    setSelectedRow({
      'Visitor ID': '',
      'NIC': '',
      'Name': '',
      'Student ID': '',
      'Date': currentDate,
      'Entry Time': '',
      'Exit Time': '',
      'Status': 'Pending',
      'Warden ID': '',
      'Security ID': localStorage.getItem('regNo') || ''
    });
  };

  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    
    const dateParts = (selectedRow['Date'] || '').split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}` : selectedRow['Date'];
   
    function formatTime(t) {
      if (!t) return '';
      const [h, m, s] = t.split(':');
      let hour = parseInt(h, 10);
      const minute = m;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      if (hour === 0) hour = 12;
      return `${hour}.${minute} ${ampm}`;
    }
    const payload = {
      visitor_id: selectedRow['Visitor ID'] ? Number(selectedRow['Visitor ID']) : undefined,
      nic: selectedRow['NIC'],
      name: selectedRow['Name'],
      date: formattedDate,
      entryTime: formatTime(selectedRow['Entry Time']),
      exitTime: formatTime(selectedRow['Exit Time']),
      state: (selectedRow['Status'] || '').toLowerCase(),
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID'],
      security_id: selectedRow['Security ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/visitor/newvisitor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); 
      fetchVisitors();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
   
    const dateParts = (selectedRow['Date'] || '').split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}` : selectedRow['Date'];
    function formatTime(t) {
      if (!t) return '';
      const [h, m, s] = t.split(':');
      let hour = parseInt(h, 10);
      const minute = m;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      if (hour === 0) hour = 12;
      return `${hour}.${minute} ${ampm}`;
    }
    const payload = {
      visitor_id: selectedRow['Visitor ID'] ? Number(selectedRow['Visitor ID']) : undefined,
      nic: selectedRow['NIC'],
      name: selectedRow['Name'],
      date: formattedDate,
      entryTime: formatTime(selectedRow['Entry Time']),
      exitTime: formatTime(selectedRow['Exit Time']),
      state: (selectedRow['Status'] || '').toLowerCase(),
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID'],
      security_id: selectedRow['Security ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/visitor/updatevisitor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); 
      fetchVisitors();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TableTemplate
        headers={headers}
        rows={rows.map(row => ({ ...row, 'Security ID': localStorage.getItem('regNo') || '' }))}
        tableWidth={1080}
        tableHeight={650}
        colWidths={colWidths}
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header, idx) => (
          header === 'Status' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
              InputProps={{
                readOnly: true
              }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
            </TextField>
          ) : (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: header === 'Visitor ID' || header === 'Date' || header === 'Entry Time' || header === 'Warden ID' || header === 'Security ID'
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}
