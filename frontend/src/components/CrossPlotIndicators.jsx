import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CrossPlot from "./Indicatorsd3/CrossPlot";
import { useLazyQuery } from "@apollo/react-hooks";
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
  const [loadGreeting, { called, loading, data }] = useLazyQuery(CHART_VALUES);

  console.log(loading);
  useEffect(() => {
    console.log("lllll", data);
  }, [data]);

  if (indicator1 != "" && indicator2 != "" && loading) {
    let indicators = [indicator1, indicator2];
    // const ind = useQuery(CALC_INDICATORS, {
    //   variables: {
    //     indicatorsList: indicators,
    //     input: data ? data.getHist300.map(dict => dict.c) : []
    //   }
    // });
  }

  CrossPlot(indicator1, indicator2);
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
          <option value={"RSI"}>RSI</option>
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
          <option value={"RSI"}>RSI</option>
        </Select>
      </FormControl>
      <div>
        <Button onClick={loadGreeting}>PLOT</Button>
      </div>
    </div>
  );
};

export default withApollo(CrossPlotIndicators);
