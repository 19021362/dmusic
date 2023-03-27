import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const LoginPage = () => {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const accounts = await provider.send("eth_requestAccounts", []);
      const nw = await provider.getNetwork();
      //nw.chainId === 31337
      if (nw.chainId.toString() === "31337") {
        setAccount(accounts[0]);
        
        const check_user = await dMusicContract.connect(signer).checkUser();
        console.log({ check_user });
        if (!check_user) {
          const tx = await dMusicContract.connect(signer).addNewAudience(accounts[0]);
          console.log({ tx });
          await tx.wait();
        }
        console.log("Login successfully");

        navigate("/home");
      } else {
        //alert("Wrong network!");
        alert("Wrong network!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login with Metamask</h1>
      <button onClick={connectWallet}>Login with Metamask</button>
    </div>
  );
};

export default LoginPage;
