import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const SongItem = () => {

  return (
    <>
      <div>
        <h3>Name</h3>
        <h3>Artist</h3>
        <h3>Gerne</h3>
      </div>
      <div>
        <button onClick={() => {}}>Play</button>
      </div>
    </>
  );
};

export default SongItem;
