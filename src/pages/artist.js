import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";
import AddSongModal from "../components/addnewsong";
import SongItem from "../components/songitem";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ArtistPage = () => {
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dMusicContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider
  );

  const [artistAddress, setArtistAddress] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistSonglist, setArtistSonglist] = useState([]);
  const [songlistDetail, setSongListDetail] = useState([]);
  const [addSong, setAddSong] = useState(false);

  const disconnectWallet = async () => {
    navigate("/");
  };

  useEffect(() => {
    const changeAccount = async () => {
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log(accounts[0]);
        await disconnectWallet();
      });
    };

    const loadArtist = async () => {
      const check_artist = await dMusicContract.connect(signer).checkArtist();
      if (!check_artist) {
        const tx = await dMusicContract.connect(signer).addNewArtist();
        await tx.wait();
      }

      const artist = await dMusicContract.connect(signer).getArtistDetails();
      console.log({ artist });
      if (artist && artist.length) {
        setArtistAddress(artist[0]);
        setArtistId(artist[1].toString());
        setArtistSonglist(artist[2]);
      }

      artist[2]?.map(async (songID) => {
        const song = await dMusicContract.getSongDetails(songID.toString());
        console.log({song});
        setSongListDetail((songlistDetail) => [...songlistDetail, song]);
      });
    };

    loadArtist();
    changeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSong]);

  return (
    <>
      <div>
        <h1>Artist Page</h1>
      </div>
      <div>
        <h1>Artist address: {artistAddress}</h1>
        <h1>Artist id: {artistId}</h1>
        <h1>Artist songs released: {artistSonglist.length}</h1>
      </div>
      <div>
        <button
          onClick={() => {
            setAddSong(true);
          }}
        >
          Release new song
        </button>
      </div>
      {addSong && (
        <>
          <AddSongModal
            setAddSong={setAddSong}
            contract={dMusicContract}
            signer={signer}
          />
          <button
            onClick={() => {
              setAddSong(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
      <div>
        {songlistDetail.map((song, index) => (
          <li>
            <ul id={index}>
              <SongItem name={song[0]} artist={song[1]} genre={song[2]} hash={song[3]} />{" "}
            </ul>
          </li>
        ))}
      </div>
    </>
  );
};

export default ArtistPage;
