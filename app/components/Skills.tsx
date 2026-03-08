import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '~/data/skillsData';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-20 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Skills
          </h2>
          
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
                  {category.emoji} {category.title} {category.emoji}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.05, duration: 0.4 }}
                      className={`px-6 py-3 rounded-lg font-bold text-sm md:text-base ${skill.bgColor} ${skill.textColor} shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-default border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600`}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
