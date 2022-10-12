<script setup lang="ts">
const { useApi } = useAuth();

const route = useRoute();

const { data: buildinglogs } = await useApi(`/building/${route.params.id}`);

async function filterData(event: any) {
  let urlval: string;
  if (event.target.value) {
    urlval = `/building/${route.params.id}/${event.target.value}`;
  } else {
    urlval = `/building/${route.params.id}`;
  }
  try {
    const { data: res } = await useApi(urlval);
    buildinglogs.value = res.value;
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
          Building Access logs
          <br />
          <h3
            v-if="buildinglogs && (buildinglogs as Array<any>).length !== 0"
            class="text-base"
          >
            Building: {{ buildinglogs[0].building.name }}
          </h3>
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Contract tracers can view all the access logs<br />
            The search below will show all entries to a building on that date.
          </p>
          <div class="py-4">
            <div class="relative mt-1">
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
                type="date"
                class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                @change="filterData"
              />
            </div>
          </div>
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">NRIC</th>
            <th scope="col" class="py-3 px-6">Gender</th>
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Phone Number</th>
            <th scope="col" class="py-3 px-6">Building Entry Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="log in buildinglogs"
            :key="log.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <!-- <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <NuxtLink :to="`/building/${log.id}`">{{ log.name }}
                            </NuxtLink>
                        </th> -->
            <td class="py-4 px-6">
              {{ log.user.name }}
            </td>
            <td class="py-4 px-6">
              {{ log.user.nric }}
            </td>
            <td class="py-4 px-6">
              {{ log.user.gender }}
            </td>
            <td class="py-4 px-6">
              {{ log.user.email }}
            </td>
            <td class="py-4 px-6">
              {{ log.user.phone }}
            </td>
            <td class="py-4 px-6">
              {{ log.access_timestamp }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="buildinglogs && (buildinglogs as Array<any>).length === 0"
        class="text-center p-4 dark:bg-gray-800"
      >
        No records found
      </div>
    </div>
  </div>
</template>
