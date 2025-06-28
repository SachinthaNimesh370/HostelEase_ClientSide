import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TableTemplate from '../component/TableTemplate';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '../component/Alert';

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
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const role = localStorage.getItem('role');
  const regNo = localStorage.getItem('regNo');

  useEffect(() => {
    fetchPayments();
   
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    setSelectedRow(prev => ({ ...prev, 'Date': currentDate }));
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

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

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

  const handleFieldChange = (header) => (event) => {
    setSelectedRow(prev => ({ ...prev, [header]: event.target.value }));
  };

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      PaymentId: selectedRow['Payment ID'] ? Number(selectedRow['Payment ID']) : undefined,
      amount: parseFloat(selectedRow['Amount']),
      description: selectedRow['Description'],
      date: selectedRow['Date'],
      status: selectedRow['Status'],
      student_id: selectedRow['Student ID'],
      warden_id: selectedRow['Warden ID'] || ""
    };
    try {
      const res = await axios.post('http://localhost:8090/api/v1/payment/newpayment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchPayments();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Payment added successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err?.response?.data?.message || 'Failed to add payment', severity: 'error' });
    }
  };

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
      fetchPayments();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Payment updated successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err?.response?.data?.message || 'Failed to update payment', severity: 'error' });
    }
  };

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
      fetchPayments();
      handleClear();
      setAlert({ open: true, message: res.data?.data?.massage || 'Payment deleted successfully!', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err?.response?.data?.message || 'Failed to delete payment', severity: 'error' });
    }
  };

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => setAlert(a => ({ ...a, open: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.open]);

  const isAdmin = role === 'Admin';

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
          ) : header === 'Warden ID' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              onChange={handleFieldChange(header)}
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value="N/A">N/A</MenuItem>
              {role === 'Warden' && regNo && (
                <MenuItem value={regNo}>{regNo}</MenuItem>
              )}
            </TextField>
          ) : header === 'Date' ? (
            <TextField
              key={header}
              label={header}
              value={selectedRow[header]}
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
            />
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
          <Button variant="contained" color="primary" onClick={handleAdd} disabled={isAdmin}>New Payment</Button>
          <Button variant="contained" color="warning" onClick={handleUpdate} disabled={isAdmin}>Update</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={isAdmin}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear} disabled={isAdmin}>Clear</Button>
        </Box>
      </Box>
      {alert.open && alert.message && (
        <Alert severity={alert.severity} onClose={() => setAlert(a => ({ ...a, open: false }))}>
          {alert.message}
        </Alert>
      )}
    </Box>
  )
}