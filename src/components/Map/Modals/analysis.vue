<template>
  <div class="analysis-panel-hiden" v-if="showAnalysisBtn">
    <div class="show-stats-btn" v-if="showAnalysisBtn">
      <q-btn
        id="show-stats-btn"
        @click="hideShowBtns()"
        flat
        round
        color="grey-1"
        icon="navigate_next"
      />
    </div>
  </div>

  <!-- <div
    class="bg-grey-9"
    style="
      position: absolute;
      width: 50vw;
      bottom: 0%;
      z-index: 3000;
      right: 0%;
      border-right: 1px solid white;
    "
  >
    <q-btn
      class="full-width q-pa-md"
      @click="showAnalysismobile = !showAnalysismobile"
      flat
      round
      color="grey-1"
      icon="bar_chart"
    />
  </div> -->
  <div
    class="row text-white q-gutter-sm"
    style="position: absolute; left: 5.5%; top: 3.2%; z-index: 2000"
    v-if="showAnalysisBtn"
  >
    <div class="logo-web">
      <img src="~/src/assets/logo.svg" alt="" style="width: 250px" />
    </div>
  </div>

  <div
    class="analysis-panel col q-px-md q-pt-md q-pb-none q-ma-none q-gutter-md"
    v-if="showAnalysis"
  >
    <div class="show-stats-btn-pannel text-center">
      <q-btn
        @click="hideShowBtns()"
        flat
        round
        color="grey-1"
        icon="navigate_before"
      />
    </div>
    <div
      class="row text-white q-gutter-sm"
      style="position: relative; left: 9%"
    >
      <div>
        <img src="~/src/assets/logo.svg" alt="" style="width: 250px" />
      </div>
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      class="scroll-area col q-ma-md q-pa-sm text-grey-9"
      style="height: 85vh; min-width: 100%"
    >
      <q-card
        flat
        class="my-alt-card q-my-md"
        id="slect-region"
        style="min-height: fit-content"
      >
        <q-card-section class="q-pa-md bg-light-green-9 q-mx-md q-my-none">
          <selections />
        </q-card-section>
      </q-card>

      <q-card
        flat
        class="stats-summary my-alt-card q-my-md text-grey-3"
        style=""
      >
        <q-card-section class="q-pa-md" style="font-size: 1.1em">
          In
          <strong style="font-size: 1.2em">{{ selectedArea.areaname }}</strong>
          the total extend of land under cultivation was
          <span v-if="areaUnit === 'km²'"
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.areaKmsq }}
            </strong></span
          >
          <span v-else
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.areaHa }}
            </strong></span
          >
          <span style="border-bottom: 2px solid white"
            ><q-btn
              class="q-pa-none"
              flat
              push
              no-caps
              color="white"
              :label="areaUnit"
              ><q-menu>
                <q-list style="min-width: fit-content">
                  <q-item clickable @click="changeAreaUnit" v-close-popup>
                    <q-item-section> {{ altAreaUnit }} </q-item-section>
                  </q-item>
                </q-list></q-menu
              ></q-btn
            ></span
          >, this represents
          <strong>{{ selectedArea.percentageArea }} %</strong> of the total
          <span v-if="areaUnit === 'km²'"
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.shapeAreaKmsq }}
            </strong></span
          >
          <span v-else
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.shapeAreaHa }}
            </strong></span
          >
          <span style="border-bottom: 2px solid white"
            ><q-btn
              class="q-pa-none"
              flat
              push
              no-caps
              color="white"
              :label="areaUnit"
              ><q-menu>
                <q-list style="min-width: fit-content">
                  <q-item clickable @click="changeAreaUnit" v-close-popup>
                    <q-item-section> {{ altAreaUnit }} </q-item-section>
                  </q-item>
                </q-list></q-menu
              ></q-btn
            ></span
          >
          land area
        </q-card-section>
        <q-card-section>
          <tabledata />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-my-md q-pa-md text-grey-9" id="chart-1">
        <q-card-section class="bg-light-green-1 q-pa-md">
          <!-- <div class="row q-pa-sm">
            <strong>{{ selectedArea.areaname }} Crop Type</strong>
          </div> -->
          <doughnutchart />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-my-md q-pa-md">
        <q-card-section class="bg-light-green-1 q-pa-md">
          <!-- <div class="row q-pa-sm">
            <strong>{{ selectedArea.areaname }} Crop Type</strong>
          </div> -->
          <barchart />
        </q-card-section>
      </q-card>
    </q-scroll-area>
  </div>

  <q-dialog v-model="showAnalysismobile" seamless position="bottom">
    <q-card class="analysis-panel-mobile text-white q-pa-sm q-gutter-sm">
      <q-card-section class="row q-pa-none">
        <h6 class="q-pa-none q-ma-none">Analysis</h6>
        <q-space />
        <div
          class="show-stats-btn-mobile"
          style="position: absolute; width: fit-content; right: 2%"
        >
          <q-btn
            class="p-py-sm"
            icon="expand_more"
            flat
            round
            dense
            v-close-popup
            @click="hideAnalysismobile()"
          />
        </div>
      </q-card-section>

      <q-scroll-area
        :thumb-style="thumbStyle"
        class="col q-ma-none q-pa-none text-white"
        style="height: 45vh; width: 100%; left: 0%"
      >
        <q-card-section class="q-px-sm q-ma-none">
          In
          <strong style="font-size: 1.2em">{{ selectedArea.areaname }}</strong>
          the total extend of land under cultivation was
          <span v-if="areaUnit === 'km²'"
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.areaKmsq }}
            </strong></span
          >
          <span v-else
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.areaHa }}
            </strong></span
          >
          <span style="border-bottom: 1px solid white"
            ><q-btn
              class="q-pa-none"
              flat
              push
              no-caps
              color="white"
              :label="areaUnit"
              ><q-menu>
                <q-list style="min-width: fit-content">
                  <q-item clickable @click="changeAreaUnit" v-close-popup>
                    <q-item-section> {{ altAreaUnit }} </q-item-section>
                  </q-item>
                </q-list></q-menu
              ></q-btn
            ></span
          >, this represents
          <strong>{{ selectedArea.percentageArea }} %</strong> of the total
          <span v-if="areaUnit === 'km²'"
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.shapeAreaKmsq }}
            </strong></span
          >
          <span v-else
            ><strong style="font-size: 1.2em"
              >{{ selectedArea.shapeAreaHa }}
            </strong></span
          >
          <span style="border-bottom: 1px solid white"
            ><q-btn
              class="q-pa-none"
              flat
              push
              no-caps
              color="white"
              :label="areaUnit"
              ><q-menu>
                <q-list style="min-width: fit-content">
                  <q-item clickable @click="changeAreaUnit" v-close-popup>
                    <q-item-section> {{ altAreaUnit }} </q-item-section>
                  </q-item>
                </q-list></q-menu
              ></q-btn
            ></span
          >
          land area
        </q-card-section>

        <q-card-section>
          <tabledata />
        </q-card-section>

        <q-card-section
          flat
          bordered
          class="card-mobile text-grey-9 bg-light-green-1 q-ma-sm q-px-sm"
        >
          <doughnutchart />
        </q-card-section>

        <q-card-section
          flat
          bordered
          class="card-mobile text-grey-9 bg-light-green-1 q-ma-sm q-px-sm"
        >
          <barchart />
        </q-card-section>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";
