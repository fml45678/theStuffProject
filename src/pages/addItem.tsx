import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import styles from "./addItem.module.css";

const BUCKET_URL = "https://stuffprojectitems.s3.amazonaws.com/";

const AddItem: NextPage = () => {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const selectFile = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    // console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Add an item to The Stuff Project</title>
          <meta name="description" content="This is where you add your item!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p>Please select a file to upload</p>
        <input type="file" onChange={(e) => selectFile(e)} />
        {file && (
          <>
            <p>Selected file: {file.name}</p>
            <button onClick={uploadFile}>Upload a File!</button>
          </>
        )}
        {uploadingStatus && <p>{uploadingStatus}</p>}
        {uploadedFile && <img className={styles.image} src={uploadedFile} />}
        <Link href="/">
          <button>HOME</button>
        </Link>
      </div>
    </>
  );
};

export default AddItem;
