<template>
  <q-btn
    @click="showLayersMenu = !showLayersMenu"
    color="primary"
    label="Layers"
    class="show-layers-btn"
  >
    <q-menu
      anchor="top right"
      self="top left"
      :offset="[20, 0]"
      class="layer-selection-list"
    >
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>Forest</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Land Cover</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Vegetation Quality Index</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Management Quality Index</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  data() {
    return {
      showLayersMenu: true,
    };
  },
};
</script>

<style>
.show-layers-btn {
  position: absolute;
  z-index: 2000;
  top: 6%;
  left: -0.8%;
  transform: rotate(-90deg);
}

.layer-settings-panel {
  position: relative;
  margin-right: 72%;
  height: 30%;
  margin-top: -29%;
  width: 25%;
}

@media screen and (max-width: 768px) {
  .show-layers-btn {
    position: absolute;
    z-index: 2000;
    top: 10%;
    left: -5%;
    transform: rotate(-90deg);
  }

  .layer-selection-list {
    width: 250px;
  }
}
</style>
