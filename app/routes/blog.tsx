import type { Route } from "./+types/blog";
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getBlogs } from '~/api/api';
import type { Blog } from '~/api/api';
import { Link } from 'react-router';
import Footer from '~/components/Footer';
import BlogCard from '~/components/BlogCard';
import BlogModal from '~/components/BlogModal';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | seojoon1" },
    { name: "description", content: "seojoon1의 블로그 글을 확인해보세요." },
  ];
}

export async function clientLoader() {
  try {
    const blogs = await getBlogs();
    return { blogs };
  } catch {
    return { blogs: [] };
  }
}

export default function BlogPage({ loaderData }: { loaderData: { blogs: Blog[] } }) {
  const { blogs } = loaderData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <>
      <section ref={ref} className="min-h-screen py-20 px-6">
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
                Blog
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
                제가 작성한 블로그 글을 확인해보세요
              </p>
            </div>

            {blogs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500"
              >
                <span className="text-6xl mb-6">📭</span>
                <p className="text-xl font-medium">아직 작성된 글이 없습니다</p>
                <p className="text-sm mt-2">곧 새로운 글로 찾아올게요!</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={index}
                    isInView={isInView}
                    onClick={setSelectedBlog}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />

      <Footer />
    </>
  );
}
