<template>
  <div class="flex flex-col h-full items-center justify-center">
    <h2 class="text-6xl text-center font-bold mb-3">Hello There!</h2>
    <p class="text-center text-2xl my-5">
      Let's buy some insurance. It is goging to only take only a few steps.
    </p>
    <router-link :to="{ name: 'collection' }">
      <button
        class="bg-gray-900 px-8 py-3 rounded-md text-white mt-5 hover:bg-gray-700"
      >
        Start
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "HomeView",
  setup() {
    const store = useStore();
    onMounted(() => {
      store.commit("initUser");
    });
  },
});
</script>
