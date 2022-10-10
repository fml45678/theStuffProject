import type { NextPage } from "next";
// import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../../components/layout";
import { DefaultQueryCell } from "../utils/DefaultQueryCell";

import ItemThumbnail from "../../components/ItemThumbnail";

const Section = () => {
  const thingQuery = trpc.useQuery(["thing.all"]);
  const thingCatsQuery = trpc.useQuery(["thing.allCats"]);
  // console.log(thingCatsQuery.data);

  return (
    <DefaultQueryCell
      query={thingQuery}
      success={({ data }) => (
        <>
          {thingCatsQuery.data.map((title, key) => (
            <div key={key}>
              <h1 key={title.id} className={styles.section}>
                {title.name}
              </h1>
              <div key={key} className={styles.flexContainer}>
                {data
                  .filter((m) => m.id.includes(`${title.id}`))
                  .map((data) => (
                    <ItemThumbnail cat={title.id} key={data.id} img={data.id} />
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
    />
  );
};

const Home: NextPage = () => {
  // use this to make dynamic sessions based on if the user is logged in or not.
  // const { data: session } = useSession();

  // const section = titleAndCodes.map((title, key) => (
  //   <div key={key}>
  //     <h1 key={title.code} className={styles.section}>
  //       {title.title}
  //     </h1>
  //     <div key={key} className={styles.flexContainer}>
  //       {title.file.map((data) => (
  //         <ItemThumbnail cat={data.SKU} key={data.SKU} img={data.SKU} />
  //       ))}
  //     </div>
  //   </div>
  // ));

  return (
    <Layout>
      <div>
        <Head>
          <title>The Stuff Project</title>
          <meta name="description" content="A place for all of our stuff!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Section />
        {/* <div>{section}</div> */}

        {/* <div>
              {!session && (
                <Link href="/api/auth/signin">
                  <a>Sign In</a>
                </Link>
              )}
              {session && (
                <>
                  <span>welcome</span>
                  <Link href="/api/auth/signout">
                    <a>Sign Out</a>
                  </Link>
                </>
              )}
            </div> */}
      </div>
    </Layout>
  );
};

export default Home;
