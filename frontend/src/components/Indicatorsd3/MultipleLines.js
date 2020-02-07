import * as d3 from "d3";

const MultipleLines = (chart_data, indicator_data) => {
  const dataset = [chart_data, indicator_data];

  const svg = d3.select("svg#chart_plot");

  //chart plot area
  const padding = { top: 20, right: 20, bottom: 20, left: 40 };
  const chartArea = {
    width: +svg.attr("width") - padding.left - padding.right,
    height: +svg.attr("height") - padding.top - padding.bottom
  };

  //scale functions
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(dataset[0], v => v.c), d3.max(dataset[0], v => v.c)])
    .range([chartArea.height, 0]);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataset[0], v => v.t), d3.max(dataset[0], v => v.t)])
    .range([0, chartArea.width]);

  //line generator
  const lineGenerator = d3
    .line()
    .defined(d => d != null)
    .x((d, i) => xScale(dataset[0][i].t))
    .y(d => yScale(d));

  dataset[1].map((d, i) => {
    const line = svg
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr(
        "d",
        lineGenerator(dataset[1][i].map(d => (d === "nan" ? null : +d)))
      );
  });
};

export default MultipleLines;
