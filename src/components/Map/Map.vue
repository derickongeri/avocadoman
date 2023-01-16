<template>
  <div style="height: -webkit-fill-available; width: 100vw">
    <div id="mapid" style="height: 100vh; width: 100vw">
      <div class="zoom-controls col q-gutter-xs" style="width: fit-content">
        <div class="col q-gutter-sm" id="#v-step-1">
          <div class="row">
            <q-space />
            <q-btn
              size="sm"
              round
              color="secondary"
              icon="add"
              @click="zoom_in"
            />
          </div>
          <div class="row">
            <q-space />
            <q-btn
              size="sm"
              round
              color="secondary"
              icon="remove"
              @click="zoom_out"
            />
          </div>
          <div class="row text-white">
            <q-space />
            <div>
              <q-toggle
                size="xl"
                v-model="setLabels"
                checked-icon="check"
                color="teal"
                label="Map Labels"
                icon-color=""
                left-label
                unchecked-icon="clear"
              />
            </div>
          </div>
        </div>
        <div class="row justify-end" style="min-width: 500px">
          <mapLegend
            @mouseover="map.dragging.disable()"
            @mouseout="map.dragging.enable()"
            @pointerover="map.dragging.disable()"
            @pointerout="map.dragging.enable()"
          />
        </div>
      </div>

      <div
        class="absolute-centre tour-btn"
        style="position: absolute; top: 4%; left: 0.5%; z-index: 3500"
      >
        <q-btn
          outline
          padding="sm"
          color="grey-5"
          icon="follow_the_signs"
          size="20px"
          @click="
            setTour();
            this.$tours['myTour'].start();
          "
        >
        </q-btn>
      </div>

      <div
        class="map-controls map_controls q-pa-sm q-mt-md row q-gutter-md text-center"
      >
        <div id="v-step-0" class="row q-gutter-md">
          <div
            class="fancy-btn absolute-centre"
            @mouseover="showBaseMapList = true"
            @mouseleave="handle_base_layers"
          >
            <q-btn flat padding="sm" color="grey-1" icon="layers" size="12px">
            </q-btn>
          </div>

          <div class="fancy-btn-2 absolute-centre">
            <q-btn
              flat
              padding="sm"
              color="grey-1"
              icon="more_vert"
              size="12px"
              @click="extraControls = !extraControls"
            >
              <q-menu :offset="[0, 20]" class="bg-green-3">
                <div
                  class="col no-wrap q-pa-sm q-ma-none bg-green-3 text-grey-1"
                >
                  <div
                    class="q-px-sm absolute-centre"
                    style="width: 200px"
                    @mouseover="map.dragging.disable()"
                    @mouseout="map.dragging.enable()"
                  >
                    <div>
                      <div class="q-py-sm">Opacity</div>

                      <q-slider
                        :min="1"
                        :max="10"
                        :step="1"
                        v-model="opacityValue"
                        label
                        color="green-5"
                        thumb-size="12px"
                        class="row"
                        @mouseenter="handle_opacity"
                      />
                    </div>
                    <q-separator dark />
                    <div
                      @mouseover="base_map_ctrl_cliked = true"
                      @mouseleave="base_map_ctrl_cliked = false"
                    >
                      <div class="q-pb-sm">Base Maps</div>
                      <q-list class="col q-gutter-md">
                        <q-item
                          clickable
                          v-close-popup
                          v-for="basemap in Object.keys(baseMaps)"
                          :key="basemap"
                          @click="change_base_map(basemap)"
                          @mouseup="map.dragging.enable()"
                        >
                          <q-item-section>{{ basemap }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
      <!-- <layerstab
        draggable="true"
        @mouseover="map.dragging.disable()"
        @mouseout="map.dragging.enable()"
      /> -->

      <div
        class="mobile-map-control col q-pa-sm q-mt-md q-gutter-sm text-center"
      >
        <div id="v-step-0" class="col q-gutter-md">
          <!-- <div
            class="fancy-btn absolute-centre"
            @mouseover="showBaseMapList = true"
            @mouseleave="handle_base_layers"
          >
            <q-btn
              flat
              padding="sm"
              color="grey-1"
              icon="more_vert"
              size="12px"
            >
            </q-btn>
          </div> -->

          <div class="fancy-btn-2 absolute-centre">
            <q-btn
              flat
              padding="sm"
              color="grey-1"
              icon="layers"
              size="12px"
              @click="extraControls = !extraControls"
            >
              <q-menu :offset="[0, 20]" class="bg-green-3">
                <div
                  class="col no-wrap q-pa-sm q-ma-none bg-green-3 text-grey-1"
                >
                  <div
                    class="q-px-sm absolute-centre"
                    style="width: 200px"
                    @mouseover="map.dragging.disable()"
                    @mouseout="map.dragging.enable()"
                  >
                    <div>
                      <div class="q-py-sm">Opacity</div>

                      <q-slider
                        :min="1"
                        :max="10"
                        :step="1"
                        v-model="opacityValue"
                        label
                        color="green-5"
                        thumb-size="12px"
                        class="row"
                        @mouseenter="handle_opacity"
                      />
                    </div>
                    <q-separator dark />
                    <div
                      @mouseover="base_map_ctrl_cliked = true"
                      @mouseleave="base_map_ctrl_cliked = false"
                    >
                      <div class="q-pb-sm">Base Maps</div>
                      <q-list class="col q-gutter-md">
                        <q-item
                          clickable
                          v-close-popup
                          v-for="basemap in Object.keys(baseMaps)"
                          :key="basemap"
                          @click="change_base_map(basemap)"
                          @mouseup="map.dragging.enable()"
                        >
                          <q-item-section>{{ basemap }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>

      <!-- <div
        class="more-mobile-map-control col q-pa-sm q-mt-md q-gutter-sm text-center"
        v-if="moreMobileControls"
      >
        <div class="absolute-centre bg-grey-4">
          <q-btn
            flat
            padding="sm"
            class="bg-grey-4"
            icon="straighten"
            size="12px"
          />
        </div>

        <div class="absolute-centre bg-grey-4">
          <q-btn
            flat
            padding="sm"
            class="bg-grey-4"
            icon="highlight_alt"
            size="12px"
          />
        </div>

        <div class="absolute-centre bg-grey-4">
          <q-btn
            flat
            padding="sm"
            class="bg-grey-4"
            icon="file_download"
            size="12px"
          />
        </div>
        <div class="absolute-centre bg-grey-4">
          <q-btn flat padding="sm" class="bg-grey-4" icon="share" size="12px" />
        </div>
      </div> -->
    </div>

    <analysis
      @wheel="map.scrollWheelZoom.disable()"
      @mouseout="map.dragging.enable()"
      @pointerover="map.scrollWheelZoom.disable()"
      @pointerout="map.dragging.enable()"
    />
    <selections />
    <tour />
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useVectorStore } from "./../../stores/vector_store/index.js";
import L from "leaflet";
import "./Modals/mask";
import "leaflet/dist/leaflet.css";
//import "leaflet-draw/dist/leaflet.draw-src.css";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";
import { axios } from "src/boot/axios";
//import "leaflet-draw";
//import "leaflet-side-by-side";

import baselayers from "./Modals/baselayers";


export default {
  components: {
    analysis: require("components/Map/Modals/analysis.vue").default,
    MapLegend: require("components/legend/legend.vue").default,
    selections: require("components/selections/selections.vue").default,
    barchart: require("components/Map/Modals/chart.vue").default,
    tabledata: require("components/Map/Modals/table.vue").default,
    tour: require("components/tour.vue").default,
  },

  setup() {
    const store = useVectorStore();

    const map = ref(null),
      center = ref([1, 36]), // set initial map center
      baseMaps = ref([]),
      current_top_base_layer = ref(null), //holds the top tile layer on the map
      showBaseMapList = ref(false), //show or hide base layers
      base_map_ctrl_cliked = ref(false),
      opacityValue = ref(10),
      currentRasterLayer = ref(null),
      currentVectLayer = ref(null),
      subRegionBoundaries = ref(null);
    // moreMobileControls = ref(false),
    // extraControls = ref(false);

    let setLabels = ref(false);
    let mapLabels = ref(null);
    let selectedPopupFeature = ref(null);

    const setLeafletMap = function () {
      const { osmTiles, darkMap, satellite } = baselayers;

      baseMaps.value = {
        OSM: osmTiles,
        satellite: satellite,
        darkMap: darkMap,
      };

      map.value = L.map("mapid", {
        zoomControl: false,
        layersControl: false,
        attributionControl: false,
        minZoom: 4,
        maxZoom: 17,
        //layers:[satellite]
      }).setView(center.value, 7);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      ).addTo(map.value);

      L.control.layers(baseMaps.value, currentVectLayer.value).addTo(map.value);

      current_top_base_layer.value = "satellite";

      L.control
        .attribution({
          position: "bottomright",
        })
        .addTo(map.value);
      L.control.scale({ position: "bottomright" }).addTo(map.value);
      ///////////////////hide layers control
      let layerControl = document.getElementsByClassName(
        "leaflet-control-layers"
      );
      layerControl[0].style.visibility = "hidden";
    };

    const zoom_in = function () {
      map.value.setZoom(map.value.getZoom() + 1);
    };

    const zoom_out = function () {
      map.value.setZoom(map.value.getZoom() - 1);
    };

    const showListofBaseMaps = function () {
      return (showBaseMapList.value = !showBaseMapList.value);
    };

    const handle_base_layers = function () {
      setTimeout(() => {
        if (base_map_ctrl_cliked.value === false) showBaseMapList.value = false;
      }, 750);
    };

    //get the base map object of leaflet according to the selection clicked
    const change_base_map = function (basemap) {
      const index = Object.keys(baseMaps.value).indexOf(basemap);

      let layerControlElement = document.getElementsByClassName(
        "leaflet-control-layers"
      )[0];
      layerControlElement.getElementsByTagName("input")[index].click();
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setCurrentRaster = function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });
        if (currentRasterLayer.value)
          map.value.removeLayer(currentRasterLayer.value);

        let layerSelected = "kenyadata:" + store.selectedRaster;

        const wmsURL = "http://78.141.234.158/geoserver/kenyadata/wms";

        currentRasterLayer.value = L.tileLayer
          .wms(wmsURL, {
            layers: layerSelected, //"kenyadata:suitabilityClassified,geoBoundaries-KEN-ADM0",
            format: "image/png",
            transparent: "true",
            opacity: 1,
          })
          .addTo(map.value);

        currentRasterLayer.value.bringToFront();

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const setCurrentVector = async function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });

        if (currentVectLayer.value)
          map.value.removeLayer(currentVectLayer.value);

        let county = store.selectedCounty;
        let subCounty = store.selectedSubcounty;
        let wfsUrl = "";

        if (subCounty) {
          subCounty = subCounty.replace(/'/g, "''");

          wfsUrl =
            "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3AgeoBoundaries-KEN-ADM2&maxFeatures=250&outputFormat=application%2Fjson&CQL_FILTER=shapeName=" +
            "'" +
            subCounty +
            "'";
        } else if (county) {
          county = county.replace(/'/g, "''");

          wfsUrl =
            "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3AgeoBoundaries-KEN-ADM1&maxFeatures=250&outputFormat=application%2Fjson&CQL_FILTER=shapeName=" +
            "'" +
            county +
            "'";
        } else {
          wfsUrl =
            "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3AgeoBoundaries-KEN-ADM0&maxFeatures=50&outputFormat=application%2Fjson";
        }

        let response = await axios.get(wfsUrl);

        console.log(response.data.features[0].properties.shapeName);

        const jsonLayer = L.geoJSON([response.data]);

        currentVectLayer.value = L.mask([response.data], {
          fillOpacity: 0.7,
          fillColor: "#424242",
          color: "#ffff00",
        });

        currentVectLayer.value.addTo(map.value);

        function setMaptoVeiwPort(viewPortSixe) {
          if (viewPortSixe.matches) {
            map.value.fitBounds(jsonLayer.getBounds(), {
              paddingBottomRight: [0, 250],
            });
          } else {
            map.value.fitBounds(jsonLayer.getBounds(), {
              paddingBottomRight: [-450, 0],
            });
          }
        }

        let viewPortSixe = window.matchMedia("(max-width: 768px)");
        setMaptoVeiwPort(viewPortSixe); // Call listener function at run time
        viewPortSixe.addEventListener("change", setMaptoVeiwPort); // Attach listener function on state changes

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const setSubRegions = async function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });

        if (subRegionBoundaries.value)
          map.value.removeLayer(subRegionBoundaries.value);

        let county = store.selectedCounty;
        let wfsUrl = "";

        if (county) {
          wfsUrl =
            "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3AgeoBoundaries-KEN-ADM2&maxFeatures=250&outputFormat=application%2Fjson";
        } else {
          wfsUrl =
            "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3AgeoBoundaries-KEN-ADM1&maxFeatures=250&outputFormat=application%2Fjson";
        }
        let response = await axios.get(wfsUrl);

        console.log(response.data.features);

        subRegionBoundaries.value = L.geoJSON([response.data], {
          style: function (feature) {
            return {
              color: "#212121",
              weight: 1,
              fillOpacity: 0,
              opacity: 0.95,
            };
          },
          onEachFeature: function (feature, layer) {
            feature = layer
              .bindPopup(
                "<br><strong>" +
                  feature.properties.shapeName +
                  " " +
                  (feature.properties.Level === "ADM1"
                    ? "County"
                    : "Sub-County") +
                  ",</strong><br> total area of <strong>" +
                  (feature.properties.Shape_Area * 12286.2592).toFixed(2) +
                  "km² </strong><br><br> <button id='pop-up-selector' class='pop-up-btn'>Analyze</button>"
              )
              .on("popupopen", function () {
                selectedPopupFeature.value =
                  feature.feature.properties.shapeName;
              });
          },
        });

        console.log(subRegionBoundaries.value);

        subRegionBoundaries.value.addTo(map.value).bringToBack();

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const handle_opacity = function () {
      if (currentRasterLayer.value)
        currentRasterLayer.value.options.opacity = opacityValue.value / 10;
      if (currentRasterLayer.value)
        map.value.removeLayer(currentRasterLayer.value);
      currentRasterLayer.value.addTo(map.value); //add layer to map
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    // const leafletRouting = function () {
    //   if (!navigator.geolocation) {
    //     console.log("navigator not supported");
    //   } else {
    //     function getPosition(position) {
    //       console.log(position);
    //       let lat = position.coords.latitude;
    //       let long = position.coords.longitude;
    //       let accuracy = position.coords.accuracy;

    //       let myIcon = L.icon({
    //         iconUrl:
    //           "https://res.cloudinary.com/dv3id0zrx/image/upload/v1653299774/location_qppejm.png",
    //         iconSize: [38, 45],
    //         // iconAnchor: [22, 94],
    //         // popupAnchor: [-3, -76],
    //       });

    //       let marker = L.marker([lat, long], { icon: myIcon })
    //         .bindPopup("This is your position")
    //         .openPopup();
    //       let circle = L.circle([lat, long], { radius: accuracy });

    //       let featureGroup = L.featureGroup([marker, circle]);
    //       featureGroup.addTo(map.value);
    //     }
    //     navigator.geolocation.getCurrentPosition(getPosition);
    //   }
    // };

    const addLabels = function (val) {
      if (val) {
        mapLabels.value = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            //maxZoom: 20,
          }
        );
        mapLabels.value.addTo(map.value).bringToFront();
        //console.log("layer added");
      } else {
        map.value.removeLayer(mapLabels.value);
        //console.log("layer removed");
      }
    };

    watch(setLabels, () => {
      //console.log(setLabels.value);
      addLabels(setLabels.value);
    });

    onMounted(() => {
      //leafletRouting();
      setLeafletMap();
      setSubRegions();
      setCurrentRaster();
      setCurrentVector();
      //addLabels();
    });

    const selecteCountyVector = computed(() => {
      if (store.selectedSubcounty) {
        return store.getselectedSubcounty;
      } else {
        return store.getselectedCounty;
      }
    });

    const selectedRaster = computed(() => {
      if (store.selectedRaster) {
        return store.getSelectedRaster;
      }
    });

    watch(selectedPopupFeature, () => {
      let el = document.getElementById("pop-up-selector");

      el.addEventListener("click", () => {
        if (store.selectedCounty) {
          store.setsubCountySelected(selectedPopupFeature.value);
        } else {
          store.setCountySelected(selectedPopupFeature.value);
        }
      });
    });

    watch(selectedRaster, () => {
      setCurrentRaster();
    });

    watch(selecteCountyVector, () => {
      setSubRegions();
      setCurrentVector();
    });

    const setTour = function () {
      //if() this.$tours['myTour'].start()
      const el = document.getElementById("show-stats-btn");
      if (el) el.click();
    };

    return {
      map,
      showBaseMapList,
      zoom_in,
      zoom_out,
      showListofBaseMaps,
      handle_base_layers,
      change_base_map,
      opacityValue,
      baseMaps,
      handle_opacity,
      setTour,
      setLabels,
    };
  },
};
</script>

