import { motion } from 'framer-motion';
import { socialLinks } from '~/data/socialLinksData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* 소셜 링크 */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm ${social.color} transition-colors`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* 중앙 메시지 */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm order-first md:order-none">
            <span>seojoon1</span>
          </div>

          {/* 저작권 */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} seojoon1. All rights reserved.
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
