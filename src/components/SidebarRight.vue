<script setup>
import { ref } from 'vue'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const nowPlaying = ref({
  title: 'To the Bone',
  artist: 'Pamungkas',
  img: '/pamungkas.jpg',
  duration: '3:45',
  plays: '34.2M'
})

const queueTracks = ref([
  { id: 1, title: 'Bila Nanti', artist: 'Nadin Amizah', img: '/nadin.jpg', duration: '4:00', plays: '1.2M' },
  { id: 2, title: 'Lagipula Hidup Akan Berakhir', artist: 'Hindia', img: '/album_hindia.png', duration: '4:48', plays: '950K' },
  { id: 3, title: 'Sialnya, Hidup Harus Tetap Berjalan', artist: 'Bernadya', img: '/album_bernadya2.png', duration: '3:39', plays: '2.4M' },
  { id: 4, title: 'the cure', artist: 'Olivia Rodrigo', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=120&h=120', duration: '3:15', plays: '5.1M' },
  { id: 5, title: 'SS26', artist: 'Charli xcx', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=120&h=120', duration: '2:54', plays: '830K' }
])

const playNow = (track) => {
  const oldActive = { ...nowPlaying.value }
  nowPlaying.value = { ...track }
  // Remove the clicked track from queue
  queueTracks.value = queueTracks.value.filter(t => t.id !== track.id)
  // Optionally push the old active song back to the top of queue
  queueTracks.value.unshift({
    id: Date.now(),
    title: oldActive.title,
    artist: oldActive.artist,
    img: oldActive.img,
    duration: oldActive.duration,
    plays: oldActive.plays || '1.0M'
  })
}

const removeFromQueue = (id) => {
  queueTracks.value = queueTracks.value.filter(track => track.id !== id)
}

const clearQueue = () => {
  queueTracks.value = []
}
</script>

<template>
  <aside :class="{ 'sidebar-right': true, 'open': isOpen }">
    <div class="sidebar-right-inner">
      <!-- Header with title and close/clear actions -->
      <div class="queue-header flex items-center justify-between pb-4 border-b border-white/5">
        <div class="flex items-center gap-3">
          <button @click="emit('close')" class="btn-icon close-queue-btn text-lg" title="Close Queue">
            <i class="ph ph-x"></i>
          </button>
          <h3 class="text-base font-bold text-white uppercase tracking-wider">Play Queue</h3>
        </div>
        <button 
          v-if="queueTracks.length > 0" 
          @click="clearQueue" 
          class="clear-queue-btn"
        >
          Clear Queue
        </button>
      </div>

      <!-- Scrollable content (Next Up only) -->
      <div class="queue-scroll-container flex-1 py-4 flex flex-col gap-6">
        
        <!-- Section: Next Up -->
        <div class="next-up-queue flex-1 flex flex-col">
          <h4 class="text-xs text-secondary font-bold uppercase tracking-wider mb-3">Next Up</h4>
          
          <transition-group name="list" tag="div" class="queue-list flex flex-col gap-3">
            <div 
              v-for="track in queueTracks" 
              :key="track.id" 
              class="queue-item flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <!-- Track Art & Play Button on Hover -->
              <div class="queue-track-art w-10 h-10 rounded-md overflow-hidden bg-gray-600 shrink-0 relative">
                <img :src="track.img" :alt="track.title" class="w-full h-full object-cover" />
                <!-- Hover Play Overlay -->
                <div 
                  @click="playNow(track)" 
                  class="hover-play-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Play Track Now"
                >
                  <i class="ph ph-fill ph-play text-white text-xs ml-0.5"></i>
                </div>
              </div>

              <!-- Track Info with Infinity Loop Marquee for Long Titles -->
              <div class="queue-track-info flex-1 min-w-0">
                <div class="marquee-wrapper">
                  <div class="marquee-content" :class="{ 'animate-marquee': track.title.length > 20 }">
                    <span class="track-title-text text-sm font-semibold text-white">{{ track.title }}</span>
                    <span v-if="track.title.length > 20" class="track-title-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="track.title.length > 20" class="track-title-text text-sm font-semibold text-white">{{ track.title }}</span>
                  </div>
                </div>
                <p class="text-xs text-secondary truncate mt-0.5">
                  <span>{{ track.artist }}</span>
                  <span class="plays-count">• {{ track.plays }} plays</span>
                </p>
              </div>

              <!-- Duration & Remove Button -->
              <div class="queue-actions flex items-center gap-2 shrink-0">
                <span class="text-xs text-secondary group-hover:hidden">{{ track.duration }}</span>
                <button 
                  @click="removeFromQueue(track.id)" 
                  class="btn-icon trash-btn hidden group-hover:flex text-red-500 hover:text-red-400"
                  title="Remove from Queue"
                >
                  <i class="ph ph-trash"></i>
                </button>
              </div>
            </div>
          </transition-group>

          <!-- Empty State -->
          <div v-if="queueTracks.length === 0" class="empty-queue flex-1 flex flex-col items-center justify-center p-6 text-center text-secondary">
            <i class="ph ph-playlist text-3xl mb-2 opacity-50"></i>
            <p class="text-xs leading-relaxed">Play Queue is empty. Add songs to start listening.</p>
          </div>
        </div>

      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Mobile / Overlay styles by default */
.sidebar-right {
  position: fixed;
  top: 80px;
  bottom: 90px;
  right: -280px;
  width: 280px;
  height: calc(100vh - 170px);
  background-color: #1A1A1C;
  border-left: 1px solid var(--border-color);
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4);
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

.sidebar-right.open {
  right: 0;
}

.sidebar-right-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Desktop styles (grid integration) */
@media (min-width: 769px) {
  .sidebar-right {
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    grid-column: 3;
    grid-row: 2;
    height: 100%;
    box-shadow: none;
    width: 0;
    padding-left: 0;
    padding-right: 0;
    opacity: 0;
    border-left: 0 solid transparent;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.2s ease,
                border-color 0.3s ease;
  }
  
  .sidebar-right.open {
    width: 320px;
    padding: 1.5rem 1.25rem;
    opacity: 1;
    border-left: 1px solid var(--border-color);
  }
  
  .sidebar-right-inner {
    width: 290px; /* Lock width on desktop to prevent wrapping during transitions */
    min-width: 290px;
  }
}

.queue-header {
  flex-shrink: 0;
}

.close-queue-btn {
  padding: 4px;
  color: var(--text-secondary);
}

.close-queue-btn:hover {
  color: #FFFFFF;
}

.clear-queue-btn {
  background-color: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.clear-queue-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #EF4444;
}

.clear-queue-btn:focus {
  outline: none;
}

.queue-scroll-container {
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

.queue-item {
  overflow: hidden;
  max-width: 100%;
}

/* Infinity Loop Marquee styles */
.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}

.track-title-text {
  display: inline-block;
}

.track-title-spacer {
  color: var(--text-secondary);
  opacity: 0.4;
  font-size: 0.75rem;
  display: inline-block;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.plays-count {
  margin-left: 0.35rem;
  opacity: 0.6;
  font-size: 10px;
}

.hover-play-overlay {
  transition: opacity 0.2s ease;
}

.trash-btn {
  padding: 4px;
}

/* List transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
