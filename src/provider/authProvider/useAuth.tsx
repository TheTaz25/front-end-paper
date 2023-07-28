import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { LoginSuccessResponse, TokenDescription } from "../../api/auth/types";
import { clearAuthFromLocalStorage, getAuthFromLocalStorage, saveAuthToLocalStorage } from "../../utils/storage/auth";
import useAxios from "../axiosProvider/useAxios";
import { fetchUserDetails, logoutUser, refreshAccessToken } from "../../api/auth";
import axios from "axios";
import { AUTHORIZED_BACKEND, DEFAULT_BACKEND } from "../axiosProvider/keys";

const useAuth = () => {
  const { getInstance, addInstance, removeInstance } = useAxios();
  const { authState, setAuthenticatedUser, clearAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = useMemo(() => !!authState.username, [authState.username]);
  const isAdmin = useMemo(() => authState.isAdmin, [authState.isAdmin]);
  const username = useMemo(() => authState.username, [authState.username]);

  const isAccessTokenValid = (tokens: TokenDescription) => {
    const now = Date.now();
    const { expiresAt, duration } = tokens.accessToken;
    return now < expiresAt - (duration / 2);
  };

  const isRefreshTokenValid = (tokens: TokenDescription | null) => {
    const now = Date.now();
    return !!tokens && (now < tokens?.refreshToken?.expiresAt || 0);
  }

  useEffect(() => {
    const tokens = getAuthFromLocalStorage();
    if (!!tokens && isAccessTokenValid(tokens)) {
      console.log('Access Token still valid, initialize user');
      initializeByStorage(tokens);
    } else if (!!tokens && isRefreshTokenValid(tokens)) {
      console.trace('Refresh Token still valid, initialize new session token and user');
      initializeByRefreshToken(tokens);
    } else {
      console.log('Userdata invalid...')
    }
  }, []);

  const createAuthorizedAxios = (authorizationToken: string) => {
    return axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Token ${authorizationToken}`,
      },
    });
  }

  const initialize = async (tokens: TokenDescription) => {
    const authorizedAxios = createAuthorizedAxios(tokens.accessToken.token);

    try {
      const user = await fetchUserDetails(authorizedAxios);
      addInstance(AUTHORIZED_BACKEND, authorizedAxios);
      saveAuthToLocalStorage(tokens);
      setAuthenticatedUser(user.data);
    } catch (e) {
      console.warn(e);
    }
  };

  const initializeByStorage = async (tokens: TokenDescription) => {
    initialize(tokens);
  };

  const initializeByLogin = async (response: LoginSuccessResponse) => {
    await initialize(response.tokens);
    navigate('/');
  };

  const initializeByRefreshToken = async (response: TokenDescription) => {
    const instance = getInstance(DEFAULT_BACKEND);
    try {
      const newTokens = await refreshAccessToken(instance, response.refreshToken.token);
      initializeByLogin(newTokens.data);
    } catch (e) {
      console.warn(e);
    }
  };

  const logout = async () => {
    const authorizedInstance = getInstance(AUTHORIZED_BACKEND);
    await logoutUser(authorizedInstance);
    
    clearAuthState();
    clearAuthFromLocalStorage();
    removeInstance(AUTHORIZED_BACKEND);
    navigate('/');
  }

  return {
    logout,
    isLoggedIn,
    isAdmin,
    username,
    initializeByLogin,
  };
};

export default useAuth;
