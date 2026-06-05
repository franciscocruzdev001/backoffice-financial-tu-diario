import React, { JSX } from 'react';
import { Box } from '@mui/material';
import Navbar from '../molecules/Navbar';
import Sidebar from '../molecules/Sidebar';

const DashboardLayout = ({ children }: {children:JSX.Element}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      { /*<Navbar />*/ }
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        { /*<Sidebar />*/ }
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)',
            width: '100%', 
            overflow: 'hidden' 
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;