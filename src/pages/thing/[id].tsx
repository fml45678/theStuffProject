import { useRouter } from "next/router";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";
import styles from "../../../components/ItemThumbnail.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout from "../../../components/layout";

const BUCKET_URL = "https://stuffprojectitems.s3.amazonaws.com/";

export default function ThingPage() {
  const id = useRouter().query.id as string;
  const thingQuery = trpc.useQuery(["thing.byId", { id }]);
  const { data: session } = useSession();
  return (
    <DefaultQueryCell
      query={thingQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.description}</title>
            <meta name="description" content={data.notes} />
          </Head>
          <Layout />
          {session ? (
            <div className={styles.highlightContainer}>
              <h1>{data.description}</h1>

              <img src={`${BUCKET_URL}${data.id}.JPG`} alt={data.description} />
              <span>{data.manufacturer}</span>
              <p>{data.notes}</p>
              <p>Value: ${data.value}.00</p>
              <Link href="/">
                <button>HOME</button>
              </Link>
            </div>
          ) : (
            <>
              <span>
                To get started Sign in with your Discord or GitHub account
              </span>
            </>
          )}
        </>
      )}
    />
  );
}
