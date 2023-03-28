import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";
import SongCard from "../components/songcard";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const SonglistPage = () => {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [songlist, setSonglist] = useState([]);

  const disconnectWallet = async () => {
    navigate("/");
  };

  useEffect(() => {
    const changeAccount = async () => {
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log(accounts[0]);
        await disconnectWallet();
      });
    };

    const loadSong = async () => {
      const totalNum = await dMusicContract.connect(signer).getNumSongs();
      for (let i = 1; i <= parseInt(totalNum.toString()); i++) {
        const song = await dMusicContract.getSongDetails(i);
        console.log({ song });
        setSonglist((songlist) => [...songlist, song]);
      }
    };

    loadSong();
    changeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>Songlist Page</h1>
      </div>
      <div>
        {songlist.map((song, index) => (
          <li>
            <ul id={index}>
              <SongCard
                name={song[0]}
                artist={song[1]}
                genre={song[2]}
                price={song[4].toString()}
                popularity={song[5].toString()}
              />
            </ul>
          </li>
        ))}
      </div>
    </>
  );
};

export default SonglistPage;
