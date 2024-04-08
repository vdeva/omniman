import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const now = new Date(Date.now());
  const { formState } = await req.json();
  console.log(formState);
  const messages = [
    {
      role: "user",
      content: `
      Build and generate an omnichannel marketing content strategy from the customer brief below:
      ${FormData}

      Make sure to use Markdown formatting.
      `,
    },
  ];

  const Groq = require("groq-sdk");
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const response = await groq.chat.completions.create({
    messages,
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
  });

  return Response.json({ response });
}
