<template>
  <div class="q-pa-md">
    <q-btn
      @click="showPanel = !showPanel"
      color="primary"
      label="Layers"
      class="show-layer-settings"
      style="width: fit-content"
    />

    <q-btn
      round
      external-label
      @click="showPanelmobile = !showPanelmobile"
      color="primary"
      icon="layers"
      class="show-layer-settings-mobile"
    />
    <q-dialog
      class="analysis-panel-mobile"
      v-model="showPanelmobile"
      seamless
      position="bottom"
    >
      <q-card class="my-card-mobile">
        <div class="row items-center q-py-none">
          <q-tabs
            v-model="tab"
            inline-label
            class="q-px-sm text-primary justify-left"
          >
            <span class="row q-ml-none on-left">
              <q-tab label="Layers" icon="layers" name="one" />
              <q-tab label="Analysis" icon="bar_chart" name="two" />
            </span>
          </q-tabs>
          <q-space />
          <q-btn
            class="p-py-sm"
            icon="expand_more"
            flat
            round
            dense
            v-close-popup
          />
        </div>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <q-item tag="label" v-ripple>
              <q-item-section side top>
                <q-checkbox v-model="check1" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Landcover</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item tag="label" v-ripple>
              <q-item-section side top>
                <q-checkbox v-model="check2" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Forest</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item tag="label" v-ripple>
              <q-item-section side top>
                <q-checkbox v-model="check3" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Artificial Areas</q-item-label>
              </q-item-section>
            </q-item>
          </q-tab-panel>

          <q-tab-panel name="two">
            <div class="col text-primary q-gutter-sm q-pa-sm">
              <q-label>Select County</q-label>
              <q-select
                rounded
                outlined
                dense
                v-model="selectedCounty"
                fill-input
                :options="filterOptions"
                @filter="filterFn1"
                @update:model-value="getselectedCounty"
                label="County"
              />
              <q-separator />
              <q-label>Select Subcounty</q-label>
              <q-select
                rounded
                outlined
                dense
                fill-input
                v-model="selectedsubCounty"
                :options="filterOptions2"
                @filter="filterFn2"
                label="Subcounty"
              />
              <q-separator />
              <q-label>Choose Analysis</q-label>
              <q-select
                rounded
                outlined
                dense
                v-model="model"
                :options="options"
                label="Select Ward"
              />
            </div>
            <q-separator />
            <div class="q-pa-sm">
              <q-btn
                label="Submit"
                color="primary"
                @click="$store.dispatch('vectorstore/getcountyNames')"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>

    <q-card class="my-card" v-if="showPanel">
      <div class="row items-center q-py-none">
        <q-tabs
          v-model="tab"
          inline-label
          class="q-px-sm text-primary justify-left"
        >
          <span class="row q-ml-none on-left">
            <q-tab label="Layers" icon="layers" name="one" />
            <q-tab label="Analysis" icon="bar_chart" name="two" />
          </span>
        </q-tabs>
      </div>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check1" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Landcover</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Forest</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check3" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Artificial Areas</q-item-label>
            </q-item-section>
          </q-item>
        </q-tab-panel>

        <q-tab-panel name="two">
          <div class="col text-primary q-gutter-sm q-pa-sm">
            <q-label>Select County</q-label>
            <q-select
              rounded
              outlined
              dense
              v-model="selectedCounty"
              fill-input
              :options="filterOptions"
              @filter="filterFn1"
              @update:model-value="getselectedCounty"
              label="County"
            />
            <q-separator />
            <q-label>Select Subcounty</q-label>
            <q-select
              rounded
              outlined
              dense
              fill-input
              v-model="selectedsubCounty"
              :options="filterOptions2"
              @filter="filterFn2"
              label="Subcounty"
            />
            <q-separator />
            <q-label>Choose Analysis</q-label>
            <q-select
              rounded
              outlined
              dense
              v-model="model"
              :options="options"
              label="Ward"
            />
          </div>
          <q-separator />
          <div class="q-pa-sm">
            <q-btn
              label="Submit"
              color="primary"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      showPanelmobile: false,
      showPanel: false,
      tab: "one",
      check1: true,
      check2: false,
      check3: false,
      filterOptions: [],
      filterOptions2: [],
      selectedCounty: null,
      selectedsubCounty: null,
    };
  },

  // mounted() {
  //   //load all the lists and store in the vuex store. use actions by dispatching the actions in the vector store
  //   this.$store.dispatch("vectorstore/getcountyNames");
  //   this.$store.dispatch("vectorstore/getsubcountyNames");
  //   this.$store.dispatch("vectorstore/getCountySelected");
  //   this.$store.dispatch("vectorstore/getCountyCentroid");

  //   //this.getcountyselected()
  // },

  // computed: {
  //   // get the county names for the selections
  //   countyNameOptions() {
  //     let countyList = [];
  //     let countyName = this.$store.getters["vectorstore/getcountyNames"];

  //     countyName.map((d) => {
  //       countyList.push(d);
  //     });

  //     return countyList.sort();
  //   },

  //   subcountyNameOptions() {
  //     let subcountyName = [];
  //     let subcountyList = this.$store.getters["vectorstore/getsubcountyNames"];

  //     let subcountiesWihtin = subcountyList.filter((obj) => {
  //       return obj.name_1 === this.selectedCounty;
  //     });

  //     subcountiesWihtin.forEach((resp) => {
  //       subcountyName.push(resp.shapename);
  //     });

  //     console.log(subcountyName);
  //     return subcountyName;
  //   },
  // },

  // methods: {
  //   filterFn1(val, update) {
  //     update(() => {
  //       this.selectedsubCounty = "";
  //       if (val === "") {
  //         this.filterOptions = this.countyNameOptions;
  //       } else {
  //         const needle = val.toLowerCase();
  //         this.filterOptions = this.countyNameOptions.filter(
  //           (v) => v.toLowerCase().indexOf(needle) > -1
  //         );
  //       }
  //     });
  //   },
  //   filterFn2(val, update) {
  //     update(() => {
  //       if (val === "") {
  //         this.filterOptions2 = this.subcountyNameOptions;
  //       } else {
  //         const needle = val.toLowerCase();
  //         this.filterOptions2 = this.subcountyNameOptions.filter(
  //           (v) => v.toLowerCase().indexOf(needle) > -1
  //         );
  //       }
  //     });
  //   },

  //   getselectedCounty(val) {
  //     val = this.selectedCounty;
  //     this.$store.dispatch("vectorstore/getCountySelected", val);
  //     this.$store.dispatch("vectorstore/getCountyCentroid", val)
  //   },

  //   getselectedSubCounty(val) {
  //     val = this.selectedsubCounty;
  //     this.$store.dispatch("vectorstore/getsubCountySelected", val);
  //     this.$store.dispatch("vectorstore/getsubCountyCentroid", val)
  //   },
  // },
});
</script>

<style lang="scss" scoped>
.my-card {
  position: absolute;
  z-index: 3000;
  width: 100%;
  max-width: fit-content;
  left: 3%;
  top: 3%;
}

.show-layer-settings {
  position: absolute;
  z-index: 2000;
  right: -1.5%;
  transform: rotate(-90deg);
  left: -0.5%;
  top: 6%;
}

.show-layer-settings-mobile {
  position: absolute;
  bottom: 10%;
  z-index: 3000;
}

@media screen and (max-width: 768px) {
  .show-layer-settings {
    display: none;
  }

  .my-card {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .show-layer-settings-mobile {
    display: none;

    .analysis-panel-mobile {
      display: none;
    }
  }

  .show-layer-settings-mobile {
    display: none;
  }
}
</style>
