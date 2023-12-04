"use server";

import { db } from "@/app/db";
import { redirect } from "next/navigation";

export const editSnippet = async (id: number, code: string) => {
  console.log(id, code);
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  console.log(id);
  await db.snippet.delete({
    where: { id },
  });

redirect('/')
};
