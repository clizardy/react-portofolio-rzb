import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiStrongWind,
  WiHumidity,
  WiThermometer
} from "react-icons/wi";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";

const LocationWidget = ({ lang = "id" }) => {
  const [weather, setWeather] = useState(null);

  const API_KEY = "YOUR_API_KEY_HERE";
  const CITY = "Magelang";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const langParam = lang === "id" ? "id" : "en";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=${langParam}&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data.cod === 200) setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [lang]);

  const getWeatherIcon = (main) => {
    const base = "text-3xl md:text-4xl drop-shadow-sm";

    switch (main) {
      case "Clear":
        return <WiDaySunny className={`${base} text-amber-500 dark:text-yellow-400`} />;
      case "Clouds":
        return <WiCloudy className={`${base} text-neutral-500`} />;
      case "Rain":
        return <WiRain className={`${base} text-blue-500`} />;
      case "Thunderstorm":
        return <WiThunderstorm className={`${base} text-purple-500`} />;
      case "Snow":
        return <WiSnow className={`${base} text-sky-300`} />;
      default:
        return <WiFog className={`${base} text-neutral-400`} />;
    }
  };

  if (!weather) {
    return (
      <div className="w-full lg:w-3/4 h-20 rounded-2xl animate-pulse
        bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md" />
    );
  }

  const Item = ({ icon, label, value }) => (
    <div className="flex items-center gap-2">
      <div className="text-sm md:text-lg opacity-80">{icon}</div>
      <div className="flex flex-col leading-none">
        <span className="text-[5px] md:text-[7px] uppercase mb-1 md:mb-0.5 tracking-wide text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
        <span className="text-[10px] md:text-[13px] font-semibold text-neutral-800 dark:text-neutral-200">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="
      group relative overflow-hidden
      flex items-center justify-between
      w-full lg:w-3/4
      h-16 md:h-20
      px-4 md:px-5
      rounded-3xl
      transition-all duration-300

      bg-white/60 dark:bg-white/5
      border border-white/5
      shadow-lg backdrop-blur-xl
    md:dark:hover:border-white/30 dark:hover:border-white/5
      hover:bg-white md:dark:hover:bg-white/10 dark:hover:bg-white/5
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 md:gap-4">
        {getWeatherIcon(weather.weather[0].main)}

        <div className="flex flex-col">
          {/* Location */}
          <div className="flex items-center gap-1 text-[10px] md:text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <FaMapMarkerAlt className="text-red-500 text-[10px]" />
            {CITY}
          </div>

          {/* Temp */}
          <div className="flex items-end gap-1">
            <span className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-none">
              {Math.round(weather.main.temp)}°
            </span>

            <span className="hidden md:inline text-xs capitalize text-neutral-500 dark:text-neutral-400 mb-1">
              {weather.weather[0].description}
            </span>
          </div>
        </div>
      </div>

    {/* DIVIDER */}
    <div className="mx-4 md:mx-6 h-10 md:h-14 w-px bg-gradient-to-b from-transparent via-black/40 to-transparent dark:via-white/40" />


      {/* RIGHT */}
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2">
        <Item
          icon={<WiThermometer className="text-orange-500" />}
          label={lang === "id" ? "Terasa" : "Feels"}
          value={`${Math.round(weather.main.feels_like)}°`}
        />

        <Item
          icon={<WiHumidity className="text-blue-400" />}
          label={lang === "id" ? "Lembap" : "Humidity"}
          value={`${weather.main.humidity}%`}
        />

        <Item
          icon={<WiStrongWind className="text-teal-400" />}
          label={lang === "id" ? "Angin" : "Wind"}
          value={`${weather.wind.speed} m/s`}
        />

        <Item
          icon={<FaEye className="text-purple-400 text-xs" />}
          label={lang === "id" ? "Vis" : "Visibility"}
          value={`${(weather.visibility / 1000).toFixed(0)} km`}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
      </div>
    </div>
  );
};

export default LocationWidget;
