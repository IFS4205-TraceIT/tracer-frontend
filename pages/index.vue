<script setup lang="ts">

  const runtimeConfig = useRuntimeConfig();

  let {data: infected} =  await useFetch('/api/infections',{
    baseURL: runtimeConfig.public.apiEndpoint,
  })

  async function filter_data(event: any) {
    let urlval:string;
    if (event.target.value) {
        urlval = `/api/infections/${event.target.value}`
    }
    else {
        urlval = `/api/infections`
    }
    const res =  await $fetch(urlval, {
        baseURL: runtimeConfig.public.apiEndpoint
    })
    infected.value = res
  }
</script>

<template>
  <div class="flex w-full">
    <div class="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Contact Tracer
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    All in one location for contact tracers to track user information!<br>
                    The search bar below can be used to filter by a specific date.
                </p>
            <div class="py-4">
              <div class="relative mt-1">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input @change="filter_data" type="date" id="table-search" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
              </div>
            </div>    
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Name
                    </th>
                    <th scope="col" class="py-3 px-6">
                        NRIC
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Email
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Phone Number
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Notifications
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="people in infected" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{people.name}}
                    </th>
                    <td class="py-4 px-6">
                        {{people.nric}}
                    </td>
                    <td class="py-4 px-6">
                        {{people.email}}
                    </td>
                    <td class="py-4 px-6">
                        {{people.phone}}
                    </td>
                    <td v-if="people.infections.notifications == null" class="py-4 px-6">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Notify</a>
                    </td>
                    <td v-else class="py-4 px-6">
                        Notified!
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

