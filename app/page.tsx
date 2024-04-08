import { Dynaform } from "@/components/dynaform";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12">
      <div className="max-w-[800px] py-16">
        <p className="text-center font-medium text-2xl mb-3">OmniMan</p>
        <p className="text-center text-neutral-800 text-sm font-mono mb-6">
          AI Omnichannel Marketing Content Strategy Builder
        </p>
        <Dynaform />
      </div>
    </main>
  );
}
