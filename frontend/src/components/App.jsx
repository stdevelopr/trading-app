import React from "react";
import { List } from "./DropdownList.jsx";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const Client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => (
  <ApolloProvider client={Client}>
    <div>
      <List />
      HELLO WORLD!!!
    </div>
  </ApolloProvider>
);

export default App;
