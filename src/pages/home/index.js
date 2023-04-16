/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Typography } from "@mui/material";
import Player, { Track, PlayerInterface } from "react-material-music-player";
import sampleMusic from "elements/music/mixkit-raising-me-higher-34.mp3";
import sampleArt from "assets/images/team-2.jpg";
import contractAbi from "../../abis/Dmusic.json";
import { Songlist, Users } from "../../data/fakeData";
import Tables from "./tables";

// Data

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export default function HomePage() {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [user, setUser] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const disconnectWallet = async () => {
    navigate("/");
  };

  const loadUser = async () => {
    // const tx = await dMusicContract.connect(signer).getAudienceDetails();
    // //console.log({ tx });
    // if (tx && tx.length) {
    //   setUserAddress(tx[0]);
    //   setUserId(tx[1].toString());
    //   setUserSonglist(tx[2]);
    // }
    const fakeUser = Users[0];
    const fakeSongListPurchased = Songlist;
    const initialUser = {
      ...fakeUser,
      SongListPurchased: fakeSongListPurchased,
    };
    setUser(initialUser);
  };

  useEffect(() => {
    if (currentSong) {
      console.log({ currentSong });
      PlayerInterface.play([
        new Track(
          currentSong.id,
          `http://localhost:3000${sampleArt}`,
          currentSong.name,
          `${currentSong.artistName.slice(0, 5)}...${currentSong.artistName.slice(-4)}`,
          `http://localhost:3000${sampleMusic}`
        ),
      ]);
    }
  }, [currentSong]);

  useEffect(() => {
    console.log("homepage");
    // const changeAccount = async () => {
    //   window.ethereum.on("accountsChanged", async (accounts) => {
    //     console.log(accounts[0]);
    //     await disconnectWallet();
    //   });
    // };

    if (!user) {
      loadUser();
    }
    // changeAccount();
  }, [user]);

  return (
    user && (
      <Tables
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songListPurchased={user.SongListPurchased}
        user={user}
      />
    )
  );
}
