<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const authUser = useState("authUser") as any;
const { $clearToken } = useNuxtApp();
const router = useRouter();

const collapsed = ref(true);

function logout() {
  $fetch("/auth/logout", {
    method: "POST",
    baseURL: runtimeConfig.public.apiEndpoint,
    headers: {
      Authorization: `Bearer ${authUser.value.tokens.access}`,
    },
    body: {
      refresh: authUser.value.tokens.refresh,
    },
  });
  authUser.value = null;
  $clearToken();
  router.go(0);
}

function toggleNavbar() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-2.5 py-2.5 dark:bg-gray-900">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <NuxtLink to="/" class="flex items-center">
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >TraceIT Tracer Portal</span
        >
      </NuxtLink>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
        @click="toggleNavbar"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="navbar-default"
        class="w-full md:block md:w-auto"
        :class="{ hidden: collapsed }"
      >
        <ul
          v-if="authUser"
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <NuxtLink
              to="/buildingaccess"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              People Access Logs</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/building"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Building Access Logs</NuxtLink
            >
          </li>
          <li class="text-gray-400 dark:text-gray-400">
            <span class="py-2 pr-4 pl-3 md:p-0"
              >Logged in as: {{ authUser.username }}</span
            >
          </li>
          <li>
            <button
              class="block py-2 pr-4 pl-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              @click="logout()"
            >
              Logout
            </button>
          </li>
        </ul>
        <ul
          v-else
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <NuxtLink
              to="/auth/login"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Login</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/auth/register"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Register</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
