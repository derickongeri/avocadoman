<template>
  <q-page>
    <mappanel>
      <tour />
    </mappanel>
  </q-page>
</template>

<script>
export default {
  name: "my-tour",
  components: {
    mappanel: require("components/Map/Map.vue").default,
  },
};
</script>

<style></style>
