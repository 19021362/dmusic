import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const SongItem = (props) => {
  const [play, setPlay] = useState(false);

  const loadSong = async () => {
    const res = await axios.get(
      `https://api.pinata.cloud/data/pinList?hashContains=&{props.hash}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
        },
      }
    );
    console.log({ res });
  };

  useEffect(() => {
    // loadSong();
  }, []);

  return (
    <>
      <div>
        <h3>Name: {props.name}</h3>
        <h3>Artist: {props.artist}</h3>
        <h3>Gerne: {props.genre}</h3>
      </div>
      <div>
        <audio
          controls
          src={`https://gateway.pinata.cloud/ipfs/QmSNkACXBWRaxChz4LctJF1k1ErSo6UrKBbfAS4CmRRY1n`}
        />
      </div>
    </>
  );
};

export default SongItem;