import { useVectorStore } from "../../../stores/vector_store/index.js";
import setRasterStats from "../../../composables/setStatistics";

export default {
  components: {
    selections: require("components/Map/Modals/layersettings.vue").default,
    barchart: require("components/Map/Modals/chart.vue").default,
    doughnutchart: require("components/Map/Modals/dougnut.vue").default,
    tabledata: require("components/Map/Modals/table.vue").default,
  },
  setup() {
    const store = useVectorStore();
    const { selectedAreaStats } = setRasterStats();

    const showAnalysis = ref(true),
      showAnalysisBtn = ref(false),
      showAnalysismobile = ref(false),
      selectedArea = reactive(ref({})),
      areaUnit = reactive(ref("km²")),
      altAreaUnit = reactive(ref("Ha"));

    const hideShowBtns = function () {
      showAnalysis.value = !showAnalysis.value;
      showAnalysisBtn.value = !showAnalysisBtn.value;
    };

    const changeAreaUnit = function () {
      if (areaUnit.value === "km²") {
        areaUnit.value = "Ha";
        altAreaUnit.value = "km²";
      } else {
        areaUnit.value = "km²";
        altAreaUnit.value = "Ha";
      }
    };

    const setSelectionSummary = async function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });
        if (store.selectedSubcounty) {
          selectedArea.value = selectedAreaStats(
            store.subcountiesDataCropType,
            store.selectedSubcounty,
            " Sub-County"
          );
        } else if (store.selectedCounty) {
          selectedArea.value = selectedAreaStats(
            store.countiesDataCropType,
            store.selectedCounty,
            " county"
          );
        } else {
          selectedArea.value = selectedAreaStats(
            store.countryDataCropType,
            store.selectedCountry,
            ""
          );
        }
        Loading.hide();
      } catch (error) {}
    };

    hideShowBtns();

    store.getCountryStatsCropType().then(() => {
      hideShowBtns();
      setSelectionSummary();
    });

    //hideShowBtns();

    onMounted(() => {
      store.getSubCountyStatsCropType();
      store.getCountyStatsCropType();
      store.getCountryStatsCropType().then(() => {
        return setSelectionSummary;
      });
    });

    // onUpdated(() => {
    //   hideShowBtns()
    //   setSelectionSummary();
    // });

    const selecteVector = computed(() => {
      if (store.selectedSubcounty) {
        return store.getselectedSubcounty;
      } else if (store.selectedCounty) {
        return store.getselectedCounty;
      } else {
        return store.getselectedCountry;
      }
    });

    const hideAnalysismobile = function (val) {
      showAnalysismobile.value = false;
      val = showAnalysismobile.value;
      store.showAnalysis(val);
    };

    const showMobileAnalysis = computed(() => {
      return store.mobileAnalysisPanel;
    });

    watch(showMobileAnalysis, () => {
      showAnalysismobile.value = store.mobileAnalysisPanel;
    });

    watch(selecteVector, () => {
      hideShowBtns();

      store.getCountryStatsCropType().then(() => {
        hideShowBtns();
        setSelectionSummary();
      });
    });

    provide("tabledata", { selectedArea, setSelectionSummary });
    provide("areaUnits", { areaUnit, changeAreaUnit });

    return {
      setSelectionSummary,
      areaUnit,
      altAreaUnit,
      changeAreaUnit,
      selectedArea,
      showAnalysisBtn,
      showAnalysis,
      showAnalysismobile,
      hideAnalysismobile,
      hideShowBtns,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
        width: "4px",
        opacity: "0",
      },
    };
  },
};
</script>

