import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'Warden ID',
  'Hostel Name',
  'Block',
  'Admin ID'
];

const colWidths = ['20%', '30%', '20%', '30%'];

export default function Warden() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Warden ID': '',
    'Hostel Name': '',
    'Block': '',
    'Admin ID': ''
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
          'Warden ID': warden.warden_id || '',
          'Hostel Name': warden.hostel_name || '',
          'Block': warden.block || '',
          'Admin ID': warden.admin_id || ''
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
    setSelectedRow({
      'Warden ID': '',
      'Hostel Name': '',
      'Block': '',
      'Admin ID': ''
    });
  };

  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      warden_id: selectedRow['Warden ID'],
      hostel_name: selectedRow['Hostel Name'],
      block: selectedRow['Block'],
      admin_id: selectedRow['Admin ID']
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
              readOnly: header === 'Warden ID'
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
