"use client";

import { Slider } from "../ui/slider";

export function FNumberSlider(props: {
  title: string;
  description: string;
  minValue: number;
  maxValue: number;
  step: number;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 w-full bg-white shadow-sm py-6 px-8 rounded-xl">
      <p className="font-medium">{props.title}</p>
      <p className="text-sm text-neutral-600 pb-3">{props.description}</p>
      <div className="w-full" />
      <div className="flex flex-row justify-between font-mono text-neutral-600 mb-1">
        <p>{props.minValue}</p>
        <p>{}</p>
        <p>{props.maxValue}</p>
      </div>
      <Slider
        defaultValue={[props.minValue + props.maxValue / 2]}
        min={props.minValue}
        max={props.maxValue}
        step={props.step}
        className="w-full"
      />
    </div>
  );
}
