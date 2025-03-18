// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  build: {
    transpile: ["vue-toastification"],
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
    },
    private: {
      supabaseKey: process.env.SUPABASE_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
  plugins: [
    { src: "~/plugins/supabase.js", mode: "client" },
    "~/plugins/vue-toastification",
  ],
});
