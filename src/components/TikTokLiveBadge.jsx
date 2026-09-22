import { motion } from "framer-motion";
import { SiTiktok } from "react-icons/si";
import { FaCircle, FaArrowRight } from "react-icons/fa";

const TikTokLiveBadge = () => {
  const tiktokUrl = "https://www.tiktok.com/@ronald_rzb/live";

  return (
    <motion.a
      href={tiktokUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        y: -3,
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-[#fe2c55]/40 hover:shadow-[0_0_40px_rgba(254,44,85,0.25)]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fe2c55]/10 via-fuchsia-500/5 to-cyan-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Animated Blur Orbs */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#fe2c55]/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#fe2c55]/30 transition-all duration-500" />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon Section */}
        <div className="relative flex items-center justify-center">
          {/* Pulse Ring */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-14 w-14 rounded-full bg-[#fe2c55]/30"
          />

          {/* Icon Container */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#fe2c55] to-pink-600 shadow-[0_0_25px_rgba(254,44,85,0.5)]">
            <SiTiktok className="text-2xl text-white drop-shadow-lg" />
          </div>

          {/* LIVE Dot */}
          <div className="absolute -right-1 -top-1 flex items-center gap-1 rounded-full border border-[#fe2c55]/40 bg-black/70 px-2 py-1 backdrop-blur-md">
            <FaCircle className="text-[7px] text-[#fe2c55] animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#fe2c55]">
              LIVE
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#fe2c55] via-pink-400 to-white bg-clip-text text-xs font-black uppercase tracking-[0.35em] text-transparent">
              TikTok Streaming
            </span>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-[#fe2c55]"
            />
          </div>

          <h3 className="mt-1 text-sm font-semibold text-white md:text-base">
            Join My Live Conversation
          </h3>

          <p className="mt-1 max-w-[240px] text-[11px] leading-relaxed text-white/60 md:text-xs">
            Real-time discussion, behind the scenes, creative process, project updates, and
            interactive Q&A session.
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="ml-auto hidden md:flex px-7"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 group-hover:border-[#fe2c55]/40 group-hover:bg-[#fe2c55]/10 group-hover:text-white">
            <FaArrowRight />
          </div>
        </motion.div>
      </div>

      {/* Bottom Shine */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-y-0 w-24 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md"
      />
    </motion.a>
  );
};

export default TikTokLiveBadge;