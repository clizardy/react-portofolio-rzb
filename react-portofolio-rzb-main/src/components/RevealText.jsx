import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const RevealText = ({ children, width = "fit-content" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animasi sekali saja saat di-scroll

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { y: 75, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.17, 0.55, 0.55, 1] }} // Easing premium
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealText;