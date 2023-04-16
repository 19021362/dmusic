/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Users, Songlist } from "data/fakeData";
import contractAbi from "../../abis/Dmusic.json";
import Tables from "./tables";
import DialogForm from "./modal";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function ArtistPage() {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  const [artist, setArtist] = useState(null);
  const [addSong, setAddSong] = useState(false);

  // const disconnectWallet = async () => {
  //   navigate("/");
  // };

  const loadArtist = async () => {
    // const check_artist = await dMusicContract.connect(signer).checkArtist();
    // if (!check_artist) {
    //   const tx = await dMusicContract.connect(signer).addNewArtist();
    //   await tx.wait();
    // }
    // const artist = await dMusicContract.connect(signer).getArtistDetails();
    // console.log({ artist });
    // if (artist && artist.length) {
    //   setArtistAddress(artist[0]);
    //   setArtistId(artist[1].toString());
    //   setArtistSonglist(artist[2]);
    // }
    // artist[2]?.map(async (songID) => {
    //   const song = await dMusicContract.getSongDetails(songID.toString());
    //   console.log({ song });
    //   setSongListDetail((songlistDetail) => [...songlistDetail, song]);
    // });
    console.log("Load Artist");

    const fakeUser = Users[0];
    const fakeSongListReleased = Songlist;
    const initialUser = {
      ...fakeUser,
      songListReleased: fakeSongListReleased,
    };
    setArtist(initialUser);
  };

  const handleSubmitAddSong = async ({ formValue }) => {
    console.log({ formValue });
    if (formValue.file) {
      try {
        const formData = new FormData();
        formData.append("file", formValue.file);
        // console.log({ formData });
        // const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        //   maxBodyLength: "Infinity",
        //   headers: {
        //     "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        //     Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
        //   },
        // });
        // console.log({ res });
        // const fileHash = `${res.data.IpfsHash}`;
        // console.log({ fileHash });

        // await dMusicContract
        //   .connect(signer)
        //   .addSong(values.name, values.genre, fileHash, values.price);

        // setAddSong(false);
        // wait(1000);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // const changeAccount = async () => {
    //   window.ethereum.on("accountsChanged", async (accounts) => {
    //     console.log(accounts[0]);
    //     await disconnectWallet();
    //   });
    // };

    loadArtist();
    // changeAccount();
  }, [addSong]);

  return (
    // <>
    //   <div>
    //     <h1>Artist Page</h1>
    //   </div>
    //   <div>
    //     <h1>Artist address: {artistAddress}</h1>
    //     <h1>Artist id: {artistId}</h1>
    //     <h1>Artist songs released: {artistSonglist.length}</h1>
    //   </div>
    //   <div>
    //     <button
    //       onClick={() => {
    //         setAddSong(true);
    //       }}
    //     >
    //       Release new song
    //     </button>
    //   </div>
    //   {addSong && (
    //     <>
    //       <AddSongModal setAddSong={setAddSong} contract={dMusicContract} signer={signer} />
    //       <button
    //         onClick={() => {
    //           setAddSong(false);
    //         }}
    //       >
    //         Cancel
    //       </button>
    //     </>
    //   )}
    //   <div>
    //     {songlistDetail.map((song, index) => (
    //       <li>
    //         <ul id={index}>
    //           <SongItem name={song[0]} artist={song[1]} genre={song[2]} hash={song[3]} />{" "}
    //         </ul>
    //       </li>
    //     ))}
    //   </div>
    // </>
    artist && (
      <>
        <Tables artist={artist} setAddSong={setAddSong} />
        <DialogForm open={addSong} setOpen={setAddSong} handleSubmitAddSong={handleSubmitAddSong} />
      </>
    )
  );
}

export default ArtistPage;
