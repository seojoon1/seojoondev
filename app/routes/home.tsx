import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seojoondev" },
    { name: "description", content: "seojoondev" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Hello, World!</h1>
    </main>
  );
}
