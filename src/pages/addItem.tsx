import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import styles from "./addItem.module.css";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createItemsInput } from "../schema/items.schema";

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
    setUploadingStatus("Uploading the file");

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
  const { register, handleSubmit } = useForm<createItemsInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["thing.addWholeItem"], {
    onSuccess: () => {
      router.push("/");
    },
  });
  function onSubmit(values: createItemsInput) {
    let saleBool = values.sale === "true";
    let soldBool = values.sold === "true";
    console.log(soldBool);
    mutate({
      value: parseInt(values.value),
      condition: values.condition,
      id: values.id,
      description: values.description,
      manufacturer: values.manufacturer,
      notes: values.notes,
      sale: saleBool,
      sold: soldBool,
    });
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
        <Link href="/addCategory">
          <button>Add Category</button>
        </Link>

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
          <span>For Sale</span>
          <div className={styles.bool}>
            <span>true</span>
            <input
              type="radio"
              {...register("sale")}
              value="true"
              required
              typeof="boolean"
            />
          </div>
          <div className={styles.bool}>
            <span>false</span>
            <input
              type="radio"
              {...register("sale")}
              value={"false"}
              required
              typeof="boolean"
            />
          </div>
          <input
            placeholder="value ex. 5 don't use $"
            {...register("value")}
            typeof="number"
            required
          />
          <span>Sold?</span>
          <div className={styles.bool}>
            <span>true</span>
            <input
              type="radio"
              {...register("sold")}
              value="true"
              required
              typeof="boolean"
            />
          </div>
          <div className={styles.bool}>
            <span>false</span>
            <input
              type="radio"
              {...register("sold")}
              value={"false"}
              required
              typeof="boolean"
            />
          </div>
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
