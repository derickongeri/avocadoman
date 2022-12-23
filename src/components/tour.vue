<template>
  <div class="site-tour">
    <v-tour
      name="myTour"
      :steps="steps"
      :options="{ highlight: true }"
    ></v-tour>
  </div>
</template>

<script>
import "vue3-tour/dist/vue3-tour.css";

export default {
  name: "mytour",

  data() {
    return {
      steps: [
        {
          target: "#v-step-0",
          content: `Use the layers control to change the opacity and change the background/basemap layer, and download the map.`,
        },
        {
          target: ".scroll-area",
          content: `Scroll through the <strong>Statistics Panel</strong> to select and view layer statistics for different counties and sub-counties. The panel also has a short summary descriptions of the loaded area and statistics`,
        },
        {
          target: "#slect-region",
          content: `Use this <strong>Area selection panel</strong> to select your county or subcounty of interest. Sub-county list is filtered to the selected county`,
        },
        {
          target: ".stats-summary",
          content: `This section will display the summary of the Selected Region ie the name of the region, the total crop area, and the total land area`,
        },
        {
          target: "#chart-1",
          content: `Click on the listed chart items to visualize the ratio between specific items of interest eg ratio of sugarcan and tea <img src="~/src/assets/chart.png" style="width: 250px"/>`,
        },
      ],
    };
  },

  mounted: function () {
    //this.$tours["myTour"].start();
  },
};
</script>

<style>
.stie-tour {
  position: absolute;
  z-index: 4000;
}
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
  z-index: 4200;
}
</style>
