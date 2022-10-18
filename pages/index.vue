<script setup lang="ts">
const { useApi, useLazyApi } = useAuth();

const {
  data: infected,
  pending,
  refresh,
} = await useLazyApi("/api/infections");

async function filterData(event: any) {
  let urlval: string;
  if (event.target.value) {
    urlval = `/api/infections/${event.target.value}`;
  } else {
    urlval = `/api/infections`;
  }
  try {
    const { data: res } = await useApi(urlval);
    infected.value = res.value;
  } catch (err) {
    console.error(err);
  }
}

async function update(index: number) {
  if (index >= 0 && index < infected.value.length) {
    try {
      await useApi(
        `/api/notify/${infected.value[index].id}/${infected.value[index].infections.id}`,
        {
          method: "put",
        }
      );
      refresh();
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Invalid index!");
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
          Contact Tracer
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            All in one location for contact tracers to track user
            information!<br />
            The search bar below can be used to filter by a specific date.
          </p>
          <div v-if="!pending" class="py-4">
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
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Phone Number</th>
            <th scope="col" class="py-3 px-6">Date of Infection</th>
            <th scope="col" class="py-3 px-6">Notifications</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(people, index) in infected"
            :key="people.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <NuxtLink
                :to="`/closecontact/${people.id}/${people.infections.id}`"
                >{{ people.name }}</NuxtLink
              >
            </th>
            <td class="py-4 px-6">
              {{ people.nric }}
            </td>
            <td class="py-4 px-6">
              {{ people.email }}
            </td>
            <td class="py-4 px-6">
              {{ people.phone }}
            </td>
            <td class="py-4 px-6">
              {{ people.infections.recorded_timestamp }}
            </td>
            <td
              v-if="people.infections.notifications == null"
              class="py-4 px-6"
            >
              <button
                type="button"
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                @click="update(index)"
              >
                Notify
              </button>
            </td>
            <td v-else class="py-4 px-6">Notified!</td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="pending"
        class="text-center p-4 text-gray-500 dark:bg-gray-800"
      >
        Loading...
      </div>
      <div
        v-if="infected && (infected as Array<any>).length === 0"
        class="text-center p-4 dark:bg-gray-800"
      >
        No records found
      </div>
    </div>
  </div>
</template>
