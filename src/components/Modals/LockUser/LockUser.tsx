import { Button, Flex, Group, Modal, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean,
  onConfirm: () => void,
  onReject: () => void,
  block?: boolean,
  username: string,
}

const LockUserModal: React.FC<Props> = ({
  open,
  onConfirm,
  onReject,
  username,
  block = true,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={open}
      onClose={onReject}
      title={(
        <Text fw={700} sx={{ fontSize: '1.25rem' }}>{block ? t('admin.modal.changeBlockState.titleBlock') : t('admin.modal.changeBlockState.titleUnblock')}</Text>
      )}
      centered
      padding={32}
      size="lg"
    >
      <Text>{block ? t('admin.modal.changeBlockState.bodyBlock', { user: username }) : t('admin.modal.changeBlockState.bodyUnblock', { user: username })}</Text>
      <Text>{t('admin.modal.continueQuestion')}</Text>
      <Flex justify="right" mt={32}>
        <Group>
          <Button color="red" onClick={onConfirm}>{block ? t('admin.modal.changeBlockState.block') : t('admin.modal.changeBlockState.unblock')}</Button>
          <Button variant="subtle" onClick={onReject}>{t('common.cancel')}</Button>
        </Group>
      </Flex>
    </Modal>
  )
};

export default LockUserModal;
