// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import {
  DecodedTokenPair,
  ExtendedJwtPayload,
  TokenPair,
} from "~~/types/AuthUser";

function saveTokenToSessionStorage(tokenPair: TokenPair) {
  sessionStorage.setItem("access", tokenPair.access);
  sessionStorage.setItem("refresh", tokenPair.refresh);
}

function getTokenFromSessionStorage() {
  const access = sessionStorage.getItem("access");
  const refresh = sessionStorage.getItem("refresh");

  if (!access || !refresh) {
    return null;
  }

  return <TokenPair>{
    access,
    refresh,
  };
}

function parseTokenFromSessionStorage(
  token: TokenPair
): DecodedTokenPair | null {
  if (!token) {
    return null;
  }

  try {
    return {
      access: jwt_decode(token.access) as ExtendedJwtPayload,
      refresh: jwt_decode(token.refresh) as ExtendedJwtPayload,
    };
  } catch (err) {
    return null;
  }
}

function checkTokenRefreshable(token: DecodedTokenPair): boolean {
  if (!token) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  if (
    !token.access.verified_otp ||
    !token.refresh.verified_otp ||
    !token.refresh.exp ||
    token.refresh.exp <= currentTime
  ) {
    return false;
  }

  return true;
}

function checkTokenValidity(token: DecodedTokenPair) {
  if (!token) {
    clearSessionStorage();
    return false;
  }

  const { access, refresh } = token;

  if (!access.verified_otp || !refresh.verified_otp) {
    clearSessionStorage();
    return false;
  }

  const currentTime = Date.now() / 1000;
  if (
    !access.exp ||
    access.exp <= currentTime ||
    !refresh.exp ||
    refresh.exp <= currentTime
  ) {
    return false;
  }

  return true;
}

function clearSessionStorage() {
  sessionStorage.removeItem("access");
  sessionStorage.removeItem("refresh");
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      storeToken: saveTokenToSessionStorage,
      retrieveToken: getTokenFromSessionStorage,
      decodeToken: parseTokenFromSessionStorage,
      clearToken: clearSessionStorage,
      hasValidToken: checkTokenValidity,
      isTokenRefreshable: checkTokenRefreshable,
    },
  };
});
