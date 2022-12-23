<template>
  <q-header
    class="nav-bar text-grey-1"
    reveal
    :reveal-offset="100"
    height-hint="98"
  >
    <q-tabs class="q-pt-lg" align="right" style="width: 66vw; left: 17vw">
      <div class="q-pt-xs q-pb-none q-px-md">
        <img src="~/src/assets/logo.svg" style="width: 200px" />
      </div>
      <q-space></q-space>
      <q-route-tab to="/home" label="home" />
      <q-route-tab to="/page2" label="About" />
      <q-route-tab to="/" label="Dashboard" />
    </q-tabs>
  </q-header>
  <q-page>
    <div class="jumbotron q-pa-none"></div>
    <q-card
      class="bg-green-2 text-grey-9"
      style="
        position: absolute;
        width: 30%;
        border-radius: 20px;
        left: 50%;
        top: 25%;
      "
    >
      <q-card-section>
        <div class="text-left q-pa-md">
          <h6 class="q-pa-sm q-ma-none">Some Tilte</h6>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          </p>
          <p>
            voluptatem totam, architecto cupiditate officia rerum, error
            dignissimos praesentium libero ab nemo provident incidunt ducimus
            iusto perferendis porro earum.
          </p>
          <p>Totam, numquam?</p>
        </div>
      </q-card-section>
    </q-card>
    <div
      class="content"
      style="
        position: absolute;
        height: 500vh;
        width: 60vw;
        top: 79vh;
        left: 20vw;
      "
    >
      <q-card class="text-card bg-green-2 text-grey-9">
        <q-card-section>
          <div class="text-right q-pa-md">
            <h6 class="q-pa-sm q-ma-none">Some Tilte</h6>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            </p>
            <p>
              voluptatem totam, architecto cupiditate officia rerum, error
              dignissimos praesentium libero ab nemo provident incidunt ducimus
              iusto perferendis porro earum.
            </p>
            <p>Totam, numquam?</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>

<style lang="scss">
/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

body {
  background-color: rgb(9, 49, 12);
  // background-image: url("~/src/assets/bghome.svg");
  // background-position: top right;
  // background-repeat: no-repeat;
  // background-size: cover;
  //box-shadow: 0 0 0 2000px rgba(14, 19, 17, 0.5);
}

.nav-bar {
  background-color: rgba(50, 121, 44, 0);
}
.text-card {
  position: absolute;
  z-index: 2000;
  top: 3%;
  right: 0%;
  max-width: 50%;
  border-radius: 20px;
  //box-shadow: inset 0 0 0 2000px rgba(14, 19, 17, 0.5);
}

.jumbotron {
  background-color: rgba(50, 121, 44, 0);
  position: absolute;
  top: -15%;
  min-width: 40%;
  height: 90vh;
  width: 50%;
  left: 0%;
  background-image: url("~/src/assets/avocadotree3.png");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0%;
}
</style>
