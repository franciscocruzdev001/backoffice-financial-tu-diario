import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/styles';
import './index.css';
import theme from './theme.ts';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { ROUTES } from './shared/constants/routes.ts';
import Authentication from './containers/Login/Authentication/Authentication.tsx';
import ResetPassword from './containers/Login/ResetPassword/ResetPassword.tsx';
import Main from './Layout/Main/Main.tsx';
import DashnboardHome from './containers/Main/DashboardHome/DashnboardHome.tsx';
import CustomersDashboardContainer from './containers/Customers/CustomersDashboardContainer/CustomersDashboardContainer.tsx';
import CustomerContainer from './containers/Customers/CustomerContainer/CustomerContainer.tsx';
import EmployeesDashboardContainer from './containers/Employees/EmployeesDashboardContainer/EmployeesDashboardContainer.tsx';


export const appRouter = createBrowserRouter([
  //Main route
  { path: '/', element: <Main/>, 
    children: [
      { index: true, path: "dashboard", Component: DashnboardHome },
      // DASHBOARD'S
      { index: true, path: "employee-dashboard", Component: EmployeesDashboardContainer },
      { index: true, path: "customer-dashboard", Component: CustomersDashboardContainer },
      { index: true, path: "credit-dashboard", Component: CustomersDashboardContainer },
      { index: true, path: "transaction-dashboard", Component: CustomersDashboardContainer },
      // ENTITIES FORMS
      { index: true, path: "employee-create", Component: CustomerContainer },
      { index: true, path: "customer-create", Component: CustomerContainer },
      { index: true, path: "credit-create", Component: CustomerContainer },
      { index: true, path: "transaction-create", Component: CustomerContainer }
    ]
  },
  /*//Main route
  { path: '/', element: <Navigate to={ROUTES.AUTHENTICATION} /> },
  //Auth routes
  { path: ROUTES.AUTHENTICATION, element: <Navigate to={ ROUTES.AUTHENTICATION + ROUTES.LOGIN} /> },
  { path: ROUTES.AUTHENTICATION + ROUTES.LOGIN, Component: Authentication },
  { path: ROUTES.AUTHENTICATION + ROUTES.RESET_PASSWORD, Component: ResetPassword },
  //Customers routes
  { path: ROUTES.CUSTOMER, element: <Navigate to={ ROUTES.CUSTOMER + ROUTES.CUSTOMER_CREATE} /> },
  { path: ROUTES.CUSTOMER + ROUTES.CUSTOMER_CREATE, Component: Authentication },
  { path: ROUTES.CUSTOMER + ROUTES.CUSTUMER_HISTORY, Component: ResetPassword },
  //Lending routes
  { path: ROUTES.LENDING, element: <Navigate to={ ROUTES.LENDING + ROUTES.LENDING_CREATE} /> },
  { path: ROUTES.LENDING + ROUTES.LENDING_CREATE, Component: Authentication },
  //Payment routes
  { path: ROUTES.PAYMENTS},
   */
]);


createRoot(document.getElementById('root')!).render( 
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </StrictMode>
)
