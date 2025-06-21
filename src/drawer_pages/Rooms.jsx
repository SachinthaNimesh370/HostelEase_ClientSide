import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';

const headers = [
  'Rid',
  'RoomNo',
  'Type',
  'Ac',
  'CurrentCount',
  'WardenId'
];

export default function Room() {
  const [rows, setRows] = useState([]);

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

  return (
    <Box>
      <Box>This Is Room Page</Box>
      <TableTemplate headers={headers} rows={rows} />
    </Box>
  )
}