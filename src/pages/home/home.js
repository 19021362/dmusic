import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./home.css";
import contractAbi from "../../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const HomePage = () => {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [userAddress, setUserAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [userSonglist, setUserSonglist] = useState([]);

  const disconnectWallet = async () => {
    navigate("/home");
  };

  useEffect(() => {
    const changeAccount = async () => {
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log(accounts[0]);
        await disconnectWallet();
      });
    };

    const loadUser = async () => {
      const tx = await dMusicContract.connect(signer).getAudienceDetails();
      //console.log({ tx });
      if (tx && tx.length) {
        setUserAddress(tx[0]);
        setUserId(tx[1].toString());
        setUserSonglist(tx[2]);
      }
    };

    loadUser();
    changeAccount();
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="container">
      
        <div>
          <h1>Home Page</h1>
        </div>
        <div>
          <h1>Your address: {userAddress}</h1>
          <h1>Your id: {userId}</h1>
          <h1>Number of songs you have purchased: {userSonglist.length}</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
