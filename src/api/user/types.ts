export interface UserInfo {
  userId: string,
  username: string,
  admin?: boolean,
  blocked?: boolean,
}

export interface UserListResponse {
  users: Array<UserInfo>
}