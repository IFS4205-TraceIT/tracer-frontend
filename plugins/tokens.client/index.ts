import jwt_decode from "jwt-decode";
import { TokenPair } from "~~/types/AuthUser";

function saveTokenToSessionStorage(tokenPair: TokenPair) {
  sessionStorage.setItem("access", tokenPair.access);
  sessionStorage.setItem("refresh", tokenPair.refresh);
}

function getTokenFromSessionStorage() {
  const access =  sessionStorage.getItem('access');
  const refresh =  sessionStorage.getItem('access');

  if (!access || !refresh) {
    return null;
  }

  return <TokenPair> {
    access,
    refresh
  }
}

function checkTokenValidity() {
  const token = getTokenFromSessionStorage();
  if (!token) {
    return false;
  }

  try {
    const access = jwt_decode(token.access);
    const refresh = jwt_decode(token.refresh);
    
    if (!access || !refresh) {
      clearSessionStorage();
      return false;
    }

    const currentTime = Date.now() / 1000;
    if (access['exp'] <= currentTime || refresh['exp'] <= currentTime) {
      clearSessionStorage();
      return false;
    }

    if (!access['verified_otp'] || !refresh['verified_otp']) {
      clearSessionStorage();
      return false;
    }
  } catch (err) {
    clearSessionStorage();
    return false;
  }

  return true;
}

function clearSessionStorage() {
  sessionStorage.removeItem('access');
  sessionStorage.removeItem('refresh');
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      storeToken: saveTokenToSessionStorage,
      retriveToken: getTokenFromSessionStorage,
      clearToken: clearSessionStorage,
      hasValidToken: checkTokenValidity
    }
  }
})