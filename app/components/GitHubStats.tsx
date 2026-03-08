import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

export default function GitHubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const username = 'seojoon1';

  return (
    <section id="github" ref={ref} className="min-h-screen flex items-center py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            GitHub Activity
          </h2>
          
          <div className="space-y-8">
            {/* GitHub Contribution Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Contribution Graph
              </h3>
              <div className="flex justify-center overflow-x-auto">
                <img
                  src={`https://ghchart.rshah.org/${isDark ? '409ba5' : '2563eb'}/${username}`}
                  alt="GitHub Contribution Chart"
                  className="max-w-full h-auto rounded"
                />
              </div>
            </motion.div>

            {/* GitHub Stats & Languages */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
              >
                <img
                  src={`https://github-readme-stats-seven-opal-54.vercel.app/api?username=${username}&show_icons=true&hide_border=true&bg_color=${isDark ? '00000000' : '00000000'}&text_color=${isDark ? 'D1D5DB' : '4B5563'}&icon_color=${isDark ? 'E2E8F0' : '1F2937'}&title_color=${isDark ? 'FFFFFF' : '1F2937'}`}
                  alt="GitHub Stats"
                  className="w-full h-auto rounded"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
              >
                <img
                  src={`https://github-readme-stats-seven-opal-54.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=8&hide_border=true&bg_color=${isDark ? '00000000' : '00000000'}&text_color=${isDark ? 'D1D5DB' : '4B5563'}&icon_color=${isDark ? 'E2E8F0' : '1F2937'}`}
                  alt="Top Languages"
                  className="w-full h-auto rounded"
                />
              </motion.div>
            </div>

            {/* GitHub Streak */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
            >
              <div className="flex justify-center">
                <img
                  src={`https://streak-stats.demolab.com/?user=${username}&theme=${isDark ? 'dark' : 'default'}&hide_border=true&background=00000000&ring=${isDark ? '60A5FA' : '2563EB'}&fire=${isDark ? 'F87171' : 'EF4444'}&currStreakLabel=${isDark ? 'D1D5DB' : '4B5563'}&sideNums=${isDark ? 'E2E8F0' : '4B5563'}&sideLabels=${isDark ? 'D1D5DB' : '4B5563'}`}
                  alt="GitHub Streak"
                  className="max-w-full h-auto rounded"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
