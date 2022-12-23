import { axios } from "boot/axios";
import { Loading, QSpinnerOval } from "quasar";
import useSupabase from "src/boot/supabase";
import { defineStore } from "pinia";

const { supabase } = useSupabase();

export const useVectorStore = defineStore({
  id: "vectorStore",
  state: () => ({
    countyNames: [],
    subcountyNames: [],
    selectedCountry: "Kenya",
    selectedCounty: "",
    selectedSubcounty: "",
    subcountiesDataCropType: [],
    countiesDataCropType: [],
    countryDataCropType: [],
    // subCountiesData: [],
    selectedRaster: "cropType2021",
    mobileAnalysisPanel: false,
  }),
  getters: {
    getCountyObj: (state) => state.countiesData,
    getCountyNames: (state) => state.countyNames,
    getselectedCountry: (state) => state.selectedCountry,
    getselectedCounty: (state) => state.selectedCounty,
    getselectedSubcounty: (state) => state.selectedSubcounty,
    getSelectedRaster: (state) => state.selectedRaster,
  },
  actions: {
    async fetchCountyNames() {
      const { data, error } = await axios.get(
        "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata:geoBoundaries-KEN-ADM1&maxFeatures=50&outputFormat=application%2Fjson"
      );

      const countiesArray = data.features;

      countiesArray.forEach((d) => {
        this.countyNames.push(d.properties.shapeName);
      });
      // console.log(this.countyNames);
    },

    async getsubcountyNames() {
      const { data, error } = await supabase
        .from("Subcounty")
        .select("shapename, name_1");

      this.subcountyNames = data;
      // console.log(this.subcountyNames);
    },

    async getSubCountyStatsCropType() {
      const { data, error } = await supabase
        .from("cropTypeSubCounties")
        .select("shapeName, shapeArea, Ha_1, Ha_3, Ha_4, Ha_9, Ha_11, Ha_12, Ha_13, Ha_14, Ha_15");

      this.subcountiesDataCropType = data;
    },

    async getCountyStatsCropType() {
      const { data, error } = await supabase
        .from("cropTypeCounties")
        .select(
          "shapeName, shapeArea, Ha_1, Ha_3, Ha_4, Ha_9, Ha_11, Ha_12, Ha_13, Ha_14, Ha_15"
        );

      this.countiesDataCropType = data;
    },

    async getCountryStatsCropType() {
      const { data, error } = await supabase
        .from("cropTypeKenya")
        .select(
          "shapeName, shapeArea, Ha_1, Ha_3, Ha_4, Ha_9, Ha_11, Ha_12, Ha_13, Ha_14, Ha_15"
        );

      this.countryDataCropType = data;
      // console.log(this.countryDataCropType);
    },

    showAnalysis (val) {
      this.mobileAnalysisPanel = val;
    },

    setSelectedRaster(val) {
      this.selectedRaster = val;
    },

    setCountySelected(val) {
      this.selectedCounty = val;
    },
    setsubCountySelected(val) {
      this.selectedSubcounty = val;
    },
  },
});
