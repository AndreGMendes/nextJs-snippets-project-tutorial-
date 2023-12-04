import { notFound } from "next/navigation";
import { db } from "@/app/db";
import Link from "next/link";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => {
    setTimeout(r, 1000);
  }); // Added just to simulate a 1sec delay fecthing the results from the local DB.

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  console.log(props);

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex my-4 justify-between items-center">
        <h1 className="text-xl font-bold text-transform: uppercase">
          {snippet.title}
        </h1>
        <div className="flex gap-4">
          <Link
            className="border p-2 rounded bg-blue-900 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold"
            href={`/snippets/${snippet.id}/edit`}
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="border p-2 rounded bg-blue-900 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-800">
        <code>{snippet.code}</code>
      </pre>
      <div className="my-4 text-blue-700 text-right">
        <Link href={"/"}>Return to Home Page</Link>
      </div>
    </div>
  );
}
