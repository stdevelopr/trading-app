import React, { useEffect, useState } from "react";
import axios from "axios";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import { useLazyQuery } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";
import { FCSAPI_FOREX_HIST_300_OHLC } from "../graphql/queries/get_data.graphql";

// const GET_300 = gql`
//   query get300($symbol: String) {
//     getHist300(symbol: $symbol) {
//       c
//       t
//     }
//   }
// `;

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

const GET_PAIR = gql`
  {
    FCSAPI_FOREX_PAIR @client
  }
`;

function DropdownList({ client }) {
  // get the symbol from cache
  const {
    data: { FCSAPI_FOREX_PAIR }
  } = useQuery(GET_PAIR);

  // query the values for the symbol
  const [getData, ob] = useLazyQuery(FCSAPI_FOREX_HIST_300_OHLC, {
    variables: { symbol: FCSAPI_FOREX_PAIR }
  });

  const updateSymbol = symbol => {
    client.writeData({
      data: { FCSAPI_FOREX_PAIR: symbol }
    });
  };

  const { loading, error, data } = useQuery(SYMBOLS_LIST);
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
          updateSymbol(e.target.value);
        }}
      >
        {data.symbolsList.map(symbol => (
          <option key={symbol.symbol}>{symbol.symbol}</option>
        ))}
      </select>
    </div>
  );
}

export default withApollo(DropdownList);
