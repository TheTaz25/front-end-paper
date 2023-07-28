import { Button, Group, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLoginForm from './formHook';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t }  = useTranslation();
  const { data, flags, actions } = useLoginForm();

  const onCancel = () => navigate(-1);

  return (
    <form onSubmit={actions.submit}>
      <TextInput
        withAsterisk
        label={t('common.username')}
        mb={8}
        width="full"
        autoComplete="username"
        value={data.username}
        onChange={data.setUsername}
      />
      <TextInput
        withAsterisk
        label={t('common.password')}
        mb={16}
        type="password"
        width="full"
        autoComplete="password"
        value={data.password}
        onChange={data.setPassword}
      />
      <Group position="apart">
        <Button variant="outline" type="button" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit" loading={flags.requestPending} disabled={!flags.canSubmit}>{t('common.submit')}</Button>
      </Group>
    </form>
  );
};

export default LoginForm;
