<template>
  <div class="flex flex-col h-full items-center justify-center">
    <h2 class="text-4xl font-bold mb-3">Tell me about yourself</h2>
    <form name="user_form" class="mt-10">
      <div class="flex flex-col my-2">
        <label class="text-xl mb-1">Name</label>
        <input
          type="text"
          name="name"
          v-model="name"
          class="px-3 py-2 rounded-md border border-gray-400"
          placeholder="Input name"
          required
        />
      </div>
      <div class="flex flex-col my-2">
        <label class="text-xl mb-1">Age</label>
        <input
          type="number"
          name="age"
          v-model="age"
          class="px-3 py-2 rounded-md border border-gray-400"
          placeholder="Input age"
          required
        />
      </div>
      <div class="flex flex-col my-2">
        <label class="text-xl mb-1">Where do you live</label>
        <select
          name="country"
          v-model="country"
          class="px-3 py-2 rounded-md border border-gray-400"
          required
        >
          <option v-for="item in countries" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col mt-10" v-if="isVisiblePackageType">
        <div v-for="item in packages" :key="item.id">
          <input
            v-model="packageType"
            type="radio"
            :id="item.id"
            :value="item.id"
            class="mr-2"
            required
          />
          <label class="text-lg" :for="item.id"
            >{{ item.name
            }}{{
              item.rate
                ? `(+${total * selectedCurrency.rate * item.rate}
                ${selectedCurrency.name}, ${item.rate * 100}%)`
                : ""
            }}</label
          >
        </div>
      </div>
    </form>
    <div class="m-16">
      <p class="text-xl font-bold" v-if="!disabled">
        Your premium is
        {{ total * selectedCurrency.rate * (1 + selectedPackage.rate)
        }}{{ selectedCurrency.name }}
      </p>
    </div>
    <div class="flex items-center">
      <button
        class="bg-transparent px-8 py-3 mx-2 rounded-md border border-gray-700 hover:bg-gray-200"
        @click="onBack"
      >
        Back
      </button>
      <button
        class="bg-gray-900 px-8 py-3 mx-2 rounded-md text-white hover:bg-gray-700"
        @click="onNext"
        :disabled="disabled"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "CollectionView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const countries = store.state.countries;
    const currencies = store.state.currencies;
    const packages = store.state.packages;
    const user = store.state.user;

    const name = ref(user.name);
    const age = ref(user.age);
    const country = ref(user.country);
    const packageType = ref(user.packageType);

    const onBack = () => {
      router.push({ name: "home" });
    };

    const onNext = () => {
      if (name.value && age.value && country.value && packageType.value) {
        store.dispatch("addUserInfo", {
          name: name.value,
          age: age.value,
          country: country.value,
          packageType: packageType.value,
        });
        router.push({ name: "summary" });
      }
    };

    const isVisiblePackageType = computed(() => {
      return name.value && age.value && country.value;
    });

    const disabled = computed(() => {
      return !name.value || !age.value || !country.value || !packageType.value;
    });

    const selectedCurrency = computed(() => {
      return currencies.find((currency) => currency.id === country.value);
    });

    const selectedPackage = computed(() => {
      return packages.find((item) => item.id === packageType.value);
    });

    const total = computed(() => {
      if (age.value) {
        return 10 * age.value;
      }
      return 0;
    });

    watch(age, (val) => {
      if (val < 0 || val > 100) router.push({ name: "error" });
    });

    return {
      name,
      age,
      country,
      packageType,
      isVisiblePackageType,
      disabled,
      selectedCurrency,
      selectedPackage,
      total,
      countries,
      currencies,
      packages,
      onBack,
      onNext,
    };
  },
});
</script>
