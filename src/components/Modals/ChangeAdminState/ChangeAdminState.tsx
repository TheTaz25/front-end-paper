import { Button, Flex, Group, Modal, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean,
  onConfirm: () => void,
  onReject: () => void,
  promote?: boolean,
  username: string,
}

const ChangeAdminStateModal: React.FC<Props> = ({
  open,
  onConfirm,
  onReject,
  username,
  promote = true,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={open}
      onClose={onReject}
      title={(
        <Text fw={700} sx={{ fontSize: '1.25rem' }}>{promote ? t('admin.modal.changeAdminState.titlePromote') : t('admin.modal.changeAdminState.titleDemote')}</Text>
      )}
      centered
      padding={32}
      size="lg"
    >
      <Text>{promote ? t('admin.modal.changeAdminState.bodyPromote', { user: username }) : t('admin.modal.changeAdminState.bodyDemote', { user: username })}</Text>
      <Text>{t('admin.modal.continueQuestion')}</Text>
      <Flex justify="right" mt={32}> 
        <Group>
          <Button color="red" onClick={onConfirm}>{ promote ? t('admin.modal.changeAdminState.promote') : t('admin.modal.changeAdminState.demote')}</Button>
          <Button variant='subtle' onClick={onReject}>{t('common.cancel')}</Button>
        </Group>
      </Flex>
    </Modal>
  );
};

export default ChangeAdminStateModal;
