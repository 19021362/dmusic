import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SideBar = () => {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => {navigate("/home")}}>Homepage</button>
        <button onClick={() => {navigate("/artist")}}>My studio</button>
        <button onClick={() => {navigate("/songlist")}}>Song Market</button>
        <button onClick={() => {navigate("/")}}>Logout</button>
      </div>
    </>
  );
};

export default SideBar;
