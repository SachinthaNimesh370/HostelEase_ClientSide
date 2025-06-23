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

export default function Admin() {
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
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/user/getalladmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(admin => ({
          regNo: admin.regNo || '',
          f_Name: admin.f_Name || '',
          l_Name: admin.l_Name || '',
          email: admin.email || '',
          contactNo: admin.contactNo || '',
          role: admin.role || '',
          gender: admin.gender || '',
          state: admin.state !== undefined ? String(admin.state) : '',
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
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}
