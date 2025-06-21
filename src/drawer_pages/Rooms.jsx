import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'Rid',
  'RoomNo',
  'Type',
  'Ac',
  'CurrentCount',
  'WardenId'
];

// Adjusted widths to total 100% and avoid horizontal scroll
const colWidths = ['12%', '16%', '18%', '12%', '20%', '22%'];

export default function Room() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    Rid: '',
    RoomNo: '',
    Type: '',
    Ac: '',
    CurrentCount: '',
    WardenId: ''
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
          Rid: room.room_id,
          RoomNo: room.roomNo,
          Type: room.type,
          Ac: room.ac ? 'Yes' : 'No',
          CurrentCount: room.currentCount,
          WardenId: room.warden?.warden_id || '',
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
      Rid: '',
      RoomNo: '',
      Type: '',
      Ac: '',
      CurrentCount: '',
      WardenId: ''
    });
  };

  // Handler for Add button
  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      room_id: selectedRow.Rid,
      roomNo: selectedRow.RoomNo,
      type: selectedRow.Type,
      ac: selectedRow.Ac === 'Yes' || selectedRow.Ac === true,
      currentCount: selectedRow.CurrentCount,
      warden_id: selectedRow.WardenId
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
        tableHeight={650}
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
          <Button variant="contained" color="warning">Update</Button>
          <Button variant="contained" color="error">Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}