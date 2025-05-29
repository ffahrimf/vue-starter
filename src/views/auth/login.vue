<template>
  <div
    class="w-full min-h-screen bg-[#F3F5F6] flex items-center justify-center"
  >
    <div class="w-[360px] p-6 bg-white rounded-md shadow-sm">
      <!-- Error Message -->
      <div
        v-if="generalError"
        class="w-full p-3 mb-4 text-sm text-red-600 bg-red-100 border border-red-200 rounded"
        role="alert"
      >
        {{ generalError }}
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <!-- Email / Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email / Username</label
          >
          <input
            v-model="form.key"
            type="text"
            placeholder="Ketik Email atau Username Anda..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-sm"
          />
          <p class="text-sm text-red-500 mt-1" v-html="errs.email"></p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            placeholder="Ketik Password Anda..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-sm"
          />
          <p class="text-sm text-red-500 mt-1" v-html="errs.password"></p>
        </div>

        <!-- Submit Button -->
        <button
          v-if="!loading"
          type="submit"
          class="w-full px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-sm transition"
        >
          Login
        </button>

        <!-- Loading Button -->
        <button
          v-else
          disabled
          class="w-full px-3 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2 text-sm cursor-not-allowed"
        >
          <svg
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Loading...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  useEncrypt,
  useFilterProperties,
  useResetErr,
  useToast
} from "../../composable/use-helper";
import useApi from "../../composable/use-api";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";
import { RoleIF } from "../../interface/role.interface";
import { mainStore } from "../../store";

const store = mainStore();
interface formLogin {
  key?: string;
  password?: string;
}

interface reqIf {
  path: string;
  body: formLogin;
}

interface UserIF {
  id: number;
  username: string;
  name: string;
  email: string;
  email_verified_at?: number;
  password: string;
  role: RoleIF;
}
interface responseLogin {
  token: string;
  refresh_token: string;
  payload: UserIF;
}

const api = new useApi();
const loading = ref<boolean>(false);
const router = useRouter();
const route = useRoute();

const generalError = ref<string>("");

const form = reactive<formLogin>({
  key: "",
  password: ""
});

const errs = reactive<Record<string, string>>({});

const login = (): void => {
  useResetErr(errs);
  generalError.value = "";

  loading.value = true;
  const body = useFilterProperties(form);

  const req: reqIf = {
    path: "auth/login",
    body: body
  };

  api
    .post(req)
    .then((res) => {
      const response: responseLogin = res.data;

      setResponse(response);
      loading.value = false;
      useToast(res.message, "success");
    })
    .catch((err) => {
      loading.value = false;

      const requiredErr = err.errors;
      if (requiredErr) {
        for (let key in requiredErr) {
          errs[key] =
            requiredErr[key].length > 1
              ? requiredErr[key].join(`\n`)
              : requiredErr[key][0];
        }
      }
      generalError.value = err.message;
    });
};

const setResponse = (res: responseLogin): void => {
  const token = useEncrypt(res.token);
  if (token) {
    Cookies.set("hAS-aTH", JSON.stringify(token), {
      expires: 7
    });
  }
  const uid = useEncrypt(`${res.payload.id}`);
  if (uid) {
    Cookies.set("glbl-unq-hr", JSON.stringify(uid), {
      expires: 7
    });
  }

  const role = useEncrypt(res.payload.role.name);
  if (role) {
    Cookies.set("as-starter", JSON.stringify(role), {
      expires: 7
    });
  }
  store.token = res.token;
  store.role = res.payload.role.name;
  store.guid = `${res?.payload?.id}`;
  const qp = route.query.redirect ?? null;
  const redirect = Array.isArray(qp) ? qp[0] : qp;
  router.push(redirect ? redirect : "/dashboard");
};
</script>
