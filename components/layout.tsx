import styles from "./layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../src/utils/trpc";
import { DefaultQueryCell } from "../src/utils/DefaultQueryCell";
import { array } from "zod";

const titleAndCodess: [{ title: string; code: string }] = [
  { title: "CRAFT", code: "CSP" },
  { title: "TOY", code: "TOY" },
  { title: "SPEAKERS", code: "EAS" },
  { title: "MULTI", code: "EDM" },
  { title: "PHONES", code: "EDP" },
  { title: "SCREENS", code: "EDS" },
  { title: "KEYBOARDS", code: "ECK" },
];

// const Categories = trpc.useQuery(["cat.byCat"]).data?.map((sec) => (
//   <div>
//     <span>{sec.cat}</span>
//   </div>
// ));
function getCat(sec) {
  return [sec.cat];
}

const Cats = () => {
  const catsQuery = trpc.useQuery(["cat.byCat"]);
  const { data } = catsQuery;
  const Categees = data?.map(JSON.stringify);
  const noDuplicates = new Set(Categees);
  console.log(noDuplicates);
  const theOne = noDuplicates.forEach
  // const mapped = noDuplicates.map(getCat);

  //   (sec, key) => (
  //   <div key={key}>
  //     <span>{sec.cat}</span>
  //   </div>
  // ));

  return (
    // <p>{JSON.stringify(data)}</p>
    <span>{noDuplicates}</span>
    // <DefaultQueryCell
    //   query={catsQuery}
    //   success={({ data }) => <div>{<p>{JSON.stringify(data)}</p>}</div>}
    // />
  );
};

export default function Layout({ children }) {
  // const id = useRouter().query.id as string;
  // const catQuery = trpc.useQuery(["cat.byId", { id }]);

  return (
    <div>
      <header className={styles.flexHeader}>
        <span className={styles.title}>
          LEMIEUX STUDIOS <br /> INVENTORY
        </span>

        {/* <DefaultQueryCell
          query={catQuery}
          success={({ data }) => <h1>{data.id}</h1>}
        /> */}

        <ul className={styles.categories}>
          <li className={styles.dropDown}>
            ELECTRONICS
            <div>
              <ul className={styles.subMenu}>
                {/* <Link href={`/categories/${titleAndCodess[0].title}`}> */}
                <li>Audio</li>
                {/* </Link> */}
                {/* <Link href={`/categories/${titleAndCodess[1].title}`}> */}
                <li>Devices</li>
                {/* </Link> */}
                <li>Computer</li>
              </ul>
            </div>
          </li>
          <li className={styles.dropDown}>
            CRAFT
            <div>
              <ul className={styles.subMenu}>
                <li>Patterns</li>
                <li>Sewing</li>
                <li>Tools</li>
              </ul>
            </div>
          </li>
          <li className={styles.dropDown}>
            JUNK
            <div>
              <ul className={styles.subMenu}>
                <li>Stuff</li>
              </ul>
            </div>
          </li>
          <li className={styles.dropDown}>
            THINGS
            <div>
              <ul className={styles.subMenu}>
                <li>Toy</li>
              </ul>
            </div>
          </li>
        </ul>
      </header>
      <Cats />
      <div className={styles.searchContainer}>
        <input className={styles.searchBar} placeholder="SEARCH" type="text" />
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
