import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import contractAbi from "../abis/Dmusic.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const initialValues = {
  name: "",
  genre: "",
  price: "",
  file: null,
};

const AddSongModal = (props) => {
  const dMusicContract = props.contract;
  const signer = props.signer;

  console.log(dMusicContract);
  console.log(signer);

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const captureFile = (e) => {
    console.log(e.target.files[0]);
    setValues({
      ...values,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    console.log({ values });
    if (values.file) {
      try {
        const formData = new FormData();
        formData.append("file", values.file);
        console.log({ formData });
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log({ resFile });
        const fileHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log({ fileHash });

        const tx = dMusicContract
          .connect(signer)
          .addSong(values.name, values.genre, fileHash, values.price);
        await tx.wait();

        alert(tx);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }

  };

  return (
    <>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={values.name}
            name="name"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            value={values.genre}
            name="genre"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={values.price}
            name="price"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Upload file:
          <input type="file" name="file" onChange={captureFile} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default AddSongModal;
