import { motion } from 'framer-motion';
import type { Blog } from '~/api/api';

interface BlogCardProps {
  blog: Blog;
  index: number;
  isInView: boolean;
  onClick: (blog: Blog) => void;
}

export default function BlogCard({ blog, index, isInView, onClick }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      onClick={() => onClick(blog)}
    >
      <div className="relative overflow-hidden aspect-video bg-gray-200 dark:bg-gray-700">
        <img
          src={blog.image || 'https://placehold.co/640x360?text=No+Image'}
          alt={blog.title}
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/640x360?text=No+Image'; }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h3>

        <div className="flex flex-wrap gap-2 pt-1">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
