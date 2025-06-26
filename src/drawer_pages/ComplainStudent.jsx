import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'Complain ID',
  'Student Reg No',
  'Category',
  'Content',
  'Date',
  'Time',
  'Status'
  // 'Warden ID' removed for student view
];

export default function ComplainStudent() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Complain ID': '',
    'Student Reg No': '',
    'Category': '',
    'Content': '',
    'Date': '',
    'Time': '',
    'Status': 'Pending',
    // 'Warden ID' removed for student view
  });

  // Fetch only this student's complains
  const fetchComplains = async () => {
    try {
      const token = localStorage.getItem('token');
      const regNo = localStorage.getItem('regNo');
      const response = await fetch('http://localhost:8090/api/v1/complain/getallcomplain', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.code === 200 && data.data && data.data.massage) {
        // Filter only this student's complains
        const mappedRows = data.data.massage
          .filter(item => item.student?.student_id === regNo)
          .map(item => ({
            'Complain ID': item.complain_id || '',
            'Student Reg No': item.student?.student_id || '',
            'Category': item.catagory || '',
            'Content': item.content || '',
            'Date': item.date || '',
            'Time': item.time || '',
            'Status': item.status || ''
          }));
        setRows(mappedRows);
      }
    } catch (error) {
      setRows([]);
    }
  };

  useEffect(() => {
    fetchComplains();
    // Set regNo in Student Reg No field and current date in Date field on mount
    const regNo = localStorage.getItem('regNo') || '';
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    setSelectedRow(prev => ({ ...prev, 'Student Reg No': regNo, 'Date': currentDate }));
    // Set up interval to update time every second
    const interval = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const currentTime = `${hh}:${min}:${ss}`;
      setSelectedRow(prev => ({ ...prev, 'Time': currentTime }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handler for row click
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Handler for Clear button
  const handleClear = () => {
    const regNo = localStorage.getItem('regNo') || '';
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    // Reset time to current time
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hh}:${min}:${ss}`;
    setSelectedRow({
      'Complain ID': '',
      'Student Reg No': regNo,
      'Category': '',
      'Content': '',
      'Date': currentDate,
      'Time': currentTime,
      'Status': 'Pending',
      // 'Warden ID' removed for student view
    });
  };

  // Handler for text field change
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  // Handler for Submit button
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const regNo = localStorage.getItem('regNo');
    // Format date as yyyy/MM/dd
    const dateParts = (selectedRow['Date'] || '').split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}` : selectedRow['Date'];
    // Format time as hh.mm AM/PM
    let formattedTime = selectedRow['Time'];
    if (formattedTime) {
      const [h, m, s] = formattedTime.split(':');
      let hour = parseInt(h, 10);
      const minute = m;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      if (hour === 0) hour = 12;
      formattedTime = `${hour}.${minute} ${ampm}`;
    }
    const payload = {
      complain_id: selectedRow['Complain ID'] ? Number(selectedRow['Complain ID']) : undefined,
      catagory: selectedRow['Category'],
      content: selectedRow['Content'],
      date: formattedDate,
      time: formattedTime,
      status: selectedRow['Status'] || 'Pending',
      student_id: regNo,
      warden_id: ''
    };
    try {
      await fetch('http://localhost:8090/api/v1/complain/newcomplain', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      handleClear();
      await fetchComplains();
      alert('Complain submitted successfully!');
    } catch (error) {
      alert('Failed to submit complain.');
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={2} mt={6}>
      <TableTemplate
        headers={headers}
        rows={rows.map(({ 'Warden ID': _w, ...rest }) => rest)} // Remove Warden ID from table rows
        tableWidth={1080}
        tableHeight={700}
        colWidths={["12%", "14%", "15%", "22%", "10%", "9%", "8%"]} // 7 columns now
        onRowClick={handleRowClick}
      />
      <Box minWidth={300} display="flex" flexDirection="column" gap={2}>
        {headers.map((header) => (
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
              <MenuItem value="Pending">Pending</MenuItem>
              {/* Only Pending for students */}
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
                readOnly: [
                  'Complain ID',
                  'Student Reg No',
                  'Date',
                  'Time'
                ].includes(header)
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  );
}
