import type { Route } from "./+types/projects";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { projects } from '~/data/projectsData';
import { Link } from 'react-router';
import Footer from '~/components/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | seojoon1" },
    { name: "description", content: "seojoon1이 진행한 모든 프로젝트를 확인해보세요." },
  ];
}

export default function ProjectsPage() {
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
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative overflow-hidden aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                      {project.demo === '' ? null : (
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span className="text-sm font-medium">Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
