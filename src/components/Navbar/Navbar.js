import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Fragment>
      <h1>Logo</h1>
      <Link to="/expenses">Expenses</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/">lists</Link>
      <h1>profilePic</h1>
    </Fragment>
  );
};

export default Navbar;