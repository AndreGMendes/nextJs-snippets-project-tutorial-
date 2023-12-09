"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function SnippetsCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded border-cyan-950 p-2 w-full"
            type="text"
            id="title"
          />

          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded border-cyan-950 p-2 w-full"
            id="code"
          />
        </div>

        {formState.message ? (
          <div className="bg-red-600 border rounded-xl border-red-950 text-white text-center p-2 my-2">{formState.message}</div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
