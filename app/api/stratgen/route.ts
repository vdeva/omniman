import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { z } from "zod";

export const runtime = "edge";

const TextAreaSchema = z.object({
  type: z.literal("textArea"),
  title: z.string(),
  description: z.string(),
  placeholder: z.string(),
  userAnswer: z.string().optional().nullable(),
});

const NumberSliderSchema = z.object({
  type: z.literal("numberSlider"),
  title: z.string(),
  description: z.string(),
  minValue: z.number(),
  maxValue: z.number(),
  step: z.number(),
  userAnswer: z.number().optional().nullable(),
});

const OptionSwitchSchema = z.object({
  type: z.literal("optionSwitch"),
  title: z.string(),
  description: z.string(),
  userAnswer: z.boolean().optional().nullable(),
});

const RadioGroupSchema = z.object({
  type: z.literal("radioGroup"),
  title: z.string(),
  description: z.string(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  userAnswer: z.string().optional().nullable(),
});

const InputFieldSchema = z.union([
  TextAreaSchema,
  NumberSliderSchema,
  OptionSwitchSchema,
  RadioGroupSchema,
]);

const InputsSchema = z.array(InputFieldSchema);

export async function POST(req: Request) {
  const now = new Date(Date.now());
  const { formState } = await req.json();
  console.log(formState);
  console.log(JSON.stringify(formState));
  let parsedFormState =
    typeof formState === "string" ? JSON.parse(formState) : formState;

  const validFormState = InputsSchema.parse(parsedFormState);

  const filteredFormState = validFormState.filter(
    (item) => item.userAnswer !== "" && item.userAnswer !== null,
  );

  console.log(filteredFormState);
  console.log(JSON.stringify(filteredFormState));
  const messages = [
    {
      role: "system",
      content: `
      Build and generate an omnichannel marketing content strategy from the customer brief below:
      ${JSON.stringify(filteredFormState).toString()}

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
  });

  return Response.json({ response });
}
