import { FormEventHandler, useMemo, useState } from 'react';
import { loginWithUserAndPass } from '../../api/auth';
import { AxiosResponse } from 'axios';
import { LoginSuccessResponse } from '../../api/auth/types';
import { saveAuthToLocalStorage } from '../../utils/storage/auth';
import { useAuth } from '../../provider/authProvider';
import useAxios from '../../provider/axiosProvider/useAxios';
import { DEFAULT_BACKEND } from '../../provider/axiosProvider/keys';

type LoginFormData = {
  username: string,
  setUsername: CEH<HTMLInputElement>,
  password: string,
  setPassword: CEH<HTMLInputElement>
}

type LoginFlags = {
  canSubmit: boolean,
  requestPending: boolean
}

type LoginActions = {
  submit: FEH<HTMLFormElement>
}

interface HookReturn {
  data: LoginFormData,
  flags: LoginFlags,
  actions: LoginActions
}

const useLoginForm = (): HookReturn => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [requestPending, setRequestPending] = useState(false);
  const { initializeByLogin } = useAuth();
  const { getInstance } = useAxios();

  const updateUsername: CEH<HTMLInputElement> = (event) => setUsername(event.target.value);
  const updatePassword: CEH<HTMLInputElement> = (event) => setPassword(event.target.value);

  const canSubmit = useMemo(() => username !== '' && password !== '' && !requestPending, [username, password, requestPending]);

  const handleLoginResponse = (resolution: AxiosResponse<LoginSuccessResponse>) => {
    initializeByLogin(resolution.data);
  }

  const submit: FEH<HTMLFormElement> = (event) => {
    setRequestPending(true);
    event.preventDefault();
    event.stopPropagation();

    // TODO: Add Error Case Handling
    const axios = getInstance(DEFAULT_BACKEND);

    loginWithUserAndPass(axios, username, password)
      .then(handleLoginResponse);
  };

  return {
    data: {
      username,
      setUsername: updateUsername,
      password,
      setPassword: updatePassword,
    },
    flags: {
      canSubmit,
      requestPending,
    },
    actions: {
      submit
    },
  };
};

export default useLoginForm;
