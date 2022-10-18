import { LoginResponse } from "~~/types/AuthUser";

export default defineNuxtRouteMiddleware(async (to) => {
  // const tempUser = useState('temporaryUser');
  const authUser = useState("authUser");
  const {
    $retrieveToken,
    $decodeToken,
    $hasValidToken,
    $clearToken,
    $getOrReplaceTokenPair,
  } = useNuxtApp();

  const rawToken = $retrieveToken();

  if (to.path.startsWith("/auth")) {
    if (authUser.value) {
      return navigateTo("/");
    }

    // If token exists, decode it and check if it is valid.
    // If it is, redirect user back to front page.
    if (rawToken !== null) {
      const token = $decodeToken(rawToken);
      if (process.client && !!token && $hasValidToken(token)) {
        return navigateTo("/");
      }
    }
  } else if (process.client) {
    try {
      const refreshedToken = await $getOrReplaceTokenPair();
      if (!refreshedToken) {
        $clearToken();
        return navigateTo("/auth/login");
      }

      if (!authUser.value) {
        const userDetailsRes = (await $fetch("/auth/user", {
          // method: 'POST',
          baseURL: useRuntimeConfig().public.apiEndpoint,
          headers: {
            Authorization: `Bearer ${refreshedToken.access}`,
          },
        })) as LoginResponse;

        if (userDetailsRes) {
          userDetailsRes.user.tokens = refreshedToken;
          authUser.value = userDetailsRes.user;
        } else {
          $clearToken();
          return navigateTo("/auth/login");
        }
      }
    } catch (err) {
      $clearToken();
      return navigateTo("/auth/login");
    }
  }
});
