<script setup lang="ts">
const { useApi } = useAuth();

const route = useRoute();
const { data: closecontact } = await useApi(
  `/api/closecontacts/${route.params.id}/${route.params.iid}`
);
</script>

<template>
  <div class="container flex w-full mx-auto my-4">
    <div class="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Close Contacts
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">NRIC</th>
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Phone Number</th>
            <th scope="col" class="py-3 px-6">RSSI</th>
            <th scope="col" class="py-3 px-6">Close Contact Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="people in closecontact"
            :key="people.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ people.name }}
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
              {{ people.rssi }}
            </td>
            <td class="py-4 px-6">
              {{ people.contact_timestamp }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="closecontact && (closecontact as Array<any>).length === 0"
        class="text-center p-4 dark:bg-gray-800"
      >
        No records found
      </div>
    </div>
  </div>
</template>
