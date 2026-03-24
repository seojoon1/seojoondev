import type { Route } from "./+types/projects";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '~/api/api';
import { Link } from 'react-router';
import Footer from '~/components/Footer';
import ProjectCard from '~/components/ProjectCard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | seojoon1" },
    { name: "description", content: "seojoon1이 진행한 모든 프로젝트를 확인해보세요." },
  ];
}

export async function clientLoader() {
  const projects = await getProjects();
  return { projects };
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section ref={ref} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">홈으로 돌아가기</span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
                All Projects
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
                제가 진행한 모든 프로젝트를 확인해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