<style lang="scss">
.pop-up-btn {
  background: green;
  color: white;
  text-align: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
}

.pop-up-btn:hover {
  background-color: #4caf50; /* Green */
  color: white;
}

.basemap-item {
  font-size: 0.75rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  text-align: center;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  height: 20px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.extra-controls {
  position: absolute;
  z-index: 2000;
  height: 20px;
  left: 52%;
}
.fancy-btn {
  z-index: 2000;
  right: 13%;
  width: fit-content;
  background-image: url("~/src/assets/btnbg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fancy-btn-2 {
  z-index: 2000;
  right: 13%;
  width: fit-content;
  background-image: url("~/src/assets/btnbg2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.show-tour-btn {
  position: absolute;
  z-index: 2000;
  transform: rotate(-90deg);
  left: -1.4%;
  top: 20%;
}

.slider[data-v-a25d6ca4] {
  -webkit-appearance: none;
  margin-top: 4%;
  height: 2px;
  background: #000;
  outline: none;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.example-custom-control {
  position: absolute;
  //background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
  right: 2%;
  top: 5%;
  width: 15%;
  height: 25%;
}

// .my-card {
//   width: 100%;
//   max-width: 800px;
// }
.map-navigation-tools {
  position: relative;
  z-index: 2000;
  // width: 200%;
  height: 40%;
  // background-color: white;
  margin-top: 26%;
  left: 33%;
}

.map-controls {
  position: absolute;
  // background: rgb(153, 150, 150);
  z-index: 2000;
  //width: 300px;
  height: 20px;
  right: 2%;
}

.year-slider {
  border-radius: 4px;
  position: absolute;
  opacity: 0.8;
  z-index: 2000;
  width: 60%;
  left: 2%;
  bottom: 3%;
}

.basemap-list {
  position: absolute;
  width: fit-content;
  z-index: 2000;
  // width: 200%;
  //height: 40%;
  background-color: white;
  top: 9%;
  left: 89.7%;
}

.mobile-map-buttons {
  position: absolute;
  z-index: 3000;
  bottom: 9%;
  left: 2%;
}

.slider-mobile {
  display: none;
  position: absolute;
  z-index: 3000;
  right: -16%;
  bottom: 30%;
  transform: rotate(-90deg);
}

.mobile-map-control {
  position: absolute;
  z-index: 3000;
  right: 0%;
  top: 5%;
}

.more-mobile-map-control {
  position: absolute;
  z-index: 3000;
  right: 2%;
  top: 7%;
}

.analysis-full-panel {
  position: absolute;
  top: 0%;
  z-index: 2000;
  display: true;
  height: 100vh;
  width: 40vw;
  background-image: url("~/src/assets/wavesy.svg");
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
}

.side-nav-bar {
  position: absolute;
  z-index: 2000;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: 4.6vw;
  background-color: rgba(6, 31, 4, 0.7);
  // border-right: 0.5px solid rgb(160, 160, 160);
}

.leaflet-popup-content-wrapper {
  background: #f1f8e9;
  color: #333;
  box-shadow: 0 3px 14px rgb(0 0 0 / 40%);
  border-radius: 0%;
  min-width: 200px;
}
.leaflet-popup-tip {
  background: #f1f8e9;
}

@media screen and (max-width: 768px) {
  // .analysis-full-panel{
  //   display: none;
  // }

  .zoom-controls {
    position: absolute;
    // background: rgb(153, 150, 150);
    z-index: 2000;
    //width: 300px;
    // height: 20px;
    right: 2%;
    bottom: 35vh;
    width: fit-content;
  }

  .map-controls {
    display: none;
  }

  .show-tour-btn {
    display: none;
  }

  .base-map-list {
    display: none;
  }
  .tour-btn {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .zoom-controls {
    position: absolute;
    // background: rgb(153, 150, 150);
    z-index: 2000;
    //width: 300px;
    // height: 20px;
    right: 2%;
    bottom: 25vh;
    width: fit-content;
  }

  .mobile-map-buttons {
    display: none;
  }

  .slider-mobile {
    display: none;
    z-index: 3000;
  }

  .mobile-map-control {
    display: none;
  }

  .basemap-list-mobile {
    display: none;
  }
}
</style>
