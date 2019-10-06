import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import ListsLayout from "./components/ListsLayout/ListsLayout";
import Expenses from "./components/Expenses/Expenses";
import Recipes from "./components/Recipes/Recipes";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />

        <Route exact path="/" component={ListsLayout} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/recipes" component={Recipes} />
      </Router>
    </Fragment>
  );
};

export default App;
