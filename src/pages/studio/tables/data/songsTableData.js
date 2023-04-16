/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import PropTypes from "prop-types";

import fakeImage from "assets/images/team-1.jpg";

export default function songsTableData({ songListReleased }) {
  console.log({ songListReleased });

  function SongTitle({ song }) {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={fakeImage} name={song.name} size="sm" variant="rounded" />
        <MDBox ml={2} lineHeight={1} sx={{ cursor: "pointer" }}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {song.name}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }

  return {
    columns: [
      { Header: "Song", accessor: "song", width: "35%", align: "left" },
      { Header: "Genre", accessor: "genre", align: "center" },
      { Header: "CID", accessor: "hash", width: "20%", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Popularity", accessor: "popularity", align: "center" },
    ],

    rows: songListReleased
      ? songListReleased?.map((songPurchased) => ({
          song: <SongTitle song={songPurchased} />,
          genre: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.genre}`}
            </MDTypography>
          ),
          hash: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.hash}`}
            </MDTypography>
          ),
          price: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.price} ETH`}
            </MDTypography>
          ),
          popularity: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.timesSongPurchased}`}
            </MDTypography>
          ),
        }))
      : [],
  };
}

songsTableData.propTypes = {
  songListReleased: PropTypes.array,
};
