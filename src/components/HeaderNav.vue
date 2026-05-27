<script setup>
defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="top-nav-container">
    <div class="top-nav flex items-center justify-between">
      <!-- Far Left: Mobile Hamburger & Logo -->
      <div class="left-section flex items-center gap-3">
        <button @click="$emit('toggle-sidebar')" class="hamburger-btn btn-icon text-2xl mr-1">
          <i class="ph ph-list"></i>
        </button>
        
        <!-- Logo integrated in header -->
        <div class="header-logo flex items-center gap-2">
          <div class="logo-icon flex items-center justify-center bg-accent-blue/10 w-8 h-8 rounded-lg border border-accent-blue/20">
            <i class="ph ph-fill ph-music-notes-simple text-accent text-lg"></i>
          </div>
          <span class="logo-text text-lg font-bold tracking-tight">kolektix</span>
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
      
      <!-- Far Right: User Actions -->
      <div class="right-section flex items-center gap-4">
        <button class="btn btn-outline text-sm upload-btn">
          <i class="ph ph-upload-simple"></i> Upload Music
        </button>
        <button class="btn-icon text-xl"><i class="ph ph-bell"></i></button>
        <button class="btn-icon text-xl"><i class="ph ph-envelope-simple"></i></button>
        <div class="avatar w-8 h-8 rounded-full overflow-hidden bg-gray-600">
          <img src="https://i.pravatar.cc/150?img=11" alt="User" class="w-full h-full object-cover"/>
        </div>
        <!-- Profile Icon Button on the absolute far right -->
        <button class="btn-icon text-xl profile-btn text-secondary hover:text-primary">
          <i class="ph ph-user"></i>
        </button>
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
  width: 380px;
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
    padding: 0 1.5rem;
  }
  .left-section {
    width: auto;
  }
  .right-section {
    display: none;
  }
  .hamburger-btn {
    display: flex;
  }
  .search-suggestions {
    display: none;
  }
  .search-browser-card {
    width: 230px;
    height: 38px;
    padding: 0 4px 0 8px;
  }
  .browser-icon-btn {
    font-size: 1rem;
    padding: 6px;
  }
  .card-divider {
    margin: 0 8px;
    height: 16px;
  }
  .search-card-icon {
    font-size: 0.95rem;
    margin-right: 6px;
  }
  .search-card-input {
    font-size: 0.8rem;
  }
  .center-section {
    justify-content: flex-end !important;
    padding-right: 0.5rem;
  }
}

@media (max-width: 380px) {
  .search-browser-card {
    width: 170px;
  }
}
</style>
