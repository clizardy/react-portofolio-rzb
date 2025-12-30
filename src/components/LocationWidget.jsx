import { useState, useEffect } from "react";
import { 
    WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog, 
    WiStrongWind, WiHumidity, WiThermometer, WiBarometer 
} from "react-icons/wi";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
    
const LocationWidget = ({ lang }) => {
    const [weather, setWeather] = useState(null);
    // API KEY
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
        const iconClass = "text-5xl filter drop-shadow-sm"; 
        switch (main) {
            case "Clear": return <WiDaySunny className={`${iconClass} text-amber-500 dark:text-yellow-400`} />;
            case "Clouds": return <WiCloudy className={`${iconClass} text-neutral-500 dark:text-gray-400`} />;
            case "Rain": return <WiRain className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
            case "Thunderstorm": return <WiThunderstorm className={`${iconClass} text-purple-600 dark:text-purple-400`} />;
            case "Snow": return <WiSnow className={`${iconClass} text-sky-300 dark:text-white`} />;
            default: return <WiFog className={`${iconClass} text-neutral-400 dark:text-neutral-400`} />;
        }
    };

    // --- SKELETON LOADING (Compact) ---
    if (!weather) {
        return (
            <div className="w-full lg:w-3/4 animate-pulse bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-4 rounded-2xl h-24"></div>
        );
    }

    return (
        // PERUBAHAN DISINI:
        // 1. lg:w-3/4 -> Membuat lebarnya jadi 75% di layar besar (Laptop/PC)
        // 2. p-4 -> Padding sedikit dikecilkan biar compact
        // 3. gap-4 -> Jarak antar elemen dirapatkan
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl w-full lg:w-3/4 transition-all duration-300 cursor-default
            bg-white/40 border border-white/60 shadow-lg backdrop-blur-md hover:bg-white/60
            dark:bg-white/5 dark:border-white/10 dark:shadow-lg dark:hover:bg-white/10 group">
            
            {/* === BAGIAN KIRI: UTAMA === */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                <div className="flex flex-col items-center">
                    {getWeatherIcon(weather.weather[0].main)}
                </div>
                
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-white mb-0.5">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{CITY}, ID</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-white leading-none">
                            {Math.round(weather.main.temp)}°
                        </span>
                        <span className="text-xs font-medium capitalize text-neutral-600 dark:text-neutral-400 mb-1">
                            {weather.weather[0].description}
                        </span>
                    </div>
                </div>
            </div>

            {/* Garis Pemisah */}
            <div className="hidden md:block w-[1px] h-12 bg-neutral-300 dark:bg-white/10 mx-2"></div>

            {/* === BAGIAN KANAN: DASHBOARD GRID (Compact) === */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 w-full md:w-auto">
                
                {/* 1. Real Feel */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[10px] uppercase font-thin tracking-wider">
                        <WiThermometer className="text-sm text-orange-500" />
                        {lang === 'id' ? 'Terasa' : 'Feels'}
                    </div>
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 pl-1">
                        {Math.round(weather.main.feels_like)}°
                    </span>
                </div>

                {/* 2. Humidity */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[10px] uppercase font-thin tracking-wider">
                        <WiHumidity className="text-sm text-blue-400" />
                        {lang === 'id' ? 'Lembap' : 'Humid'}
                    </div>
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 pl-1">
                        {weather.main.humidity}%
                    </span>
                </div>

                {/* 3. Wind */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[10px] uppercase font-thin tracking-wider">
                        <WiStrongWind className="text-sm text-teal-400" />
                        {lang === 'id' ? 'Angin' : 'Wind'}
                    </div>
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 pl-1">
                        {weather.wind.speed}<span className="text-[10px]">m/s</span>
                    </span>
                </div>

                {/* 4. Visibility */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[10px] uppercase font-thin tracking-wider">
                        <FaEye className="text-[10px] text-purple-400 ml-0.5 mr-1" />
                        {lang === 'id' ? 'Jarak' : 'Visib'}
                    </div>
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 pl-1">
                        { (weather.visibility / 1000).toFixed(0) } <span className="text-[10px]">km</span>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default LocationWidget;