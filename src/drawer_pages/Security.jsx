import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'Admin ID',
  'First Name',
  'Last Name',
  'Email',
  'Mobile No',
  'Role',
  'Gender',
  'Status'
];

const colWidths = ['12%', '14%', '14%', '18%', '14%', '8%', '8%', '12%'];

export default function Security() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Admin ID': '',
    'First Name': '',
    'Last Name': '',
    'Email': '',
    'Mobile No': '',
    'Role': '',
    'Gender': '',
    'Status': ''
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/user/getallsecurity', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(admin => ({
          'Admin ID': admin.regNo || '',
          'First Name': admin.f_Name || '',
          'Last Name': admin.l_Name || '',
          'Email': admin.email || '',
          'Mobile No': admin.contactNo || '',
          'Role': admin.role || '',
          'Gender': admin.gender || '',
          'Status': admin.state === true ? 'Active' : 'Inactive',
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
      'Admin ID': '',
      'First Name': '',
      'Last Name': '',
      'Email': '',
      'Mobile No': '',
      'Role': '',
      'Gender': '',
      'Status': ''
    });
  };


  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };


  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      regNo: selectedRow['Admin ID'],
      f_Name: selectedRow['First Name'],
      l_Name: selectedRow['Last Name'],
      email: selectedRow['Email'],
      contactNo: selectedRow['Mobile No'],
      role: selectedRow['Role'],
      gender: selectedRow['Gender'],
      state: selectedRow['Status'] === 'true' || selectedRow['Status'] === true,
      password: '' 
    };
    try {
      await axios.post('http://localhost:8090/api/v1/user/userupdate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchAdmins();
      handleClear();
    } catch (err) {
      
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
