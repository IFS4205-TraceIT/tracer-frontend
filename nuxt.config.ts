import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    css: ['@/assets/css/main.css'],
    typescript: {
        strict: true
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    runtimeConfig: {
        public: {
            apiEndpoint: process.env.API_BASEURL || 'http://localhost:8000'
        }
    }
})
