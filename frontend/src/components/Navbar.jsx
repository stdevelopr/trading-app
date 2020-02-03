import React from "react";
import DropdownList from "./DropdownList.jsx";
import ChartTypeSelector from "./ChartTypeSelector.jsx";
import Indicator from "./Indicator.jsx";
import { withApollo } from "@apollo/react-hoc";
import { useQuery } from "@apollo/react-hooks";

import { GET_CHART_STATE } from "../graphql/queries/get_data.graphql";

const Navbar = ({ client }) => {
  const {
    data: { FCSAPI_FOREX_PAIR, CHART_TYPE, INDICATOR }
  } = useQuery(GET_CHART_STATE);

  return (
    <div style={{ backgroundColor: "gray", display: "flex" }}>
      <h1>NAVBAR</h1>
      <ChartTypeSelector />
      <DropdownList />
      <Indicator />
    </div>
  );
};

export default withApollo(Navbar);
