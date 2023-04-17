/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React helper functions
import colors from "assets/theme-dark/base/colors";
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { background } = colors;

const dialogActions = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      backgroundColor: background.card,
    },
  },
};

export default dialogActions;
