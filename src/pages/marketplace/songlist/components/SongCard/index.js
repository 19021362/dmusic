/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";

function SongCard({ image, song, buySong }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async ({ id, price }) => {
    setIsLoading(true);
    await buySong({ id, price });
    setIsLoading(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "5px",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={song.name}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <Grid container spacing={1} justifyContent="space-between" alignContent="center">
          <Grid item>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              {song.genre}
            </MDTypography>
          </Grid>
          <Grid item>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              Buy time {song.timesSongPurchased}
            </MDTypography>
          </Grid>
        </Grid>

        <MDBox mb={1}>
          <MDTypography variant="h5" textTransform="capitalize">
            {song.name}
          </MDTypography>
        </MDBox>
        <MDBox mb={2} lineHeight={0}>
          <Grid container wrap="nowrap" spacing={2} justifyContent="left" alignContent="center">
            <Grid item>
              <MDTypography variant="button" fontWeight="light" color="text">
                Artist
              </MDTypography>
            </Grid>
            <Grid item xs paddingRight={5.5}>
              <MDTypography variant="button" fontWeight="light" color="text">
                {song.artistName}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" mb={-1}>
          {!isLoading ? (
            <MDButton
              variant="gradient"
              size="small"
              color="info"
              onClick={() => handleBuy({ id: song.id, price: song.price })}
            >
              {song.price} ETH
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              size="small"
              color="info"
              disabled
              startDecorator={<CircularProgress variant="solid" thickness={2} />}
            >
              Loading...
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
SongCard.propTypes = {
  image: PropTypes.string.isRequired,
  song: PropTypes.object.isRequired,
  buySong: PropTypes.func.isRequired,
};

export default SongCard;
