import React from "react";
// import { withApollo } from "@apollo/react-hoc";
import { useQuery } from "@apollo/react-hooks";
// import Indicator from "./Indicator.jsx";
import SMA from "./Indicators/SMA";

// import { GET_CHART_STATE } from "../graphql/queries/get_data.graphql";
import Candlestick from "./ChartTypes/Candlestick.jsx";
import Close from "./ChartTypes/Close.jsx";
import {
  GET_PAIR,
  FCSAPI_FOREX_HIST_300_OHLC_CACHE,
  INDICATOR,
  GET_INDICATORS
} from "../graphql/queries/get_data.graphql";

const IndicatorsPlot = () => {
  // GET THE CHART DATA
  // get the values of the actual symbol
  const {
    data: { FCSAPI_FOREX_PAIR }
  } = useQuery(GET_PAIR);

  // query to get the data to plot
  const { data } = useQuery(FCSAPI_FOREX_HIST_300_OHLC_CACHE, {
    variables: { symbol: FCSAPI_FOREX_PAIR }
  });

  const {
    data: { INDICATORS }
  } = useQuery(GET_INDICATORS);

  const ind = useQuery(INDICATOR, {
    skip: !data,
    variables: {
      indicatorsList: INDICATORS,
      input: data ? data.getHist300.map(dict => dict.c) : []
    }
  });

  if (data && ind.data) {
    SMA(data.getHist300, ind.data.indicator.output);
  }
  return "OK";
};

export default IndicatorsPlot;
