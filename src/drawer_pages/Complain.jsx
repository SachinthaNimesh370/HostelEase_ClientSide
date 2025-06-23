import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'complain_id',
  'student_id',
  'catagory',
  'content',
  'date',
  'time',
  'status',
  'warden_id'
];

export default function Complain() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    complain_id: '',
    student_id: '',
    catagory: '',
    content: '',
    date: '',
    time: '',
    status: '',
    warden_id: ''
  });

  // Move fetchComplains outside useEffect so it can be called after update
  const fetchComplains = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/v1/complain/getallcomplain', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.code === 200 && data.data && data.data.massage) {
        const mappedRows = data.data.massage.map(item => ({
          'complain_id': item.complain_id || '',
          'student_id': item.student?.student_id || '',
          'catagory': item.catagory || '',
          'content': item.content || '',
          'date': item.date || '',
          'time': item.time || '',
          'status': item.status || '',
          'warden_id': item.warden?.warden_id || '',
        }));
        setRows(mappedRows);
      }
    } catch (error) {
      setRows([]);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    setSelectedRow({
      complain_id: '',
      student_id: '',
      catagory: '',
      content: '',
      date: '',
      time: '',
      status: '',
      warden_id: ''
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
      complain_id: selectedRow.complain_id,
      catagory: selectedRow.catagory,
      content: selectedRow.content,
      date: selectedRow.date,
      time: selectedRow.time,
      status: selectedRow.status,
      student_id: selectedRow.student_id,
      warden_id: selectedRow.warden_id
    };
    try {
      await fetch('http://localhost:8090/api/v1/complain/updatecomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      // Refresh table and clear fields
      await fetchComplains();
      handleClear();
    } catch (error) {
      // Handle error as needed
    }
  };

  // Handler for Delete button (dummy, implement as needed)
  const handleDelete = () => {
    // Implement delete logic here
    handleClear();
  };

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TableTemplate
        headers={headers}
        rows={rows}
        tableWidth={1080}
        tableHeight={750}
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header) => (
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
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}