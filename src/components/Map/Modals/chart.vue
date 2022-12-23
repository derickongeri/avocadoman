<template>
  <div class="col">
    <div class="row q-pa-md q-gutter-sm" style="max-width: 100%">
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
    <vue3-chart-js v-bind="{ ...barChart }" />
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
import sortBarChartData from "../../../composables/sortChartData";

export default {
  name: "App",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const store = useVectorStore();
    const { selectedAreaChartData } = setRasterStats();
    const { sortData } = sortBarChartData();

    const chartData = ref({});
    const sortedChartData = ref({});
    const areaName = ref({});

    // Function to grab the data from the setStatistics composable
    const setData = async function () {
      function sortInput() {
        sortedChartData.value = sortData(
          chartData.value.plotData,
          chartData.value.chartLabels,
          chartData.value.chartColors
        );
      }
      if (store.selectedSubcounty) {
        areaName.value = store.selectedSubcounty + " Subcounty";
        chartData.value = selectedAreaChartData(
          store.subcountiesDataCropType,
          store.selectedSubcounty,
          store.selectedRaster
        );
        sortInput()
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
        sortInput()
      } else {
        areaName.value = store.selectedCountry;
        chartData.value = selectedAreaChartData(
          store.countryDataCropType,
          store.selectedCountry,
          store.selectedRaster
        );
        sortInput()
      }

      console.log(parseInt(sortedChartData.value.plotsData[0]))
    };

    setData();

    const barChart = {
      type: "bar",
      options: {
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "bottom",
            labels: {
              font: {
                fontColor: "#333333",
              },
            },
          },
          title: {
            display: true,
            text: "Crop Area in Ha",
            position: "bottom",
            color: "#333333",
          },
        },
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            min: 0,
            max: parseInt(sortedChartData.value.plotsData[0]),
            ticks: {
              callback: function (value) {
                value = value.toFixed();
                return `${value}`;
              },
              color: "#333333",
            },
            grid: {
              color: "",
            },
          },
          y: {
            ticks: {
              color: "#333333",
            },
            grid: {
              color: "",
            },
          },
        },
      },
      data: {
        labels: sortedChartData.value.plotsLabels,
        datasets: [
          {
            //barThickness: 'flex',
            label: "",
            backgroundColor: sortedChartData.value.colors,
            data: sortedChartData.value.plotsData,
          },
        ],
      },
    };

    onMounted(() => {
      //setData();
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

    return {
      barChart,
      areaName,
    };
  },
};
</script>

<style>
#map-chart {
  position: absolute;
  z-index: 30000;
  width: 100%;
  height: 100%;
  margin-top: 2%;
  /* left: 57%;  */
}

.map-navigation-tools {
  position: relative;
  z-index: 30000;
  width: 100%;
  height: 30%;
  /* background-color: white; */
  margin-top: 29%;
  left: 67%;
}

@media screen and (max-width: 768px) {
  .chart-btns {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .chart-btn-mobile {
    display: none;
  }
}
</style>
