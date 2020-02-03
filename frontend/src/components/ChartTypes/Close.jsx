import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Close = chart_data => {
  const svg = d3.select("svg#chart_plot");

  //clear the last plot
  d3.selectAll("svg#chart_plot > *").remove();

  //chart plot area
  const padding = { top: 20, right: 20, bottom: 20, left: 40 };
  const chartArea = {
    width: +svg.attr("width") - padding.left - padding.right,
    height: +svg.attr("height") - padding.top - padding.bottom
  };

  //scale functions
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(chart_data, v => v.c), d3.max(chart_data, v => v.c)])
    .range([chartArea.height, 0]);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(chart_data, v => v.t), d3.max(chart_data, v => v.t)])
    .range([0, chartArea.width]);

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

  // transform functions
  const xValue = d => d.t;
  const yValue = d => d.c;

  //line generator
  const lineGenerator = d3
    .line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  const line = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)
    .append("path")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", lineGenerator(chart_data));

  // plotting
  const plot = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)
    .selectAll("circle")
    .data(chart_data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(xValue(d)))
    .attr("cy", d => yScale(yValue(d)))
    .style("fill", "red")
    .attr("r", 2);
};

export default Close;
