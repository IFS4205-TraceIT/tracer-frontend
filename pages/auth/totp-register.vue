<script setup lang="ts">
const { authUser, temporaryUser } = useAuth();
const loading = ref(false);
const generated = ref("");

interface TokenRegistrationResponse {
  barcode: string;
  url: string;
}

const runtimeConfig = useRuntimeConfig();

async function generateQr() {
  loading.value = true;
  try {
    const res = await $fetch<TokenRegistrationResponse>("/auth/totp/register", {
      method: "POST",
      baseURL: runtimeConfig.public.apiEndpoint,
      headers: {
        Authorization: `Bearer ${temporaryUser.value.tokens.access}`,
      },
    });
    generated.value = "data:image/png;base64," + res.barcode;
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
  if (temporaryUser.value.has_otp) {
    return navigateTo("/auth/totp");
  }
});
</script>

<template>
  <div
    class="flex items-center justify-items-center shadow-md w-full md:w-1/3 dark:shadow-sm-light m-auto"
  >
    <div v-if="!generated" class="flex flex-col gap-4 p-8 w-full">
      <h4 class="text-xl font-semibold">Prepare your phone</h4>
      <p>
        Please download an Authenticator application (e.g., Google
        Authenticator, Authy) on your phone and prepare your phone to scan the
        QR code.
      </p>
      <p>Once ready, click the button below to generate a QR code.</p>
      <button
        :disabled="loading"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="generateQr"
      >
        Generate QR Code
      </button>
    </div>
    <div v-if="generated" class="flex flex-col gap-4 p-8 w-full">
      <h4 class="text-xl font-semibold">Scan the QR Code</h4>
      <p>
        <strong
          >DO NOT REFRESH THIS PAGE UNTIL YOU HAVE SCANNED THE QR CODE.</strong
        >
      </p>
      <p>
        Please scan the QR code with an Authenticator application (e.g., Google
        Authenticator, Authy) on your phone.
      </p>
      <img :src="generated" class="w-full" alt="TOTP Secret QR Code" />
      <p>Once ready, click the button below to login with the TOTP.</p>
      <NuxtLink
        to="/auth/totp"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Login</NuxtLink
      >
    </div>
  </div>
</template>
