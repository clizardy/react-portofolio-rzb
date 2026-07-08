import { useState, useEffect } from "react";
import { FaQuoteLeft, FaSyncAlt, FaCopy, FaCheck } from "react-icons/fa";

const QUOTES = [
    {
        author: "Linus Torvalds",
        en: "Talk is cheap. Show me the code.",
        id: "Bicara itu mudah. Tunjukkan kodenya."
    },
    {
        author: "Steve Jobs",
        en: "The only way to do great work is to love what you do.",
        id: "Satu-satunya cara melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan."
    },
    {
        author: "Bill Gates",
        en: "It’s fine to celebrate success but it is more important to heed the lessons of failure.",
        id: "Merayakan kesuksesan itu baik, tapi lebih penting untuk mengambil pelajaran dari kegagalan."
    },
    {
        author: "Thomas Edison",
        en: "I have not failed. I've just found 10,000 ways that won't work.",
        id: "Saya tidak gagal. Saya baru saja menemukan 10.000 cara yang tidak berhasil."
    },
    {
        author: "Alan Turing",
        en: "Sometimes it is the people no one imagines anything of who do the things that no one can imagine.",
        id: "Terkadang, orang yang tidak diperhitungkanlah yang melakukan hal-hal yang tidak terbayangkan."
    },
    {
        author: "Naval Ravikant",
        en: "Code and media are leverage that requires no permission.",
        id: "Kode dan media adalah daya ungkit yang tidak memerlukan izin."
    },
    {
        author: "John Johnson",
        en: "First, solve the problem. Then, write the code.",
        id: "Pertama, selesaikan masalahnya. Baru tulis kodenya."
    }
];

const QuoteWidget = ({ lang }) => {
    const [quote, setQuote] = useState(QUOTES[0]);
    const [copied, setCopied] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const [isAnimating, setIsAnimating] = useState(false);
    const [isFading, setIsFading] = useState(false);

        useEffect(() => {
        const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(random);
    }, []);

    const randomizeQuote = () => {
        if (isAnimating) return; // Cegah spam klik saat animasi jalan

        setIsAnimating(true); // Icon mulai muter
        setIsFading(true);    // Teks mulai buram & hilang (Fade Out)

        // Tunggu 300ms (Durasi fade out), baru ganti teks
        setTimeout(() => {
            let newQuote = quote;
            while (newQuote === quote) {
                newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            }
            setQuote(newQuote);
            
            setIsFading(false); // Teks muncul lagi (Fade In)
        }, 300);

        // Matikan putaran icon setelah total 600ms
        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    const handleCopy = () => {
        const textToCopy = `"${lang === 'id' ? quote.id : quote.en}" — ${quote.author}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative flex items-center justify-between gap-4 py-3 px-5 rounded-xl w-full lg:w-3/4 transition-all duration-300
            
            0 group">
            
            {/* Bagian Kiri: Icon + Teks */}
            <div className="flex items-start gap-3 flex-1 overflow-hidden">
                <FaQuoteLeft className="text-xl text-amber-500/80 dark:text-cyan-400/50 mt-1 flex-shrink-0" />
                
                {/* LOGIC ANIMASI:
                    Kita bungkus teks dalam div.
                    Jika isFading=true -> opacity 0, blur, dan geser sedikit (translate-y).
                    Jika isFading=false -> normal kembali.
                */}
                <div className={`flex flex-col transition-all duration-300 ease-in-out transform
                    ${isFading ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
                    
                    <p className="text-sm font-medium italic text-neutral-800 dark:text-neutral-200 leading-snug">
                        "{lang === 'id' ? quote.id : quote.en}"
                    </p>
                    <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mt-1">
                        — {quote.author}
                    </span>
                </div>
            </div>

            {/* Bagian Kanan: Tombol (Vertical line separator + Buttons) */}
            <div className="flex items-center gap-2 border-l border-neutral-500 dark:border-white/70 pl-3">
                <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-neutral-500 dark:text-neutral-400"
                    title="Copy"
                >
                    {copied ? <FaCheck className="text-xs text-green-500" /> : <FaCopy className="text-xs" />}
                </button>

                <button 
                    onClick={randomizeQuote}
                    className={`p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-neutral-500 dark:text-neutral-400 ${isRotating ? 'animate-spin' : ''}`}
                    title="New Quote"
                >
                    <FaSyncAlt className="text-xs" />
                </button>
            </div>

        </div>
    );
};

export default QuoteWidget;