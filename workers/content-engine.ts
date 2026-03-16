import { prisma } from "../lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWeeklyArticle() {
  console.log("Starting weekly article generation...");

  try {
    // 1. Fetch active prompt
    const prompt = await prisma.prompt.findFirst({
      where: { target: "article-generation" },
      orderBy: { updatedAt: "desc" },
    });

    if (!prompt) {
      console.warn("No prompt found for article generation.");
      return;
    }

    // 2. Generate content with OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a strategic consultant at ODC. Write a think-tank style article on growth systems." },
        { role: "user", content: prompt.content },
      ],
    });

    const content = response.choices[0].message.content || "";
    const title = content.split("\n")[0].replace("# ", "");
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    // 3. Store in DB
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: content.substring(0, 150) + "...",
        authorId: "system", // Admin or system user ID
        published: true,
      },
    });

    console.log(`Article generated: ${article.title}`);
    return article;
  } catch (error) {
    console.error("Error generating article:", error);
  }
}
