"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { redirect } from "next/navigation";

export const editSnippet = async (id: number, code: string) => {
  console.log(id, code);
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  console.log(id);
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/")
  redirect("/");
};

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // CHECK THE USER'S INPUTS AND VALIDATE THEM
    const title: string = formData.get("title") as string;
    const code: string = formData.get("code") as string;

    const numberOfTitleCharacters = 3;
    const numberOfCodeCharacters = 10;

    if (typeof title !== "string" || title.length < numberOfTitleCharacters) {
      return {
        message: `Title must be longer than ${numberOfTitleCharacters} characters`,
      };
    }
    if (typeof code !== "string" || code.length < numberOfCodeCharacters) {
      return {
        message: `Code must be longer than ${numberOfCodeCharacters} characters`,
      };
    }

    // CREATE A NEW RECORD IN THE DATABASE
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);

    // Throw new Error(`Failed to save to the Database`);
    //
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  revalidatePath("/")
  // REDIRECT THE USER BACK TO THE ROOT ROUTE
  redirect("/");
}
