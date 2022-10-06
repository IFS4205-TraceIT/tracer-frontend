<script setup lang="ts">
const { useApi } = useAuth();
const loading = ref(false);
const nrics = ref("");
const errorMessage = ref("");

async function onSubmit() {
  const payload = {
    nrics: nrics.value
      .toUpperCase()
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0),
  };
  try {
    errorMessage.value = "";
    loading.value = true;
    const { error } = await useApi("/api/infections/add", {
      method: "POST",
      body: payload,
    });
    loading.value = false;
    if (error.value) {
      console.error(error.value);
      errorMessage.value = "Error adding infection history";
    } else {
      return navigateTo("/");
    }
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
</script>

<template>
  <div class="container flex w-full mx-auto my-4">
    <div class="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
      <div
        class="p-5 text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        <h3 class="text-lg font-semibold">Add Infection History Records</h3>
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          Declare a list of users as infected with their NRICs.
        </p>
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
            <label
              for="nrics"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >NRICs
              <span class="text-gray-500"> (separated by line)</span></label
            >
            <textarea
              id="nrics"
              v-model="nrics"
              :disabled="loading"
              name="nrics"
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
      </div>
    </div>
  </div>
</template>
