import React, { useEffect } from "react";
import axios from "axios";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const COINS = gql`
  {
    symbolsList {
      id
      symbol
      name
    }
  }
`;

export const List = () => {
  const { loading, error, data } = useQuery(COINS);

  if (loading)
    return (
      <select>
        <option>Loading...</option>
      </select>
    );
  if (error) return <p>Error :(</p>;
  return (
    <select>
      {data.symbolsList.map(symbol => (
        <option key={symbol.id}>{symbol.name}</option>
      ))}
    </select>
  );
};
