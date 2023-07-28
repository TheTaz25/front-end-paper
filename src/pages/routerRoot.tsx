import { createBrowserRouter, redirect } from 'react-router-dom';
import MainLayout from '../layouts/Main';
import PreAuthLayout from '../layouts/PreAuth';
import Homepage from './Homepage';
import LoginPage from './Login';
import RegisterPage from './Register';
import UpdatePasswordPage from './UpdatePassword';
import ComponentTestPage from './ComponentTest';
import DashLayout from '../layouts/Dash';
import AdminPage from './Admin';

import './styles.scss';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/test',
        element: <ComponentTestPage />
      },
    ]
  },
  {
    path: '/user',
    element: <PreAuthLayout />,
    children: [
      { index: true, element: <>Redirect based on auth to login or user page</> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'change-password', element: <UpdatePasswordPage /> },
    ]
  },
  {
    path: '/app',
    element: <DashLayout />,
    children: [
      { index: true, element: <>Last played + Your Sessions + Last edited + ...</> },
      { path: 'admin', element: <AdminPage /> }
    ]
  }
]);
