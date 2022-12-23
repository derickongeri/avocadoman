<template>
  <div class="q-pa-md bg-grey-2" style="width: fit-content">
    <q-form @submit.prevent="handleRegistration">
      <div class="text-primary row">
        <div style="width: 450px"></div>
        <q-space />
        <q-btn icon="close" size="8px" outline round dense v-close-popup />
      </div>
      <div class="text-center text-primary" style="height: fit-content">
        <h6 class="q-px-md q-my-none q-pb-xs" v-if="userRegistration">
          Register New Account
        </h6>
        <h6 class="q-px-md q-my-none q-pb-xs" v-if="userLogin">Log in</h6>
      </div>
      <div class="text-primary q-py-xs q-px-md q-pt-lg" v-if="userRegistration">
        <div>
          <q-label class="q-ma-md">Enter your name *</q-label>
          <q-input
            rounded
            outlined
            dense
            v-model="form.name"
            label="Name Surname"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Field is required *']"
          />
        </div>
      </div>

      <div class="col text-primary q-gutter-xl q-py-xs q-px-md">
        <div>
          <q-label class="q-ma-md">Your Email *</q-label>
          <q-input
            rounded
            outlined
            dense
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Field is required *']"
          />
        </div>
      </div>
      <div class="text-primary q-py-xs q-px-md">
        <div>
          <q-label class="q-ma-md">Password *</q-label>
          <q-input
            type="password"
            rounded
            outlined
            dense
            v-model="form.password"
            label="Password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Field is required *']"
          />
        </div>

        <div v-if="userRegistration">
          <q-label class="q-ma-md">Confirm Password *</q-label>
          <q-input
            type="password"
            rounded
            outlined
            dense
            v-model="form.confirmedpassword"
            label="Password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Field is required *']"
          />
        </div>
      </div>
      <div
        class="col q-gutter-md text-center q-ma-none"
        v-if="userRegistration"
      >
        <q-btn
          type="submit"
          class="q-px-xl"
          unelevated
          rounded
          size="lg"
          color="primary"
          label="Sing up"
          @click="handleRegister"
        />
        <p class="q-mt-sm q-mb-xs text-grey">Already have an acount?</p>
        <q-btn
          class="q-mt-none q-px-xl"
          outline
          rounded
          size="lg"
          color="primary"
          label="Log in"
          @click="switchForms"
        />
      </div>
      <div class="col q-gutter-md text-center q-ma-none" v-if="userLogin">
        <q-btn
          type="submit"
          class="q-mt-none q-px-xl"
          unelevated
          rounded
          size="lg"
          color="primary"
          label="Log in"
          @click="handleLogin"
        />
        <p class="q-mt-sm q-mb-xs text-grey">Don't have an acount?</p>
        <q-btn
          class="q-px-xl"
          outline
          rounded
          size="lg"
          color="primary"
          label="Sing up"
          @click="switchForms"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import userAuthUser from "src/composables/UserAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { login, register } = userAuthUser();

    //to help swithch between the Login/registration forms
    const userRegistration = ref(false);
    const userLogin = ref(true);

    //Object to hold the form data
    const form = ref({
      name: "",
      email: "",
      password: "",
      confirmedpassword: "",
    });

    //method to switch between the Login/register forms
    const switchForms = function () {
      userRegistration.value = !userRegistration.value;
      userLogin.value = !userLogin.value;
    };

    //method to handle login and redirect to dashboard
    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ path: "/dashboard" });
      } catch (error) {
        alert(error.message, form.value.email);
      }
    };

    //method to handle login and redirect to dashboard
    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({ path: "/dashboard" });
      } catch (error) {
        alert(error.message, form.value.email);
      }
    };

    return {
      form,
      userLogin,
      userRegistration,
      switchForms,
      handleLogin,
      handleRegister,
    };
  },
});
</script>

<style></style>
