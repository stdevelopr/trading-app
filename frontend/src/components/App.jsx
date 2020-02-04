import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Navbar from "./Navbar.jsx";
// import Chart from "./ChartTypes/Close.jsx";
import ChartPlot from "./ChartPlot.jsx";
import IndicatorsPlot from "./IndicatorsPlot.jsx";
// import CandlestickChart from "./ChartTypes/Candlestick.jsx";
// import Indicator from "./Indicator.jsx";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache({ addTypename: false });
const Client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
  resolvers: {}
});

cache.writeData({
  data: {
    FCSAPI_FOREX_PAIR: "EUR/USD",
    CHART_TYPE: "Candlestick",
    INDICATORS: []
  }
});

const App = () => {
  return (
    <ApolloProvider client={Client}>
      <div>
        <Navbar />
        <ChartPlot />
        <IndicatorsPlot />
      </div>
    </ApolloProvider>
  );
};

export default App;
