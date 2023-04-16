/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import SongList from "pages/marketplace/songlist";

import { Songlist } from "data/fakeData";
import contractAbi from "../../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function SonglistPage() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [songlist, setSonglist] = useState([]);
  const [loading, setLoading] = useState(false);

  const buySong = async ({ id, price }) => {
    try {
      const tx = await dMusicContract
        .connect(signer)
        .buySong(`${id}`, { from: signer._address, value: ethers.utils.parseEther(price) });
      await tx.wait();

      alert("Buy song successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const loadSong = async () => {
    const tx = await dMusicContract.connect(signer).getNumSongs();
    let totalNum = parseInt(tx.toString(), 10);
    const songlistId = [];
    while (totalNum > 0) {
      songlistId.push(totalNum);
      totalNum--;
    }

    const songlistRes = await Promise.all(
      songlistId.map(async (songID) => {
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

    setSonglist(songlistRes);
    setLoading(true);
  };

  useEffect(() => {
    if (!loading) {
      loadSong();
    }
  }, [loading]);

  return songlist?.length && <SongList songlist={songlist} buySong={buySong} />;
}

export default SonglistPage;
