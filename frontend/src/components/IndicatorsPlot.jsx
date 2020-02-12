import React from "react";
// import { withApollo } from "@apollo/react-hoc";
import { useQuery } from "@apollo/react-hooks";
// import Indicator from "./Indicator.jsx";
import SimpleLine from "./Indicatorsd3/SimpleLine";
import MultipleLines from "./Indicatorsd3/MultipleLines";

// import { GET_CHART_STATE } from "../graphql/queries/get_data.graphql";
import Candlestick from "./ChartTypes/Candlestick.jsx";
import Close from "./ChartTypes/Close.jsx";
import {
  CHART_VALUES,
  GET_PAIR,
  FCSAPI_FOREX_HIST_300_OHLC_CACHE,
  CALC_INDICATORS,
  GET_INDICATORS
} from "../graphql/queries/get_data.graphql";


const IndicatorsPlot = () => {
  //get the chart values from cache
  const { data: chart_values } = useQuery(CHART_VALUES);

  // get the active indicators
  const {
    data: { INDICATORS }
  } = useQuery(GET_INDICATORS);

  // calculate the indicators
  const ind = useQuery(CALC_INDICATORS, {
    skip: !chart_values,
    variables: {
      indicatorsList: INDICATORS,
      input: chart_values ? chart_values.getHist300.map(dict => dict.c) : []
    }
  });

  // call the functions to plot the array of indicators
  if (chart_values && ind.data) {
    console.log(ind.data)
    ind.data.indicator.map(i => {
      // verify what kind of indicator to plot
      if (i.output.lenght == 1)
        SimpleLine(chart_values.getHist300, i.output);
      else {
        MultipleLines(chart_values.getHist300, i.output);
      }
    });
  }
  return "OK";
};

export default IndicatorsPlot;
