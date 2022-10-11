import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import styles from "./addItem.module.css";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createCatOneInput } from "../schema/catOne.schema";

const AddCategory: NextPage = () => {
  // database Input section
  const { register, handleSubmit } = useForm<createCatOneInput>();
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
          <title>Add a Category to The Stuff Project</title>
          <meta name="description" content="This is where you add your item!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h3>Enter New Categories Here:</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        </form>

        <Link href="/">
          <button className={styles.button}>HOME</button>
        </Link>
      </div>
    </>
  );
};

export default AddCategory;
