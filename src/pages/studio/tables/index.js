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
import songsTableData from "pages/studio/tables/data/songsTableData";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Tables({ artist, setAddSong }) {
  const { columns, rows } = songsTableData({ songListReleased: artist.songListReleased });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container mb={6} spacing={3}>
          <Grid item xs={9}>
            <Card>
              <MDBox pt={2} pb={2} px={2}>
                <MDTypography variant="h6">Artist Address: {artist.name}</MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <MDBox sx={{ width: "100%", height: "100%" }}>
              <MDButton
                onClick={() => setAddSong(true)}
                variant="gradient"
                color="info"
                sx={{ height: "100%", width: "100%" }}
              >
                Release New
              </MDButton>
            </MDBox>
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
                  My Released Songs
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
                        No Released Songs
                      </MDTypography>{" "}
                    </Grid>
                  </Grid>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

Tables.propTypes = {
  artist: PropTypes.object.isRequired,
  setAddSong: PropTypes.func.isRequired,
};

export default Tables;
