"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";
import Link from "next/link";

interface SnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
    console.log(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code); // Bindind the Server Action

  return (
    <div className="flex gap-4 flex-col">
      <div className="text-2xl font-bold mt-4">
        Editing the{" "}
        <span className="text-transform: uppercase">
          &quot;{snippet.title}&quot;
        </span>{" "}
        snippet.
      </div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction} className="flex justify-between">
        <button className="border p-2 rounded bg-blue-900 border-cyan-600 border-solid text-cyan-50 hover:font-extrabold">
          Save
        </button>
        <div className="my-4 text-blue-700 text-right">
        <Link href={"/"}>Return to Home Page</Link>
      </div>
      </form>
      
    </div>
  );
};

export default SnippetEditForm;
