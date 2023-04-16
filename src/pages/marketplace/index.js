/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import SongList from "pages/marketplace/songlist";

import { Songlist } from "data/fakeData";
import contractAbi from "../../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function SonglistPage() {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [songlist, setSonglist] = useState([]);

  // const disconnectWallet = async () => {
  //   navigate("/");
  // };

  const loadSong = async () => {
    // const totalNum = await dMusicContract.connect(signer).getNumSongs();
    // for (let i = 1; i <= parseInt(totalNum.toString()); i++) {
    //   const song = await dMusicContract.getSongDetails(i);
    //   console.log({ song });
    //   setSonglist((songlist) => [...songlist, song]);
    // }
    setSonglist(Songlist);
  };

  useEffect(() => {
    // const changeAccount = async () => {
    //   window.ethereum.on("accountsChanged", async (accounts) => {
    //     console.log(accounts[0]);
    //     await disconnectWallet();
    //   });
    // };

    loadSong();
    // changeAccount();
  }, [songlist]);

  return songlist?.length && <SongList songlist={songlist} />;
}

export default SonglistPage;
