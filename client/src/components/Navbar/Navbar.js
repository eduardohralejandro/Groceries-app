import React from "react";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
      <div className={styles.logo}>
        <img alt='brand-logo' src='https://svgshare.com/i/FUq.svg' />
      </div>
  );
};

export default Navbar;