import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTiktok,
  FaEnvelope,
  FaArrowRight,
  FaTelegramPlane,
  FaFacebook,
  FaDiscord,
  FaStar,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const SocialModal = ({ isOpen, onClose }) => {
  // LOCK SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [isOpen]);

  // =========================
  // PRIORITY SECTION
  // =========================
  const featuredLinks = [
    {
      id: "wa",
      name: "WhatsApp",
      label: "Fast Response",
      username: "Chat directly with me",
      url: "https://wa.me/6281281954366",
      icon: <FaWhatsapp />,
      gradient:
        "from-green-500 via-green-400 to-emerald-500",
      size: "col-span-2 row-span-2",
    },

    {
      id: "ig",
      name: "Instagram",
      label: "Daily Update",
      username: "@ronald_rzb",
      url: "https://instagram.com/ronald_rzb",
      icon: <FaInstagram />,
      gradient:
        "from-yellow-400 via-pink-500 to-purple-600",
      size: "col-span-2",
    },

    {
      id: "li",
      name: "LinkedIn",
      label: "Professional",
      username: "Career & Networking",
      url: "https://linkedin.com/in/ronald-zuni-bachtiar-a52990345",
      icon: <FaLinkedin />,
      gradient:
        "from-blue-500 via-sky-500 to-cyan-400",
      size: "col-span-2",
    },
  ];

  // =========================
  // SECONDARY SECTION
  // =========================
  const socialLinks = [
    {
      id: "tt",
      name: "TikTok",
      username: "@ronald_rzb",
      url: "https://www.tiktok.com/@ronald_rzb",
      icon: <FaTiktok />,
    },
    {
      id: "threads",
      name: "Threads",
      username: "@ronald_rzb",
      url: "https://www.threads.net/@ronald_rzb",
      icon: <SiThreads />,
    },
    {
      id: "x",
      name: "X / Twitter",
      username: "@ronald_rzb",
      url: "https://x.com/ronald_rzb",
      icon: <FaXTwitter />,
    },
    {
      id: "gh",
      name: "GitHub",
      username: "@clizardy",
      url: "https://github.com/clizardy",
      icon: <FaGithub />,
    },
    {
      id: "tg",
      name: "Telegram",
      username: "@ronaldeverywhere",
      url: "https://t.me/ronaldeverywhere",
      icon: <FaTelegramPlane />,
    },
    {
      id: "dc",
      name: "Discord",
      username: "Join Server",
      url: "https://discord.com/users/ronald_rzb",
      icon: <FaDiscord />,
    },
    {
      id: "fb",
      name: "Facebook",
      username: "Ronald Bachtiar",
      url: "https://facebook.com/ronald.bachtiar.73",
      icon: <FaFacebook />,
    },
    {
      id: "email",
      name: "Email",
      username: "Send Message",
      url: "mailto:ronaldzunibachtiar@gmail.com",
      icon: <FaEnvelope />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 260,
            }}
            className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/95 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.15),transparent_30%)]" />

            {/* HEADER */}
            <div className="relative flex items-start justify-between border-b border-white/5 p-6 md:p-8">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                    Online & Active
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-tight text-white">
                  Social Universe
                </h2>

                <p className="mt-2 max-w-md text-sm text-white/50">
                  Prioritized platforms where I’m most active and responsive.
                </p>
              </div>

              <button
                onClick={onClose}
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-red-500 hover:text-white"
              >
                <FaTimes className="transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="max-h-[78vh] overflow-y-auto p-5 md:p-8 scrollbar-hide">
              {/* FEATURED SECTION */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    Priority Platforms
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {featuredLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        y: -4,
                        scale: 1.01,
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        ${item.size}
                        group relative overflow-hidden rounded-[2rem]
                        border border-white/10
                        bg-white/[0.03]
                        p-5 md:p-6
                        min-h-[180px]
                      `}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`}
                      />

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                      {/* Glow */}
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition-all duration-700 group-hover:scale-150" />

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl text-white backdrop-blur-xl">
                            {item.icon}
                          </div>

                          <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                            {item.label}
                          </div>
                        </div>

                        {/* BOTTOM */}
                        <div>
                          <h4 className="text-2xl font-bold text-white">
                            {item.name}
                          </h4>

                          <p className="mt-1 text-sm text-white/70">
                            {item.username}
                          </p>

                          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-white">
                            Open Platform
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* SECONDARY SECTION */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    Other Platforms
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        group relative overflow-hidden rounded-3xl
                        border border-white/10
                        bg-white/[0.03]
                        p-5
                        transition-all duration-300
                        hover:border-white/20
                        hover:bg-white/[0.05]
                      "
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/5 via-transparent to-cyan-400/10" />

                      <div className="relative z-10">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl text-white transition-all group-hover:scale-110">
                          {item.icon}
                        </div>

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          {item.name}
                        </p>

                        <h4 className="mt-1 text-sm font-semibold text-white">
                          {item.username}
                        </h4>

                        <div className="mt-5 flex items-center gap-2 text-xs text-white/50 transition-all group-hover:text-white">
                          Visit
                          <FaArrowRight className="text-[10px]" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;