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

async function prepareApiPayload(options?: FetchOptions) {
  const { $getOrReplaceTokenPair } = useNuxtApp();
  const rawToken = await $getOrReplaceTokenPair();
  if (rawToken === null) {
    throw new Error("No token found");
  }
  const accessToken = rawToken.access;

  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...options?.headers,
  };

  const opts: FetchOptions = options
    ? (({ headers, ...opts }) => opts)(options)
    : {};

  const baseURL = !options?.baseURL
    ? useRuntimeConfig().public.apiEndpoint
    : options.baseURL;

  return { baseURL, headers, ...opts };
}

const useApi = async (url: string, options?: FetchOptions) => {
  const payload = await prepareApiPayload(options);
  return useAsyncData(url, () => $fetch(url, payload));
};

const useLazyApi = async (url: string, options?: FetchOptions) => {
  const payload = await prepareApiPayload(options);
  return useLazyAsyncData(url, () => $fetch(url, payload));
};

export default function () {
  return {
    temporaryUser,
    authUser,
    useApi,
    useLazyApi,
  };
}
