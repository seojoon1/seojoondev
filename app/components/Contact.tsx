import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { socialLinks } from '~/data/socialLinksData';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center py-20 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든지 연락주세요!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-900 rounded-lg hover:shadow-lg transition-all ${social.color}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-8 w-8" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a
              href="mailto:kim1122aass@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              이메일 보내기
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
