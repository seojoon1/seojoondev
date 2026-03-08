import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useTheme } from '~/contexts/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 30);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all'>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            seojoon1
          </Link>

          <div className="hidden md:flex space-x-8 text-gray-600 font-medium dark:text-gray-300">
            <button onClick={() => scrollToSection('about')} className="hover:text-mint-500 transition-colors">About</button>
            <button onClick={() => scrollToSection('github')} className="hover:text-purple-600 transition-colors">GitHub</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-abigail-500 transition-colors">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
            <Link to="/blog" className="hover:text-green-600 transition-colors">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 flex flex-col space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button onClick={() => scrollToSection('about')} className="hover:text-mint-500 transition-colors text-gray-600 dark:text-gray-300 font-medium text-left">About</button>
                <button onClick={() => scrollToSection('github')} className="hover:text-purple-600 transition-colors text-gray-600 dark:text-gray-300 font-medium text-left">GitHub</button>
                <button onClick={() => scrollToSection('skills')} className="hover:text-abigail-500 transition-colors text-gray-600 dark:text-gray-300 font-medium text-left">Skills</button>
                <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors text-gray-600 dark:text-gray-300 font-medium text-left">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-indigo-600 transition-colors text-gray-600 dark:text-gray-300 font-medium text-left">Contact</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
