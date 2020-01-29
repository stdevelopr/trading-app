import React, { useEffect, useState } from "react";
import axios from "axios";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import { useLazyQuery } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";

const GET_300 = gql`
  query get300($symbol: String) {
    getHist300(symbol: $symbol) {
      c
      t
    }
  }
`;

const SYMBOLS_LIST = gql`
  {
    symbolsList {
      name
      symbol
    }
  }
`;

const CHART_DATA = gql`
  {
    chart_data @client {
      c
      tm
    }
  }
`;

function List({ client }) {
  const [symbol, setSymbol] = useState("EUR/USD");
  console.log("symbol", symbol);
  const [getData, ob] = useLazyQuery(GET_300, {
    variables: { symbol: symbol }
  });
  console.log("lazy", ob.data);
  if (ob.data) {
    console.log("write");
    client.writeData({ data: { chart_data: ob.data.getHist300 } });
  }
  const updateSymbol = () => {
    getData();
  };
  console.log(ob.loading);
  const { loading, error, data } = useQuery(SYMBOLS_LIST);
  console.log("initial_data", data);
  if (loading)
    return (
      <select>
        <option>Loading...</option>
      </select>
    );
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <select
        onChange={e => {
          setSymbol(e.target.value);
          updateSymbol();
        }}
      >
        {data.symbolsList.map(symbol => (
          <option key={symbol.symbol}>{symbol.symbol}</option>
        ))}
      </select>
    </div>
  );
}

export default withApollo(List);
