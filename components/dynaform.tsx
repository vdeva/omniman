"use client";

import { useState } from "react";
import { z } from "zod";
import { FNumberSlider } from "./formcomps/fNumberSlider";
import { FOptionSwitch } from "./formcomps/foptionSwitch";
import { FRadioGroup } from "./formcomps/fradioGroup";
import { FTextArea } from "./formcomps/fTextArea";
import { Button } from "./ui/button";
import { BookPage } from "./book-page";

const TextAreaSchema = z.object({
  type: z.literal("textArea"),
  title: z.string(),
  description: z.string(),
  placeholder: z.string(),
  inputData: z.string().optional().nullable(),
});

const NumberSliderSchema = z.object({
  type: z.literal("numberSlider"),
  title: z.string(),
  description: z.string(),
  minValue: z.number(),
  maxValue: z.number(),
  step: z.number(),
  inputData: z.number().optional().nullable(),
});

const OptionSwitchSchema = z.object({
  type: z.literal("optionSwitch"),
  title: z.string(),
  description: z.string(),
  inputData: z.boolean().optional().nullable(),
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
  inputData: z.string().optional().nullable(),
});

const InputFieldSchema = z.union([
  TextAreaSchema,
  NumberSliderSchema,
  OptionSwitchSchema,
  RadioGroupSchema,
]);

const InputsSchema = z.array(InputFieldSchema);

export function Dynaform() {
  const [formData, setFormData] = useState(
    `[{"type":"textArea","title":"Campaign Goals","description":"What are the goals of this omnichannel marketing campaign?","placeholder":"E.g. increase brand awareness, drive sales, etc.","inputData":""}]`,
  );
  const [loading, setLoading] = useState(false);
  const [strat, setStrat] = useState("");

  const fetchDataStrat = async (retryCount = 3) => {
    try {
      const response = await fetch("/api/stratgen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formState: formData ? JSON.parse(formData) : {},
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const messageContent =
        responseData?.response?.choices?.[0]?.message?.content;

      if (messageContent) {
        setStrat(messageContent);
      } else {
        throw new Error("No message content found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitStrat = async () => {
    setLoading(true);
    await fetchDataStrat();
    setLoading(false);
  };

  const fetchData = async (retryCount = 3) => {
    try {
      const response = await fetch("/api/compgen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formState: formData ? JSON.parse(formData) : {},
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const messageContent =
        responseData?.response?.choices?.[0]?.message?.content;

      if (messageContent) {
        console.log(messageContent);
        const messageContentJson = JSON.parse(messageContent);
        try {
          InputsSchema.parse(messageContentJson);
          const updatedFormData = [
            ...(formData ? JSON.parse(formData) : []),
            ...messageContentJson,
          ];
          setFormData(JSON.stringify(updatedFormData));
        } catch (error) {
          if (retryCount > 0) {
            console.log(
              `Validation failed, retrying... Retries left: ${retryCount - 1}`,
            );
            await fetchData(retryCount - 1);
          } else {
            throw new Error("Validation failed after retries");
          }
        }
      } else {
        throw new Error("No message content found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const handleInputChange = (index: any, value: any) => {
    const updatedFields = JSON.parse(formData).map((field: any, i: any) => {
      if (i === index) {
        return { ...field, inputData: value };
      }
      return field;
    });

    setFormData(JSON.stringify(updatedFields));
  };

  const renderInputComponent = (input: any, index: any) => {
    const inputProps = {
      ...input,
      handleChange: (value: any) => handleInputChange(index, value),
    };

    switch (input.type) {
      case "textArea":
        return <FTextArea {...inputProps} />;
      case "numberSlider":
        return <FNumberSlider {...inputProps} />;
      case "optionSwitch":
        return <FOptionSwitch {...inputProps} />;
      case "radioGroup":
        return <FRadioGroup {...inputProps} />;
      default:
        return null;
    }
  };

  if (strat.length > 2) {
    return (
      <div className="bg-white rounded-xl py-8 px-10 shadow-lg w-full">
        <BookPage content={strat} />
      </div>
    );
  }

  return (
    <div>
      {/* <p>{formData}</p> */}
      <div className="w-full flex flex-col gap-4">
        {formData &&
          JSON.parse(formData).map((input: any, index: any) => (
            <div key={index} className="w-full">
              {renderInputComponent(input, index)}
            </div>
          ))}
      </div>
      <div className="w-full flex flex-row justify-between  mt-8">
        <Button
          disabled={loading}
          className="bg-blue-600"
          onClick={handleSubmit}
        >
          Deepen
        </Button>
        <Button
          disabled={loading}
          className="bg-green-600"
          onClick={handleSubmitStrat}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
