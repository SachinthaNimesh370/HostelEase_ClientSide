import React from 'react';
import { Paper, Box, Avatar, Typography, LinearProgress } from '@mui/material';

/**
 * DashboardCard - A reusable stat card for dashboard widgets.
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon component to display in the avatar.
 * @param {string|number} props.value - Main value to display.
 * @param {string} props.label - Label text below the icon.
 * @param {string} props.avatarColor - Background color for the avatar.
 * @param {string} props.valueColor - Color for the value text.
 * @param {string} props.labelColor - Color for the label text.
 * @param {string} props.bgGradient - Background gradient for the Paper.
 * @param {number} props.progress - Progress bar value (0-100).
 * @param {string} props.progressColor - Background color for the progress bar.
 */
const DashboardCard = ({
  icon,
  value,
  label,
  avatarColor = '#1976d2',
  valueColor = '#1976d2',
  labelColor = '#1976d2',
  bgGradient = 'linear-gradient(135deg, #fafcff 0%, #fafcff 100%)',
  progress = 0,
  progressColor = '#e3f2fd',
}) => (
  <Paper
    elevation={4}
    sx={{
      background: bgGradient,
      borderRadius: 2,
      minWidth: 200,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      '&:hover, &:focus': {
        transform: 'translateY(-1px) ',
        boxShadow: 8,
        
      },
    }}
    tabIndex={0}
  >
    <Box display='flex' flexDirection='column' alignItems='center' p={2}>
      <Avatar sx={{ bgcolor: avatarColor, width: 48, height: 48, mb: 1 }}>
        {icon}
      </Avatar>
      <Typography fontSize={18} color={labelColor} fontWeight={700}>{label}</Typography>
      <Typography fontSize={32} color={valueColor} fontWeight={700}>
        {value}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ width: '80%', mt: 1, bgcolor: progressColor, height: 6, borderRadius: 3 }} />
    </Box>
  </Paper>
);

export default DashboardCard;
