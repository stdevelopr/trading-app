import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CrossPlot from "./Indicatorsd3/CrossPlot";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";

import {
  CALC_INDICATORS,
  CHART_VALUES
} from "../graphql/queries/get_data.graphql";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const CrossPlotIndicators = ({ client }) => {
  const [indicator1, setIndicator1] = useState("");
  const [indicator2, setIndicator2] = useState("");
  const { loading, error, data } = useQuery(CHART_VALUES);
  let indicators = [indicator1, indicator2];
  const [calc_indicator, indicator_values] = useLazyQuery(CALC_INDICATORS, {
    variables: {
      indicatorsList: indicators,
      input: data ? data.getHist300.map(dict => dict.c) : []
    }
  });

  const calcIndicators = () => {
    if (indicator1 != "" && indicator2 != "") {
      calc_indicator();
    }
  };

  if (indicator1 != "" && indicator2 != "" && indicator_values.data) {
    CrossPlot(data, indicator_values);
  }

  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Indicator1</InputLabel>
        <Select
          native
          defaultValue=""
          input={<Input id="grouped-native-select" />}
          onChange={e => setIndicator1(e.target.value)}
        >
          <option value="" />
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Indicator2</InputLabel>
        <Select
          native
          defaultValue=""
          onChange={e => setIndicator2(e.target.value)}
          input={<Input id="grouped-select" />}
        >
          <option value="" />
          <option value={"SMA"}>SMA</option>
          <option value={"EMA"}>EMA</option>
        </Select>
      </FormControl>
      <div>
        <Button onClick={calcIndicators}>PLOT</Button>
      </div>
    </div>
  );
};

export default withApollo(CrossPlotIndicators);
