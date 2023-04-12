import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import contractAbi from "../../abis/Dmusic.json";
import SideBar from "../../components/sidebar";
import ArtistPage from "../artist";
import HomePage from "../home/home";
import SonglistPage from "../songlist";
import "./index.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const LoginPage = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const accounts = await provider.send("eth_requestAccounts", []);
      const nw = await provider.getNetwork();
      console.log({ nw });
      //nw.chainId === 31337
      if (nw.chainId.toString() === "31337") {
        setAccount(accounts[0]);

        const check_user = await dMusicContract.connect(signer).checkUser();
        console.log({ check_user });
        if (!check_user) {
          const tx = await dMusicContract
            .connect(signer)
            .addNewAudience(accounts[0]);
          console.log({ tx });
          await tx.wait();
        }
        console.log("Login successfully");
      } else {
        alert("Wrong network!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    console.log("content rendered");
    return (
      <BrowserRouter>
        <SideBar setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/songlist" element={<SonglistPage />} />
        </Routes>
      </BrowserRouter>
    );
  };

  useEffect(() => {}, [account]);

  return (
    <>
      {!account && (
        <div>
          <div className="Background"></div>
          <div className="container">
            <h1>Welcome to DMUSIC</h1>
            <span className="login-btn" onClick={connectWallet}>
              Login with Metamask
            </span>
          </div>
        </div>
      )}
      {!!account && renderContent()}
    </>
  );
};

export default LoginPage;
