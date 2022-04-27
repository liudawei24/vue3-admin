<template>
  <div>{{ vitePort }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const vitePort = ref(import.meta.env.VITE_PORT);
</script>
