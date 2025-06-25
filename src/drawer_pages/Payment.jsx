import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const headers = [
  'Payment ID',
  'Student ID',
  'Amount',
  'Description',
  'Date',
  'Status',
  'Warden ID'
];

const colWidths = ['12%', '14%', '14%', '18%', '15%', '15%', '12%'];

export default function Payment() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    'Payment ID': '',
    'Student ID': '',
    'Amount': '',
    'Description': '',
    'Date': '',
    'Status': '',
    'Warden ID': ''
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8090/api/v1/payment/getallpayment', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const massage = res.data?.data?.massage || [];
        const tableRows = massage.map(payment => ({
          'Payment ID': payment.payment_id || '',
          'Student ID': payment.student?.student_id || '',
          'Amount': payment.amount || '',
          'Description': payment.description || '',
          'Date': payment.date || '',
          'Status': payment.status || '',
          'Warden ID': payment.warden?.warden_id || '',
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
      'Payment ID': '',
      'Student ID': '',
      'Amount': '',
      'Description': '',
      'Date': '',
      'Status': '',
      'Warden ID': ''
    });
  };

  // Handler for text field change
  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  // Handler for Add button
  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      PaymentId: selectedRow['Payment ID'] ? Number(selectedRow['Payment ID']) : undefined,
      amount: parseFloat(selectedRow['Amount']),
      description: selectedRow['Description'],
      date: selectedRow['Date'],
      status: selectedRow['Status'],
      student_id: selectedRow['Student ID'],
      wardenId: selectedRow['Warden ID'] || ""
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/payment/newpayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
      fetchPayments();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  // Handler for Update button
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      payment_id: selectedRow['Payment ID'],
      amount: parseFloat(selectedRow['Amount']),
      description: selectedRow['Description'],
      date: selectedRow['Date'],
      status: selectedRow['Status'],
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID']
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/payment/updatepayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
      fetchPayments();
      handleClear();
    } catch (err) {
      console.log(err?.response?.data || err);
    }
  };

  // Handler for Delete button
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      payment_id: selectedRow['Payment ID'],
      amount: '',
      description: '',
      date: '',
      status: '',
      student_id: '',
      warden_id: ''
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/payment/deletepayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Log the response
      fetchPayments();
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
              InputProps={{
                readOnly: header === 'Payment ID'
              }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
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
                readOnly: header === 'Payment ID'
              }}
            />
          )
        ))}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>New Payment</Button>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}