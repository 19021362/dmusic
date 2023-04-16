/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import PropTypes from "prop-types";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import songsTableData from "pages/home/tables/data/songsTableData";
import Player from "react-material-music-player";

function Tables({ currentSong, setCurrentSong, songListPurchased, user }) {
  const handleSelectSong = ({ song }) => {
    setCurrentSong(song);
  };

  const { columns, rows } = songsTableData({ songListPurchased, handleSelectSong });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container mb={6} spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={2} pb={2} px={2}>
                <MDTypography variant="h6">User Address: {user.name}</MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  Puchased Songs
                </MDTypography>
              </MDBox>
              {rows?.length > 0 ? (
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              ) : (
                <MDBox pt={6} pb={6}>
                  <Grid container justifyContent="center">
                    <Grid item sx={12}>
                      <MDTypography variant="h6" color="text">
                        No Puchased Songs
                      </MDTypography>{" "}
                    </Grid>
                  </Grid>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {currentSong && (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6} justifyContent="center" alignItems="center">
            <Grid item xs={12} position="fixed" bottom="15px">
              <MDBox pt={3} justifyContent="center" alignItems="center" bottom="15px">
                <Player
                  disableDrawer={false}
                  sx={{
                    width: "100%",
                    position: "relative",
                    borderRadius: `10px 10px 10px 10px`,
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
    </DashboardLayout>
  );
}

Tables.defaultProps = {
  currentSong: null,
  songListPurchased: [],
};

Tables.propTypes = {
  currentSong: PropTypes.object,
  songListPurchased: PropTypes.array,
  setCurrentSong: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Tables;
