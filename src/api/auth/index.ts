import { AxiosInstance } from 'axios';
import { LoginSuccessResponse, UserInformation } from './types';

/**
 * Log in an existing user with username & password
 * @param instance any axios instance
 * @param username the username used for logging in
 * @param password the password which matches to the used username
 * @returns an async axios response containing - if successful - access tokens,
 * refresh tokens and additional information like token lifetimes
 */
export const loginWithUserAndPass = (
  instance: AxiosInstance,
  username: string,
  password: string) => instance
    .post<LoginSuccessResponse>('/auth/login', {
      username,
      password
    });

/**
 * Get own user information
 * @param instance an axios instance using an authorization header
 * @returns an async axios response containing - if successful - information about the user
 * which is currentl using the access token for the session (name, uuid, isAdmin)
 */
export const fetchUserDetails = (instance: AxiosInstance) => instance.get<UserInformation>('/auth/self'); 

/**
 * Log out an existing user by using the Authorization Header of the axios instance
 * @param instance an axios instance using an authorization header
 * @returns an async axios response which signals the success of the logout if 200
 */
export const logoutUser = (instance: AxiosInstance) => instance.get('/auth/logout');

/**
 * refreshes an old session by issuing a refresh token received earlier during login,
 * invalidating the old session
 * @param instance any axios instance
 * @param refreshToken the refresh token received during the login
 * @returns if successful - a new set of access token and refresh token along with the new lifetimes
 */
export const refreshAccessToken = (instance: AxiosInstance, refreshToken: string) => instance.get<LoginSuccessResponse>(`/auth/refresh/${refreshToken}`);

/**
 * API to create a new user with given registration-code
 * @param username string
 * @param password string
 * @param registrationCode string
 * @returns 201 - When OK | 400 - If Failed, containing information about the error-type | 500
 */
// export const registerNewUser = (username: string, password: string, registrationCode: string) => axios
//   .post('/auth/register', {
//     username,
//     password,
//     registrationCode,
//   });

/**
 * Change a password by a logged in user (needs auth somehow)
 * @param oldPassword string
 * @param newPassword string
 * @returns 
 */
// export const changeUserPassword = (oldPassword: string, newPassword: string) => axios
//   .post('/auth/change-password', {
//     oldPassword,
//     newPassword,
//   });

/**
 * Change a password with a provided changeCode (provided by the admin)
 * @param username string
 * @param newPassword string
 * @param changeCode string
 * @returns 
 */
// export const changeUserPasswordWithCode = (username: string, newPassword: string, changeCode: string) => axios
//   .post('/auth/change-password-by-code', {
//     username,
//     newPassword,
//     changeCode,
//   });

