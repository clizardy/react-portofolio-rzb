import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DynamicGreeting = ({ lang = 'id' }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = time.getHours();
        if (lang === 'id') {
            if (hour >= 5 && hour < 11) return "Selamat Pagi";
            if (hour >= 11 && hour < 15) return "Selamat Siang";
            if (hour >= 15 && hour < 18) return "Selamat Sore";
            return "Selamat Malam";
        } else {
            if (hour >= 5 && hour < 12) return "Good Morning";
            if (hour >= 12 && hour < 17) return "Good Afternoon";
            return "Good Evening";
        }
    };

    const formattedTime = time.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group md:w-[1900px] w-72 lg:max-w-fit"
        >
            {/* Background Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/50 to-amber-600 dark:from-cyan-500 dark:to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            {/* Main Container */}
            <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-8 px-6 py-4 bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl">
                
                {/* Left Side: Greeting & Status */}
                <div className="flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-white/50 pb-3 md:pb-0 md:pr-8 w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-cyan-400 bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="md:text-[9px] text-[6px] font-black tracking-[0.4em] uppercase italic dark:text-cyan-500/80 text-amber-500/80">
                            System Live
                        </span>
                    </div>
                    <h3 className="text-sm md:text-base font-medium tracking-wide text-white/70">
                        {getGreeting()}, <span className="text-white font-bold">Visitor</span>
                    </h3>
                </div>

                {/* Right Side: Clock & Timezone */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter text-white font-sans">
                            {formattedTime.split(':')[0]}:{formattedTime.split(':')[1]}
                            <span className="text-xl md:text-2xl opacity-30 font-thin ml-1">
                                :{formattedTime.split(':')[2]}
                            </span>
                        </h2>
                        
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase tracking-[0.1em]">
                                {new Intl.DateTimeFormat('en-ID', { timeZoneName: 'short' })
                                    .formatToParts(time)
                                    .find(p => p.type === 'timeZoneName').value}
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-[9px] md:text-[10px] mt-1 font-medium text-white/50 uppercase tracking-[0.2em]">
                        Indonesia
                    </p>
                </div>

            </div>
        </motion.div>
    );
};

export default DynamicGreeting;