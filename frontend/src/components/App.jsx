import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Chart from "./Charting.jsx";
import Candlestick from "./Candlestick.jsx";
import Indicator from "./Indicator.jsx";
import { InMemoryCache } from "apollo-cache-inmemory";
import DropdownList from "./DropdownList.jsx";

const cache = new InMemoryCache({ addTypename: false });
const Client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
  resolvers: {}
});

cache.writeData({
  data: {
    FCSAPI_FOREX_PAIR: "EUR/USD"
  }
});

const App = () => {
  return (
    <ApolloProvider client={Client}>
      <div>
        <DropdownList />
        <Chart />
        <Candlestick />
        <Indicator />
      </div>
    </ApolloProvider>
  );
};

export default App;
