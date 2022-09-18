<script setup lang="ts">
import { LoginResponse } from "~/types/AuthUser";

const loading = ref(false);
const errorMessage = ref("");
const username = ref("");
const password = ref("");

const runtimeConfig = useRuntimeConfig();

const { temporaryUser } = useAuth();

async function onSubmit() {
  loading.value = true;

  try {
    const res = await $fetch<LoginResponse>("/auth/login", {
      method: "POST",
      baseURL: runtimeConfig.public.apiEndpoint,
      body: {
        username: username.value,
        password: password.value,
      },
    });
    temporaryUser.value = res.user;

    loading.value = false;
    if (temporaryUser.value.has_otp) {
      return navigateTo("/auth/totp");
    } else {
      return navigateTo("/auth/totp-register");
    }
  } catch (err) {
    loading.value = false;
    if (err.data?.user?.error) {
      errorMessage.value = err.data.user.error[0];
    } else {
      console.error(err);
      errorMessage.value = "An error occurred";
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-items-center shadow-md w-full md:w-1/3 dark:shadow-sm-light m-auto"
  >
    <form class="flex flex-col gap-4 p-8 w-full" @submit.prevent="onSubmit">
      <h4 class="text-xl font-semibold">Login</h4>
      <div
        v-if="!!errorMessage"
        class="p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
        role="alert"
      >
        <strong class="text-sm font-medium">{{ errorMessage }}</strong>
      </div>
      <div>
        <label
          for="username"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Username</label
        >
        <input
          id="username"
          v-model="username"
          :disabled="loading"
          type="text"
          name="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          autofocus
        />
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          :disabled="loading"
          type="password"
          name="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>
