import { Card, Center, Divider, Text, Title } from "@mantine/core";
import { useTranslation } from 'react-i18next';
import RegistrationForm from "../forms/Register";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Center h="100%">
      <section>
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Title order={1} size="h3">
            {t('register.title')}
          </Title>
          <Text color="gray">
            {t('register.titleSubLine')}
          </Text>
          <Card.Section py="16px">
            <Divider />
          </Card.Section>
          <RegistrationForm />
        </Card>
      </section>
    </Center>
  );
};

export default RegisterPage;
