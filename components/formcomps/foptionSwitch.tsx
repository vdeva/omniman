"use client";

import { Switch } from "../ui/switch";

export function FOptionSwitch(props: {
  title: string;
  description: string;
  placeholder: string;
  inputData: string;
}) {
  return (
    <div className="flex flex-row gap-1 w-full bg-white shadow-sm py-6 px-8 rounded-xl">
      <div className="flex flex-col gap-1 w-full ">
        <p className="font-medium">{props.title}</p>
        <p className="text-sm text-neutral-600">{props.description}</p>
      </div>
      <div className="flex flex-row justify-end items-center">
        <Switch />
      </div>
    </div>
  );
}
