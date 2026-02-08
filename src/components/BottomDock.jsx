import toast from 'react-hot-toast';

const BottomDock = ({ onMenuClick, onShareClick }) => {

  // --- SCROLL HANDLER ---
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast.error(`Section ${id} not found!`);
    }
  };

  return (
    <div className="dock-container">
      <nav className="glass-dock">
        
        {/* 1. PROFILE (Ganti dari Home) */}
        <button 
          className="dock-item" 
          onClick={() => scrollToSection('about')} 
          aria-label="Go to Profile"
        >
          {/* Icon User/Profile */}
          <i className="ri-user-smile-line"></i>
          <span className="dock-label">Profile</span>
        </button>

        {/* 2. PROJECTS (Tetap) */}
        <button 
          className="dock-item" 
          onClick={() => scrollToSection('projects')}
          aria-label="View Projects"
        >
          <i className="ri-stack-line"></i>
          <span className="dock-label">Work</span>
        </button>

        {/* 3. MENU / SIDEBAR (CENTER - Ganti dari Telegram) */}
        <div className="dock-item main-action">
          <button 
            onClick={onMenuClick} // Trigger buka Sidebar
            className="action-btn"
            aria-label="Open Full Menu"
          >
            {/* Icon Menu Burger / Titik 3 */}
            <i className="ri-menu-4-line"></i>
          </button>
        </div>

        {/* 4. SERVICES (Ganti dari Email) */}
        <button 
          className="dock-item" 
          onClick={() => scrollToSection('services')}
          aria-label="Services"
        >
          <i className="ri-service-line"></i>
          <span className="dock-label">Service</span>
        </button>

        {/* 5. SHARE (New Feature) */}
        <button 
          className="dock-item" 
          onClick={onShareClick}
          aria-label="Share Site"
        >
          <i className="ri-share-forward-line"></i>
          <span className="dock-label">Share</span>
        </button>

      </nav>
    </div>
  );
};

export default BottomDock;