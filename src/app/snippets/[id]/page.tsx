import { notFound } from "next/navigation";
import { db } from "@/app/db";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  
  await new Promise ((r) => {setTimeout(r, 1000)}) // Added just to simulate a 1sec delay fecthing the results from the local DB.

  
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  console.log(props);
  return <div>{snippet.title}</div>;
}
