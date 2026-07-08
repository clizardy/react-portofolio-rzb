import React, { useState, useEffect } from 'react';
import { FaWifi, FaNetworkWired, FaGlobe, FaTimes, FaSignal } from 'react-icons/fa';

const NetworkWidget = () => {
  // Default false agar tampil sebagai Icon saja saat pertama buka
  const [isOpen, setIsOpen] = useState(false);
  
  const [networkInfo, setNetworkInfo] = useState({
    online: navigator.onLine,
    since: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ip: "Scanning...",
    rtt: "...",
    downlink: "...",
    type: "..."
  });

  useEffect(() => {
    // 1. Update Online/Offline
    const updateOnlineStatus = () => {
      setNetworkInfo(prev => ({
        ...prev,
        online: navigator.onLine,
        since: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 2. Fetch IP Public
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setNetworkInfo(prev => ({ ...prev, ip: data.ip }));
      } catch (error) {
        setNetworkInfo(prev => ({ ...prev, ip: "Hidden" }));
      }
    };
    fetchIP();

    // 3. Network API (Chrome/Edge)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    const updateConnectionInfo = () => {
      if (connection) {
        setNetworkInfo(prev => ({
          ...prev,
          rtt: connection.rtt ? `${connection.rtt}ms` : 'N/A',
          downlink: connection.downlink ? `${connection.downlink} Mbps` : 'N/A',
          type: connection.effectiveType ? connection.effectiveType.toUpperCase() : 'WIFI'
        }));
      }
    };

    if (connection) {
      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  // Logic Warna & Glow
  const isHighLatency = parseInt(networkInfo.rtt) > 200;
  const statusColor = networkInfo.online ? "text-emerald-400" : "text-red-500";
  const glowEffect = networkInfo.online 
    ? "shadow-[0_0_15px_rgba(16,185,129,0.4)] border-emerald-500/30" 
    : "shadow-[0_0_15px_rgba(239,68,68,0.4)] border-red-500/30";

  return (
    <div 
      // POSISI DI UBAH KE: TOP-24 (Bawah Navbar) LEFT-6 (Pojok Kiri)
      className={`fixed top-24 left-6 z-50 flex flex-col items-start transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isOpen ? 'w-72' : 'w-12'} 
      `}
    >
      {/* --- TOMBOL UTAMA / HEADER --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center backdrop-blur-md border transition-all duration-300 group
          ${isOpen ? 'w-full px-4 py-3 rounded-t-xl border-b-0' : 'w-12 h-12 rounded-full hover:scale-110'} 
          ${glowEffect}
        `}
      >
        {/* Ikon Wifi (Selalu Muncul) */}
        <div className="relative">
           <FaSignal className={`text-lg ${statusColor} transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-110'}`} />
           
           {/* Animasi Ping (Hanya saat mode Icon kecil & Online) */}
           {!isOpen && networkInfo.online && (
             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75"></span>
           )}
        </div>

        {/* Teks Header (Hanya muncul saat Open) */}
        <div className={`overflow-hidden transition-all duration-300 flex items-center justify-between w-full
             ${isOpen ? 'ml-3 w-auto opacity-100' : 'w-0 opacity-0'}
        `}>
           <span className="font-bold tracking-wider text-slate-200 text-sm whitespace-nowrap">NET_STATUS</span>
           <FaTimes className="text-slate-400 hover:text-white" size={12} />
        </div>
      </button>

      {/* --- KONTEN DETAIL (Hanya muncul saat Open) --- */}
      <div 
        className={`w-full overflow-hidden backdrop-blur-xl bg-neutral-900/90 border-x border-b rounded-b-xl shadow-2xl transition-all duration-500
          ${glowEffect} border-t-0
          ${isOpen ? 'max-h-64 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}
        `}
      >
        <div className="p-4 space-y-4">
            
            {/* IP Address */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                <FaGlobe /> IP Address
              </span>
              <span className="font-mono text-base font-bold text-white tracking-widest drop-shadow-md">
                {networkInfo.ip}
              </span>
            </div>

            {/* Grid Detail */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              
              {/* Speed */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase">
                  <FaWifi /> Speed
                </span>
                <span className="font-mono text-sm text-cyan-300">
                  {networkInfo.downlink}
                </span>
              </div>

              {/* Latency */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase">
                  <FaNetworkWired /> Ping
                </span>
                <span className={`font-mono text-sm ${isHighLatency ? "text-rose-400" : "text-emerald-400"}`}>
                  {networkInfo.rtt}
                </span>
              </div>
            </div>

             {/* Footer */}
             <div className="pt-1 text-[9px] text-right text-slate-600 font-mono">
                {networkInfo.type} • {networkInfo.since}
             </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkWidget;