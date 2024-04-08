"use client";

import "@/styles/github-markdown-light.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function BookPage(props: { content: string }) {
  return (
    <div className="markdown-body md:max-w-[720px]">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {props.content}
      </Markdown>
    </div>
  );
}
