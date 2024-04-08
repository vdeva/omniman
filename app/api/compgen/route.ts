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
      content: `Task: Dynamically generate a form with the purpose of obtaining information for the creation of an omnichannel marketing content strategy.

    Input field types:
    - textArea
    - numberSlider
    - optionSwitch
    - radioGroup
    
    You must return the form in valid JSON format according to this zod schema:
    

    const TextAreaSchema = z.object({
      type: z.literal('textArea'),
      title: z.string(),
      description: z.string(),
      placeholder: z.string(),
      inputData: z.string().optional().nullable(),
    });
    
    const NumberSliderSchema = z.object({
      type: z.literal('numberSlider'),
      title: z.string(),
      description: z.string(),
      minValue: z.number(),
      maxValue: z.number(),
      step: z.number(),
      inputData: z.number().optional().nullable(),
    });
    
    const OptionSwitchSchema = z.object({
      type: z.literal('optionSwitch'),
      title: z.string(),
      description: z.string(),
      inputData: z.boolean().optional().nullable(),
    });
    
    const RadioGroupSchema = z.object({
      type: z.literal('radioGroup'),
      title: z.string(),
      description: z.string(),
      options: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })),
      inputData: z.string().optional().nullable(),
    });
    
    const InputFieldSchema = z.union([
      TextAreaSchema,
      NumberSliderSchema,
      OptionSwitchSchema,
      RadioGroupSchema,
    ]);
    
    const InputsSchema = z.array(InputFieldSchema);
            
    
    Example response that includes different types of input fields:
    [
      {
        "type": "textArea",
        "title": "Feedback",
        "description": "Your feedback",
        "placeholder": "Type here...",
        "inputData": ""
      },
      {
        "type": "numberSlider",
        "title": "Rating",
        "description": "Rate from 1 to 5",
        "minValue": 1,
        "maxValue": 5,
        "step": 1,
        "inputData": 3
      },
      {
        "type": "optionSwitch",
        "title": "Enable Feature",
        "description": "Enable this feature?",
        "inputData": true
      },
      {
        "type": "radioGroup",
        "title": "Choose Option",
        "description": "Select one option",
        "options": [
          {
            "label": "Option 1",
            "value": "1"
          },
          {
            "label": "Option 2",
            "value": "2"
          }
        ],
        "inputData": "2"
      },
      // Add more as needed.
    ]
    
    Current form state with user answers:
    ${formState}
    
    Keep in mind radio groups are NOT multi-selectable. Don't use them for things where someone might want to select multiple things.
    DO NOT RE-RETURN THE ENTIRE FORM.
    ONLY RETURN THE JSON THAT IS TO BE APPENDED TO THE CURRENT FORM.
    DO NOT SAY ANYTHING OR WRITE ANY TEXT OTHER THAN THE JSON CODE IN YOUR RESPONSE.
    ONLY USE JSON. NOTHING ELSE.
    NEVER EVER SAY "'Here is an example of a new input field object.. " OR ANYTHING OF THAT SORT.
    ONLY RETURN JSON!!!!! DO NOT WRITE ANY CONTEXT OUTSIDE OF THE JSON.
    ONLY WRITE THE FORM SECTIONS THAT ARE TO BE APPENDED.
    USE THE CURRENT FORM STATE ANSWERS TO HYPER-CUSTOMIZE THE NEXT FORM INPUT FIELDS.
    
    WHEN PARSING YOUR RESPONSE IT MUST BE VALIDATED BY THE ZOD SCHEMA ABOVE.`,
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
