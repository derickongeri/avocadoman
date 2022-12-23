<template>
  <div
    class="q-gutter-y-sm column q-pa-none q-py-md text-white"
    style="min-width: 300px"
  >
    <q-select
      hide-dropdown-icon
      borderless
      clearable
      clear-icon="close"
      color="white"
      input-class="input-option"
      options-selected-class="text-green-7"
      popup-content-class="selection-options"
      readonly
      hide-selected
      fill-input
      use-input
      v-model="model"
      :options="options"
    >
      <template v-slot:prepend>
        <q-icon name="arrow_drop_down" @click.stop />
      </template>
    </q-select>
    <q-select
      hide-dropdown-icon
      borderless
      clearable
      clear-icon="close"
      color="white"
      input-class="input-option"
      options-selected-class="text-green-7"
      popup-content-class="selection-options"
      v-model="selectedCounty"
      :options="filterOptions"
      @filter="filterFn1"
      @update:model-value="getselectedCounty"
    >
      <template v-slot:prepend>
        <q-icon name="arrow_drop_down" @click.stop />
      </template>
      <template v-slot:selected>
        <template class="input-option" v-if="selectedCounty">
          <div style="font-size: 2em; color: aliceblue">
            {{ selectedCounty }}
          </div>
        </template>
        <template v-else>
          <div style="font-size: 2em; color: aliceblue">Select County</div>
        </template>
      </template>
    </q-select>

    <div v-if="selectedCounty">
      <q-select
        hide-dropdown-icon
        clearable
        borderless
        clear-icon="close"
        color="white"
        input-class="input-option"
        options-selected-class="text-green-7"
        popup-content-class="selection-options"
        v-model="selectedsubCounty"
        :options="filterOptions2"
        @filter="filterFn2"
        @update:model-value="getselectedsubCounty"
      >
        <template v-slot:prepend>
          <q-icon name="arrow_drop_down" @click.stop />
        </template>
        <template v-slot:selected>
          <template class="input-option" v-if="selectedsubCounty">
            <div style="font-size: 2em; color: aliceblue">
              {{ selectedsubCounty }}
            </div>
          </template>
          <template v-else>
            <div style="font-size: 2em; color: aliceblue">
              Select Sub-county
            </div>
          </template>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, onUnmounted, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import { useVectorStore } from "../../../stores/vector_store/index.js";

export default {
  setup() {
    const store = useVectorStore();

    const filterOptions = ref([]),
      filterOptions2 = ref([]),
      selectedCounty = ref(store.getselectedCounty),
      selectedsubCounty = ref(store.getselectedSubcounty);

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

    const getselectedCounty = function (val) {
      val = selectedCounty.value;
      store.setCountySelected(val);
      store.setsubCountySelected("");
    };

    const getselectedsubCounty = function (val) {
      val = selectedsubCounty.value;
      store.setsubCountySelected(val);
    };

    return {
      model: ref("Kenya"),
      filterFn1,
      filterFn2,
      filterOptions,
      filterOptions2,
      selectedCounty,
      selectedsubCounty,
      getselectedCounty,
      getselectedsubCounty,
    };
  },
};
</script>

<style>
.selection-options::-webkit-scrollbar {
  width: 6px; /* width of the entire scrollbar */
  min-height: 200px;
}

.selection-options::-webkit-scrollbar-track {
  background: rgb(255, 166, 0, 0); /* color of the tracking area */
}

.selection-options::-webkit-scrollbar-thumb {
  background-color: rgb(219, 250, 43); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid rgba(255, 166, 0, 0); /* creates padding around scroll thumb */
}

.input-option {
  color: white;
  font-size: 2em;
  height: fit-content;
  max-width: 300px;
}
.selected-option {
  color: white;
}

.q-field__marginal {
  height: 56px;
  color: rgb(255 255 255);
  font-size: 24px;
}
</style>
