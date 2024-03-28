import {Box, Toolbar} from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (

    <Box sx={{display:'flex'}}>
        <Header/>
        <Sidebar/>

        <Box component="main" sx={{flexGrow:1, height:'100vh', overflow: 'auto', width:'100%'}}>
        <Toolbar/>
        <Outlet/>
        </Box>

    </Box>
  )
}

export default Layout