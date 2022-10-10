import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import styles from "./addItem.module.css";
import { trpc } from "../utils/trpc";
import { createCatOneInput } from "../schema/catOne.schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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

  // database Input section
  const { handleSubmit, register } = useForm<createCatOneInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["thing.addItem"], {
    onSuccess: () => {
      router.push("/");
    },
  });
  function onSubmit(values: createCatOneInput) {
    mutate(values);
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && error.message}
          <span>Type in the three letter SKU</span>
          <input type="text" placeholder="SKU" {...register("id")} />
          <span>Type in the name of the Category</span>
          <input type="text" placeholder="Name" {...register("name")} />
          <button type="submit">Submit</button>
        </form>

        <Link href="/">
          <button>HOME</button>
        </Link>
      </div>
    </>
  );
};

export default AddItem;
