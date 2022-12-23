<template>
  <div class="col" style="text-align: center">
    <div class="row q-pa-md q-gutter-sm">
      <div>
        <strong> {{ areaName }} Crop Area (Hectares)</strong>
      </div>
      <q-space />
      <div class="row chart-btns q-gutter-sm q-ma-none">
        <q-btn
          round
          dense
          outline
          size="9px"
          color="grey-9"
          icon="swap_horiz"
          @click="switchChart()"
        />
        <q-btn
          round
          dense
          outline
          type="submit"
          size="9px"
          color="grey-9"
          icon="file_download"
          @click="exportChart"
        />
        <q-btn round dense outline size="9px" color="grey-9" icon="share" />
      </div>
    </div>
    <div
      class="q-my-none q-mt-none"
      style="
        max-width: 70%;
        border: 0px solid rgb(160, 160, 160);
        position: relative;
        left: 15%;
      "
    >
      <vue3-chart-js v-if="doughnut" v-bind="{ ...doughnutChart }" />
      <vue3-chart-js v-if="pie" v-bind="{ ...doughnutChart }" />    
    </div>
    <div
      class="row chart-btn-mobile justify-end q-pa-md q-gutter-sm"
      style="max-width: 100%"
    >
      <div class="row q-gutter-sm q-ma-none">
        <q-btn
          round
          dense
          outline
          size="9px"
          color="grey-9"
          icon="swap_horiz"
        />
        <q-btn
          round
          dense
          outline
          size="9px"
          color="grey-9"
          icon="file_download"
        />
        <q-btn round dense outline size="9px" color="grey-9" icon="share" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { useVectorStore } from "../../../stores/vector_store/index.js";
import setRasterStats from "../../../composables/setStatistics";

export default {
  name: "App",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const store = useVectorStore();
    const { selectedAreaChartData } = setRasterStats();

    const chartRef = ref(null);
    const chartData = ref({});
    const areaName = ref("");
    const cutoutVal = ref("");
    const doughnut = ref(false)
    const pie = ref(true);

    const switchChart = function () {
      if (cutoutVal.value === "") {
        cutoutVal.value = "75%";
        setData()
        pie.value = false;
        doughnut.value = true;
      } else if (cutoutVal.value === "75%") {
        cutoutVal.value = "";
        doughnut.value = false;
        pie.value = true;
        setData()
      }
    };

    const setData = async function () {
      if (store.selectedSubcounty) {
        areaName.value = store.selectedSubcounty + " Subcounty";
        chartData.value = selectedAreaChartData(
          store.subcountiesDataCropType,
          store.selectedSubcounty,
          store.selectedRaster
        );
        chartData.value["cutout"] = cutoutVal.value;
      } else if (
        store.selectedCounty &&
        store.selectedRaster === "cropType2021"
      ) {
        areaName.value = store.selectedCounty + " County";
        chartData.value = selectedAreaChartData(
          store.countiesDataCropType,
          store.selectedCounty,
          store.selectedRaster
        );
        chartData.value["cutout"] = cutoutVal.value;
      } else {
        areaName.value = store.selectedCountry;
        chartData.value = selectedAreaChartData(
          store.countryDataCropType,
          store.selectedCountry,
          store.selectedRaster
        );
        chartData.value["cutout"] = cutoutVal.value;
      }
    };

    setData();

    const doughnutChart = {
      type: "doughnut",
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              font: {
                fontColor: "#EEEEEE",
              },
            },
          },
          title: {
            display: false,
            text: "Crop Area in Ha",
            position: "left",
            color: "#EEEEEE",
          },
        },
      },
      data: {
        labels: chartData.value.chartLabels,
        datasets: [
          {
            backgroundColor: chartData.value.chartColors,
            borderColor: "rgba(0, 0, 0, 0)",
            borderRadius: 10,
            borderWidth: 0,
            spacing: 0,
            cutout: chartData.value.cutout,
            radius: "100%",
            data: chartData.value.plotData,
          },
        ],
      },
    };

    const cutOut = computed(() => {
      return cutoutVal.value
    });

    onMounted(() => {
      setData();
      store.getSubCountyStatsCropType();
      store.getCountyStatsCropType();
      store.getCountryStatsCropType();
      store.getselectedCountry;
    });

    onUpdated(() => {
      setData();
    });

    const selecteVector = computed(() => {
      if (store.selectedSubcounty) {
        return store.getselectedSubcounty;
      } else {
        return store.getselectedCounty;
      }
    });

    const raster = computed(() => {
      return store.getSelectedRaster;
    });

    watch(selecteVector, () => {
      setData();
    });

    watch(raster, () => {
      setData();
    });

    watch(cutOut, () => {
      setData();
    });

    const exportChart = () => {
      let a = document.createElement("a");
      a.href = chartRef.value.chartJSState.chart.toBase64Image();
      a.download = "image-export.png";
      a.click();
      a = null;
    };

    return {
      doughnutChart,
      exportChart,
      areaName,
      switchChart,
      setData,
      doughnut,
      pie
    };
  },
};
</script>
