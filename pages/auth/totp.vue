<script setup lang="ts">
import { TokenPair } from "~/types/AuthUser";

const { authUser, temporaryUser } = useAuth();
const totp = ref("");
const errorMessage = ref("");
const loading = ref(false);

const runtimeConfig = useRuntimeConfig();
const { $storeToken } = useNuxtApp();

async function onSubmit() {
  try {
    const newTokens = await $fetch<TokenPair>("/auth/totp", {
      method: "POST",
      baseURL: runtimeConfig.public.apiEndpoint,
      headers: {
        Authorization: `Bearer ${temporaryUser.value.tokens.access}`,
      },
      body: {
        totp: totp.value,
      },
    });
    authUser.value = temporaryUser.value;
    authUser.value.tokens = newTokens;
    $storeToken(newTokens);
    temporaryUser.value = null;

    return navigateTo("/");
  } catch (err) {
    loading.value = false;
    if (err.data?.user?.error) {
      errorMessage.value = err.data.user.error[0];
    } else if (err.data?.detail) {
      errorMessage.value = err.data.detail;
    } else {
      console.error(err.data);
      errorMessage.value = "An error occurred. Please try again later.";
    }
  }
}

onMounted(() => {
  if (!temporaryUser.value || authUser.value) {
    return navigateTo("/auth/login");
  }
  if (!temporaryUser.value.has_otp) {
    return navigateTo("/auth/totp");
  }
});
</script>

<template>
  <div
    class="flex items-center justify-items-center shadow-md w-full md:w-1/3 dark:shadow-sm-light m-auto"
  >
    <form class="flex flex-col gap-4 p-8 w-full" @submit.prevent="onSubmit">
      <h4 class="text-xl font-semibold">Enter your TOTP</h4>
      <div
        v-if="!!errorMessage"
        class="p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
        role="alert"
      >
        <strong class="text-sm font-medium">{{ errorMessage }}</strong>
      </div>
      <div>
        <label
          for="totp"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >TOTP</label
        >
        <input
          id="totp"
          v-model="totp"
          :disabled="loading"
          minlength="6"
          maxlength="6"
          name="totp"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          autofocus
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="text-white disabled:bg-gray-600 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>
