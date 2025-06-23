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
    backgroundColor: '#f8f4f4', 
    color: "#120b4f",
    position: 'sticky',
    top: 0,
    zIndex: 1,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#dfdcdc',
    cursor: 'pointer',
  },
}));


export default function TableTemplate({ headers = [], rows = [], tableWidth = 1080, tableHeight = 650, colWidths = [], onRowClick }) {
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
            <StyledTableRow key={i} onClick={onRowClick ? () => onRowClick(row) : undefined}>
              {headers.map((header, idx) => (
                <StyledTableCell key={header + i} align="center">
                  {row[header]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
