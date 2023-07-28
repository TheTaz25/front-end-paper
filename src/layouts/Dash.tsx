import { AppShell, MantineColor, Navbar, Divider } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import NavigationLink from '../components/NavigationLink';
import { IconUsers, IconUserBolt } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface NavLink {
  label: string,
  to: string,
  description: string,
  color: MantineColor,
  icon: React.ReactNode
}

const DashLayout: React.FC = () => {
  const { isAdmin, username } = useAuth();
  const { t } = useTranslation();

  const ADMIN_LINKS: Array<NavLink> = useMemo(() => [
    { label: t('menu.admin.user.label'), description: t('menu.admin.user.description'), to: 'admin', color: 'red', icon: <IconUsers /> },
  ], []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          p="xs"
        >
          <Navbar.Section grow>
            Nothing here yet!
          </Navbar.Section>
          { isAdmin && (
            <Navbar.Section>
              { ADMIN_LINKS.map((link) => (
                <NavigationLink
                  key={link.to}
                  label={link.label}
                  to={link.to}
                  description={link.description}
                  icon={link.icon}
                  iconColor={link.color}
                />
              ))}
            </Navbar.Section>
          )}
          <Divider my={16} />
          <Navbar.Section>
            <NavigationLink
              label={username!}
              description={t('menu.self.description')}
              icon={<IconUserBolt />}
              to="self"
              iconColor='blue'
            />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  )
};

export default DashLayout;
