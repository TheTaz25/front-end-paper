import { Title } from "@mantine/core";
import LoadingBlocker from "../components/LoadingIndicator";
import useUserList from "./hooks/useUserList";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/PageTitle";
import UserList from "../components/UserList";

const AdminPage: React.FC = () => {
  const { users, ready, toggleAdminUser, toggleBlockUser } = useUserList();
  const { t } = useTranslation();

  return (
    <LoadingBlocker ready={ready}>
      <main className="admin">
        <PageTitle>{t('admin.userAdmin')}</PageTitle>
        <section>
          <Title order={2}>{t('admin.appUsers')}</Title>
          <UserList users={users} adminToggleFunction={toggleAdminUser} blockToggleFunction={toggleBlockUser} />
        </section>
        <section className="otp">
          <div className="otp-container">
            <Title order={2}>{t('admin.regOtp')}</Title>
          </div>
          <div className="otp-container">
            <Title order={2}>{t('admin.pwOtp')}</Title>
          </div>
        </section>
      </main>
    </LoadingBlocker>
  );
};

export default AdminPage;
