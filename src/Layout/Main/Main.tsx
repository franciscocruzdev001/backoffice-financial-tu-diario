import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
import Navbar from '@/components/molecules/Navbar/Navbar';
import { useMainState } from './state/useMainState';
import Sidebar from '@/components/molecules/Sidebar/Sidebar';

const Main = () => {
  const { userRoleInfo, navbar, sidebar } = useMainState();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/*Barra de navegacion*/}
      <Navbar userRoleInfo={userRoleInfo} handleLogout={navbar.handleLogout}/>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/*Barra de navegacion lateral*/}
        <Sidebar userRoleInfo={userRoleInfo} handleOnNavigation={sidebar.handleOnNavigation} />

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
          <main>
            {/* The child component (Home or About) will render here */}
            <Outlet />
          </main>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;