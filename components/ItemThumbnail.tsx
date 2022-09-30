import React from "react";
import styles from "./ItemThumbnail.module.css";
import Link from "next/link";

function ItemThumbnail(props: { cat: string; img: string }) {
  return (
    <div className={styles.itemContainer}>
      <Link href={`/thing/${props.img}`}>
        <img
          className={styles.img}
          src={`/images/${props.cat.slice(0, 3)}/${props.img}.JPG`}
          alt="stuff"
        />
      </Link>
    </div>
  );
}

export default ItemThumbnail;
