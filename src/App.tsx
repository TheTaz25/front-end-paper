import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/routerRoot';
import { AuthContextProvider } from './provider/authProvider';
import { AxiosProvider } from './provider/axiosProvider/AxiosContext';
import './utils/i18n';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <AxiosProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </AxiosProvider>
    </MantineProvider>
  );
}

export default App
