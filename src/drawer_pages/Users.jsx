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

export default function Users() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    regNo: '',
    f_Name: '',
    l_Name: '',
    email: '',
    contactNo: '',
    role: '',
    gender: '',
    state: '',
    password: '' // hidden, not shown in UI
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8090/api/v1/user/getalluser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const users = res?.data?.data?.massage || [];
        const mappedUsers = users.map(u => {
          const { password, ...rest } = u;
          return {
            ...rest,
            state: u.state === true ? 'Active' : 'Inactive',
            password: u.password // keep password for update
          };
        });
        setRows(mappedUsers);
      } catch (err) {
        setRows([]);
      }
    };
    fetchUsers();
  }, []);

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
    // Convert state back to boolean
    const stateBool = selectedRow.state === 'Active';
    const payload = {
      regNo: selectedRow.regNo,
      f_Name: selectedRow.f_Name,
      l_Name: selectedRow.l_Name,
      email: selectedRow.email,
      contactNo: selectedRow.contactNo,
      role: selectedRow.role,
      gender: selectedRow.gender,
      state: stateBool,
      password: selectedRow.password || ''
    };
    try {
      await axios.post('http://localhost:8090/api/v1/user/userupdate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // Refresh table
      const res = await axios.get('http://localhost:8090/api/v1/user/getalluser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const users = res?.data?.data?.massage || [];
      const mappedUsers = users.map(u => {
        const { password, ...rest } = u;
        return {
          ...rest,
          state: u.state === true ? 'Active' : 'Inactive',
          password: u.password
        };
      });
      setRows(mappedUsers);
      handleClear();
    } catch (err) {
      // Optionally handle error
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
