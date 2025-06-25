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
  'Warden ID'
];

const colWidths = ['10%', '12%', '15%', '11%', '12%', '10%', '10%', '8%', '12%'];

export default function Visitors() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Visitor ID': '',
    'NIC': '',
    'Name': '',
    'Student ID': '',
    'Date': '',
    'Entry Time': '',
    'Exit Time': '',
    'Status': '',
    'Warden ID': ''
  });

  useEffect(() => {
    fetchVisitors();
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

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    setSelectedRow({
      'Visitor ID': '',
      'NIC': '',
      'Name': '',
      'Student ID': '',
      'Date': '',
      'Entry Time': '',
      'Exit Time': '',
      'Status': '',
      'Warden ID': ''
    });
  };

  // Handler for text field change
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  // Handler for Add button
  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      visitor_id: selectedRow['Visitor ID'],
      nic: selectedRow['NIC'],
      name: selectedRow['Name'],
      date: selectedRow['Date'],
      entryTime: selectedRow['Entry Time'],
      exitTime: selectedRow['Exit Time'],
      state: selectedRow['Status'],
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/visitor/newvisitor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
      fetchVisitors();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  // Handler for Update button
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      visitor_id: selectedRow['Visitor ID'],
      nic: selectedRow['NIC'],
      name: selectedRow['Name'],
      date: selectedRow['Date'],
      entryTime: selectedRow['Entry Time'],
      exitTime: selectedRow['Exit Time'],
      state: selectedRow['Status'],
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/visitor/updatevisitor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
      fetchVisitors();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  // Handler for Delete button
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      visitor_id: selectedRow['Visitor ID'],
      nic: '',
      name: '',
      date: '',
      entryTime: '',
      exitTime: '',
      state: '',
      student_id: '',
      warden_id: ''
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/visitor/deletevisitor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
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
        rows={rows}
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
              InputProps={{
                readOnly: header === 'Visitor ID'
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}