import styles from "./layout.module.css";
import Link from "next/link";

const titleAndCodess = [
  { title: "CRAFT", code: "CSP" },
  { title: "TOY", code: "TOY" },
  { title: "SPEAKERS", code: "EAS" },
  { title: "MULTI", code: "EDM" },
  { title: "PHONES", code: "EDP" },
  { title: "SCREENS", code: "EDS" },
  { title: "KEYBOARDS", code: "ECK" },
];

export default function Layout({ children }) {
  return (
    <div>
      <header className={styles.flexHeader}>
        <span className={styles.title}>
          LEMIEUX STUDIOS <br /> INVENTORY
        </span>

        <ul className={styles.categories}>
          <li className={styles.dropDown}>
            ELECTRONICS
            <div>
              <ul className={styles.subMenu}>
                <Link href={`/categories/${titleAndCodess[0].title}`}>
                  <li>Audio</li>
                </Link>
                <Link href={`/categories/${titleAndCodess[1].title}`}>
                  <li>Devices</li>
                </Link>
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
      <div className={styles.searchContainer}>
        <input className={styles.searchBar} placeholder="SEARCH" type="text" />
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
