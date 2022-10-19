import styles from "./layout.module.css";
import Link from "next/link";
import { trpc } from "../src/utils/trpc";
import { DefaultQueryCell } from "../src/utils/DefaultQueryCell";
import { signIn, signOut, useSession } from "next-auth/react";

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

export default function Layout() {
  const { data: session } = useSession();

  return (
    <div>
      <header className={styles.flexHeader}>
        <span className={styles.title}>
          LEMIEUX STUDIOS <br /> INVENTORY
        </span>

        <Cats />
      </header>
      <div className={styles.signInContainer}>
        {session ? (
          <div>
            <p className={styles.greeting}>hi {session.user?.name}</p>
            <button className={styles.signIn} onClick={() => signOut()}>
              Log Out
            </button>
          </div>
        ) : (
          <button className={styles.signIn} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
      <div className={styles.searchContainer}>
        {session ? (
          <>
            <Link href="addItem">
              <button className={styles.buttons}>Add an Item</button>
            </Link>
            <Link href="/addCategory">
              <button className={styles.buttons}>Add Category</button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
