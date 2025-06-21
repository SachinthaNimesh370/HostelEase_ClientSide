import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const headers = [
  'Rid',
  'RoomNo',
  'Type',
  'Ac',
  'CurrentCount',
  'WardenId'
];

// Example: 15% for Rid, 15% for RoomNo, 20% for Type, 10% for Ac, 20% for CurrentCount, 20% for WardenId
const colWidths = ['10%', '15%', '15%', '10%', '20%', '30%'];

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
  }, []);

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TableTemplate
        headers={headers}
        rows={rows}
        tableWidth={1100}
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
            InputProps={{ readOnly: true }}
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Box>
  )
}