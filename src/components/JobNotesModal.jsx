import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// --- IMPORT LIBRARY CHART ---
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// --- IMPORT ICON ---
import { 
    FaTimes, FaFileInvoiceDollar, 
    FaFingerprint, FaClock, FaSave, FaSearch,
    FaHistory, FaPlusCircle, FaRocket, 
    FaMapMarkerAlt, FaCog, FaTrashAlt, FaEdit, FaThLarge,
    FaCrown, FaColumns, FaArrowRight, FaArrowLeft, 
    FaCheckDouble, FaSpinner, FaListUl, FaFileSignature, FaMedal, FaBoxOpen,
    FaChartPie, FaWallet, FaExclamationCircle, FaCheckCircle,
    FaLock, FaBackspace, FaUnlockAlt
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// --- IMPORT FIREBASE ---
import { db } from "../firebase"; 
import { 
    doc, setDoc, collection, onSnapshot, query, orderBy, deleteDoc 
} from "firebase/firestore";

// --- KONFIGURASI KEAMANAN ---
const CORRECT_PIN = "141704"; // <--- GANTI PIN RAHASIA DI SINI

const JobNotesModal = ({ isOpen, onClose }) => {
  // --- STATE SYSTEM ---
  const [isUnlocked, setIsUnlocked] = useState(false); // Status kunci
  const [activeTab, setActiveTab] = useState("new");
  const [time, setTime] = useState(new Date());
  const [projectId, setProjectId] = useState("");
  
  const defaultForm = {
    id: null,
    client: "",
    project: "",
    amount: "",
    status: "Unpaid",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    fileLink: "", 
    kanbanStatus: "todo"
  };

  const [trackerData, setTrackerData] = useState({
      client: "",
      project: "",
      step: "2",
      eta: "",
      msg: "Project is in progress."
  });

  const [formData, setFormData] = useState(defaultForm);
  const [dbJobs, setDbJobs] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");

  // --- SCROLL LOCKING ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      // Reset Lock saat modal ditutup agar aman kembali
      setTimeout(() => setIsUnlocked(false), 300); 
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // --- REALTIME SYNC (Hanya jalan jika sudah Unlocked) ---
  useEffect(() => {
    if (isOpen && isUnlocked) {
        const savedDraft = JSON.parse(localStorage.getItem("rzb_current_draft"));
        if(savedDraft) setFormData(savedDraft);

        const q = query(collection(db, "projects"), orderBy("id", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedJobs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDbJobs(fetchedJobs);
        }, (error) => {
            console.error("Error fetching projects:", error);
            toast.error("Gagal sync data project.");
        });

        return () => unsubscribe();
    }
    
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen, isUnlocked]);

  // Auto Save Draft
  useEffect(() => {
    if (activeTab === "new" && isUnlocked) {
        localStorage.setItem("rzb_current_draft", JSON.stringify(formData));
    }
  }, [formData, activeTab, isUnlocked]);

  // --- ANALYTICS DATA ---
  const analyticsData = useMemo(() => {
    const monthlyData = {};
    dbJobs.forEach(job => {
        const date = new Date(job.date);
        const month = date.toLocaleString('default', { month: 'short' }); 
        const amount = parseInt(job.amount) || 0;
        if (monthlyData[month]) {
            monthlyData[month] += amount;
        } else {
            monthlyData[month] = amount;
        }
    });
    
    const chartData = Object.keys(monthlyData).map(key => ({
        name: key,
        revenue: monthlyData[key]
    }));

    let paidCount = 0;
    let unpaidCount = 0;
    let pendingAmount = 0;
    
    dbJobs.forEach(job => {
        if(job.status === 'Paid') paidCount++;
        else {
            unpaidCount++;
            pendingAmount += parseInt(job.amount) || 0;
        }
    });

    const pieData = [
        { name: 'Paid', value: paidCount, color: '#10b981' }, 
        { name: 'Unpaid', value: unpaidCount, color: '#ef4444' } 
    ];

    return { chartData, pieData, pendingAmount };
  }, [dbJobs]);

  // --- HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleTrackerChange = (e) => setTrackerData({ ...trackerData, [e.target.name]: e.target.value });
  
  const handleClearForm = () => {
    setFormData(defaultForm);
    toast("Form Reset", { icon: '🧹', style: { background: '#333', color: '#fff'} });
  };

  const handleSaveToDB = async () => {
    if (!formData.client || !formData.project) {
        toast.error("Nama Klien & Project wajib diisi!");
        return;
    }
    const toastId = toast.loading("Menyimpan ke Cloud...");
    try {
        const jobId = formData.id || Date.now().toString(); 
        const newJob = { 
            ...formData, 
            id: jobId, 
            timestamp: new Date().toISOString(), 
            kanbanStatus: formData.kanbanStatus || "todo" 
        };
        await setDoc(doc(db, "projects", jobId.toString()), newJob);
        toast.success("Data Tersimpan Online!", { id: toastId, icon: '☁️' });
        setFormData(defaultForm); 
        setActiveTab("kanban");
    } catch (error) {
        console.error(error);
        toast.error("Gagal menyimpan data.", { id: toastId });
    }
  };

  const handleDeleteJob = async (id) => {
    if(confirm("Hapus data ini permanen dari Cloud?")) {
        const toastId = toast.loading("Menghapus...");
        try {
            await deleteDoc(doc(db, "projects", id.toString()));
            toast.success("Data Terhapus.", { id: toastId, icon: '🗑️' });
        } catch (error) {
            toast.error("Gagal menghapus.", { id: toastId });
        }
    }
  };

  const handleEditJob = (job) => {
    setFormData(job);
    setActiveTab("new");
    toast("Mode Edit Aktif", { icon: '✏️' });
  };

  const moveJob = async (job, direction) => {
      const statusOrder = ["todo", "inprogress", "done"];
      const currentIndex = statusOrder.indexOf(job.kanbanStatus || "todo");
      let newIndex = currentIndex;
      if (direction === "next" && currentIndex < 2) newIndex++;
      if (direction === "prev" && currentIndex > 0) newIndex--;

      if (newIndex !== currentIndex) {
          const newStatus = statusOrder[newIndex];
          try {
              await setDoc(doc(db, "projects", job.id.toString()), { 
                  ...job, 
                  kanbanStatus: newStatus 
              }, { merge: true });
              toast.success(`Moved to ${newStatus.toUpperCase()}`);
          } catch (error) {
              toast.error("Gagal memindahkan kartu.");
          }
      }
  };

  const generateLink = (path, params) => {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/${path}?${new URLSearchParams(params).toString()}`;
      window.open(url, '_blank');
  };

  const handleGenerateInvoice = (data = formData) => {
    if (!data.client || !data.amount) return toast.error("Data belum lengkap!");
    generateLink('invoice', { client: data.client, project: data.project, amount: data.amount, date: new Date(data.date).toLocaleDateString('id-ID'), status: data.status.toLowerCase() });
  };

  const handleGenerateQuotation = (data = formData) => {
    if (!data.client || !data.amount) return toast.error("Data belum lengkap!");
    generateLink('quotation', { client: data.client, project: data.project, amount: data.amount, date: new Date(data.date).toLocaleDateString('id-ID') });
  };

  const handleGenerateContract = (data = formData) => {
    if (!data.client || !data.amount) return toast.error("Data belum lengkap!");
    generateLink('contract', { client: data.client, project: data.project, amount: data.amount });
  };

  const handleGenerateReceipt = (data = formData) => {
    if (!data.client || !data.amount) return toast.error("Data belum lengkap!");
    generateLink('receipt', { client: data.client, project: data.project, amount: data.amount, date: new Date(data.date).toLocaleDateString('id-ID') });
  };

  const handleGenerateDelivery = (data = formData) => {
    if (!data.client || !data.project || !data.fileLink) {
        toast.error("Isi Client, Project, dan Link File dulu!");
        return;
    }
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/delivery?client=${encodeURIComponent(data.client)}&project=${encodeURIComponent(data.project)}&link=${encodeURIComponent(data.fileLink)}`;
    navigator.clipboard.writeText(url);
    toast.success("Link Delivery disalin!");
    window.open(url, '_blank');
  };

  const handleUpdateTracker = async () => {
      if(!trackerData.client || !trackerData.project || !projectId) return toast.error("Isi Project ID, Client, & Project!");
      const toastId = toast.loading("Updating Server...");
      try {
          await setDoc(doc(db, "trackers", projectId), {
              client: trackerData.client, project: trackerData.project, step: parseInt(trackerData.step),
              eta: trackerData.eta, msg: trackerData.msg, lastUpdated: new Date().toLocaleString()
          });
          const fullUrl = `${window.location.origin}/tracker?id=${projectId}`;
          toast.success("Database Updated!", { id: toastId });
          window.open(fullUrl, '_blank');
      } catch (error) {
          toast.error("Gagal update server.", { id: toastId });
      }
  };

  const totalRevenue = dbJobs.reduce((acc, job) => acc + (parseInt(job.amount) || 0), 0);

  // --- RENDER ---
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-end md:items-center justify-center font-sans sm:p-4">
            
            {/* BACKDROP BLUR */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"/>
            
            {/* CONTAINER */}
            <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                className="relative w-full md:max-w-6xl h-[92dvh] md:h-[85vh] bg-[#09090b] border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ring-1 ring-white/5"
            >
                
                {/* --- 🔒 LOCK SCREEN OVERLAY --- */}
                {!isUnlocked ? (
                    <PinLockScreen onUnlock={() => setIsUnlocked(true)} onClose={onClose} />
                ) : (
                    // --- 🔓 MAIN DASHBOARD CONTENT (Jika sudah unlock) ---
                    <>
                        {/* SIDEBAR */}
                        <div className="hidden md:flex w-64 bg-[#0e0e10] border-r border-white/5 flex-col justify-between z-20">
                            <div>
                                <div className="p-6 border-b border-white/5 bg-gradient-to-r from-teal-900/20 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white shadow-lg"><FaFingerprint /></div>
                                        <div><h3 className="font-bold text-white text-sm">COMMAND</h3><p className="text-[10px] text-neutral-500 font-mono">v.6.1.0 (Cloud)</p></div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <NavButton active={activeTab === "new"} onClick={() => setActiveTab("new")} icon={<FaPlusCircle />} label="New Entry" />
                                    <NavButton active={activeTab === "stats"} onClick={() => setActiveTab("stats")} icon={<FaChartPie />} label="Analytics" />
                                    <NavButton active={activeTab === "kanban"} onClick={() => setActiveTab("kanban")} icon={<FaColumns />} label="Kanban Board" />
                                    <NavButton active={activeTab === "tracker"} onClick={() => setActiveTab("tracker")} icon={<FaMapMarkerAlt />} label="Tracker System" />
                                    <NavButton active={activeTab === "history"} onClick={() => setActiveTab("history")} icon={<FaHistory />} label="History Log" badge={dbJobs.length} />
                                    <NavButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<FaCog />} label="Settings" />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="p-4 rounded-lg space-y-2">
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-2"><FaClock className="text-accent" /> System Time</p>
                                    <p className="font-serif text-xl text-white tracking-widest leading-none">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT AREA */}
                        <div className="flex-1 flex flex-col bg-[#09090b] relative h-full">
                            {/* HEADER MOBILE & DESKTOP */}
                            <div className="h-14 md:h-16 flex-shrink-0 border-b border-white/5 flex justify-between items-center px-4 md:px-6 bg-[#0e0e10]/80 backdrop-blur-sm z-30">
                                <div className="flex items-center gap-2">
                                    <div className="md:hidden w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white text-xs shadow-lg"><FaFingerprint /></div>
                                    <h2 className="text-white font-bold tracking-wide text-xs md:text-sm uppercase">
                                        {activeTab === "new" ? "New Entry" : activeTab === "stats" ? "Business Intelligence" : activeTab === "kanban" ? "Work Board" : "System"}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setIsUnlocked(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-500" title="Lock"><FaLock /></button>
                                    <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-neutral-500"><FaTimes className="text-lg" /></button>
                                </div>
                            </div>

                            {/* SCROLLABLE AREA */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain pb-20 md:pb-0" onTouchStart={(e) => e.stopPropagation()}>
                                
                                {/* TAB: NEW ENTRY */}
                                {activeTab === "new" && (
                                    <div className="p-4 md:p-8 space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputGroup label="Client Identity" icon="ID"><input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Nama Klien..." className="input-field" /></InputGroup>
                                            <InputGroup label="Project Title" icon="PRJ"><input type="text" name="project" value={formData.project} onChange={handleChange} placeholder="Judul Proyek..." className="input-field" /></InputGroup>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <InputGroup label="Value (IDR)" icon="RP"><input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0" className="input-field text-cyan-400 font-mono font-bold" /></InputGroup>
                                            <InputGroup label="Date" icon="DT"><input type="date" name="date" value={formData.date} onChange={handleChange} className="input-field [color-scheme:dark]" /></InputGroup>
                                            <InputGroup label="Status" icon="ST"><select name="status" value={formData.status} onChange={handleChange} className="input-field"><option value="Unpaid">Unpaid</option><option value="Paid">Paid</option></select></InputGroup>
                                        </div>
                                        <InputGroup label="Technical Brief / Notes" icon="TXT"><textarea name="notes" value={formData.notes} onChange={handleChange} rows="6" placeholder="Catatan pekerjaan..." className="input-field resize-none font-mono text-sm leading-relaxed"></textarea></InputGroup>
                                        <InputGroup label="File / GDrive Link" icon="🔗"><input type="text" name="fileLink" value={formData.fileLink} onChange={handleChange} placeholder="https://drive.google.com/..." className="input-field text-purple-400" /></InputGroup>

                                        {/* ACTION BUTTONS */}
                                        <div className="hidden md:flex gap-3 pt-4 border-t border-white/5 flex-wrap">
                                            <button onClick={handleSaveToDB} className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-cyan-50 flex items-center justify-center gap-2 min-w-[120px]"><FaSave className="text-teal-600"/> Save (Cloud)</button>
                                            <ActionButton onClick={() => handleGenerateQuotation(formData)} icon={<FaCrown />} label="Quote" color="amber" />
                                            <ActionButton onClick={() => handleGenerateContract(formData)} icon={<FaFileSignature />} label="SPK" color="indigo" />
                                            <ActionButton onClick={() => handleGenerateInvoice(formData)} icon={<FaFileInvoiceDollar />} label="Invoice" color="cyan" />
                                            <ActionButton onClick={() => handleGenerateReceipt(formData)} icon={<FaMedal />} label="Receipt" color="emerald" />
                                            <ActionButton onClick={() => handleGenerateDelivery(formData)} icon={<FaBoxOpen />} label="Deliver" color="purple" />
                                            <button onClick={handleClearForm} className="btn-danger ml-auto"><FaTrashAlt /></button>
                                        </div>
                                        
                                        <div className="md:hidden grid grid-cols-3 gap-2 pt-2">
                                            <button onClick={handleSaveToDB} className="col-span-3 bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg mb-2"><FaSave className="text-teal-600"/> Simpan Cloud</button>
                                            <MobileAction onClick={() => handleGenerateQuotation(formData)} icon={<FaCrown />} label="Quote" color="text-amber-500" />
                                            <MobileAction onClick={() => handleGenerateContract(formData)} icon={<FaFileSignature />} label="SPK" color="text-indigo-400" />
                                            <MobileAction onClick={() => handleGenerateInvoice(formData)} icon={<FaFileInvoiceDollar />} label="Invoice" color="text-white" />
                                            <MobileAction onClick={() => handleGenerateReceipt(formData)} icon={<FaMedal />} label="Receipt" color="text-emerald-400" />
                                            <MobileAction onClick={() => handleGenerateDelivery(formData)} icon={<FaBoxOpen />} label="Deliver" color="text-purple-400" />
                                            <MobileAction onClick={handleClearForm} icon={<FaTrashAlt />} label="Clear" color="text-red-500" />
                                        </div>
                                    </div>
                                )}

                                {/* --- TAB: ANALYTICS --- */}
                                {activeTab === "stats" && (
                                    <div className="p-4 md:p-8 space-y-6">
                                        {/* KPI CARDS */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl">
                                                <div className="flex items-center gap-3 mb-2 text-emerald-400"><FaWallet className="text-xl"/> <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">Total Revenue</span></div>
                                                <p className="text-2xl font-bold text-white">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                                            </div>
                                            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl">
                                                <div className="flex items-center gap-3 mb-2 text-cyan-400"><FaCheckCircle className="text-xl"/> <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">Completed Projects</span></div>
                                                <p className="text-2xl font-bold text-white">{dbJobs.length}</p>
                                            </div>
                                            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl">
                                                <div className="flex items-center gap-3 mb-2 text-red-400"><FaExclamationCircle className="text-xl"/> <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">Pending Payment</span></div>
                                                <p className="text-2xl font-bold text-white">Rp {analyticsData.pendingAmount.toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>

                                        {/* CHARTS GRID */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl h-80">
                                                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FaChartPie className="text-teal-500"/> Revenue Trend</h4>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={analyticsData.chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                        <XAxis dataKey="name" stroke="#666" tick={{fontSize: 10}} />
                                                        <YAxis stroke="#666" tick={{fontSize: 10}} tickFormatter={(val) => `${val/1000}k`} />
                                                        <RechartsTooltip contentStyle={{backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff'}} itemStyle={{color: '#4ade80'}} formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                                                        <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl h-80">
                                                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FaChartPie className="text-purple-500"/> Project Status</h4>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie 
                                                            data={analyticsData.pieData} 
                                                            cx="50%" cy="50%" 
                                                            innerRadius={60} outerRadius={80} 
                                                            paddingAngle={5} 
                                                            dataKey="value"
                                                        >
                                                            {analyticsData.pieData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Pie>
                                                        <RechartsTooltip contentStyle={{backgroundColor: '#1a1a1c', border: '1px solid #333'}} />
                                                        <Legend verticalAlign="bottom" height={36}/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: KANBAN */}
                                {activeTab === "kanban" && (
                                    <div className="p-4 md:p-6 h-full flex flex-col md:flex-row gap-6 overflow-x-auto">
                                        <KanbanColumn title="To Do" icon={<FaListUl />} color="border-neutral-700 bg-neutral-900/50" jobs={dbJobs.filter(j => !j.kanbanStatus || j.kanbanStatus === 'todo')} onMove={moveJob} status="todo"/>
                                        <KanbanColumn title="In Progress" icon={<FaSpinner className="animate-spin-slow"/>} color="border-cyan-500/30 bg-cyan-900/10" titleColor="text-cyan-400" jobs={dbJobs.filter(j => j.kanbanStatus === 'inprogress')} onMove={moveJob} status="inprogress"/>
                                        <KanbanColumn title="Done" icon={<FaCheckDouble />} color="border-emerald-500/30 bg-emerald-900/10" titleColor="text-emerald-400" jobs={dbJobs.filter(j => j.kanbanStatus === 'done')} onMove={moveJob} status="done"/>
                                    </div>
                                )}

                                {/* TAB: TRACKER */}
                                {activeTab === "tracker" && (
                                    <div className="p-4 md:p-8 space-y-6">
                                        <div className="p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl mb-4"><h3 className="text-teal-400 font-bold text-sm mb-1 flex items-center gap-2"><FaRocket/> Realtime Project Tracker</h3><p className="text-xs text-teal-600/70">Update status proyek secara langsung tanpa kirim link ulang.</p></div>
                                        <div className="p-4 bg-[#121214] border border-white/10 rounded-xl mb-4"><InputGroup label="Unique Project ID (Link Key)" icon="🔑"><input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value.toUpperCase().replace(/\s/g, '-'))} placeholder="e.g. WEB-TOKO-01" className="input-field font-bold text-teal-400 tracking-wider"/></InputGroup></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><InputGroup label="Client Name" icon="👤"><input type="text" name="client" value={trackerData.client} onChange={handleTrackerChange} className="input-field" placeholder="Nama Klien..."/></InputGroup><InputGroup label="Project Name" icon="📂"><input type="text" name="project" value={trackerData.project} onChange={handleTrackerChange} className="input-field" placeholder="Nama Proyek..."/></InputGroup></div>
                                        <InputGroup label="Progress Step (1-5)" icon="📈"><div className="grid grid-cols-5 gap-2">{[1,2,3,4,5].map(num => (<button key={num} onClick={() => setTrackerData({...trackerData, step: num})} className={`py-2 rounded-lg border text-sm font-bold transition-all ${parseInt(trackerData.step) === num ? 'bg-teal-600 border-teal-500 text-white' : 'bg-[#121214] border-white/10 text-neutral-500 hover:border-white/30'}`}>{num}</button>))}</div></InputGroup>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><InputGroup label="ETA" icon="⏳"><input type="text" name="eta" value={trackerData.eta} onChange={handleTrackerChange} className="input-field" /></InputGroup><InputGroup label="Message" icon="💬"><input type="text" name="msg" value={trackerData.msg} onChange={handleTrackerChange} className="input-field" /></InputGroup></div>
                                        <button onClick={handleUpdateTracker} className="w-full py-4 mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2"><FaSave /> UPDATE STATUS</button>
                                    </div>
                                )}

                                {/* TAB: HISTORY */}
                                {activeTab === "history" && (
                                    <div className="flex flex-col min-h-full">
                                        <div className="p-4 md:p-6 border-b border-white/5 bg-[#0e0e10]/80 sticky top-0 z-10 backdrop-blur-md">
                                            <div className="relative mb-3"><FaSearch className="absolute left-3 top-3 text-neutral-500" /><input type="text" placeholder="Cari project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#121214] pl-10 pr-4 py-2.5 rounded-lg border border-white/10 text-white text-sm focus:border-teal-500 outline-none" /></div>
                                            <div className="flex items-center justify-between text-xs font-mono border border-white/5 rounded-lg px-3 py-2 bg-[#121214]"><span className="text-neutral-400">REVENUE</span><span className="text-emerald-400 font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</span></div>
                                        </div>
                                        <div className="p-4 space-y-3 pb-24">
                                            {dbJobs.filter(j => j.client.toLowerCase().includes(searchTerm.toLowerCase())).map((job) => (
                                                <div key={job.id} className="bg-[#121214] border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                                                    <div className="flex justify-between items-start"><div className="flex gap-3"><div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${job.status === 'Paid' ? 'bg-teal-900/20 text-teal-400' : 'bg-red-900/20 text-red-400'}`}>{job.client.charAt(0)}</div><div><h4 className="text-white font-bold text-sm line-clamp-1">{job.client}</h4><p className="text-neutral-500 text-xs line-clamp-1">{job.project}</p></div></div><div className="text-right"><p className="text-cyan-400 font-mono font-bold text-sm">Rp {parseInt(job.amount).toLocaleString('id-ID')}</p></div></div>
                                                    <div className="flex gap-2 border-t border-white/5 pt-3 mt-1">
                                                        <button onClick={() => handleGenerateInvoice(job)} className="flex-1 py-2 bg-white/5 rounded text-xs text-white hover:bg-white/10">Invoice</button>
                                                        <button onClick={() => handleEditJob(job)} className="flex-1 py-2 bg-white/5 rounded text-xs text-white hover:bg-white/10">Edit</button>
                                                        <button onClick={() => handleDeleteJob(job.id)} className="w-10 flex items-center justify-center bg-red-500/10 rounded text-red-500"><FaTrashAlt/></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "settings" && <div className="flex items-center justify-center h-full text-neutral-600 flex-col gap-4 p-10"><FaCog className="text-5xl opacity-20 animate-spin-slow" /><p className="text-xs">Config Locked by Admin</p></div>}
                            </div>

                            <div className="md:hidden flex h-16 bg-[#0e0e10] border-t border-white/10 absolute bottom-0 left-0 right-0 z-40">
                                <MobileTab active={activeTab === "new"} onClick={() => setActiveTab("new")} icon={<FaThLarge />} label="New" />
                                <MobileTab active={activeTab === "kanban"} onClick={() => setActiveTab("kanban")} icon={<FaColumns />} label="Kanban" />
                                <MobileTab active={activeTab === "tracker"} onClick={() => setActiveTab("tracker")} icon={<FaMapMarkerAlt />} label="Tracker" />
                                <MobileTab active={activeTab === "stats"} onClick={() => setActiveTab("stats")} icon={<FaChartPie />} label="Stats" />
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- COMPONENT: SECURE PIN LOCK ---
const PinLockScreen = ({ onUnlock, onClose }) => {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (pin.length === 6) {
            if (pin === CORRECT_PIN) {
                // Success animation delay
                setTimeout(() => onUnlock(), 200);
            } else {
                setError(true);
                setTimeout(() => {
                    setPin("");
                    setError(false);
                }, 500);
            }
        }
    }, [pin, onUnlock]);

    const handlePress = (num) => {
        if (pin.length < 6) setPin(prev => prev + num);
    };

    const handleDelete = () => setPin(prev => prev.slice(0, -1));

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#050505] relative">
             {/* 👇 PERBAIKAN DI SINI: Tambahkan z-50 dan cursor-pointer */}
             <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50 cursor-pointer"
             >
                <FaTimes size={20}/>
             </button>

            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm flex flex-col items-center"
            >
                {/* ICON LOCK */}
                <div className="mb-8 relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center shadow-2xl shadow-teal-500/10">
                        <FaLock className="text-3xl text-teal-500" />
                    </div>
                    {pin.length === 6 && pin === CORRECT_PIN && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 bg-teal-500 rounded-2xl flex items-center justify-center">
                             <FaUnlockAlt className="text-3xl text-white" />
                        </motion.div>
                    )}
                </div>

                <h2 className="text-white font-bold font-sans md:text-2xl text-xl mb-2 tracking-wider">RONALD'S ACCESS</h2>
                <p className="text-white/70 text-xs mb-8">Enter your 6-digit security PIN</p>

                {/* DOTS INDICATOR */}
                <motion.div 
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    className="flex gap-4 mb-10"
                >
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`md:w-4 md:h-4 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                i < pin.length 
                                    ? "bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] scale-110" 
                                    : "bg-white/30"
                            }`} 
                        />
                    ))}
                </motion.div>

                {/* NUMPAD */}
                <div className="grid grid-cols-3 gap-4 w-full px-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePress(num.toString())}
                            className="md:h-24 h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-teal-500/20 active:border-teal-500 border border-transparent transition-all text-white md:text-4xl text-2xl font-mono font-bold"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="md:h-24 h-16 flex items-center justify-center">
                       {/* Empty Placeholder */}
                    </div>
                    <button
                        onClick={() => handlePress("0")}
                        className="md:h-24 h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-teal-500/20 active:border-teal-500 border border-transparent transition-all text-white md:text-4xl text-2xl font-mono font-bold"
                    >
                        0
                    </button>
                    <button
                        onClick={handleDelete}
                        className="md:h-24 h-16 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500/40 transition-all"
                    >
                        <FaBackspace size={24} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// --- SUB COMPONENTS ---
const KanbanColumn = ({ title, icon, color, titleColor = "text-white", jobs, onMove, status }) => (
    <div className={`flex-1 min-w-[280px] bg-[#121214]/50 rounded-xl border ${color} p-4 flex flex-col h-full`}>
        <div className={`flex items-center gap-2 mb-4 pb-3 border-b border-white/5 ${titleColor} font-bold text-sm uppercase tracking-wider`}>
            {icon} {title} <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full text-white">{jobs.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
            {jobs.map(job => (
                <motion.div layout key={job.id} initial={{opacity:0}} animate={{opacity:1}} className="bg-[#1a1a1c] border border-white/5 p-3 rounded-lg shadow-sm hover:border-white/20 transition-colors group">
                    <div className="flex justify-between items-start mb-2"><h4 className="font-bold text-white text-sm truncate w-32">{job.client}</h4><span className="text-[10px] bg-white/5 text-neutral-400 px-1.5 py-0.5 rounded font-mono">{new Date(job.date).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}</span></div>
                    <p className="text-xs text-neutral-500 mb-3 truncate">{job.project}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <p className="text-xs font-mono font-bold text-accent">Rp {parseInt(job.amount).toLocaleString('id-ID')}</p>
                        <div className="flex gap-1">
                            {status !== 'todo' && <button onClick={() => onMove(job, 'prev')} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"><FaArrowLeft className="text-xs" /></button>}
                            {status !== 'done' && <button onClick={() => onMove(job, 'next')} className="p-1.5 rounded bg-teal-500/20 hover:bg-teal-500 text-teal-500 hover:text-white"><FaArrowRight className="text-xs" /></button>}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const ActionButton = ({ onClick, icon, label, color }) => (
    <button onClick={onClick} className={`px-4 py-3 bg-[#1a1a1c] text-${color}-400 border border-${color}-500/20 rounded-lg hover:bg-${color}-500/10 transition-colors font-bold text-xs uppercase tracking-wider flex items-center gap-2`}>
        {icon} {label}
    </button>
);

const MobileAction = ({ onClick, icon, label, color }) => (
    <button onClick={onClick} className={`bg-[#1a1a1c] border border-white/10 ${color} py-3 rounded-lg flex flex-col items-center justify-center gap-1 text-[10px] font-bold`}>
        <span className="text-lg">{icon}</span> {label}
    </button>
);

const inputStyle = "w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all placeholder:text-neutral-700 text-sm";
const InputGroup = ({ label, icon, children }) => (<div className="space-y-1.5"><label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 flex items-center gap-2"><span className="bg-white/5 px-1.5 py-0.5 rounded text-teal-500">{icon}</span> {label}</label>{React.cloneElement(children, { className: inputStyle })}</div>);
const NavButton = ({ active, onClick, icon, label, badge }) => (<button onClick={onClick} className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all ${active ? "bg-teal-600 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}><div className="flex items-center gap-3"><span className="text-lg">{icon}</span><span className="font-medium">{label}</span></div>{badge > 0 && <span className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}</button>);
const MobileTab = ({ active, onClick, icon, label }) => (<button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1 ${active ? "text-teal-400" : "text-neutral-600"}`}><span className="text-xl">{icon}</span><span className="text-[10px] font-bold">{label}</span></button>);

export default JobNotesModal;