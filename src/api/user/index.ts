import { AxiosInstance } from 'axios';
import { UserListResponse } from './types';

/**
 * Get a list of all users of the app with the necessary admin privileges
 * @param instance {AxiosInstance} an axios instance having a set authorization header
 * @returns an async axios repsonse containing - if successful - a complete list of users
 */
export const getAllUsers = (
  instance: AxiosInstance,
) => instance.get<UserListResponse>('/users');

/**
 * Makes an user, specified by its ID an admin or not
 * @param instance {AxiosInstance} an axios instance having a set authorization header
 * @param userId {string} the user id which needs the updated privileges, a string in the form of a UUID
 * @param adminPrivilege {bool} a boolean flag indicating, whether the prviliges should be granted or not
 * @returns an async axios response, if fullfilled, the operation was successful
 */
export const setAdminStatusOnUser = (
  instance: AxiosInstance,
  userId: string,
  adminPrivilege: boolean,
) => instance.get(`/users/${userId}/admin/${adminPrivilege}`);

/**
 * Blocks or Unblocks a given user identified by the userId.
 * After a user has been blocked, the user will not be able to log into the application until the user has been unblocked again.
 * 
 * @param instance {AxiosInstance} an axios instance having a set authorization header
 * @param userId {string} the user id whcih will be blocked or unblocked
 * @param block {bool} a boolean flag indicating whether to block or unblock the user
 * @returns an async axios response, if fullfilled, the operation was successful
 */
export const setBlockStatusOnUser = (
  instance: AxiosInstance,
  userId: string,
  block: boolean,
) => {
  const cmd = block ? 'lock' : 'unlock';
  return instance.get(`/users/${userId}/${cmd}`);
}