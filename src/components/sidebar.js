import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SideBar = ({ setAccount }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    setAccount(null);
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Homepage
        </button>
        <button
          onClick={() => {
            navigate("/artist");
          }}
        >
          My studio
        </button>
        <button
          onClick={() => {
            navigate("/songlist");
          }}
        >
          Song Marketplace
        </button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  );
};

export default SideBar;
