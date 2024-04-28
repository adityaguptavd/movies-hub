import { Box } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar';

const Layout = () => {
  return (
      <Box marginLeft={{xs: "5px", sm: "50px"}} marginRight={{xs: "5px", sm: "50px"}}>
        <Navbar />
        <Outlet />
      </Box>
  )
}

export default Layout;