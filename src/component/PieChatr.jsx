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
    <Paper
      elevation={6}
      sx={{
        p: 3,
        borderRadius: 4,
        minWidth: 260,
        background: 'linear-gradient(135deg, #e3f0ff 0%, #ffffff 100%)',
        boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10)',
        border: '1.5px solid #e3f0ff',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 15px 40px 0 rgba(30, 64, 175, 0.18)',
        },
      }}
    >
      <Typography fontWeight={700} color="#1976d2" mb={1} textAlign="center" fontSize={20} letterSpacing={1}>
        Hostel Occupancy
      </Typography>
      <PieChart
        series={[{
          data: pieData,
          innerRadius: 80,
          cornerRadius: 8,
          paddingAngle: 3,
          startAngle: 0,
          endAngle: 360,
          cx: 100,
          cy: 100,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { additionalRadius: -10, color: 'gray', opacity: 0.18 },
        }]}
        {...size}
        slotProps={{ legend: { hidden: true } }}
      >
        <PieCenterLabel>{centerLabel}</PieCenterLabel>
      </PieChart>
      <Typography fontSize={15} color="#1976d2" mt={1.5} textAlign="center" fontWeight={500} letterSpacing={0.5}>
        {label}
      </Typography>
    </Paper>
  );
}
