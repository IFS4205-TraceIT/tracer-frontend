<template>
  <div class="min-h-screen flex-col flex items-top justify-center">
    <DefaultNavbar />
    <div class="flex-grow dark:bg-gray-800 dark:text-white">
      <slot />
    </div>
  </div>
</template>
