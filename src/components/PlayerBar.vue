<script setup>
import { ref, computed } from 'vue'
import { playerState } from '../playerState.js'

const props = defineProps({
  isQueueActive: Boolean,
  activeTab: String
})
const emit = defineEmits(['toggle-queue', 'change-tab'])

const handleSongDetailsClick = () => {
  if (window.innerWidth <= 768) {
    emit('change-tab', props.activeTab === 'Lyrics' ? 'Home' : 'Lyrics')
  }
}

const isMuted = ref(false)
const isFavorited = ref(true)
const preMuteVolume = ref(70)
const isHoveringVolume = ref(false)
let volumeTimeout = null

const formatTime = (secs) => {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

const progressPercent = computed(() => {
  if (!playerState.duration) return 0
  return (playerState.currentTime / playerState.duration) * 100
})

const seekProgress = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const width = rect.width
  const pct = Math.max(0, Math.min(1, clickX / width))
  const newSeconds = Math.floor(pct * playerState.duration)
  playerState.seek(newSeconds)
}

const setVolume = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const width = rect.width
  const pct = Math.max(0, Math.min(1, clickX / width))
  const newVol = Math.round(pct * 100)
  playerState.setVolume(newVol)
  isMuted.value = newVol === 0
  
  // Show percentage immediately on adjust, auto hide after 1.5s
  isHoveringVolume.value = true
  if (volumeTimeout) clearTimeout(volumeTimeout)
  volumeTimeout = setTimeout(() => {
    isHoveringVolume.value = false
  }, 1500)
}

const togglePlay = () => {
  playerState.toggle()
}

const toggleMute = () => {
  if (isMuted.value) {
    isMuted.value = false
    playerState.setVolume(preMuteVolume.value || 70)
  } else {
    preMuteVolume.value = playerState.volume
    playerState.setVolume(0)
    isMuted.value = true
  }
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
}
</script>

<template>
  <footer class="player-bar glass-panel flex items-center justify-between">
    <!-- Left: Song details -->
    <div class="song-details flex items-center gap-4 cursor-pointer" @click="handleSongDetailsClick">
      <div class="song-thumbnail w-14 h-14 rounded-md overflow-hidden bg-gray-600">
        <img :src="playerState.currentTrack.img" :alt="playerState.currentTrack.title" class="w-full h-full object-cover"/>
      </div>
      <div>
        <h4 class="text-sm font-semibold">{{ playerState.currentTrack.title }}</h4>
        <p class="text-xs text-secondary mt-0.5">{{ playerState.currentTrack.artist }}</p>
      </div>
      <button @click="toggleFavorite" class="btn-icon text-lg ml-2 favorite-btn" :class="{ 'favorited': isFavorited }">
        <i v-if="isFavorited" class="ph ph-fill ph-heart text-red-500"></i>
        <i v-else class="ph ph-heart"></i>
      </button>
    </div>

    <!-- Center: Playback controls -->
    <div class="player-controls flex flex-col items-center gap-3">
      <div class="control-buttons flex items-center gap-6">
        <button class="btn-icon text-lg"><i class="ph ph-shuffle"></i></button>
        <button @click="playerState.prev()" class="btn-icon text-xl"><i class="ph ph-skip-back"></i></button>
        <button @click="togglePlay" class="play-pause-btn flex items-center justify-center bg-accent-blue hover:bg-accent-blue-hover text-white rounded-full w-10 h-10 transition-transform hover:scale-105">
          <i v-if="playerState.isPlaying" class="ph ph-fill ph-pause text-xl"></i>
          <i v-else class="ph ph-fill ph-play text-xl ml-0.5"></i>
        </button>
        <button @click="playerState.next()" class="btn-icon text-xl"><i class="ph ph-skip-forward"></i></button>
        <button class="btn-icon text-lg"><i class="ph ph-repeat"></i></button>
      </div>
      
      <div class="progress-container flex items-center gap-3">
        <span class="time-label text-xs text-secondary">{{ formatTime(playerState.currentTime) }}</span>
        <div 
          class="progress-bar flex-1 bg-white/10 rounded-full relative cursor-pointer group"
          @click="seekProgress"
        >
          <div 
            class="progress-fill bg-accent-blue rounded-full relative" 
            :style="{ width: progressPercent + '%' }"
          >
            <div class="progress-handle absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
          </div>
        </div>
        <span class="time-label text-xs text-secondary">{{ formatTime(playerState.duration) }}</span>
      </div>
    </div>

    <!-- Right: Utility controls -->
    <div class="utility-controls flex items-center gap-4">
      <button 
        @click="emit('change-tab', activeTab === 'Lyrics' ? 'Home' : 'Lyrics')" 
        class="btn-icon text-lg" 
        :class="{ 'active-lyrics-btn': activeTab === 'Lyrics' }"
        title="Lyrics"
      >
        <i class="ph ph-microphone"></i>
      </button>
      <button 
        @click="$emit('toggle-queue')" 
        class="btn-icon text-lg" 
        :class="{ 'active-queue-btn': isQueueActive }"
        title="Play Queue"
      >
        <i class="ph ph-playlist"></i>
      </button>
      <button class="btn-icon text-lg"><i class="ph ph-speaker-hifi"></i></button>
      
      <div 
        class="volume-container flex items-center gap-2 w-32"
        @mouseenter="isHoveringVolume = true"
        @mouseleave="isHoveringVolume = false"
      >
        <button @click="toggleMute" class="btn-icon text-sm font-semibold w-8 h-8 flex items-center justify-center shrink-0">
          <span v-if="isHoveringVolume" class="text-xs font-bold text-accent">{{ isMuted ? '0%' : `${playerState.volume}%` }}</span>
          <i v-else-if="isMuted || playerState.volume === 0" class="ph ph-speaker-slash text-lg"></i>
          <i v-else class="ph ph-speaker-high text-lg"></i>
        </button>
        <div 
          class="volume-bar flex-1 bg-white/10 rounded-full relative cursor-pointer group"
          @click="setVolume"
        >
          <div 
            class="volume-fill bg-accent-blue rounded-full" 
            :style="{ width: isMuted ? '0%' : playerState.volume + '%' }"
          >
            <div class="volume-handle absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
          </div>
        </div>
      </div>
      
      <button class="btn-icon text-lg"><i class="ph ph-corners-out"></i></button>
    </div>
  </footer>
