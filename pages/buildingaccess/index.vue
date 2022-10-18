<script setup lang="ts">
const { useApi } = useAuth();

const { data: buildings } = await useApi("/building/buildingaccess");

const nric = ref("");
const dateaccess = ref("");

async function filterData() {
  let urlval: string;
  urlval = `/building/buildingaccess`;
  if (nric.value !== "") {
    urlval = urlval + `/${nric.value}`;
  } else {
    urlval = urlval + `/none`;
  }

  if (dateaccess.value !== "") {
    urlval = urlval + `/${dateaccess.value}`;
  }

  try {
    const { data: res } = await useApi(urlval);
    buildings.value = res.value;
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="container flex w-full mx-auto my-4">
    <div class="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Building Access
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Contract tracers can find building access entries here for a
            specific user.<br />
          </p>
          <div class="flex flex-wrap gap-2 items-stretch py-4">
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                id="table-search"
                v-model="dateaccess"
                type="date"
                class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for date"
              />
            </div>
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              ></div>
              <input
                id="table-search"
                v-model="nric"
                type="text"
                class="block p-2 pl-10 w-80 h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for NRIC"
              />
            </div>
            <button
              class="p-2 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @click="filterData"
            >
              Search
            </button>
          </div>
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Building Name</th>
            <th scope="col" class="py-3 px-6">Location</th>
            <th scope="col" class="py-3 px-6">Access Datetime</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="each in buildings"
            :key="each.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6">{{ each.building.name }}</td>
            <td class="py-4 px-6">{{ each.building.location }}</td>
            <td class="py-4 px-6">{{ each.access_timestamp }}</td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!!buildings && (buildings as Array<any>).length === 0"
        class="text-center p-4 dark:bg-gray-800"
      >
        No records found
      </div>
    </div>
  </div>
</template>
