import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '../component/Alert';

const headers = [
  'Room ID',
  'Room No',
  'Capacity',
  'Current Count',
  'AC',
  'Warden ID'
];

const colWidths = ['12%', '16%', '18%', '12%', '20%', '22%'];

export default function Room() {
  const [rows, setRows] = useState([]);
  const headerKeyMap = {
    'Room ID': 'Rid',
    'Room No': 'RoomNo',
    'Capacity': 'Type',
    'AC': 'Ac',
    'Current Count': 'CurrentCount',
    'Warden ID': 'WardenId'
  };
  const [selectedRow, setSelectedRow] = useState({
    'Room ID': '',
    'Room No': '',
    'Capacity': '',
    'AC': '',
    'Current Count': '',
    'Warden ID': ''
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    // Set Warden ID based on role on mount
    const role = localStorage.getItem('role');
    const regNo = localStorage.getItem('regNo');
    setSelectedRow(prev => ({
      ...prev,
      'Warden ID': role === 'Warden' ? regNo : ''
    }));
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/room/getallroom', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(room => ({
          'Room ID': room.room_id,
          'Room No': room.roomNo,
          'Capacity': room.type, // previously 'Type', now 'Capacity'
          'AC': room.ac ? 'Yes' : 'No',
          'Current Count': room.currentCount,
          'Warden ID': room.warden?.warden_id || '',
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
    const role = localStorage.getItem('role');
    const regNo = localStorage.getItem('regNo');
    setSelectedRow({
      'Room ID': '',
      'Room No': '',
      'Capacity': '',
      'AC': '',
      'Current Count': '',
      'Warden ID': role === 'Warden' ? regNo : ''
    });
  };

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow['Room ID'],
      roomNo: selectedRow['Room No'],
      type: selectedRow['Capacity'],
      ac: selectedRow['AC'] === 'Yes' || selectedRow['AC'] === true,
      currentCount: selectedRow['Current Count'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/room/newroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Room added successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.message || 'Failed to add room', severity: 'error' });
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow['Room ID'],
      roomNo: selectedRow['Room No'],
      type: selectedRow['Capacity'],
      ac: selectedRow['AC'] === 'Yes' || selectedRow['AC'] === true,
      currentCount: selectedRow['Current Count'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/room/updateroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Room updated successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.message || 'Failed to update room', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow['Room ID'],
      roomNo: '',
      type: '',
      ac: null,
      currentCount: '',
      warden_id: ''
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/room/deleteroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Room deleted successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.message || 'Failed to delete room', severity: 'error' });
    }
  };

  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => setAlert(a => ({ ...a, open: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.open]);

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
        colWidths={colWidths}
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header, idx) => (
          header === 'Capacity' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </TextField>
          ) : header === 'Current Count' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              {(() => {
                const cap = Number(selectedRow['Capacity']);
                if (cap === 2) {
                  return [0, 1, 2].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>);
                } else if (cap === 4) {
                  return [0, 1, 2, 3, 4].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>);
                } else {
                  return <MenuItem value={0}>0</MenuItem>;
                }
              })()}
            </TextField>
          ) : header === 'AC' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header] || 'No'}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          ) : (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              InputProps={header === 'Warden ID' ? { readOnly: true } : {}}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd} disabled={isAdmin}>Add</Button>
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