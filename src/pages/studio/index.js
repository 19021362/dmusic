/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
import contractAbi from "../../abis/Dmusic.json";
import Tables from "./tables";
import DialogForm from "./modal";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function ArtistPage() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [artist, setArtist] = useState(null);
  const [addSong, setAddSong] = useState(false);

  const loadArtist = async () => {
    const checkArtist = await dMusicContract.connect(signer).checkArtist();
    if (!checkArtist) {
      const tx = await dMusicContract.connect(signer).addNewArtist();
      await tx.wait();
    }
    const tx = await dMusicContract.connect(signer).getArtistDetails();

    let artistInfo = {};
    if (tx && tx.length) {
      artistInfo = {
        name: tx[0],
        id: tx[1].toString(),
        songReleased: tx[2],
      };
    }

    const songListReleased = await Promise.all(
      tx[2]?.map(async (songID) => {
        const songRawData = await dMusicContract.getSongDetails(songID.toString());
        const song = {
          id: songID.toString(),
          name: songRawData[0].toString(),
          artistName: songRawData[1].toString(),
          genre: songRawData[2].toString(),
          hash: songRawData[3].toString(),
          price: ethers.utils.formatEther(songRawData[4]).toString(),
          timesSongPurchased: songRawData[5].toString(),
        };
        return song;
      })
    );

    const initialArtist = {
      ...artistInfo,
      songListReleased,
    };
    setArtist(initialArtist);
  };

  const handleSubmitAddSong = async ({ formValue }) => {
    if (formValue.file) {
      try {
        const formData = new FormData();
        formData.append("file", formValue.file);
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
          },
        });
        console.log({ res });
        const fileHash = `${res.data.IpfsHash}`;
        console.log({ fileHash });

        const price = `${ethers.utils.parseEther(formValue.price)}`;

        const tx = await dMusicContract
          .connect(signer)
          .addSong(formValue.name, formValue.genre, fileHash, price);

        await tx.wait();
        await wait(1000);

        setAddSong(false);
        setArtist(null);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!artist) {
      loadArtist();
    }
  }, [artist, addSong]);

  return (
    artist && (
      <>
        <Tables artist={artist} setAddSong={setAddSong} />
        <DialogForm open={addSong} setOpen={setAddSong} handleSubmitAddSong={handleSubmitAddSong} />
      </>
    )
  );
}

export default ArtistPage;
