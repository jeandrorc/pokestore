<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-btn icon v-if="route.path !== '/'" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <v-app-bar-title>
      <v-app-bar-title class="font-weight-black">
        <RouterLink class="text-decoration-none text-white" to="/"
          >Poke Store</RouterLink
        >
      </v-app-bar-title>
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn>
        <RouterLink class="text-decoration-none text-white" to="/history"
          >History</RouterLink
        >
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
