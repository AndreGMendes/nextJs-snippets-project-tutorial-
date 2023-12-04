import { db } from "@/app/db";
import { notFound } from "next/navigation";

//Import the Client Component
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

const SnippetEditPage = async (props: SnippetEditPageProps) => {
  const pageId: number = parseInt(props.params.id);

  const snippet = await db.snippet.findFirst({
    where: {
      id: pageId,
    },
  });

  if (!snippet) return notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};

export default SnippetEditPage;
