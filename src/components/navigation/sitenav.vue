<template>
  <div class="row q-pa-lg q-pb-none" style="font-size: 2em; max-height: 2.5em">
    Welcome to the Kenya Avocado World
  </div>
  <div
    class="q-px-md q-py-sm text-grey-9"
    style="max-width: 100%; font-size: 1.2em"
  >
    <q-list>
      <q-item clickable to="/home" v-ripple>
        <q-item-section>Home</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>About</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Login/Register</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Feedback</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Agriculture and Food Authority</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div class="row q-pa-lg">
    <img src="~/src/assets/logo4main3.png"  alt="" style="width:200px"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
