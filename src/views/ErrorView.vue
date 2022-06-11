<template>
  <div class="flex flex-col h-full items-center justify-center">
    <h2 class="text-4xl text-center font-bold mb-3">Oops!</h2>
    <p class="text-xl mt-3">Your age is over our accepted limit.</p>
    <p class="text-xl mb-6">We are sorry but we cannot insure you now.</p>
    <router-link :to="{ name: 'home' }">
      <button
        class="bg-gray-900 px-8 py-3 rounded-md text-white mt-5 hover:bg-gray-700"
        @click="onBack"
      >
        Ok :(
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ErrorView",
  setup() {
    const router = useRouter();

    const onBack = () => {
      router.push({ name: "home" });
    };

    return {
      onBack,
    };
  },
});
</script>
