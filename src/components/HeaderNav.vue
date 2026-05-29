<script setup>
const emit = defineEmits(['toggle-sidebar', 'change-tab'])
</script>

<template>
  <header class="top-nav-container">
    <div class="top-nav flex items-center justify-between">
      <!-- Far Left: Mobile Hamburger & Kolektix Logo -->
      <div class="left-section flex items-center gap-3">
        <!-- Mobile: hamburger btn comes first -->
        <button @click="$emit('toggle-sidebar')" class="hamburger-btn btn-icon text-2xl mr-1">
          <i class="ph ph-list"></i>
        </button>
        
        <!-- Mobile: Kolektix logo shown next to hamburger -->
        <div class="header-logo flex items-center gap-2">
          <div class="logo-icon-wrap">
            <img src="/logo/logo2.png" alt="Kolektix Logo"/>
          </div>
        </div>
      </div>
      
      <!-- Center: Centered Search Bar & Browser Button Card -->
      <div class="center-section flex items-center justify-center flex-1">
        <div class="search-browser-card flex items-center">
          <!-- Browser Button on the left -->
          <button class="browser-icon-btn flex items-center justify-center" title="Browse Music">
            <i class="ph ph-globe"></i>
          </button>
          
          <!-- Subtle vertical divider inside the card -->
          <div class="card-divider"></div>
          
          <!-- Search input on the right -->
          <div class="search-section-inner flex items-center flex-1">
            <i class="ph ph-magnifying-glass search-card-icon"></i>
            <input 
              type="text" 
              placeholder="Search music, events, artists..." 
              class="search-card-input"
            />
          </div>
        </div>
      </div>
      
      <!-- Far Right: User Actions (Desktop) -->
      <div class="right-section flex items-center gap-4">
        <button @click="emit('change-tab', 'Upload Music')" class="btn btn-outline text-sm upload-btn">
          <i class="ph ph-upload-simple"></i> Upload Music
        </button>
        <button class="btn-icon text-xl"><i class="ph ph-bell"></i></button>
        <button class="btn-icon text-xl"><i class="ph ph-envelope-simple"></i></button>
        <div @click="emit('change-tab', 'Profile')" class="avatar w-8 h-8 rounded-full overflow-hidden bg-gray-600 cursor-pointer" title="View Profile">
          <img src="/aldi_ramadhan_avatar.png" alt="User" class="w-full h-full object-cover"/>
        </div>
      </div>

      <!-- Far Right: Mobile Profile Avatar only -->
      <div class="mobile-right-section flex items-center gap-2">
        <div @click="emit('change-tab', 'Profile')" class="avatar w-8 h-8 rounded-full overflow-hidden bg-gray-600 cursor-pointer" title="View Profile">
          <img src="/aldi_ramadhan_avatar.png" alt="User" class="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-nav-container {
  grid-column: 1 / -1;
  grid-row: 1;
  position: relative;
  z-index: 40;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--border-color);
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
}

.top-nav {
  height: 48px;
  width: 100%;
}

.left-section {
  width: 240px;
}

.bg-accent-blue\/10 {
  background-color: rgba(37, 99, 235, 0.1);
}

.border-accent-blue\/20 {
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.right-section {
  width: auto;
  min-width: 240px;
  justify-content: flex-end;
}

/* Unified search and browser card pill */
.search-browser-card {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  padding: 0 6px 0 12px;
  height: 42px;
  width: 500px;
  transition: all 0.3s ease;
}

.search-browser-card:focus-within {
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.15);
  background-color: rgba(255, 255, 255, 0.05);
}

.browser-icon-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  font-size: 1.15rem;
}

.browser-icon-btn:hover {
  color: #60A5FA;
  background-color: rgba(255, 255, 255, 0.05);
  transform: rotate(15deg) scale(1.1);
}

.card-divider {
  width: 1px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.12);
  margin: 0 12px;
}

.search-section-inner {
  display: flex;
  align-items: center;
}

.search-card-icon {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-right: 8px;
  transition: color 0.3s;
}

.search-browser-card:focus-within .search-card-icon {
  color: var(--text-primary);
}

.search-card-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.search-card-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.hamburger-btn {
  display: none;
}

.mobile-right-section {
  display: none;
}

.logo-icon-wrap {
  height: 35px; /* Enlarged from 50px */
  width: auto;
  display: flex;
  align-items: center;
}

.logo-icon-wrap img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

@media (max-width: 1200px) {
  .left-section {
    width: auto;
  }
}

@media (max-width: 992px) {
  .logo-text {
    display: none;
  }
}

@media (max-width: 768px) {
  .top-nav-container {
    padding: 0 1rem;
    height: 60px;
  }
  .top-nav {
    height: 44px;
  }
  .left-section {
    width: auto;
    flex-shrink: 0;
  }
  .logo-icon-wrap {
    height: 26px; /* Reduced from 42px for cleaner mobile header spacing */
  }
  /* Hide desktop right section on mobile */
  .right-section {
    display: none;
  }
  /* Show mobile right section (profile only) */
  .mobile-right-section {
    display: flex;
    flex-shrink: 0;
    margin-left: auto;
  }
  .hamburger-btn {
    display: flex;
  }
  .search-suggestions {
    display: none;
  }
  /* Hide search bar on mobile header */
  .center-section {
    display: none;
  }
  .logo-text {
    display: inline-block;
    font-size: 1rem;
  }
}

@media (max-width: 380px) {
  .search-browser-card {
    width: 170px;
  }
}

@media (min-width: 769px) {
  .right-section .btn-icon,
  .right-section .upload-btn,
  .browser-icon-btn,
  .search-card-icon,
  .search-card-input {
    color: #FFFFFF !important;
  }
  
  .right-section .upload-btn {
    border-color: rgba(255, 255, 255, 0.3) !important;
  }
}
</style>
