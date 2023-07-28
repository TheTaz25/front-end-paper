import { ResponseCode } from "../responseCodes"
import { UserInfo } from "../user/types"

export type AuthToken = {
  token: string,
  expiresAt: number,
  duration: number,
}

export type TokenDescription = {
  user: string,
  accessToken: AuthToken,
  refreshToken: AuthToken
}

interface RegistrationError {
  code: ResponseCode,
  messageKey: string,
}

export type LoginSuccessResponse = {
  tokens: TokenDescription,
}

export type RegistrationResponse = {
  errors?: Array<RegistrationError>
}

export type UserInformation = {
  user: UserInfo
}