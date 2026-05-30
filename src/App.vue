<script setup>
import { ref } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import SidebarLeft from './components/SidebarLeft.vue'
import MainContent from './components/MainContent.vue'
import DiscoverContent from './components/DiscoverContent.vue'
import SidebarRight from './components/SidebarRight.vue'
import PlayerBar from './components/PlayerBar.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import SearchContent from './components/SearchContent.vue'
import AlbumDetail from './components/AlbumDetail.vue'
import LyricsContent from './components/LyricsContent.vue'
import ProfileContent from './components/ProfileContent.vue'
import UploadContent from './components/UploadContent.vue'
import ChatContent from './components/ChatContent.vue'


const isSidebarOpen = ref(false) // Mobile layout drawer state
const isSidebarCollapsed = ref(false) // Desktop layout collapsed-to-icons state
const isRightSidebarCollapsed = ref(false) // Right sidebar collapsed state

const activeTab = ref('Home')
const previousTab = ref('Home')
const selectedAlbum = ref(null)

const isQueueOpen = ref(false)

const toggleSidebarMobile = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleSidebarDesktop = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const selectAlbum = (album) => {
  if (activeTab.value !== 'AlbumDetail') {
    previousTab.value = activeTab.value
  }
  
  const title = album.title || album.name || 'Lagipula Hidup Akan Berakhir'
  const artist = album.artist || album.artists || 'Hindia'
  const img = album.img || '/album_hindia.png'
  
  if (title.toLowerCase().includes('hindia') || title.toLowerCase().includes('lagipula')) {
    selectedAlbum.value = {
      title: 'Lagipula Hidup Akan Berakhir',
      artist: 'Hindia',
      img: '/album_hindia.png',
      genre: 'Indie',
      songs: '14 Songs',
      duration: '48 Min',
      year: '2023',
      releasedDate: '30 Nov 2023',
      streams: '1.2M Streams',
      likes: '98K Likes'
    }
  } else {
    selectedAlbum.value = {
      title: title,
      artist: artist,
      img: img,
      genre: album.genre || 'Indie/Pop',
      songs: album.songs || '12 Songs',
      duration: album.duration || '38 Min',
      year: album.year || '2024',
      releasedDate: album.releasedDate || '2024',
      streams: album.streams || '890K Streams',
      likes: album.likes || '45K Likes'
    }
  }
  activeTab.value = 'AlbumDetail'
}

const goBack = () => {
  activeTab.value = previousTab.value || 'Home'
}
</script>

<template>
  <div id="app" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'right-sidebar-open': isQueueOpen, 'on-upload-page': activeTab === 'Upload Music' }">
    <!-- Mobile overlay hosted globally -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false"></div>

    <!-- Global Header spanning top of screen -->
    <HeaderNav 
      @toggle-sidebar="toggleSidebarMobile"
      @change-tab="activeTab = $event"
    />
    
    <SidebarLeft 
      :isOpen="isSidebarOpen" 
      :isCollapsed="isSidebarCollapsed"
      :activeTab="activeTab"
      @close="isSidebarOpen = false" 
      @toggle-collapse="toggleSidebarDesktop"
      @change-tab="activeTab = $event"
    />
    <MainContent v-if="activeTab === 'Home'" @select-album="selectAlbum" />
    <DiscoverContent v-else-if="activeTab === 'Discover'" @select-album="selectAlbum" />
    <SearchContent v-else-if="activeTab === 'Search'" />
    <AlbumDetail v-else-if="activeTab === 'AlbumDetail'" :album="selectedAlbum" @back="goBack" />
    <LyricsContent v-else-if="activeTab === 'Lyrics'" />
    <ProfileContent v-else-if="activeTab === 'Profile'" @open-queue="isQueueOpen = true" />
    <UploadContent v-else-if="activeTab === 'Upload Music'" />
    <ChatContent v-else-if="activeTab === 'Messages'" />
    <SidebarRight 
      class="sidebar-right" 
      :isOpen="isQueueOpen"
      @close="isQueueOpen = false"
    />
    <PlayerBar 
      v-if="activeTab !== 'Upload Music' && activeTab !== 'Messages'"
      :isQueueActive="isQueueOpen"
      :activeTab="activeTab"
      @toggle-queue="isQueueOpen = !isQueueOpen"
      @change-tab="activeTab = $event"
    />
    <!-- Mobile Bottom Navigation Bar (only shows on mobile) -->
    <MobileNavbar 
      :activeTab="activeTab"
      :isSidebarOpen="isSidebarOpen"
      @change-tab="activeTab = $event"
    />
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
    z-index: 240; /* Sit above navbar (200) and player (150) but below sidebar (250) */
  }
}
</style>
