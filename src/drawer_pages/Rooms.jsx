import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Use user-friendly headers for display
const headers = [
  'Room ID',
  'Room No',
  'Type',
  'AC',
  'Current Count',
  'Warden ID'
];

// Adjusted widths to total 100% and avoid horizontal scroll
const colWidths = ['12%', '16%', '18%', '12%', '20%', '22%'];

export default function Room() {
  const [rows, setRows] = useState([]);
  // Map new header names to data keys
  const headerKeyMap = {
    'Room ID': 'Rid',
    'Room No': 'RoomNo',
    'Type': 'Type',
    'AC': 'Ac',
    'Current Count': 'CurrentCount',
    'Warden ID': 'WardenId'
  };
  const [selectedRow, setSelectedRow] = useState({
    'Room ID': '',
    'Room No': '',
    'Type': '',
    'AC': '',
    'Current Count': '',
    'Warden ID': ''
  });

  useEffect(() => {
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
          'Type': room.type,
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

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    setSelectedRow({
      'Room ID': '',
      'Room No': '',
      'Type': '',
      'AC': '',
      'Current Count': '',
      'Warden ID': ''
    });
  };

  // Handler for Add button
  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow['Room ID'],
      roomNo: selectedRow['Room No'],
      type: selectedRow['Type'],
      ac: selectedRow['AC'] === 'Yes' || selectedRow['AC'] === true,
      currentCount: selectedRow['Current Count'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      await axios.post('http://localhost:8090/api/v1/room/newroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
    } catch (err) {
      // Handle error as needed
    }
  };

  // Handler for Update button
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow['Room ID'],
      roomNo: selectedRow['Room No'],
      type: selectedRow['Type'],
      ac: selectedRow['AC'] === 'Yes' || selectedRow['AC'] === true,
      currentCount: selectedRow['Current Count'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      await axios.post('http://localhost:8090/api/v1/room/updateroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
    } catch (err) {
      // Handle error as needed
    }
  };

  // Handler for Delete button
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
      await axios.post('http://localhost:8090/api/v1/room/deleteroom', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchRooms();
      handleClear();
    } catch (err) {
      // Handle error as needed
    }
  };

  // Handler for text field change
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

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
          <TextField
            key={header}
            label={header}
            value={selectedRow[header]}
            onChange={handleFieldChange(header)}
            variant="outlined"
            size="small"
          />
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