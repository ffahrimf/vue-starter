<template>
  <div class="flex flex-col gap-2 justify-center items-center h-screen">
    <h1 class="text-2xl font-semibold">Welcome to Dashboard!</h1>
    <button
      @click="logout"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Logout
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useRemoveStorage } from "../../composable/use-helper";
import { mainStore } from "../../store";
const router = useRouter();

const store = mainStore();

const logout = () => {
  useRemoveStorage();
  store.profile = null;
  store.token = null;
  store.role = null;
  store.guid = null;
  router.push("/");
};
</script>
