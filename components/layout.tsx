import styles from "./layout.module.css";
import Link from "next/link";
// import { useRouter } from "next/router";
import { trpc } from "../src/utils/trpc";
import { DefaultQueryCell } from "../src/utils/DefaultQueryCell";

const Cats = () => {
  const catsQuery = trpc.useQuery(["cat.all"]);

  return (
    <DefaultQueryCell
      query={catsQuery}
      success={({ data }) => (
        <ul className={styles.categories}>
          {data.map((a) => (
            <li className={styles.dropDown} key={a.id}>
              {a.cat}
              <div>
                <ul className={styles.subMenu}>
                  {data.map((a) => (
                    <li key={a.id}>{a.subCat}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    />
  );
};

export default function Layout({ children }) {
  return (
    <div>
      <header className={styles.flexHeader}>
        <span className={styles.title}>
          LEMIEUX STUDIOS <br /> INVENTORY
        </span>

        <Cats />
      </header>
      <div className={styles.searchContainer}>
        {/* <input className={styles.searchBar} placeholder="SEARCH" type="text" /> */}
        <Link href="addItem">
          <button>Add an Item</button>
        </Link>
        <Link href="/addCategory">
          <button>Add Category</button>
        </Link>
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
