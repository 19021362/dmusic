/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import PropTypes from "prop-types";

import fakeImage from "assets/images/team-1.jpg";

export default function songsTableData({ songListPurchased, handleSelectSong }) {
  const onClickName = ({ song }) => {
    handleSelectSong({ song });
  };

  function SongTitle({ song }) {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={fakeImage} name={song.name} size="sm" variant="rounded" />
        <MDBox
          ml={2}
          lineHeight={1}
          onClick={() => onClickName({ song })}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography display="block" variant="button" fontWeight="medium">
            {song.name}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }

  return {
    columns: [
      { Header: "Song", accessor: "song", width: "45%", align: "left" },
      { Header: "Artist", accessor: "artist", align: "left" },
      { Header: "Genre", accessor: "genre", align: "center" },
    ],

    rows: songListPurchased
      ? songListPurchased?.map((songPurchased) => ({
          song: <SongTitle song={songPurchased} />,
          artist: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.artistName.slice(0, 5)}...${songPurchased.artistName.slice(-4)}`}
            </MDTypography>
          ),
          genre: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {`${songPurchased.genre}`}
            </MDTypography>
          ),
        }))
      : [],
  };
}

songsTableData.propTypes = {
  songListPurchased: PropTypes.array,
  handleSelectSong: PropTypes.func,
};
