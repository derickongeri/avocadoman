<template>
  <div
    class="col justify-end navigation-tab q-gutter-md q-py-none bg-light-green-10"
  >
    <div class="col" style="height: 10vh"></div>
    <div class="nav-btns q-pa-none">
      <q-btn color="light-green-1" flat push @click="showRasterSelection">
        <div class="col items-center no-wrap">
          <q-icon left name="eco" />
          <div class="text-center">Crop<br />Type</div>
        </div>
      </q-btn>
    </div>
    <div class="col" style="height: calc(100vh - 25vh)"></div>
    <!-- <h1 class="bg-red q-ma-none" style="font-size: 2em; transform:rotate(-90deg)"> AGRICULTURE STATISTICS</h1> -->
  </div>

  <!-- <div
    class="mobile-selections-1"
    style="
      position: absolute;
      width: fit-content;
      bottom: 46%;
      z-index: 3000;
      right: 2%;
    "
  >
    <q-btn flat round color="grey-1" icon="search" @click="showSelection" />
  </div> -->
  <div
    class="menu-btn-mobile"
    style="position: absolute; width: 85%; top: 7.5%; z-index: 3000; left: 2%"
  >
    <q-btn
      no-caps
      class="full-width"
      color="light-green-1"
      text-color="grey-7"
      unelevated
      rounded
      icon="mdi-map-marker-path"
      label="Search Areas"
      align="left"
      @click="showSelection"
    />
  </div>

  <div
    class="logo-mobile bg-green-9 full-width q-pa-sm"
    style="position: absolute; z-index: 4000; top: 0%"
  >
    <img src="~/src/assets/logo.svg" style="width: 180px" />
  </div>

  <q-footer
    class="footer-mobile bg-grey-9"
    elevated
    style="height: fit-content"
  >
    <q-toolbar class="row full-width">
      <div class="col bg-grey-9" style="border-right: 1px solid white">
        <q-btn
          class="full-width q-px-md"
          flat
          stack
          color="grey-1"
          icon="mdi-map"
          label="Layers"
          @click="showRasterSelection"
        />
      </div>
      <div class="col bg-grey-9" style="">
        <q-btn
          class="full-width q-px-md"
          stack
          flat
          color="grey-1"
          icon="mdi-chart-bar"
          label="Statistics"
          @click="showMobileAnalysis"
        />
      </div>
    </q-toolbar>
  </q-footer>

  <!-- <div class="logo-mobile bg-black full-width q-pt-xs q-pb-none q-px-md">
    <img
      src="~/src/assets/logo.svg"
      style="
        position: absolute;
        top: 1%;
        z-index: 3000;
        left: 2.5%;
        width: 180px;
      "
    />
  </div> -->

  <div id="overlay" v-if="menubar">
    <div class="menu-items bg-grey-4" style="height: fit-content">
      <div class="close-btn" style="right: -3%; top: -4%">
        <q-btn icon="close" color="grey-2" flat round @click="showMenubar" />
      </div>
      <navbar />
    </div>
  </div>

  <div id="overlay" v-if="selection">
    <div class="select-region">
      <div class="close-btn">
        <q-btn icon="close" color="grey-2" flat round @click="showSelection" />
      </div>
      <q-card class="selection-card bg-grey-4">
        <div class="row items-center q-py-none">
          <q-tabs
            v-model="tab"
            inline-label
            class="q-px-sm text-green justify-left"
          >
            <span class="row q-ml-none on-left">
              <q-tab label="Regional Selection" icon="layers" name="one" />
              <!-- <q-tab label="Select Farms" icon="bar_chart" name="two" /> -->
            </span>
          </q-tabs>
        </div>

        <q-separator class="bg-green-4" />
        <q-tab-panel name="one">
          <div class="col text-grey-10 q-gutter-md q-pa-md">
            <q-label>Select County</q-label>
            <q-select
              rounded
              outlined
              dense
              v-model="selectedCounty"
              use-input
              :options="filterOptions"
              @filter="filterFn1"
              @update:model-value="getselectedCounty"
              label="selectedCounty"
            />
            <q-separator />
            <q-label>Select Subcounty</q-label>
            <q-select
              rounded
              dense
              outlined
              fill-input
              v-model="selectedsubCounty"
              :options="filterOptions2"
              @filter="filterFn2"
              @update:model-value="getselectedsubCounty"
              label="Subcounty"
            />
            <!--
            <q-separator />
            <q-label>Choose Analysis</q-label>
            <q-select
              rounded
              outlined
              dense
              v-model="model"
              :options="options"
              label="Ward"
            /> -->
          </div>
        </q-tab-panel>
        <q-tab-panels v-model="tab" animated> </q-tab-panels>
        <!-- <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-4 flex flex-center">
            <q-img class="rounded-borders" src="~/src/assets/kenya.png" />
          </q-card-section>
        </q-card-section> -->
      </q-card>
    </div>
  </div>

  <div id="overlay" v-if="rasterSelection">
    <div class="select-region">
      <div class="close-btn">
        <q-btn
          icon="close"
          color="grey-2"
          flat
          round
          @click="showRasterSelection"
        />
      </div>
      <q-card class="col selection-card bg-grey-4 q-pa-sm">
        <q-list class="q-pa-md">
          <!-- <q-item
            class="raster-selection"
            clickable
            v-ripple
            :active="selectedRaster === 'suitabilityClassified'"
            @click="selectedRaster = 'suitabilityClassified'; getSelectedRaster();showRasterSelection()"
            active-class="active-raster"
            @update:model-value="getSelectedRaster"
          >
            <q-item-section>Avocado Suitability</q-item-section>
            <q-item-section thumbnail>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-item-section>
          </q-item> -->

          <!-- <q-item
            class="raster-selection"
            clickable
            v-ripple
            :active="selectedRaster === 'landcover_Kenya'"
            @click="
              selectedRaster = 'landcover_Kenya';
              getSelectedRaster();
              showRasterSelection();
            "
            active-class="active-raster"
            @update:model-value="getSelectedRaster"
          >
            <q-item-section>Landcover</q-item-section>
            <q-item-section thumbnail>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-item-section>
          </q-item> -->

          <q-item
            class="raster-selection"
            clickable
            v-ripple
            :active="selectedRaster === 'cropType2021'"
            @click="
              selectedRaster = 'cropType2021';
              getSelectedRaster();
              showRasterSelection();
            "
            active-class="active-raster"
            @update:model-value="getSelectedRaster"
          >
            <q-item-section>Croptype End-season 2021</q-item-section>
            <q-item-section thumbnail>
              <img src="~/src/assets/croptypethumb.png" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useVectorStore } from "./../../stores/vector_store/index.js";

