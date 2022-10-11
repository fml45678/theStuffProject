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
import { createItemsInput, createItemsSchema } from "../schema/items.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const BUCKET_URL = "https://stuffprojectitems.s3.amazonaws.com/";

const AddItem: NextPage = () => {
  // This section is for AWS bucket uploads
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

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
  const { handleSubmit, register } = useForm<createItemsInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["thing.addWholeItem"], {
    onSuccess: () => {
      router.push("/");
    },
  });
  function onSubmit(values: createItemsInput) {
    console.log(values.description);
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

        <h3>Enter Item Pictures Here:</h3>
        <input type="file" onChange={(e) => selectFile(e)} />
        {file && (
          <>
            <p>Selected file: {file.name}</p>
            <button onClick={uploadFile}>Upload a File!</button>
          </>
        )}
        {uploadingStatus && <p>{uploadingStatus}</p>}
        {uploadedFile && <img className={styles.image} src={uploadedFile} />}

        <h3>Enter New Categories Here:</h3>
        {/* <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {error && error.message}
          <span>Type in the three letter SKU</span>
          <input type="text" placeholder="SKU" {...register("id")} required />
          <span>Type in the name of the Category</span>
          <input
            type="text"
            placeholder="Category"
            {...register("name")}
            required
          />
          <button type="submit">Submit</button>
        </form> */}

        <h3>Enter Individual Items Here:</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {error && error.message}
          <input
            type="text"
            placeholder="ID ex. DGS000101"
            {...register("id")}
            minLength={9}
            maxLength={9}
            required
          />
          <input
            type="text"
            placeholder="Description"
            {...register("description")}
            required
          />
          <input
            type="text"
            placeholder="Manufacturer"
            {...register("manufacturer")}
            required
          />
          <input
            type="text"
            placeholder="Condition ex.A,B,C,D,F"
            {...register("condition")}
            required
          />
          <input
            type="text"
            placeholder="Notes"
            {...register("notes")}
            required
          />
          <span>for sale</span>
          <span>true</span>
          <input
            type="radio"
            // placeholder="TRUE or FALSE"
            {...register("sale")}
            value="true"
            required
          />
          <span>false</span>
          <input
            type="radio"
            // placeholder="TRUE or FALSE"
            {...register("sale")}
            value="false"
            required
          />
          <input
            placeholder="value ex. 5 don't use $"
            {...register("value")}
            type="number"
            required
          />
          <span>sold?</span>
          <span>true</span>
          <input
            type="radio"
            // placeholder="TRUE or FALSE"
            {...register("sold")}
            value="true"
            required
          />
          <span>false</span>
          <input
            type="radio"
            // placeholder="TRUE or FALSE"
            {...register("sold")}
            value="false"
            required
          />
          <button type="submit">Submit</button>
        </form>

        <Link href="/">
          <button className={styles.button}>HOME</button>
        </Link>
      </div>
    </>
  );
};

export default AddItem;
