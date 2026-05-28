<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  isOpen: Boolean,
  isCollapsed: Boolean,
  activeTab: {
    type: String,
    default: 'Home'
  }
})
const emit = defineEmits(['close', 'toggle-collapse', 'change-tab'])

const showMenuAccordion = ref(true)
const showLibraryAccordion = ref(true)
const isMobile = ref(false)

const toggleMenu = () => {
  showMenuAccordion.value = !showMenuAccordion.value
}

const toggleLibrary = () => {
  showLibraryAccordion.value = !showLibraryAccordion.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const handleToggle = () => {
  if (isMobile.value) {
    emit('close')
  } else {
    emit('toggle-collapse')
  }
}

const navItems = [
  { name: 'Home', icon: 'ph-house', active: true },
  { name: 'Discover', icon: 'ph-compass' },
  { name: 'Music', icon: 'ph-music-notes' },
  { name: 'Events', icon: 'ph-calendar-blank' },
  { name: 'Artists', icon: 'ph-users' },
  { name: 'Albums', icon: 'ph-record' },
  { name: 'Playlists', icon: 'ph-playlist' }
]

const libraryItems = [
  { name: 'Recently Played', icon: 'ph-clock-counter-clockwise' },
  { name: 'Favorites', icon: 'ph-heart' },
  { name: 'Your Library', icon: 'ph-folder-simple' },
  { name: 'Downloads', icon: 'ph-download-simple' }
]
</script>

<template>
  <aside :class="{ 'sidebar-left': true, 'sidebar-open': isOpen, 'collapsed': isCollapsed }" class="flex flex-col justify-between">
    <!-- Scrollable Center: Navigation and Library lists -->
    <div class="menu-scroll-container flex-1">
      <nav class="nav-menu">
        <h3 
          v-if="!isCollapsed" 
          @click="toggleMenu" 
          class="accordion-header text-xs text-secondary font-semibold uppercase tracking-wider mb-3 flex items-center justify-between cursor-pointer select-none"
        >
          <span>Menu</span>
          <i class="ph text-xs transition-transform duration-200" :class="showMenuAccordion ? 'ph-caret-down' : 'ph-caret-right'"></i>
        </h3>
        <transition name="slide-down">
          <ul v-show="showMenuAccordion || isCollapsed">
            <li v-for="item in navItems" :key="item.name" :class="{ active: item.name === activeTab }">
              <a href="#" @click.prevent="$emit('change-tab', item.name)" class="flex items-center gap-3" :title="isCollapsed ? item.name : ''">
                <i class="ph text-xl shrink-0" :class="item.icon"></i>
                <span class="menu-label">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </transition>
      </nav>

      <div class="library-menu mt-6">
        <h3 
          v-if="!isCollapsed" 
          @click="toggleLibrary" 
          class="accordion-header text-xs text-secondary font-semibold uppercase tracking-wider mb-3 flex items-center justify-between cursor-pointer select-none"
        >
          <span>Library</span>
          <i class="ph text-xs transition-transform duration-200" :class="showLibraryAccordion ? 'ph-caret-down' : 'ph-caret-right'"></i>
        </h3>
        <transition name="slide-down">
          <ul v-show="showLibraryAccordion || isCollapsed">
            <li v-for="item in libraryItems" :key="item.name">
              <a href="#" class="flex items-center gap-3" :title="isCollapsed ? item.name : ''">
                <i class="ph text-xl shrink-0" :class="item.icon"></i>
                <span class="menu-label">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </transition>
      </div>
    </div>

    <!-- Fixed Bottom: Non-bordered Divider Toggle Button -->
    <div class="bottom-section shrink-0">
      <!-- Bordered divider with clean text-link close button -->
      <div class="toggle-container">
        <button @click="handleToggle" class="toggle-sidebar-btn">
          <i class="ph text-lg" :class="isMobile ? 'ph-x' : (isCollapsed ? 'ph-caret-right' : 'ph-caret-left')"></i>
          <span class="toggle-text">{{ isMobile ? 'Close Menu' : (isCollapsed ? '' : 'Close Sidebar') }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-left {
  width: 260px;
  height: calc(100% - 1rem);
  margin: 0.25rem 0.25rem 0.75rem 1.5rem;
  border-radius: 5px;
  padding: 2rem 1.5rem;
  background-color: #1A1A1C; /* Solid Apple-Music style card background */
  border: 1px solid var(--border-color);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Collapsed State Styles */
.sidebar-left.collapsed {
  width: 60px;
  padding: 2rem 0.5rem;
}

/* Scrollable container for menus */
.menu-scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 1.5rem;
  padding-right: 4px;
}

/* Hide scrollbar when collapsed to avoid UI shifting, but allow scroll */
.sidebar-left.collapsed .menu-scroll-container {
  overflow-y: auto;
  padding-right: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.sidebar-left.collapsed .menu-scroll-container::-webkit-scrollbar {
  display: none;
}

.accordion-header {
  transition: color 0.2s;
}
.accordion-header:hover {
  color: var(--text-primary);
}

/* Navigation Lists */
.nav-menu ul, .library-menu ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-menu li a, .library-menu li a {
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.sidebar-left.collapsed .nav-menu li a,
.sidebar-left.collapsed .library-menu li a {
  justify-content: center;
  padding: 0;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  gap: 0 !important;
}

.nav-menu li a:hover, .library-menu li a:hover {
  color: var(--text-primary);
  background: var(--bg-panel-hover);
}

.nav-menu li.active a {
  background: rgba(255, 255, 255, 0.1);
  color: var(--accent-blue) !important;
}

.nav-menu li.active a i {
  color: var(--accent-blue) !important;
}

.library-menu {
  margin-top: 2rem;
}

/* Library header fade out */
.library-header {
  transition: opacity 0.2s ease, height 0.2s ease, margin 0.2s ease, visibility 0.2s;
  opacity: 1;
  height: auto;
}

.sidebar-left.collapsed .library-header {
  opacity: 0;
  height: 0;
  margin: 0 !important;
  visibility: hidden;
  pointer-events: none;
}

/* Menu label fade out and slide */
.menu-label {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.25s ease, transform 0.25s ease, visibility 0.25s;
  opacity: 1;
  transform: translateX(0);
  white-space: nowrap;
}

.sidebar-left.collapsed .menu-label {
  opacity: 0;
  transform: translateX(-10px);
  max-width: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Bordered Toggle Container & Non-Bordered Button */
.toggle-container {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  width: 100%;
}

.toggle-sidebar-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  padding: 0.5rem 0;
  gap: 0.5rem;
}

.toggle-sidebar-btn:hover {
  color: var(--text-primary);
}

.toggle-text {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  transition: opacity 0.2s ease, max-width 0.2s ease, visibility 0.2s;
  opacity: 1;
  white-space: nowrap;
}

.sidebar-left.collapsed .toggle-text {
  opacity: 0;
  max-width: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Slide down transition for sidebar accordions */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 350px;
  overflow: hidden;
  opacity: 1;
}

.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

@media (max-width: 768px) {
  .sidebar-left {
    position: fixed;
    top: 0; /* Full height from the top */
    left: -260px;
    width: 260px;
    height: 100%; /* Full height */
    margin: 0;
    border-radius: 0;
    z-index: 250; /* Drawer overlays everything */
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    background: rgba(18, 18, 18, 0.98);
    backdrop-filter: blur(24px);
    border-right: 1px solid var(--border-color);
  }
  .sidebar-left.sidebar-open {
    left: 0;
  }
  /* Reset collapse styles on mobile to ensure full drawer shows */
  .sidebar-left.collapsed {
    width: 260px;
    padding: 2rem 1.5rem;
  }
  .sidebar-left.collapsed .menu-label,
  .sidebar-left.collapsed .toggle-text {
    opacity: 1 !important;
    max-width: 150px !important;
    visibility: visible !important;
    pointer-events: auto !important;
    transform: none !important;
  }
  .sidebar-left.collapsed .nav-menu li a,
  .sidebar-left.collapsed .library-menu li a {
    justify-content: flex-start !important;
    padding: 0.75rem 1rem !important;
  }
  .sidebar-left.collapsed .library-header {
    opacity: 1 !important;
    height: auto !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
}
</style>
