import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { LinkedIn, Twitter, GitHub, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0', borderTop: '1px solid #ddd' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} gap={10} justifyContent="center">
          <Grid item sx={{ display:"flex" ,flexDirection:"column" ,alignItems:"center"}}>
            <IconButton href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ fontSize: 40, color: "black" }}>
              <LinkedIn fontSize="inherit" />
            </IconButton>
            <Typography variant="body2" fontSize={18} align="center">LinkedIn</Typography>
          </Grid>
          <Grid item>
            <IconButton href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" sx={{ fontSize: 40, color: "black"  }}>
              <Twitter fontSize="inherit" />
            </IconButton>
            <Typography variant="body2" fontSize={18} align="center">Twitter</Typography>
          </Grid>
          <Grid item>
            <IconButton href="https://www.github.com" target="_blank" rel="noopener noreferrer" sx={{ fontSize: 40, color: "black"  }}>
              <GitHub fontSize="inherit" />
            </IconButton>
            <Typography variant="body2" fontSize={18} align="center">GitHub</Typography>
          </Grid>
          <Grid item>
            <IconButton  href="mailto:ruveydaeto@hotmail.com" sx={{ fontSize: 40, color: "black"  }}>
              <Email fontSize="inherit" />
            </IconButton>
            <Typography fontSize={18} variant="body2" align="center">Email</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: '20px', color: "black"  }}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;