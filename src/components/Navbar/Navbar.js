import React, { Fragment } from "react";
import styles from "./navbar.module.scss";


const Navbar = () => {
  return (
    <Fragment>
      <div className={styles.logo}>
        <img alt="brand-logo" src="https://svgshare.com/i/FUq.svg" />
        </div>
    </Fragment>
  );
};

export default Navbar;