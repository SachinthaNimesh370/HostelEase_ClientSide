import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'regNo',
  'f_Name',
  'l_Name',
  'email',
  'contactNo',
  'role',
  'gender',
  'state'
];

const colWidths = ['12%', '14%', '14%', '18%', '14%', '8%', '8%', '12%'];

export default function Warden() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    regNo: '',
    f_Name: '',
    l_Name: '',
    email: '',
    contactNo: '',
    role: '',
    gender: '',
    state: ''
  });

  useEffect(() => {
    fetchWardens();
  }, []);

  const fetchWardens = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/user/getallwarden', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(warden => ({
          regNo: warden.regNo || '',
          f_Name: warden.f_Name || '',
          l_Name: warden.l_Name || '',
          email: warden.email || '',
          contactNo: warden.contactNo || '',
          role: warden.role || '',
          gender: warden.gender || '',
          state: warden.state !== undefined ? String(warden.state) : '',
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
      regNo: '',
      f_Name: '',
      l_Name: '',
      email: '',
      contactNo: '',
      role: '',
      gender: '',
      state: ''
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
      regNo: selectedRow.regNo,
      f_Name: selectedRow.f_Name,
      l_Name: selectedRow.l_Name,
      email: selectedRow.email,
      contactNo: selectedRow.contactNo,
      role: selectedRow.role,
      gender: selectedRow.gender,
      state: selectedRow.state === 'true' || selectedRow.state === true,
      password: '' // You may want to handle password update separately
    };
    try {
      await axios.post('http://localhost:8090/api/v1/user/userupdate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchWardens();
      handleClear();
    } catch (err) {
      // Handle error as needed
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
