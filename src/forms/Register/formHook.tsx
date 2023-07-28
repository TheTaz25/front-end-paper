import { FormEventHandler, useMemo, useState } from "react"

type RegistrationFormData = {
  username: string,
  setUsername: React.ChangeEventHandler<HTMLInputElement>,
  password: string,
  setPassword: React.ChangeEventHandler<HTMLInputElement>,
  passwordConfirm: string,
  setPasswordConfirm: React.ChangeEventHandler<HTMLInputElement>,
  registrationCode: string,
  setRegistrationCode: React.ChangeEventHandler<HTMLInputElement>,
}

type RegistrationFlags = {
  canSubmit: boolean,
}

type RegistrationActions = {
  submit: FormEventHandler<HTMLFormElement>
}

interface HookReturn {
  data: RegistrationFormData,
  flags: RegistrationFlags,
  actions: RegistrationActions,
}

const useRegistrationForm = (): HookReturn => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [regCode, setRegCode] = useState('');

  const updateUsername: CEH<HTMLInputElement> = (event) => setUsername(event.target.value);
  const updatePassword: CEH<HTMLInputElement> = (event) => setPassword(event.target.value);
  const updatePassConfirm: CEH<HTMLInputElement> = (event) => setPassConfirm(event.target.value);
  const updateRegCode: CEH<HTMLInputElement> = (event) => setRegCode(event.target.value);

  const canSubmit = useMemo(() => username !== '' && password !== '' && regCode !== '' && password === passConfirm, [username, password, passConfirm, regCode]);

  const submit: FEH<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
  };

  return {
    data: {
      username,
      setUsername: updateUsername,
      password,
      setPassword: updatePassword,
      passwordConfirm: passConfirm,
      setPasswordConfirm: updatePassConfirm,
      registrationCode: regCode,
      setRegistrationCode: updateRegCode,
      },
    flags: {
      canSubmit,
    },
    actions: {
      submit,
    }
  };
};

export default useRegistrationForm;
