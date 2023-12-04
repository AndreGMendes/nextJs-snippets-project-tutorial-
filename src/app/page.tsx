import { db } from "@/app/db";
import Link from "next/link";
import * as actions from "@/actions";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

    return (
      <div className="flex justify-end items-center gap-4" key={snippet.id}>
        <Link
          className="flex grow justify-between items-center p-2 rounded border-cyan-600 border-solid bg-blue-300 border-2"
          href={`/snippets/${snippet.id}`}
        >
          <div>{snippet.title}</div>
          <div className="flex gap-4">
            <div className=" text-blue-900 hover:font-extrabold">View</div>
          </div>
        </Link>
        <form action={deleteSnippetAction}>
          <button className=" text-white hover:font-extrabold border p-2 rounded bg-red-600 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold">
            Delete
          </button>
        </form>
      </div>
    );
  });

  return (
    <div>
      <div className="flex my-4 justify-between items-center">
        <h1 className="text-xl font-bold p-2 text-transform: uppercase">
          Snippets
        </h1>
        <Link
          className="border p-2 rounded bg-green-900 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold"
          href={`/snippets/new`}
        >
          New item
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
