import React from "react";
import DropdownList from "./DropdownList.jsx";
import ChartTypeSelector from "./ChartTypeSelector.jsx";
import { withApollo } from "@apollo/react-hoc";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHART_STATE } from "../graphql/queries/get_data.graphql";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const Navbar = ({ client }) => {
  const {
    data: { FCSAPI_FOREX_PAIR, CHART_TYPE, INDICATORS }
  } = useQuery(GET_CHART_STATE);

  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    client.writeData({
      data: { INDICATORS: newChecked }
    });
  };

  return (
    <div style={{ backgroundColor: "gray", display: "flex" }}>
      <h1>NAVBAR</h1>
      <ChartTypeSelector />
      <DropdownList />
      <List>
        {["SMA", "EMA"].map(value => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default withApollo(Navbar);
