import { JwtPayload } from "jwt-decode";

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface AuthUser {
  username: string;
  email: string;
  phone_number: string;
  has_otp: boolean;
  tokens?: TokenPair;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface ExtendedJwtPayload extends JwtPayload {
  user_id: string;
  verified_otp?: boolean;
}

export interface DecodedTokenPair {
  access: ExtendedJwtPayload;
  refresh: ExtendedJwtPayload;
}
