import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";
import AddSongModal from "../components/addnewsong";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ArtistPage = () => {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [artistAddress, setArtistAddress] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistSonglist, setArtistSonglist] = useState([]);
  const [addSong, setAddSong] = useState(false);

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

    const loadArtist = async () => {
      const check_artist = await dMusicContract.connect(signer).checkArtist();
      if (!check_artist) {
        const tx = await dMusicContract.connect(signer).addNewArtist();
        await tx.wait();
      }

      const tx = await dMusicContract.connect(signer).getArtistDetails();
      console.log({ tx });
      if (tx && tx.length) {
        setArtistAddress(tx[0]);
        setArtistId(tx[1].toString());
        setArtistSonglist(tx[2]);
      }
    };

    loadArtist();
    changeAccount();
  }, []);

  return (
    <>
      <div>
        <h1>Artist Page</h1>
        <button onClick={disconnectWallet}>Logout</button>
      </div>
      <div>
        <h1>Artist address: {artistAddress}</h1>
        <h1>Artist id: {artistId}</h1>
        <h1>Artist songs purchased: {artistSonglist.length}</h1>
      </div>
      <div>
        <button onClick={() => {setAddSong(true)}}>Release new song</button>
      </div>
      {addSong && (<><AddSongModal contract = {dMusicContract} signer = {signer} /><button onClick={() => {setAddSong(false)}}>Cancel</button></>)}
      <div>
        <button onClick={() => {navigate("/home")}}>Go to Home page</button>
      </div>
    </>
  );
};

export default ArtistPage;
