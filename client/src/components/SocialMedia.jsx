// SocialMediaIcons.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Twitter, Instagram, LinkedIn, Email, GitHub } from '@mui/icons-material';

const SocialMediaIcons = () => {
  return (
    <Box sx={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 2,padding:"10px",backgroundColor:"#f8ffb0" }}>
      <Email sx={{fontSize:"30px"}} />
      <LinkedIn sx={{fontSize:"30px"}}  />
      <Twitter sx={{fontSize:"30px"}}  />
      <Instagram sx={{fontSize:"30px"}}  />
      <GitHub sx={{fontSize:"30px"}}  />
      
    </Box>
  );
};

export default SocialMediaIcons;