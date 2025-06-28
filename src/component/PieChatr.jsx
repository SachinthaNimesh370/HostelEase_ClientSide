import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const size = {
  width: 200,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

/**
 * PieChartWithCenterLabel
 * @param {Object} props
 * @param {Object} props.data - Pie chart data as an object
 * @param {string|React.ReactNode} [props.centerLabel] - Center label for the pie chart
 * @param {string} [props.label] - Label to show below the pie chart
 */
export default function PieChartWithCenterLabel({ data, centerLabel, label }) {
  // Transform data object to array for PieChart
  const pieData = data
    ? Object.entries(data).map(([key, value]) => ({
        value: Number(value),
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      }))
    : [];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 260, background: 'linear-gradient(135deg, #e3f0ff 60%, #fafcff 100%)' }}>
      <Typography fontWeight={600} color="#1976d2" mb={1} textAlign="center">
        Hostel Occupancy
      </Typography>
      <PieChart series={[{ data: pieData, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>{centerLabel}</PieCenterLabel>
      </PieChart>
      <Typography fontSize={14} color="#1976d2" mt={1} textAlign="center">
        {label}
      </Typography>
    </Paper>
  );
}
