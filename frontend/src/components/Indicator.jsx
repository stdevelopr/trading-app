import React, { useEffect, useRef } from "react";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { SMA } from "../graphql/queries/get_data.graphql";
import { withApollo } from "@apollo/react-hoc";

import {
  FCSAPI_FOREX_HIST_300_JUSTCLOSE,
  GET_PAIR,
  GET_INDICATOR,
  INDICATOR
} from "../graphql/queries/get_data.graphql";

import * as d3 from "d3";

const Indicator = ({ client }) => {
  // get the actual pair
  const {
    data: { FCSAPI_FOREX_PAIR }
  } = useQuery(GET_PAIR);

  const indicator = useQuery(GET_INDICATOR);

  console.log("indiiii", indicator);

  // get the values (close and date) from the pair
  const { data } = useQuery(FCSAPI_FOREX_HIST_300_JUSTCLOSE, {
    variables: { symbol: FCSAPI_FOREX_PAIR }
  });

  // pass the close values as array and get a new array with the indicator values
  const obj = useQuery(INDICATOR, {
    skip: !data,
    variables: {
      indicator: indicator.data.INDICATOR,
      input: data ? data.getHist300.map(dict => dict.c) : []
    }
  });

  const updateIndicator = indicator => {
    console.log("oiiiiiiiiiiii");
    client.writeData({
      data: { INDICATOR: indicator }
    });
  };

  if (obj.data) {
    const dataset = [data.getHist300, obj.data.indicator.output];

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

    // transform functions
    const xValue = d => d.t;
    const yValue = d => d.c;

    //line generator
    const lineGenerator = d3
      .line()
      .defined(d => d != null)
      .x((d, i) => xScale(dataset[0][i].t))
      .y(d => yScale(d));

    const line = svg
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator(dataset[1].map(d => (d === "nan" ? null : +d))));
  }
  return (
    <div>
      {/* <svg id="indicator" width="1400" height="500"></svg> */}
      <select
        onChange={e => {
          updateIndicator(e.target.value);
        }}
      >
        <option>Select an indicator</option>
        <option>SMA</option>
      </select>
    </div>
  );
};

export default withApollo(Indicator);
