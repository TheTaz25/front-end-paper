import { Avatar, Card, Divider, Text, Switch, Box } from "@mantine/core";
import { UserInfo } from "../../api/user/types";
import { useMemo, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import { useTranslation } from "react-i18next";
import ChangeAdminStateModal from "../Modals/ChangeAdminState";
import LockUserModal from '../Modals/LockUser';

interface Props {
  user: UserInfo,
  toggleAdminUser: (userId: string, admin: boolean) => void,
  toggleBlockUser: (userId: string, admin: boolean) => void,
}

const UserCard: React.FC<Props> = ({
  user,
  toggleAdminUser,
  toggleBlockUser,
}) => {
  const { username } = useAuth();
  const { t } = useTranslation();
  const [showAdminConfirmDialog, setShowAdminConfirmDialog] = useState<boolean>(false);
  const [showBlockConfirmDialog, setShowBlockConfirmDialog] = useState<boolean>(false);
  const [action, setAction] = useState<(() => void) | null>(null);

  const initials = useMemo(() => 
    user.username
      .split(/(\.| |,)/)
      .map((split, index) => index % 2 ? '' : split.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
  , [user.username]);

  const requestAdminForUser: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setShowAdminConfirmDialog(true);

    // Unpack, otherwise the object used will be remembered (which will revert to previous state in the meantine)
    const { checked } = event.target;
    setAction(() => (() => toggleAdminUser(user.userId, checked)));
  };

  const requestBlockForUser: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setShowBlockConfirmDialog(true);

    const { checked } = event.target;
    setAction(() => (() => toggleBlockUser(user.userId, checked)));
  };

  const onActionConfirm = () => {
    action?.();
    setAction(null);
    setShowAdminConfirmDialog(false);
    setShowBlockConfirmDialog(false);
  };

  const onActionCancel = () => {
    setShowAdminConfirmDialog(false);
    setShowBlockConfirmDialog(false);
    setAction(null);
  };

  return (
    <Card withBorder my={8} className="card-user">
      <div className="card-header">
        <Avatar display="inline-block" color="indigo">{initials}</Avatar>
        <Text fw={700} component="span" pl={16}>
          {user.username}
        </Text>
      </div>
      <Box mt={16} display="flex" className="user-states">
        <Switch
          label={t('admin.admin')}
          color="indigo"
          checked={user.admin}
          disabled={user.username === username}
          onChange={requestAdminForUser}
        />
        <Divider orientation="vertical"/>
        <Switch
          label={t('admin.blocked')}
          color="red"
          labelPosition="left"
          checked={user.blocked}
          disabled={user.username === username}
          onChange={requestBlockForUser}
        />
      </Box>
      <ChangeAdminStateModal username={user.username} onConfirm={onActionConfirm} onReject={onActionCancel} open={showAdminConfirmDialog} promote={!user.admin} />
      <LockUserModal username={user.username} onConfirm={onActionConfirm} onReject={onActionCancel} open={showBlockConfirmDialog} block={!user.blocked} />
    </Card>
  );
};

export default UserCard;
