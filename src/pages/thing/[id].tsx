import { useRouter } from "next/router";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";
import styles from "../../../components/ItemThumbnail.module.css";
import Link from "next/link";

export default function ThingPage() {
  const id = useRouter().query.id as string;
  const thingQuery = trpc.useQuery(["thing.byId", { id }]);

  return (
    <DefaultQueryCell
      query={thingQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.description}</title>
            <meta name="description" content={data.notes} />
          </Head>

          <div className={styles.highlightContainer}>
            <h1>{data.description}</h1>

            <img
              src={`/images/${data.id.slice(0, 3)}/${data.id}.JPG`}
              alt={data.description}
            />
            <span>{data.manufacturer}</span>
            <p>{data.notes}</p>
            <Link href="/">
              <button>HOME</button>
            </Link>
          </div>
        </>
      )}
    />
  );
}
