export interface TokenPair {
    access: string;
    refresh: string;
}

export interface AuthUser {
    username: string,
    email: string,
    phone_number: string,
    has_otp: boolean,
    tokens: TokenPair
}

export interface LoginResponse {
    user: AuthUser
}
