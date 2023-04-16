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
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [user, setUser] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const loadUser = async () => {
    const tx = await dMusicContract.connect(signer).getAudienceDetails();

    let userInfo = {};
    if (tx && tx.length) {
      userInfo = {
        name: tx[0].toString(),
        id: tx[1].toString(),
        songsPurchased: tx[2],
      };
    }

    const songListPurchased = await Promise.all(
      tx[2]?.map(async (songID) => {
        const songRawData = await dMusicContract.getSongDetails(songID.toString());
        const song = {
          id: songID.toString(),
          name: songRawData[0].toString(),
          artistName: songRawData[1].toString(),
          genre: songRawData[2].toString(),
          hash: songRawData[3].toString(),
          price: ethers.utils.formatEther(songRawData[4]).toString(),
          timesSongPurchased: songRawData[5].toString(),
        };
        return song;
      })
    );

    const initialUser = {
      ...userInfo,
      songListPurchased,
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
          `https://gateway.pinata.cloud/ipfs/${currentSong.hash}`
        ),
      ]);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  return (
    user && (
      <Tables
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songListPurchased={user.songListPurchased}
        user={user}
      />
    )
  );
}
