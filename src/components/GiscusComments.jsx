import Giscus from "@giscus/react";
import { motion } from "framer-motion";

const GiscusComments = ({ theme }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/20 dark:bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -z-10"></div>

      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-600 dark:from-white dark:to-neutral-400"
      >
        Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 dark:from-cyan-400 dark:to-blue-500">Discussion</span>
      </motion.h3>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-[12px] p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50"
      >
        <Giscus
          id="comments"
          repo="clizardy/react-portofolio-rzb"
          repoId="R_kgDOOMcbOg" 
          category="General"
          categoryId="DIC_kwDOOMcbOs4Cz0Q1" 
          mapping="pathname"
          term="Welcome to my portfolio discussion!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"

          theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
          
          lang="en"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default GiscusComments;