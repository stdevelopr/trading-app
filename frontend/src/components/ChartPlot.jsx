import React from "react";
// import { withApollo } from "@apollo/react-hoc";
import { useQuery } from "@apollo/react-hooks";

import { GET_CHART_STATE } from "../graphql/queries/get_data.graphql";
import Candlestick from "./ChartTypes/Candlestick.jsx";
import Close from "./ChartTypes/Close.jsx";
import { FCSAPI_FOREX_HIST_300_OHLC } from "../graphql/queries/get_data.graphql";

const ChartPlot = ({ client }) => {
  const {
    data: { FCSAPI_FOREX_PAIR, CHART_TYPE }
  } = useQuery(GET_CHART_STATE);

  // query to get the data to plot
  const { loading, error, data } = useQuery(FCSAPI_FOREX_HIST_300_OHLC, {
    variables: { symbol: FCSAPI_FOREX_PAIR }
  });

  if (data) {
    let chart_data = data.getHist300;
    switch (CHART_TYPE) {
      case "Candlestick":
        Candlestick(chart_data);
        break;
      case "Close":
        Close(chart_data);
        break;
    }
  }

  return (
    <div>
      <svg id="chart_plot" width="1400" height="400"></svg>
      <svg id="cross_plot" width="500" height="500"></svg>
    </div>
  );
};

export default ChartPlot;
