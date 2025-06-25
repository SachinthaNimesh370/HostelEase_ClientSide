import { Box } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3EA8F5', 
    color: "#fff", 
    position: 'sticky',
    top: 0,
    zIndex: 1,
    textAlign: 'center',
    fontWeight: 700, 
    fontSize:14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFFFFF', 
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ECF6FD', 
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#D7EEFF', 
    cursor: 'pointer',
  },
}));


export default function TableTemplate({ headers = [], rows = [], tableWidth = 1080, tableHeight = 700, colWidths = [], onRowClick }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: tableHeight, width: tableWidth, overflowX: 'hidden' }}>
      <Table stickyHeader sx={{ width: '100%', tableLayout: 'fixed' }} aria-label="customized table">
        <colgroup>
          {headers.map((header, idx) => (
            <col key={header + idx} style={{ width: colWidths[idx] || `${100 / headers.length}%` }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow>
            {headers.map((header, idx) => (
              <StyledTableCell key={header + idx} align="center">
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow
              key={i}
              onClick={onRowClick ? () => { onRowClick(row); setSelectedIndex(i); } : undefined}
              className={selectedIndex === i ? 'Mui-selected' : ''}
            >
              {headers.map((header, idx) => {
                let cellStyle = undefined;
                let cellValue = row[header];
                if (cellValue === null || cellValue === undefined || cellValue === '') {
                  cellValue = 'N/A';
                  cellStyle = { color: '#e53935', fontWeight: 600 };
                } else if (header.toLowerCase().includes('status')) {
                  if (cellValue === 'Pending' || cellValue === 'Inactive') {
                    cellStyle = { color: '#e53935', fontWeight: 600 };
                  } else if (cellValue === 'Solved' || cellValue === 'Approved' || cellValue === 'Active') {
                    cellStyle = { color: '#388e3c', fontWeight: 600 };
                  }
                }
                return (
                  <StyledTableCell key={header + i} align="center" style={cellStyle}>
                    {cellValue}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
