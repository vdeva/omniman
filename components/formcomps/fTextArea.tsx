"use client";

import { Textarea } from "../ui/textarea";

export function FTextArea(props: {
  title: string;
  description: string;
  placeholder: string;
  inputData: string;
  handleChange: (value: string) => void;
}) {
  const onChange = (e: any) => {
    props.handleChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full bg-white shadow-sm py-6 px-8 rounded-xl">
      <p className="font-medium">{props.title}</p>
      <p className="text-sm text-neutral-600 pb-3">{props.description}</p>
      <div className="w-full" />
      <Textarea
        cols={80}
        className="w-full"
        placeholder={props.placeholder}
        value={props.inputData}
        onChange={onChange}
      />
    </div>
  );
}
