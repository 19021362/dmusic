import axios from "axios";
import React, { useEffect, useState } from "react";

const initialValues = {
  name: "",
  genre: "",
  price: "",
  file: null,
};

const AddSongModal = (props) => {
  const dMusicContract = props.contract;
  const signer = props.signer;
  const setAddSong = props.setAddSong;

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
    e.preventDefault();

    console.log({ values });
    if (values.file) {
      try {
        const formData = new FormData();
        formData.append("file", values.file);
        console.log({ formData });
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
            },
          }
        );
        console.log({ res });
        const fileHash = `${res.data.IpfsHash}`;
        console.log({ fileHash });

        await dMusicContract
          .connect(signer)
          .addSong(values.name, values.genre, fileHash, values.price);

        setAddSong(false);
        //wait(1000);
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
