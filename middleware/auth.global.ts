import { TokenPair, LoginResponse } from "~~/types/AuthUser";

export default defineNuxtRouteMiddleware(async (to) => {
  // const tempUser = useState('temporaryUser');
  const authUser = useState("authUser");
  const {
    $retrieveToken,
    $decodeToken,
    $hasValidToken,
    $isTokenRefreshable,
    $storeToken,
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
    if (!rawToken) {
      return navigateTo("/auth/login");
    }

    const token = $decodeToken(rawToken);
    if (!token) {
      return navigateTo("/auth/login");
    }

    const valid = $hasValidToken(token);
    const refreshable = $isTokenRefreshable(token);
    if (!valid) {
      if (!refreshable) {
        return navigateTo("/auth/login");
      }

      try {
        const res = await $fetch<TokenPair>("/auth/refresh", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiEndpoint,
          body: {
            refresh: rawToken.refresh,
          },
        });

        $storeToken(res);
      } catch (err) {
        return navigateTo("/auth/login");
      }
    }

    const refreshedToken = $retrieveToken();

    // This should NEVER run.
    if (!refreshedToken) {
      return navigateTo("/auth/login");
    }

    if (!authUser.value) {
      $fetch<LoginResponse>("/auth/user", {
        // method: 'POST',
        baseURL: useRuntimeConfig().public.apiEndpoint,
        headers: {
          Authorization: `Bearer ${refreshedToken.access}`,
        },
      }).then((res) => {
        if (res) {
          res.user.tokens = refreshedToken;
          authUser.value = res.user;
        }
      });
    }
  }
});
