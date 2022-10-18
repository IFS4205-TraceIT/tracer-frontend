<script setup lang="ts">
const { useApi } = useAuth();

const { data: buildings } = await useApi("/building/");
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
            Contract tracers can find building access entries here.<br />
            Click on the building name to find check the access logs for each
            building.
          </p>
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Building Name</th>
            <th scope="col" class="py-3 px-6">Location</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="loc in buildings"
            :key="loc.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <NuxtLink :to="`/building/${loc.id}`">{{ loc.name }} </NuxtLink>
            </th>
            <td class="py-4 px-6">
              {{ loc.location }}
            </td>
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
