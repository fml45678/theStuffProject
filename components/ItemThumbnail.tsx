import React from "react";
import styles from "./ItemThumbnail.module.css";
import Link from "next/link";

const BUCKET_URL = "https://stuffprojectitems.s3.amazonaws.com/";

function ItemThumbnail(props: { cat: string; img: string }) {
  const thumbnail = BUCKET_URL + props.img + ".JPG";
  console.log(thumbnail);
  return (
    <div className={styles.itemContainer}>
      <Link href={`/thing/${props.img}`}>
        <img className={styles.img} src={thumbnail} alt="stuff" />
      </Link>
    </div>
  );
}

export default ItemThumbnail;
