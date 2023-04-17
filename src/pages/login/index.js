/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";
import BasicLayout from "layouts/BasicLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import bgImage from "assets/images/homebackground.jpg";
import { Accounts } from "../../data/fakeData";
import contractAbi from "../../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function LoginPage({ setIsLogin, setUser, setAlert }) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setAlert({
          open: true,
          message: "Please install the Metamask wallet!",
          type: "warning",
        });
        return;
      }
      const accounts = await provider.send("eth_requestAccounts", []);
      const nw = await provider.getNetwork();
      console.log({ nw });
      // nw.chainId === 31337
      if (nw.chainId.toString() === "31337") {
        const checkUser = await dMusicContract.connect(signer).checkUser();
        console.log({ checkUser });
        if (!checkUser) {
          const tx = await dMusicContract.connect(signer).addNewAudience(accounts[0]);
          console.log({ tx });
          await tx.wait();
        }
        console.log(accounts[0]);
        setUser(accounts[0]);
        setIsLogin(true);

        setAlert({
          open: true,
          message: "Login successful!",
          type: "success",
        });
      } else {
        setAlert({
          open: true,
          message: "Wrorg Network. Please change the network to the localhost!",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Container>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="white"
          my={5}
        >
          <MDTypography variant="h1" fontWeight="bold" color="white">
            Welcome to Dmusic
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
          <MDButton variant="gradient" color="info" onClick={connectWallet}>
            Login with MetaMask
          </MDButton>
        </MDBox>
      </Container>
    </BasicLayout>
  );
}

export default LoginPage;
