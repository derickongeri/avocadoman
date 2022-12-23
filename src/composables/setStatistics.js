import { useVectorStore } from "../stores/vector_store/index.js";

export default function setRasterStats() {
  const store = useVectorStore();

  //get stats array, filter to selected county and create Stats
  const selectedAreaStats = function (obj, regionName, admLevel) {
    // console.log(obj, regionName);
    let d = {};
    let selectedArea = obj.filter((d) => {
      return d.shapeName === regionName;
    });
    d = selectedArea[0];

    // console.log(d)

    let totalArea =
      (d.Ha_1 +
        d.Ha_3 +
        d.Ha_4 +
        d.Ha_9 +
        d.Ha_11 +
        d.Ha_12 +
        d.Ha_13 +
        d.Ha_14 +
        d.Ha_15) *
      0.01;
    // console.log(totalArea);
    let statsObj = {
      areaname: d.shapeName + admLevel,
      shapeAreaHa: d.shapeArea.toFixed(2),
      shapeAreaKmsq: (d.shapeArea * 0.01).toFixed(2),
      areaHa: totalArea.toFixed(2),
      areaKmsq: (totalArea * 0.01).toFixed(2),
      percentageArea: ((totalArea / d.shapeArea) * 100).toFixed(2),
    };

    return statsObj;
  };

  const selectedAreaChartData = function (obj, regionName, rasterType) {
    let chartProps = {};
    let d = {};
    let selectedArea = obj.filter((d) => {
      return d.shapeName === regionName;
    });
    d = selectedArea[0];

    let totalArea = d.shapeArea;
    switch (rasterType) {
      case "landcover_Kenya":
        chartProps = {
          maxValue: totalArea,
          chartLabels: [
            "Water",
            "Bareland",
            "Artificial",
            "Wetland",
            "Cropland",
            "Grassland",
            "Forest",
          ],
          plotData: [
            d.LULC_1 /* totalArea */.toFixed(0),
            d.LULC_2 /* totalArea */.toFixed(0),
            d.LULC_3 /* totalArea */.toFixed(0),
            d.LULC_4 /* totalArea */.toFixed(0),
            d.LULC_5 /* totalArea */.toFixed(0),
            d.LULC_6 /* totalArea */.toFixed(0),
            d.LULC_7 /* totalArea */.toFixed(0),
          ],
          chartColors: [
            "#0046c8",
            "#fff5d7",
            "#d7191c",
            "#33e9f6",
            "#f2fc83",
            "#8ca000",
            "#003c00",
          ],
        };
        break;
      case "cropType2021":
        chartProps = {
          selectedAreaName: regionName,
          maxValue:
            (d.Ha_1 +
              d.Ha_3 +
              d.Ha_4 +
              d.Ha_9 +
              d.Ha_11 +
              d.Ha_12 +
              d.Ha_13 +
              d.Ha_14 +
              d.Ha_15) *
            0.01,
          chartLabels: [
            "Maize",
            "Millet",
            "Beans",
            "Other",
            "Potatoes",
            "Rice",
            "Wheat",
            "Sugarcane",
            "Tea",
          ],
          plotData: [
            (d.Ha_1 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_3 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_4 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_9 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_11 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_12 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_13 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_14 * 0.01) /* totalArea*/
              .toFixed(0),
            (d.Ha_15 * 0.01) /* totalArea*/
              .toFixed(0),
          ],
          chartColors: [
            "#dba902",
            "#96ef0f",
            "#ddd0af",
            "#69e6aa",
            "#cdcf53",
            "#f0b727",
            "#df649c",
            "#70cd19",
            "#a8a8a8",
          ],
        };
        break;
      default:
        chartProps = {
          maxValue: totalArea,
          chartLabels: [
            "suitable",
            "Moderately High",
            "Very suitable",
            "Highly suitable",
            "Very High",
          ],
          plotData: [
            ((d.Ha_1 / totalArea) * 100).toFixed(0),
            ((d.Ha_2 / totalArea) * 100).toFixed(0),
            ((d.Ha_3 / totalArea) * 100).toFixed(0),
            ((d.Ha_4 / totalArea) * 100).toFixed(0),
            ((d.Ha_5 / totalArea) * 100).toFixed(0),
          ],
          chartColors: ["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"],
        };
    }
    return chartProps;
  };

  // const selectedAreaChartDataLULC = function (obj, regionName) {
  //   let chartProps = {};
  //   let d = {};
  //   let selectedArea = obj.filter((d) => {
  //     return d.shapeName === regionName;
  //   });
  //   d = selectedArea[0];

  //   let totalArea = d.shapeArea;
  //   let plotValues = [
  //     ((d.Ha_1 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_2 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_3 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_4 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_5 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_6 / totalArea) * 100).toFixed(0),
  //     ((d.Ha_7 / totalArea) * 100).toFixed(0),
  //   ];

  //   chartProps = {
  //     dataValues: plotValues,
  //     chartColors: ["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"],
  //   };
  //   return plotValues;
  // };

  const setLegendColors = function (rasterName) {
    let legendData = [];
    switch (rasterName) {
      case "suitabilityClassified":
        legendData = [
          {
            landcover: "suitable",
            color: "#ffffcc",
          },
          {
            landcover: "Moderately High",
            color: "#c2e699",
          },
          {
            landcover: "Very suitable",
            color: "#78c679",
          },
          {
            landcover: "Highly suitable",
            color: "#31a354",
          },
          {
            landcover: "Very High",
            color: "#006837",
          },
        ];
        break;
      case "landcover_Kenya":
        legendData = [
          {
            landcover: "Water",
            color: "#0046c8",
          },
          {
            landcover: "Bare land",
            color: "#fff5d7",
          },
          {
            landcover: "Artificial areas",
            color: "#d7191c",
          },
          {
            landcover: "Wetland",
            color: "#33e9f6",
          },
          {
            landcover: "Crop-land",
            color: "#f2fc83",
          },
          {
            landcover: "Grass-land",
            color: "#8ca000",
          },
          {
            landcover: "Forest",
            color: "#003c00",
          },
        ];
        break;
      default:
        legendData = [
          {
            landcover: "Maize",
            color: "#dba902",
          },
          {
            landcover: "Millet",
            color: "#96ef0f",
          },
          {
            landcover: "Beans",
            color: "#ddd0af",
          },
          {
            landcover: "Other",
            color: "#69e6aa",
          },
          {
            landcover: "Potatoes",
            color: "#cdcf53",
          },
          {
            landcover: "Rice",
            color: "#f0b727",
          },
          {
            landcover: "Wheat",
            color: "#df649c",
          },
          {
            landcover: "Sugarcane",
            color: "#70cd19",
          },
          {
            landcover: "Tea",
            color: "#a8a8a8",
          },
        ];
    }
    return legendData;
  };

  return {
    // selectedAreaChartDataLULC,
    selectedAreaStats,
    selectedAreaChartData,
    setLegendColors,
  };
}
