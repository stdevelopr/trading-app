import React from "react";
import List from "./DropdownList.jsx";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Chart from "./Charting.jsx";
import Candlestick from "./Candlestick.jsx";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { FCSAPI_FOREX_HIST_300_CLOSE } from "../graphql/queries/get_data.graphql";

const cache = new InMemoryCache();
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
        <List />
        <Chart />
        <Candlestick />
      </div>
    </ApolloProvider>
  );
};

export default App;
