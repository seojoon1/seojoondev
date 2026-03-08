import type { Route } from "./+types/home";
import Hero from "~/components/Hero";
import About from "~/components/About";
import GitHubStats from "~/components/GitHubStats";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";
import { getProjects } from "~/api/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seojoon1 | Portfolio" },
    { name: "description", content: "미래를 꿈꾸는 개발자 seojoon1의 포트폴리오입니다." },
  ];
}

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <Hero />
      <About />
      <GitHubStats />
      <Skills />
      <Projects projects={loaderData.projects} />
      <Contact />
      <Footer />
    </main>
  );
}
