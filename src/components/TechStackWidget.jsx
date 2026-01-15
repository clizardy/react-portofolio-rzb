import { 
    SiReact, SiTailwindcss, SiVite, SiFramer, SiJavascript, SiGit 
} from "react-icons/si";
import { FaLayerGroup } from "react-icons/fa";

const TECH_STACK = [
    { 
        name: "React", 
        icon: <SiReact />, 
        color: "text-[#61DAFB]", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(97,218,251,0.8)]" 
    },
    { 
        name: "Tailwind", 
        icon: <SiTailwindcss />, 
        color: "text-[#38B2AC]", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(56,178,172,0.8)]" 
    },
    { 
        name: "Framer", 
        icon: <SiFramer />, 
        color: "text-[#0055FF] dark:text-white", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(0,85,255,0.8)] dark:group-hover/icon:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
    },
    { 
        name: "Vite", 
        icon: <SiVite />, 
        color: "text-[#646CFF]", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(100,108,255,0.8)]" 
    },
    { 
        name: "JS", 
        icon: <SiJavascript />, 
        color: "text-[#F7DF1E]", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(247,223,30,0.8)]" 
    },
    { 
        name: "Git", 
        icon: <SiGit />, 
        color: "text-[#F05032]", 
        shadow: "group-hover/icon:drop-shadow-[0_0_8px_rgba(240,80,50,0.8)]" 
    },
];

const TechStackWidget = () => {
    return (
        // UBAH: Mobile py-1.5 px-3 (Sangat Kecil), Desktop py-2 px-4 (Tetap)
        <div className="relative flex items-center justify-center gap-2 md:gap-3 py-1.5 px-3 md:py-2 md:px-4 rounded-xl w-auto transition-all duration-300 group overflow-hidden">
            
            {/* ANIMASI CAHAYA */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] pointer-events-none z-0" />

            {/* LABEL KIRI (Desktop Only - Tetap Sama) */}
            <div className="hidden md:flex items-center gap-2 pr-3 border-r border-white/80 z-0">
                <div className="p-1 rounded-md bg-white/20 text-white shadow-sm">
                    <FaLayerGroup className="text-[10px]" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                    Stack
                </span>
            </div>

            {/* ICONS KANAN - MOBILE LEBIH KECIL */}
            <div className="flex items-center justify-center gap-3 md:gap-5 z-0">
                {TECH_STACK.map((tech, index) => (
                    <div key={index} className="group/icon relative flex flex-col items-center justify-center h-full">
                        
                        {/* UBAH: text-base (Mobile 16px), md:text-xl (Desktop 20px) */}
                        <div className={`text-xs md:text-lg transition-all duration-300 cursor-pointer transform will-change-transform flex justify-center items-center
                            ${tech.color} opacity-80 hover:opacity-100 hover:scale-115 ${tech.shadow}`}>
                            {tech.icon}
                        </div>

                        {/* Dot Indikator */}
                        <div className={`mt-1 w-0.5 h-0.5 rounded-full opacity-0 group-hover/icon:opacity-100 transition-all duration-300 bg-current ${tech.color}`}></div>

                        {/* Tooltip */}
                        <span className="absolute -bottom-6 opacity-0 group-hover/icon:opacity-100 group-hover/icon:translate-y-1 transition-all duration-300 
                            text-[9px] font-bold py-0.5 px-1.5 rounded-md 
                            bg-neutral-900 text-white border border-white/10
                            shadow-sm backdrop-blur-sm pointer-events-none whitespace-nowrap z-20">
                            {tech.name}
                        </span>

                    </div>
                ))}
            </div>

            <style>{`
                @keyframes shine {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default TechStackWidget;