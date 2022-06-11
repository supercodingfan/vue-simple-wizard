<template>
  <div class="flex flex-col h-full items-center justify-center">
    <h2 class="text-6xl text-center font-bold mb-8">Summary</h2>
    <label class="text-xl mb-3">Name: {{ name }}</label>
    <label class="text-xl mb-3">Age: {{ age }}</label>
    <label class="text-xl mb-3"
      >Where do you live: {{ selectedCountry.name }}</label
    >
    <label class="text-xl mb-3">Package: {{ selectedPackage.name }}</label>
    <label class="text-xl mb-20"
      >Premium:
      {{ 10 * age * selectedCurrency.rate * (selectedPackage.rate + 1) }}
      {{ selectedCurrency.name }}</label
    >
    <div class="flex items-center">
      <button
        class="bg-transparent px-8 py-3 mx-2 rounded-md border border-gray-700 hover:bg-gray-200"
        @click="onBack"
      >
        Back
      </button>
      <button
        class="bg-gray-900 px-8 py-3 mx-2 rounded-md text-white hover:bg-gray-700"
        @click="onBuy"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SummaryView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { name, age, country, packageType } = store.state.user;
    const currencies = store.state.currencies;
    const packages = store.state.packages;
    const countries = store.state.countries;

    const selectedCountry = computed(() => {
      return countries.find((item) => item.id === country);
    });

    const selectedPackage = computed(() => {
      return packages.find((item) => item.id === packageType);
    });

    const selectedCurrency = computed(() => {
      return currencies.find((currency) => currency.id === country);
    });

    const onBuy = () => {
      router.push({ name: "home" });
    };

    const onBack = () => {
      router.push({ name: "collection" });
    };

    return {
      name,
      age,
      selectedCountry,
      selectedPackage,
      selectedCurrency,
      onBack,
      onBuy,
    };
  },
});
</script>
