import { createContext, useReducer } from "react";
import { UserInformation } from "../../api/auth/types";
// import { LoginSuccessResponse } from "../../api/auth/types";

interface Token {
  value: string,
  validity: number,
}

interface Auth {
  isAdmin: boolean,
  username: Maybe<string>,
  userId: Maybe<string>,
}

interface AuthActions {
  setAuthenticatedUser: (authData: UserInformation) => void,
  clearAuthState: () => void,
}

const initialState: Auth = {
  isAdmin: false,
  username: undefined,
  userId: undefined,
}

enum Action {
  LOGIN, LOGOUT
}

type LoginAction = ReducerAction<Action.LOGIN, UserInformation['user']>
type LogoutAction = ReducerAction<Action.LOGOUT, undefined>

type AuthReducerActions = 
| LoginAction
| LogoutAction;

const authReducer = (state: Auth, { type, payload }: AuthReducerActions): Auth => {
  switch (type) {
    case Action.LOGIN:
      return {
        username: payload.username,
        isAdmin: payload.admin,
        userId: payload.userId
      };
    case Action.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

const AuthContext = createContext<{ authState: Auth } & AuthActions>({
  authState: { ...initialState },
  setAuthenticatedUser: () => Promise.reject(),
  clearAuthState: () => Promise.reject()
});

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const setAuthenticatedUser = (authData: UserInformation) => dispatch({ type: Action.LOGIN, payload: authData.user });
  const clearAuthState = () => dispatch({ type: Action.LOGOUT, payload: undefined });

  return (
    <AuthContext.Provider value={{
      authState,
      setAuthenticatedUser,
      clearAuthState,
    }}>
      {children}
    </AuthContext.Provider> 
  );
};

export { AuthContext, AuthContextProvider };