</template>

<style scoped>
.player-bar {
  grid-column: 1 / -1;
  border-radius: 0;
  margin: 0;
  padding: 0 2rem;
  z-index: 50;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: var(--glass-blur);
  border: none;
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.4), 0 -2px 10px rgba(0, 0, 0, 0.2);
  height: 90px;
  transition: all 0.3s ease;
}

.text-red-500 {
  color: #EF4444;
}

.favorited {
  color: #EF4444 !important;
}

.play-pause-btn {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.progress-container {
  width: 450px;
}

.progress-handle {
  transform: translate(50%, -50%);
}

.progress-bar {
  height: 4px !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent-blue) !important;
  border-radius: var(--radius-full);
  position: relative;
  transition: width 0.1s linear;
}

.volume-bar {
  height: 4px !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
}

.volume-fill {
  height: 100%;
  background-color: var(--accent-blue) !important;
  border-radius: var(--radius-full);
  transition: width 0.1s ease;
}

.progress-bar:hover .progress-handle,
.volume-bar:hover .volume-handle {
  opacity: 1;
}

.progress-handle, .volume-handle {
  transition: opacity 0.2s ease;
}

.volume-container {
  width: 120px !important;
}

@media (max-width: 992px) {
  .progress-container {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .player-bar {
    position: fixed;
    bottom: 70px; /* Float slightly above the bottom navbar */
    left: 12px;
    right: 12px;
    padding: 0 1rem;
    height: 64px;
    margin: 0;
    border-top-left-radius: 8px !important;
    border-top-right-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: rgba(18, 18, 20, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    z-index: 150;
    overflow: hidden; /* Clips the bottom progress bar */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
  .utility-controls {
    display: none;
  }
  .song-details {
    max-width: 65%;
    gap: 0.5rem;
  }
  .song-thumbnail {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px;
    border-radius: 6px;
  }
  .song-details h4 {
    font-size: 0.78rem;
  }
  .song-details p {
    font-size: 0.68rem;
  }
  .player-controls {
    flex: initial;
    gap: 0;
  }
  .control-buttons {
    gap: 1.25rem;
  }
  .control-buttons .btn-icon {
    font-size: 1rem;
  }
  .play-pause-btn {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    color: var(--accent-blue) !important;
    width: auto !important;
    height: auto !important;
    padding: 0 !important;
  }
  .play-pause-btn i {
    font-size: 1.35rem !important;
    margin: 0 !important;
  }
  /* Style skip-forward button (next) */
  .control-buttons > button:nth-child(4) {
    color: var(--accent-blue) !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .control-buttons > button:nth-child(4) i {
    font-size: 1.35rem !important;
  }
  /* Hide shuffle, skip-back & repeat on mobile */
  .control-buttons > button:first-child,
  .control-buttons > button:nth-child(2),
  .control-buttons > button:last-child {
    display: none;
  }
  .progress-container {
    display: flex;
    position: absolute;
    bottom: 0; /* Positioned at the bottom of the player bar */
    left: 0;
    right: 0;
    width: 100% !important;
    padding: 0;
    gap: 0;
    z-index: 10;
  }
  .progress-container .time-label {
    display: none;
  }
  .progress-bar {
    border-radius: 0;
    height: 3px !important;
    margin: 0;
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
  .progress-fill {
    border-radius: 0;
    background-color: var(--accent-blue) !important;
  }
  /* Favorite button smaller on mobile */
  .favorite-btn {
    font-size: 0.95rem;
  }
}
.active-queue-btn, .active-lyrics-btn {
  color: var(--accent-blue) !important;
}
</style>
