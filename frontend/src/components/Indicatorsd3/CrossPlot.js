import * as d3 from "d3";

const CrossPlot = (data, indicator_values) => {
  let ind1 = indicator_values.data.indicator[0].output[0];
  let ind2 = indicator_values.data.indicator[1].output[0];
  const exists = document.getElementById("cross_plot");
  console.log('svggg', exists)
  if (!exists) return null;
  const svg = d3.select("svg#cross_plot");

  //clear the last plot
  d3.selectAll("svg#cross_plot > *").remove();

  //chart plot area
  const padding = { top: 20, right: 20, bottom: 20, left: 40 };
  const chartArea = {
    width: +svg.attr("width") - padding.left - padding.right,
    height: +svg.attr("height") - padding.top - padding.bottom
  };

  //scale functions
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(ind1, s => +s), d3.max(ind1, s => +s)])
    .range([0, chartArea.width]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(ind2, s => +s), d3.max(ind2, s => +s)])
    .range([chartArea.width, 0]);

  // axis
  const xAxis = svg
    .append("g")
    .attr("id", "xaxis")
    .attr(
      "transform",
      `translate(${padding.left}, ${chartArea.height + padding.top})`
    )
    .call(d3.axisBottom(xScale));

  const yAxis = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)
    .call(d3.axisLeft(yScale));

  //   const yScale = d3
  //   .scaleLinear()
  //   .domain([d3.min(chart_data, v => v.c), d3.max(chart_data, v => v.c)])
  //   .range([chartArea.height, 0]);

  const plot = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)
    .selectAll("circle")
    .data(ind1.filter(v => v != "nan"))
    .enter()
    .append("circle")
    .attr("cx", d => xScale(+d))
    .attr("cy", d => yScale(+d))
    .style("fill", "red")
    .attr("r", 2);
};
export default CrossPlot;
