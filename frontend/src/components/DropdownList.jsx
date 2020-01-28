import React, { useEffect } from "react";
import axios from "axios";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import { useLazyQuery } from "@apollo/react-hooks";

const GET_300 = gql`
  {
    getHist300 {
      c
      tm
    }
  }
`;

const SYMBOLS_LIST = gql`
  {
    symbolsList {
      name
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

function List() {
  const [getData, ob] = useLazyQuery(CHART_DATA);
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
      <select onChange={getData}>
        {data.symbolsList.map(symbol => (
          <option key={symbol.name}>{symbol.name}</option>
        ))}
      </select>
    </div>
  );
}

export default List;
