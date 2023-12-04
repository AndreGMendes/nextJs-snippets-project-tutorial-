import { db } from "@/app/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className="flex justify-between items-center p-2 rounded border-cyan-600 border-solid bg-blue-300 border-2"
        href={`/snippets/${snippet.id}`}
      >
        <div>{snippet.title}</div>
        <div className="hover:text-blue-900  text-blue-900 hover:font-extrabold">View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex my-4 justify-between items-center">
        <h1 className="text-xl font-bold p-2 text-transform: uppercase">Snippets</h1>
        <Link
          className="border p-2 rounded bg-blue-900 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold"
          href={`/snippets/new`}
        >New item</Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