<style>
/* .dialog-box {
  border-radius: 100px;
} */
/* .show-stats-btn-mobile {
  position: absolute;
  bottom: 18%;
  z-index: 3000;
  left: 4%;
} */

.scroll-area {
  position: absolute;
  max-width: 100%;
  min-height: 80vh;
  left: 10%;
  bottom: 0%;
}
.my-card {
  max-width: 78%;
  max-height: fit-content;
  /* left: 10%; */
  background-color: rgb(187, 187, 187, 0);
  /*border: 1px solid rgb(160, 160, 160);*/
  border-radius: 10px;
}

.my-alt-card {
  max-width: 78%;
  max-height: fit-content;
  /* left: 10%; */
  background-color: rgb(187, 187, 187, 0);
  /*border: 1px solid rgb(160, 160, 160);*/
  border-radius: 10px;
}

.area-selection {
  position: relative;
  left: 10%;
  max-width: 75%;
  height: fit-content;
  /* left: 10%; */
  background-color: rgb(187, 187, 187, 0);
  /*border: 1px solid rgb(160, 160, 160);*/
  border-radius: 10px;
}
.card-mobile {
  max-height: fit-content;
  background-color: rgba(50, 121, 44, 0);
  border: 1px solid rgb(160, 160, 160);
  border-radius: 10px;
}

.show-stats-btn-mobile {
  /* width: fit-content; */
  background-image: url("~/src/assets/btnbg2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0px;
}

.analysis-panel-mobile {
  background-color: rgba(50, 121, 44, 0);
  width: 100%;
  right: -1%;
  background-image: url("~/src/assets/bgmobile.svg");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
}
.show-stats-btn {
  position: absolute;
  z-index: 4000;
  top: 18.5%;
  right: 0%;
  width: fit-content;
  background-image: url("~/src/assets/btnbg2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0px;
  /*animation: glow 1s infinite ;*/
}

@keyframes glow {
  0% {
    box-shadow: 5px 5px 20px rgb(93, 52, 168), -5px -5px 20px rgb(93, 52, 168);
    border-radius: 50px;
  }

  50% {
    box-shadow: 5px 5px 20px rgb(81, 224, 210), -5px -5px 20px rgb(81, 224, 210);
    border-radius: 50px;
  }
  100% {
    box-shadow: 5px 5px 20px rgb(93, 52, 168), -5px -5px 20px rgb(93, 52, 168);
    border-radius: 50px;
  }
}

.show-stats-btn-pannel {
  position: absolute;
  z-index: 2000;
  top: 18.5%;
  right: 0%;
  width: fit-content;
  background-image: url("~/src/assets/btnbg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0px;
}

.analysis-panel {
  z-index: 2000;
}

.analysis-panel {
  background-color: rgba(50, 121, 44, 0);
  position: absolute;
  top: 0%;
  min-width: 40%;
  height: 100vh;
  width: 42.5vw;
  background-image: url("~/src/assets/wavesy.svg");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
}

.analysis-panel-hiden {
  background-color: rgba(50, 121, 44, 0);
  position: absolute;
  top: 0%;
  z-index: 2000;
  height: 100vh;
  width: 8vw;
  background-image: url("~/src/assets/wavesy2.svg");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (max-width: 768px) {
  .analysis-panel-hiden {
    width: 0vw;
  }

  .analysis-panel {
    display: none;
  }

  .show-stats-btn {
    display: none;
  }

  .logo-web {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .show-stats-btn-mobile {
    display: none;
  }

  .analysis-panel-mobile {
    display: none;
  }
}
</style>
