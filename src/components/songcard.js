import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const SongCard = (props) => {

  return (
    <>
      <div id={props.id}>
        <h3>Name: {props.name}</h3>
        <h3>Artist: {props.artist}</h3>
        <h3>Gerne: {props.genre}</h3>
        <h3>popularity: {props.popularity}</h3>
        <h3>Price: {props.price}</h3>
      </div>
      <div>
        <button onClick={() => {}}>Buy</button>
      </div>
    </>
  );
};

export default SongCard;
