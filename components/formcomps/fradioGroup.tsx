"use client";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function FRadioGroup(props: {
  title: string;
  description: string;
  userAnswer: string;
  options: {
    label: string;
    value: string;
  }[];
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
      <RadioGroup
        value={props.userAnswer}
        onChange={onChange}
        onClick={onChange}
      >
        {props.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`radio-${index}`} />
            <Label htmlFor={`radio-${index}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
