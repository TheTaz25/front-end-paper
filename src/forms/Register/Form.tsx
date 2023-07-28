import { Button, Group, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useRegistrationForm from "./formHook";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, flags, actions } = useRegistrationForm();

  const onCancel = () => navigate(-1);

  return (
    <form onSubmit={actions.submit}>
      <TextInput
        withAsterisk
        label={t('common.username')}
        mb={8}
        width="full"
        value={data.username}
        onChange={data.setUsername}
        autoComplete="off"
      />
      <TextInput
        withAsterisk
        type="password"
        label={t('common.password')}
        mb={8}
        value={data.password}
        onChange={data.setPassword}
        autoComplete="new-password"
      />
      <TextInput
        withAsterisk
        label={t('register.confirmPassword')}
        mb={8}
        type="password"
        value={data.passwordConfirm}
        onChange={data.setPasswordConfirm}
        autoComplete="new-password"
      />
      <TextInput
        withAsterisk
        label={t('register.registrationCode')}
        mb={16}
        value={data.registrationCode}
        onChange={data.setRegistrationCode}
        description={t('register.registrationCodeDescription')}
      />
      <Group position="apart">
        <Button variant="outline" type="button" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit" disabled={!flags.canSubmit}>{t('common.submit')}</Button>
      </Group>
    </form>
  );
};

export default RegistrationForm;
