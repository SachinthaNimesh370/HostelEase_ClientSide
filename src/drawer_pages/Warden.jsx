import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'warden_id',
  'hostel_name',
  'block',
  'admin_id'
];

const colWidths = ['20%', '30%', '20%', '30%'];

export default function Warden() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    warden_id: '',
    hostel_name: '',
    block: '',
    admin_id: ''
  });

  useEffect(() => {
    fetchWardens();
  }, []);

  const fetchWardens = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/warden/getallwarden', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(warden => ({
          warden_id: warden.warden_id || '',
          hostel_name: warden.hostel_name || '',
          block: warden.block || '',
          admin_id: warden.admin_id || ''
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
      warden_id: '',
      hostel_name: '',
      block: '',
      admin_id: ''
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
      warden_id: selectedRow.warden_id,
      hostel_name: selectedRow.hostel_name,
      block: selectedRow.block,
      admin_id: selectedRow.admin_id
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/warden/updatewarden', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); 
      fetchWardens();
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
          <TextField
            key={header}
            label={header}
            value={selectedRow[header]}
            onChange={handleFieldChange(header)}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: header === 'warden_id'
            }}
          />
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}
