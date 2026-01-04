import { useState, useEffect } from "react";
import { 
    WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog, 
    WiStrongWind, WiHumidity, WiThermometer, WiBarometer 
} from "react-icons/wi";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
    
const LocationWidget = ({ lang }) => {
    const [weather, setWeather] = useState(null);
    const API_KEY = "d94106934e3c5032bc8d0a0095a9ae17";
    const CITY = "Magelang"; 

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const langParam = lang === 'id' ? 'id' : 'en';
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=${langParam}&appid=${API_KEY}`);
                const data = await res.json();
                if (data.cod === 200) {
                    setWeather(data);
                }
            } catch (error) {
                console.error("Gagal ambil cuaca", error);
            }
        };
        fetchWeather();
    }, [lang]);

    const getWeatherIcon = (main) => {
        // Mobile: text-3xl | PC: text-5xl
        const iconClass = "text-3xl md:text-5xl filter drop-shadow-sm"; 
        switch (main) {
            case "Clear": return <WiDaySunny className={`${iconClass} text-amber-500 dark:text-yellow-400`} />;
            case "Clouds": return <WiCloudy className={`${iconClass} text-neutral-500 dark:text-gray-400`} />;
            case "Rain": return <WiRain className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
            case "Thunderstorm": return <WiThunderstorm className={`${iconClass} text-purple-600 dark:text-purple-400`} />;
            case "Snow": return <WiSnow className={`${iconClass} text-sky-300 dark:text-white`} />;
            default: return <WiFog className={`${iconClass} text-neutral-400 dark:text-neutral-400`} />;
        }
    };

    if (!weather) {
        return (
            <div className="w-full lg:w-3/4 animate-pulse bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-4 rounded-2xl h-24"></div>
        );
    }

    return (
        // CONTAINER UTAMA
        // p-3 (sedikit lebih lega)
        <div className="flex flex-row items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl w-full lg:w-3/4 transition-all duration-300 cursor-default
            bg-white/40 border border-white/60 shadow-lg backdrop-blur-md hover:bg-white/60
            dark:bg-white/5 dark:border-white/10 dark:shadow-lg dark:hover:bg-white/10 group">
            
            {/* === BAGIAN KIRI: ICON & SUHU === */}
            {/* w-1/3 agar proporsional di mobile */}
            <div className="flex items-center gap-3 md:gap-4 w-auto md:min-w-fit">
                <div className="flex flex-col items-center">
                    {getWeatherIcon(weather.weather[0].main)}
                </div>
                
                <div className="flex flex-col justify-center">
                    {/* Lokasi */}
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-bold text-neutral-800 dark:text-white mb-0">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="md:hidden tracking-tight">MAGELANG</span> {/* Nama kota full di HP tapi kecil */}
                        <span className="hidden md:inline">{CITY}, ID</span>
                    </div>

                    {/* Suhu Utama */}
                    <div className="flex items-end gap-1 md:gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-none mt-0.5">
                            {Math.round(weather.main.temp)}°
                        </span>
                        <span className="hidden md:inline text-xs font-medium capitalize text-neutral-600 dark:text-neutral-400 mb-1">
                            {weather.weather[0].description}
                        </span>
                    </div>
                </div>
            </div>

            {/* GARIS PEMISAH (Sekarang muncul di Mobile juga, tapi tipis) */}
            <div className="block w-[1px] h-8 md:h-12 bg-neutral-400/30 dark:bg-white/10 mx-2"></div>

            {/* === BAGIAN KANAN: DASHBOARD GRID === */}
            {/* Grid dibuat gap-x-4 supaya kolom kiri & kanan tidak nempel */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 md:gap-x-8 md:gap-y-2 flex-1 justify-items-start">
                
                {/* 1. Real Feel */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[8px] md:text-[10px] uppercase font-medium tracking-wide">
                        <WiThermometer className="text-[10px] md:text-sm text-orange-500" />
                        {lang === 'id' ? 'Terasa' : 'Feels'}
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-neutral-800 dark:text-neutral-200 ml-0.5">
                        {Math.round(weather.main.feels_like)}°
                    </span>
                </div>

                {/* 2. Humidity */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[8px] md:text-[10px] uppercase font-medium tracking-wide">
                        <WiHumidity className="text-[10px] md:text-sm text-blue-400" />
                        <span className="md:hidden">%</span> {/* Hemat tempat di HP */}
                        <span className="hidden md:inline">{lang === 'id' ? 'Lembap' : 'Humid'}</span>
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-neutral-800 dark:text-neutral-200 ml-0.5">
                        {weather.main.humidity}%
                    </span>
                </div>

                {/* 3. Wind */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[8px] md:text-[10px] uppercase font-medium tracking-wide">
                        <WiStrongWind className="text-[10px] md:text-sm text-teal-400" />
                        {lang === 'id' ? 'Angin' : 'Wind'}
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-neutral-800 dark:text-neutral-200 ml-0.5">
                        {weather.wind.speed}<span className="text-[8px] md:text-[10px] opacity-70 ml-0.5">m/s</span>
                    </span>
                </div>

                {/* 4. Visibility */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[8px] md:text-[10px] uppercase font-medium tracking-wide">
                        <FaEye className="text-[8px] md:text-[10px] text-purple-400" />
                        {lang === 'id' ? 'Vis' : 'Vis'}
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-neutral-800 dark:text-neutral-200 ml-0.5">
                        { (weather.visibility / 1000).toFixed(0) }<span className="text-[8px] md:text-[10px] opacity-70 ml-0.5">km</span>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default LocationWidget;