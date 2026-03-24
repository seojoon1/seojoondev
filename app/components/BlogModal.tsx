import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Blog } from '~/api/api';

interface BlogModalProps {
  blog: Blog | null;
  onClose: () => void;
}

export default function BlogModal({ blog, onClose }: BlogModalProps) {
  useEffect(() => {
    if (!blog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [blog, onClose]);

  const tags: string[] = blog
    ? Array.isArray(blog.tags)
      ? blog.tags
      : (blog.tags as string).split(',').map((t: string) => t.trim())
    : [];

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 이미지 + 제목/태그 오버레이 */}
            <div className="relative h-52 sm:h-64 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              <img
                src={blog.image || 'https://placehold.co/800x300?text=No+Image'}
                alt={blog.title}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x300?text=No+Image'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* 제목 + 태그 오버레이 */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {blog.title}
                </h2>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full transition-colors"
                aria-label="닫기"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                <article>
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </article>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
