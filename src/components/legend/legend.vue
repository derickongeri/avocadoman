<template>
  <div
    ref="draggableContainer"
    id="draggable-container"
    class="legend text-grey-9 bg-light-green-1"
    style="min-width: fit-content; border-radius: 10px"
  >
    <div
      id="draggable-header"
      @touchstart="dragMouseDown"
      @mousedown="dragMouseDown"
    >
      <h6 class="q-pa-sm q-ma-xs">{{legendTiltle}}</h6>
    </div>
    <div class="col q-pa-sm q-ma-xs q-gutter-xs" style="-webkit-column-count: 5; column-count: 3">
      <div
        class="row q-gutter-sm q-pa-xs"
        v-for="(landcover, key) in legendData"
        :key="key" 
      >
        <!-- <div
          class="legend-item"
          :style="`border-color:` + landcover.color"
          style="width: 50px"
        ></div>
        <div class="text-center" style="font-size: 0.65rem">
          {{ landcover.landcover }}
        </div> -->
        <i
          :style="`background:` + landcover.color"
          class="q-px-sm q-my-sm"
          style="border: 0px outset black; border-radius: 20px"
        ></i>
        <span class="q-px-sm q-my-sm">{{ landcover.landcover }}</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, $refs, onMounted, computed, watch } from "vue";
import setRasterStats from "../../composables/setStatistics";
import { useVectorStore } from "../../stores/vector_store/index.js";

export default defineComponent({
  setup() {
    const store = useVectorStore();
    const { setLegendColors } = setRasterStats();

    const legendData = ref([]),
      legendTiltle = ref("");

    const positions = ref({
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    });
    const draggableContainer = ref(null);

    const dragMouseDown = function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      positions.value.clientX = event.clientX;
      positions.value.clientY = event.clientY;
      document.onpointermove = elementDrag;
      document.onpointerup = closeDragElement;
    };

    function elementDrag(event) {
      event.preventDefault();
      positions.value.movementX = positions.value.clientX - event.clientX;
      positions.value.movementY = positions.value.clientY - event.clientY;
      positions.value.clientX = event.clientX;
      positions.value.clientY = event.clientY;
      // set the element's new position:
      draggableContainer.value.style.top =
        draggableContainer.value.offsetTop - positions.value.movementY + "px";
      draggableContainer.value.style.left =
        draggableContainer.value.offsetLeft - positions.value.movementX + "px";
    }
    function closeDragElement() {
      document.onpointerup = null;
      document.onpointermove = null;
    }
    const setLegendData = function () {
      if (store.selectedRaster === "suitabilityClassified") {
        legendTiltle.value = "Suitablility Scale";
      } else if (store.selectedRaster === "landcover_Kenya"){
        legendTiltle.value = "Landcover Classes";
      } else{
        legendTiltle.value = "Cropland Classes";
      }
      legendData.value = setLegendColors(store.selectedRaster);
    };

    //setLegendData();

    onMounted(() => {
      setLegendData();
      store.getSelectedRaster;
    });

    const raster = computed(() => {
      return store.getSelectedRaster;
    });

    watch(raster, () => {
      setLegendData();
    });

    return {
      legendData,
      legendTiltle,
      draggableContainer,
      dragMouseDown,
    };
  },
});
</script>

<style lang="scss">
#draggable-container {
  position: absolute;
  z-index: 3000;
  // min-width: 150px;
  // max-width: 250px;
  max-height: fit-content;
  // right: 1%;
  // bottom: 8%;
  //background-color: rgba(175, 214, 182, 0.75);
}

.legend-item {
  font-size: 0.75rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  text-align: center;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
}

*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}
</style>
