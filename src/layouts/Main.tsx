import { Button, Title } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { useTranslation } from 'react-i18next';

const MainLayout: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <nav className="main">
        <div>{t('homepage.scrollTop')}</div>
        <Title order={1}>{t('homepage.title')}</Title>
        {
          !isLoggedIn ? (
            <div>
              <Button component={Link} to="/user/login" style={{ marginRight: '16px', height: '100%' }}>{t('homepage.login')}</Button>
              <Button component={Link} to="/user/register" style={{ height: '100%' }}>{t('homepage.register')}</Button>
            </div>
          ) : (
            <div>
              <Button component={Link} to="/app" style={{ marginRight: '16px', height: '100%' }}>{t('homepage.goToApp')}</Button>
              <Button onClick={logout} style={{ height: '100%' }}>{t('common.logout')}</Button>
            </div>
          )
        }
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