export default {
  components: {
    navbar: require("../navigation/sitenav.vue").default,
  },

  setup() {
    const store = useVectorStore();

    const selection = ref(false),
      mobileAnalysis = ref(false),
      rasterSelection = ref(false),
      menubar = ref(false),
      filterOptions = ref([]),
      filterOptions2 = ref([]),
      selectedCounty = ref(null),
      selectedsubCounty = ref(null),
      tab = ref("one"),
      selectedRaster = ref("Landcover"),
      rasterOptions = ref([
        {
          label: "Avocado Suitability",
          value: "avocado",
        },
        {
          label: "Landcover",
          value: "LULC",
        },
      ]);

    const showSelection = function () {
      selection.value = !selection.value;
    };

    const showRasterSelection = function () {
      rasterSelection.value = !rasterSelection.value;
    };

    const showMenubar = function () {
      menubar.value = !menubar.value;
    };

    const showMobileAnalysis = function (val) {
      mobileAnalysis.value = true;
      val = mobileAnalysis.value;
      store.showAnalysis(val);
    };

    const countyNameOptions = computed(() => {
      let countyList = [];
      let countyName = store.countyNames;

      countyName.map((d) => {
        countyList.push(d);
      });
      return countyList.sort();
    });

    const subcountyNameOptions = computed(() => {
      let subcountyName = [];
      let subcountyList = store.subcountyNames;

      let subcountiesWithin = subcountyList.filter((obj) => {
        return obj.name_1 === selectedCounty.value;
      });

      subcountiesWithin.forEach((resp) => {
        subcountyName.push(resp.shapename);
      });

      return subcountyName;
    });

    const filterFn1 = function (val, update) {
      update(() => {
        selectedsubCounty.value = "";
        if (val === "") {
          filterOptions.value = countyNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions.value = countyNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    const filterFn2 = function (val, update) {
      update(() => {
        if (val === "") {
          filterOptions2.value = subcountyNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions2 = subcountyNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    const getSelectedRaster = function (val) {
      val = selectedRaster.value;
      store.setSelectedRaster(val);
    };

    const getselectedCounty = function (val) {
      val = selectedCounty.value;
      store.setCountySelected(val);
      store.setsubCountySelected("");
      selection.value = !selection.value;
    };

    const getselectedsubCounty = function (val) {
      val = selectedsubCounty.value;
      store.setsubCountySelected(val);
      selection.value = !selection.value;
    };

    onMounted(() => {
      store.fetchCountyNames();
      store.getsubcountyNames();
    });

    onUnmounted(() => {
      store.subcountyNames = [];
      store.countyNames = [];
    });

    //const emits = defineEmits([])

    return {
      selection,
      rasterSelection,
      model: ref(null),
      options: [],
      showSelection,
      showRasterSelection,
      filterFn1,
      filterFn2,
      filterOptions,
      filterOptions2,
      tab,
      selectedCounty,
      selectedsubCounty,
      getselectedCounty,
      getselectedsubCounty,
      showMenubar,
      getSelectedRaster,
      menubar,
      rasterOptions,
      selectedRaster,
      showMobileAnalysis,
    };
  },
};
</script>

<style>
.active-raster {
  color: white;
  background: #1ab10c;
}
.menu-items {
  position: absolute;
  left: 5vw;
  top: 10vh;
  width: 30vw;
  border-radius: 20px;
}
.navigation-tab {
  position: absolute;
  z-index: 2000;
  bottom: 0vh;
  left: 0%;
  height: 100vh;
  width: fit-content;
  /* border-radius: 50px; */
  background-color: rgba(23, 78, 10, 1);
}

.nav-btns {
  /* position: absolute;
  z-index: 2000;
  left: 0%;
  top: 20vh; */
  height: fit-content;
  width: fit-content;
  background-color: rgba(23, 78, 10, 0.76);
}

.select-region {
  position: absolute;
  min-width: fit-content;
  min-height: fit-content;
  top: 20%;
  z-index: 2000;
}

.selection-card {
  min-width: 25vw;
  min-height: 65vh;
  left: 18%;
  border-radius: 20px;
}

.close-btn {
  position: absolute;
  z-index: 2000;
  top: -2%;
  right: -23%;
  width: fit-content;
  background-image: url("~/src/assets/btnbg2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: none;
}

#overlay {
  z-index: 4000;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.7);
}

.mobile-selections-1 {
  /* width: fit-content; */
  background-image: url("~/src/assets/btnbg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0px;
}

.mobile-selections-2 {
  /* width: fit-content; */
  background-image: url("~/src/assets/btnbg2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0px;
}

@media screen and (max-width: 768px) {
  .navigation-tab {
    display: none;
  }

  .select-region {
    position: absolute;
    max-width: 50%;
    min-height: fit-content;
    top: 15%;
    left: -9%;
    z-index: 2000;
  }

  .selection-card {
    width: 85vw;
    min-height: 65vh;
    border-radius: 20px;
  }

  .menu-items {
    position: absolute;
    left: 5vw;
    top: 18vh;
    min-width: 90vw;
    border-radius: 20px;
  }
}

@media screen and (min-width: 768px) {
  .footer-mobile {
    display: none;
  }

  .mobile-selections-1 {
    display: none;
  }
  .mobile-selections-2 {
    display: none;
  }
  .menu-btn-mobile {
    display: none;
  }
  .logo-mobile {
    display: none;
  }
  .selection-card {
    width: 20vw;
    min-height: 65vh;
    border-radius: 20px;
  }
}
</style>
