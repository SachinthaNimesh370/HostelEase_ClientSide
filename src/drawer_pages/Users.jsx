import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'User ID',
  'First Name',
  'Last Name',
  'Email',
  'Mobile No',
  'Role',
  'Gender',
  'Status'
];

const colWidths = ['12%', '14%', '14%', '18%', '14%', '8%', '8%', '12%'];

export default function Users() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'User ID': '',
    'First Name': '',
    'Last Name': '',
    'Email': '',
    'Mobile No': '',
    'Role': '',
    'Gender': '',
    'Status': '',
    password: '' 
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
            'User ID': u.regNo || '',
            'First Name': u.f_Name || '',
            'Last Name': u.l_Name || '',
            'Email': u.email || '',
            'Mobile No': u.contactNo || '',
            'Role': u.role || '',
            'Gender': u.gender || '',
            'Status': u.state === true ? 'Active' : 'Inactive',
            password: u.password 
          };
        });
        setRows(mappedUsers);
      } catch (err) {
        setRows([]);
      }
    };
    fetchUsers();
  }, []);


  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

 
  const handleClear = () => {
    setSelectedRow({
      'User ID': '',
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
    const adminId = localStorage.getItem('regNo') || '';
    const stateBool = selectedRow['Status'] === 'Active';
    const payload = {
      regNo: selectedRow['User ID'],
      f_Name: selectedRow['First Name'],
      l_Name: selectedRow['Last Name'],
      email: selectedRow['Email'],
      contactNo: selectedRow['Mobile No'],
      role: selectedRow['Role'],
      gender: selectedRow['Gender'],
      state: stateBool,
      password: selectedRow.password || '',
      admin_id: adminId
    };
    try {
      await axios.post('http://localhost:8090/api/v1/user/userupdate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const res = await axios.get('http://localhost:8090/api/v1/user/getalluser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const users = res?.data?.data?.massage || [];
      const mappedUsers = users.map(u => {
        const { password, ...rest } = u;
        return {
          'User ID': u.regNo || '',
          'First Name': u.f_Name || '',
          'Last Name': u.l_Name || '',
          'Email': u.email || '',
          'Mobile No': u.contactNo || '',
          'Role': u.role || '',
          'Gender': u.gender || '',
          'Status': u.state === true ? 'Active' : 'Inactive',
          password: u.password
        };
      });
      setRows(mappedUsers);
      handleClear();
    } catch (err) {
      
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    let userId = null;
    try {
      // Fetch all users to get the id for the selected regNo
      const res = await axios.get('http://localhost:8090/api/v1/user/getalluser', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const users = res?.data?.data?.massage || [];
      const found = users.find(u => u.regNo === selectedRow['User ID']);
      userId = found ? found.id : null;
      if (!userId) return;
      // Only send flat, primitive values in the payload (no nested objects)
      const payload = {
        id: userId,
        regNo: selectedRow['User ID'] || '',
        f_Name: selectedRow['First Name'] || '',
        l_Name: selectedRow['Last Name'] || '',
        email: selectedRow['Email'] || '',
        contactNo: selectedRow['Mobile No'] || '',
        role: selectedRow['Role'] || '',
        gender: selectedRow['Gender'] || '',
        state: selectedRow['Status'] === 'Active',
        password: selectedRow.password || ''
      };
      const deleteRes = await axios.post('http://localhost:8090/api/v1/user/deleteuser', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Delete user response:', deleteRes.data);
      // Refresh user list
      const res2 = await axios.get('http://localhost:8090/api/v1/user/getalluser', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const users2 = res2?.data?.data?.massage || [];
      const mappedUsers = users2.map(u => ({
        'User ID': u.regNo || '',
        'First Name': u.f_Name || '',
        'Last Name': u.l_Name || '',
        'Email': u.email || '',
        'Mobile No': u.contactNo || '',
        'Role': u.role || '',
        'Gender': u.gender || '',
        'Status': u.state === true ? 'Active' : 'Inactive',
        password: u.password
      }));
      setRows(mappedUsers);
      handleClear();
    } catch (err) {
      // handle error
      console.log('Delete user error:', err);
    }
  };

  // Get role from localStorage
  const role = localStorage.getItem('role');
  const isWarden = role === 'Warden';

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
          header === 'Status' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          ) : header === 'Role' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Warden">Warden</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
            </TextField>
          ) : header === 'Gender' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            
            </TextField>
          ) : (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: header === 'User ID'
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          
          <Button variant="contained" color="warning" onClick={handleUpdate} disabled={isWarden}>Update</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear} disabled={isWarden}>Clear</Button>
          
        </Box>
      </Box>
    </Box>
  )
}
