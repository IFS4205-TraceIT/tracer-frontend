/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchOptions } from "ohmyfetch";
import { Ref } from "vue";
import { AuthUser } from "~/types/AuthUser";

const temporaryUser = (): Ref<AuthUser> => {
  return useState("temporaryUser", (): AuthUser => null);
};

const authUser = (): Ref<AuthUser> => {
  return useState("authUser", (): AuthUser => null);
};

const useApi = (url: string, options?: FetchOptions) => {
  const { $retrieveToken } = useNuxtApp();

  const accessToken = $retrieveToken()?.access;

  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...options?.headers,
  };

  // At this point all the `headers` passed by the user where correctly
  // set in the defaults, now we will spread `options` to remove the
  // `headers` attribute so we don't spread it again in `useFetch`
  const opts: FetchOptions = options
    ? (({ headers, ...opts }) => opts)(options)
    : null;

  const baseURL = !options?.baseURL
    ? useRuntimeConfig().public.apiEndpoint
    : options.baseURL;

  return useFetch(url, {
    baseURL,
    headers,
    ...opts,
    initialCache: false,
  });
};

export default function () {
  return {
    temporaryUser,
    authUser,
    useApi,
  };
}
