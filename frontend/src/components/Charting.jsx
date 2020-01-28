import React, { useEffect, useRef } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import * as d3 from "d3";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";

const CHART_DATA = gql`
  {
    chart_data @client {
      c
      tm
    }
  }
`;

const Chart = () => {
  const {
    data: { chart_data }
  } = useQuery(CHART_DATA);

  useEffect(() => {
    var svg = d3.select("svg");

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
      .scaleLinear()
      .domain([d3.min(chart_data, v => v.tm), d3.max(chart_data, v => v.tm)])
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

    // plotting
    const xValue = d => d.tm;
    const yValue = d => d.c;
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
      .attr("r", 3);
  });
  return (
    <div>
      <svg width="1000" height="500"></svg>
    </div>
  );
};

export default Chart;
