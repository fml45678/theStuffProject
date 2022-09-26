import React from "react";
import styles from "./ItemThumbnail.module.css";

function ItemThumbnail(props: { cat: string; img: string }) {
  return (
    <div className={styles.itemContainer}>
      <img
        className={styles.img}
        src={`/images/${props.cat}/${props.img}.JPG`}
        alt="stuff"
      />
    </div>
  );
}

export default ItemThumbnail;
