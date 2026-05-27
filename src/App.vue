<script setup>
import { ref } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import SidebarLeft from './components/SidebarLeft.vue'
import MainContent from './components/MainContent.vue'
import SidebarRight from './components/SidebarRight.vue'
import PlayerBar from './components/PlayerBar.vue'

const isSidebarOpen = ref(false) // Mobile layout drawer state
const isSidebarCollapsed = ref(false) // Desktop layout collapsed-to-icons state
const isRightSidebarCollapsed = ref(false) // Right sidebar collapsed state

const toggleSidebarMobile = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleSidebarDesktop = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleRightSidebarDesktop = () => {
  isRightSidebarCollapsed.value = !isRightSidebarCollapsed.value
}
</script>

<template>
  <div id="app" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'right-sidebar-collapsed': isRightSidebarCollapsed }">
    <!-- Mobile overlay hosted globally -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false"></div>

    <!-- Global Header spanning top of screen -->
    <HeaderNav 
      @toggle-sidebar="toggleSidebarMobile"
    />
    
    <SidebarLeft 
      :isOpen="isSidebarOpen" 
      :isCollapsed="isSidebarCollapsed"
      @close="isSidebarOpen = false" 
      @toggle-collapse="toggleSidebarDesktop"
    />
    <MainContent />
    <SidebarRight 
      class="sidebar-right" 
      :isCollapsed="isRightSidebarCollapsed"
      @toggle-collapse="toggleRightSidebarDesktop"
    />
    <PlayerBar />
  </div>
</template>

<style>
.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 99;
  }
}

/* Sidebar Right is hidden on smaller screens */
@media (max-width: 1200px) {
  .sidebar-right {
    display: none;
  }
}
</style>
