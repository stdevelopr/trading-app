import React from "react";
import List from "./DropdownList.jsx";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Chart from "./Charting.jsx";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();
const Client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
  resolvers: {}
});

const GET_300 = gql`
  {
    getHist300 {
      c
      tm
    }
  }
`;

cache.writeData({
  data: {
    chart_data: [
      { c: 10, tm: 17, __typename: "data_chart" },
      { c: 30, tm: 20, __typename: "data_chart" },
      { c: 50, tm: 25, __typename: "data_chart" },
      { c: 20, tm: 30, __typename: "data_chart" }
    ]
  }
});
// chart_data = [

// ];

// Client.query({ query: GET_300 }).then(res => console.log(res));

const App = () => {
  // const { loading, error, data } = useQuery(GET_300);
  return (
    <ApolloProvider client={Client}>
      <div>
        <List />
        <Chart />
      </div>
    </ApolloProvider>
  );
};

export default App;
