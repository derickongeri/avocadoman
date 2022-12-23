<template>
  <div class="q-pa-none">
    <!-- <q-toggle v-model="loading" label="Loading state" class="q-mb-md" /> -->
    <q-table
      table-header-class=" bg-grey-4 text-black"
      table-class=" bg-green-6 text-grey-2"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
      :loading="loading"
      hide-bottom
    />
  </div>
</template>

<script>
import { ref, inject, reactive, computed, watch, onMounted } from "vue";
import { useVectorStore } from "../../../stores/vector_store/index.js";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Calculation",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "calories",
    align: "center",
    label: `info`,
    field: "calories",
    sortable: false,
  },
];
export default {
  setup() {
    const store = useVectorStore();

    const loading = ref(false);
    const areavect = reactive(ref(null));
    const areaReported = reactive(ref(null));
    const rows = reactive(
      ref([
        {
          name: "Location",
          calories: "Kenya",
        },
        {
          name: "Total Area",
          calories: 580367,
        },
        {
          name: "Avocado Suitability",
          calories: 262,
        },
      ])
    );

    const selectedAreaData = inject("tabledata");
    const areaUnits = inject("areaUnits");

    let tableData = selectedAreaData.selectedArea.value;
    // console.log(tableData);
    // console.log(areaUnits.areaUnit.value);

    const setUnits = function () {
      if (areaUnits.areaUnit.value === "Ha") {
        areavect.value = tableData.shapeAreaHa;
        areaReported.value = tableData.areaHa;
      } else {
        areavect.value = tableData.shapeAreaKmsq;
        areaReported.value = tableData.areaKmsq;
      }
      rows.value = [
        {
          name: "Location",
          calories: tableData.areaname,
        },
        {
          name: "Total Area",
          calories: areavect.value,
        },
        {
          name: "Cultivated Area",
          calories: areaReported.value,
        },
      ];
    };

    setUnits();

    onMounted(() => {
      setUnits();
    });

    const selecteUnits = computed(() => {
      return areaUnits.areaUnit.value;
    });

    const tableInformation = computed(() => {
      return selectedAreaData.selectedArea.value;
    });

    watch(selecteUnits, () => {
      setUnits();
    });

    watch(tableInformation, () => {
      setUnits();
    });

    return {
      loading,
      columns,
      rows,
    };
  },
};
</script>
