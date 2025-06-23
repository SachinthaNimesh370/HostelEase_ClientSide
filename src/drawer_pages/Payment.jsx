import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const headers = [
  'payment_id',
  'student_id',
  'amount',
  'description',
  'date',
  'status',
  'warden_id'
];

const colWidths = ['12%', '16%', '14%', '18%', '14%', '14%', '12%'];

export default function Payment() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    payment_id: '',
    student_id: '',
    amount: '',
    description: '',
    date: '',
    status: '',
    warden_id: ''
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
          payment_id: payment.payment_id || '',
          student_id: payment.student?.student_id || '',
          amount: payment.amount || '',
          description: payment.description || '',
          date: payment.date || '',
          status: payment.status || '',
          warden_id: payment.warden?.warden_id || '',
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
      payment_id: '',
      student_id: '',
      amount: '',
      description: '',
      date: '',
      status: '',
      warden_id: ''
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
      payment_id: selectedRow.payment_id,
      amount: parseFloat(selectedRow.amount),
      description: selectedRow.description,
      date: selectedRow.date,
      status: selectedRow.status,
      student_id: selectedRow.student_id,
      warden_id: selectedRow.warden_id
    };
    try {
      await axios.post('http://localhost:8090/api/v1/payment/newpayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchPayments();
      handleClear();
    } catch (err) {
      // Handle error as needed
    }
  };

  // Handler for Update button
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      payment_id: selectedRow.payment_id,
      amount: parseFloat(selectedRow.amount),
      description: selectedRow.description,
      date: selectedRow.date,
      status: selectedRow.status,
      student_id: selectedRow.student_id,
      warden_id: selectedRow.warden_id
    };
    try {
      await axios.post('http://localhost:8090/api/v1/payment/updatepayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchPayments();
      handleClear();
    } catch (err) {
      // Handle error as needed
    }
  };

  // Handler for Delete button
  const handleDelete = async () => {
    // Implement the logic for deleting a payment here
    // Example: POST to /api/v1/payment/deletepayment
    // After success, refresh table and clear fields
    handleClear();
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
          <Button variant="contained" color="primary" onClick={handleAdd}>New Payment</Button>
          <Button variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
        </Box>
      </Box>
    </Box>
  )
}