import { Center, Card, Divider, Text, Title } from "@mantine/core";
import { useTranslation } from 'react-i18next';
import LoginForm from "../forms/Login";
// import { useAuth } from "../provider/authProvider";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Center h="100%">
      <section>
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Title order={1} size="h3">
            {t('login.title')}
          </Title>
          <Text color="gray">
            {t('login.titleSubLine')}
          </Text>
          <Card.Section py="16px">
            <Divider />
          </Card.Section>
          <LoginForm />
        </Card>
      </section>
    </Center>
  );
};

export default LoginPage;
