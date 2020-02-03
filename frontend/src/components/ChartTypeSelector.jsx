import React, { useEffect, useRef } from "react";
import { withApollo } from "@apollo/react-hoc";

// import DropdownList from "./DropdownList.jsx";

const ChartTypeSelector = ({ client }) => {
  const updateChartType = type => {
    client.writeData({
      data: { CHART_TYPE: type }
    });
  };
  return (
    <div>
      <select
        onChange={e => {
          updateChartType(e.target.value);
        }}
      >
        <option>Candlestick</option>
        <option>Close</option>
      </select>
    </div>
  );
};

export default withApollo(ChartTypeSelector);
