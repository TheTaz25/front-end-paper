import { UserInfo } from "../../api/user/types";
import UserCard from "../UserCard";

interface Props {
  users: Array<UserInfo>,
  adminToggleFunction: (userId: string, admin: boolean) => void,
  blockToggleFunction: (userId: string, block: boolean) => void,
}

const UserList: React.FC<Props> = ({
  users,
  adminToggleFunction,
  blockToggleFunction,
}) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard user={user} toggleAdminUser={adminToggleFunction} toggleBlockUser={blockToggleFunction} key={user.userId} />
      ))}
    </div>
  );
};

export default UserList;
