import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const SonglistPage = () => {
  
  const navigate = useNavigate();

  const disconnectWallet = async () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Songlist Page</h1>
      <button onClick={disconnectWallet}>Logout</button>
    </div>
  );
};

export default SonglistPage;
