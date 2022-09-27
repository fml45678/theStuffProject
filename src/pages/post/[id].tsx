import { useRouter } from "next/router";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";

export default function PostPage() {
  const id = useRouter().query.id as string;
  const postQuery = trpc.useQuery(["post.byId", { id }]);

  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
          </Head>

          <main>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <em>Created {data.createdAt.toLocaleDateString()}</em>
          </main>
        </>
      )}
    />
  );
}
