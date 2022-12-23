export default function sortBarChartData() {
  //Sorting the chard data from the highest to the lowest
  const sortData = function (dataPoints, chartabels, backgroundColors) {
    // convert to object matching all data into an object
    let merged = dataPoints.map((bgroundColor, i) => {
      return {
        color: backgroundColors[i],
        label: chartabels[i],
        dataPlot: dataPoints[i],
      };
    });
    // Sort the object based on DATAPOINTS from high to low
    const sortedData = merged.sort((a, b) => {
      return b.dataPlot - a.dataPlot;
    });
    console.log(sortedData);
    // 4 new arrays to avoid adjusting original data
    const barColors = [];
    const plotValues = [];
    const plotLabels = [];
    for (let i = 0; i < sortedData.length; i++) {
      barColors.push(sortedData[i].color);
      plotValues.push(sortedData[i].dataPlot);
      plotLabels.push(sortedData[i].label);
    }

    const datasetProps = {
      plotsData: plotValues,
      plotsLabels: plotLabels,
      colors: barColors,
    };

    return datasetProps
  };

  return {
    sortData,
  };
}
