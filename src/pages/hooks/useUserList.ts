import { useEffect, useState } from "react";
import useAxios from "../../provider/axiosProvider/useAxios";
import { AUTHORIZED_BACKEND } from "../../provider/axiosProvider/keys";
import { getAllUsers, setAdminStatusOnUser, setBlockStatusOnUser } from "../../api/user";
import { UserInfo } from "../../api/user/types";

const useUserList = () => {
  const { getInstance } = useAxios();
  const [users, setUsers] = useState<Array<UserInfo>>([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    updateUserList().finally(() => setReady(true));
  }, [getInstance]);

  const updateUserList = async (): Promise<any> => {
    const authorizedInstance = getInstance(AUTHORIZED_BACKEND);
    if (authorizedInstance) {
      return getAllUsers(authorizedInstance)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
    return Promise.reject();
  }

  const toggleAdminUser = (userId: string, admin: boolean) => {
    const authorizedInstance = getInstance(AUTHORIZED_BACKEND);
    if (authorizedInstance) {
      setAdminStatusOnUser(authorizedInstance, userId, admin)
        .then(() => {
          updateUserList();
        })
        .catch((err) => console.warn(err));
    }
  }

  const toggleBlockUser = (userId: string, block: boolean) => {
    const authorizedInstance = getInstance(AUTHORIZED_BACKEND);
    if (authorizedInstance) {
      setBlockStatusOnUser(authorizedInstance, userId, block)
        .then(() => {
          updateUserList();
        })
        .catch((err) => console.warn(err));
    }
  }

  return {
    users,
    ready,
    toggleAdminUser,
    toggleBlockUser,
  };
};

export default useUserList;
