"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) {
    throw new Error("Missing required fields");
  }

  // Ensure there's a user to attribute the article to
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "ODC Admin",
        email: "admin@odcway.com",
      },
    });
  }

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      authorId: user.id,
    },
  });

  revalidatePath("/es/insights");
  revalidatePath("/en/insights");
  revalidatePath("/es/admin/insights");
  revalidatePath("/en/admin/insights");
  redirect("/es/admin/insights");
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  await prisma.article.update({
    where: { id },
    data: { title, slug, excerpt, content, published },
  });

  revalidatePath("/es/insights");
  revalidatePath("/en/insights");
  revalidatePath("/es/admin/insights");
  revalidatePath("/en/admin/insights");
  redirect("/es/admin/insights");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/es/insights");
  revalidatePath("/en/insights");
  revalidatePath("/es/admin/insights");
  revalidatePath("/en/admin/insights");
}
