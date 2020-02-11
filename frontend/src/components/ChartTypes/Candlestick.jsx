import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  FCSAPI_FOREX_HIST_300_OHLC,
  GET_PAIR
} from "../../graphql/queries/get_data.graphql";
import * as d3 from "d3";

const Candlestick = chart_data => {
  // let chart_data = data;
  const svg = d3.select("svg#chart_plot");

  //clear the last plot
  d3.selectAll("svg#chart_plot > *").remove();

  //chart plot area
  const padding = { top: 20, right: 20, bottom: 20, left: 40 };
  const chartArea = {
    width: parseInt(svg.style("width")) - padding.left - padding.right,
    height: parseInt(svg.style("height")) - padding.top - padding.bottom
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
  const yoValue = d => d.o;
  const yhValue = d => d.h;
  const ylValue = d => d.l;
  const ycValue = d => d.c;

  const plot = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)
    .selectAll("rect")
    .data(chart_data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(xValue(d)))
    .attr("y", d => {
      if (yoValue(d) > ycValue(d)) return yScale(yoValue(d));
      else return yScale(ycValue(d));
    })
    .attr("height", d => Math.abs(yScale(yoValue(d)) - yScale(ycValue(d))))
    .style("fill", d => {
      if (yoValue(d) > ycValue(d)) return "red";
      else return "green";
    })
    .attr("width", 2)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


  ;

  // Create Event Handlers for mouse
  function handleMouseOver(d, i) {  // Add interactivity
    console.log(d, i)
    // Use D3 to select element, change color and size

    // Specify where to put label of text
    svg
      .append("g")
      .append("text")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .attr(
        'id', "t" + d.t)
      .attr(
        'x', xScale(xValue(d)))
      .attr(
        'y', yScale(ycValue(d)))

      .text(function () {
        return d.c;  // Value of the text
      })

    svg
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .append("line")
      .attr(
        'id', "l" + d.t)
      .attr("x1", xScale(xValue(d)))
      .attr("y1", chartArea.height)
      .attr("x2", xScale(xValue(d)))
      .attr("y2", 0)
      .attr("stroke", 'black')
      .attr('stroke-width', 2);
  }

  function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
      fill: "black",
    });

    // Select text by id and then remove
    d3.select("#t" + d.t).remove();  // Remove text location
    d3.select("#l" + d.t).remove();
  }
};



export default Candlestick;
