import { Outlet } from 'react-router-dom';

const PreAuthLayout: React.FC = () => {
  return (
    <main className="layout-pre-auth">
      <Outlet />
    </main>
  );
};

export default PreAuthLayout;
