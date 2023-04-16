/* eslint-disable react/forbid-prop-types */
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import PropTypes from "prop-types";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SongCard from "pages/marketplace/songlist/components/SongCard";

// Overview page components
import Header from "pages/marketplace/songlist/components/Header";

// Images
import fakeImage from "assets/images/pexels-stas-knop-1319799.jpg";
import { Divider } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function SongList({ songlist, buySong }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h3" fontWeight="medium">
            Marketplace
          </MDTypography>
          <MDBox mb={1} />
        </MDBox>
        <Divider />
        <MDBox p={2}>
          <Grid container spacing={6}>
            {songlist?.map((song) => (
              <Grid item xs={12} md={6} xl={3}>
                <SongCard song={song} image={fakeImage} buySong={buySong} />
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

SongList.propTypes = {
  songlist: PropTypes.array.isRequired,
  buySong: PropTypes.func.isRequired,
};

export default SongList;
