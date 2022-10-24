<script setup lang="ts">
const { useApi } = useAuth();
const loading = ref(false);
const buildingname = ref("");
const buildingimage = ref("");
const errorMessage = ref("");

async function onSubmit() {
  try {
    errorMessage.value = "";
    loading.value = true;
    const { data, error } = await useApi(
      `/building/genqrcode/${buildingname.value}`
    );
    loading.value = false;
    if (error.value) {
      console.error(error.value);
      errorMessage.value = "Error finding building";
    } else {
      console.log(data.value);
      buildingimage.value = "data:image/png;base64," + data.value.qrcode;
    }
  } catch (err) {
    loading.value = false;
    if (err.data?.user?.error) {
      errorMessage.value = err.data.user.error[0];
    } else if (err.data?.detail) {
      errorMessage.value = err.data.detail;
    } else {
      errorMessage.value = "An error occurred. Please try again later.";
    }
  }
}
</script>

<template>
  <div class="container flex w-full mx-auto my-4">
    <div class="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
      <div
        class="p-5 text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        <h3 class="text-lg font-semibold">Get QRCode for buildings here!</h3>
        <form
          class="flex flex-col gap-4 my-4 w-full"
          @submit.prevent="onSubmit"
        >
          <div
            v-if="!!errorMessage"
            class="p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
            role="alert"
          >
            <strong class="text-sm font-medium">{{ errorMessage }}</strong>
          </div>
          <div>
            <input
              id="building"
              v-model="buildingname"
              :disabled="loading"
              name="buildingname"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              rows="10"
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
        <img
          v-if="buildingimage !== ''"
          class="mx-auto"
          :src="buildingimage"
          alt="Bad QRCode :("
        />
      </div>
    </div>
  </div>
</template>
