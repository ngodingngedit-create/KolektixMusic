<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { playerState } from '../playerState.js'

const props = defineProps({
  album: {
    type: Object,
    default: () => ({
      title: 'Lagipula Hidup Akan Berakhir',
      artist: 'Hindia',
      img: '/album_hindia.png',
      genre: 'Indie',
      songs: '14 Songs',
      duration: '48 Min',
      year: '2023',
      releasedDate: '30 Nov 2023',
      streams: '1.2M Streams',
      likes: '98K Likes',
      color: '#2563EB'
    })
  }
})

const emit = defineEmits(['back'])

const hexToRgb = (hex) => {
  if (!hex) return '37, 99, 235'
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  const num = parseInt(hex, 16)
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`
}

const bannerStyle = computed(() => {
  const rgb = hexToRgb(props.album.color)
  return {
    background: `linear-gradient(to bottom, rgba(${rgb}, 0.55) 0%, rgba(${rgb}, 0.15) 60%, #1A1A1C 100%)`
  }
})

const tracks = [
  { id: 1, title: 'To the Bone', artist: 'Hindia', plays: '890K', duration: '3:32', img: '/pamungkas.jpg', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Bila Nanti', artist: 'Hindia', plays: '765K', duration: '4:11', img: '/nadin.jpg', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Lagipula Hidup Akan Berakhir', artist: 'Hindia', plays: '1.1M', duration: '3:45', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Sialnya, Hidup', artist: 'Hindia', plays: '620K', duration: '3:39', img: '/album_bernadya1.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Cincin', artist: 'Hindia', plays: '980K', duration: '3:52', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'Janji Palsu', artist: 'Hindia', plays: '1.2M', duration: '3:21', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Satu Hari Lagi', artist: 'Hindia', plays: '450K', duration: '4:12', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 8, title: 'Masalah Masa Depan', artist: 'Hindia', plays: '1.5M', duration: '3:45', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 9, title: 'Kami Khawatir, Kawan', artist: 'Hindia', plays: '520K', duration: '4:02', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 10, title: 'Kita Ke Sana', artist: 'Hindia', plays: '730K', duration: '3:58', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: 11, title: 'Berdansalah, Karir Ini Tak Ada Artinya', artist: 'Hindia', plays: '310K', duration: '4:30', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id: 12, title: 'Kenapa Evaluasi', artist: 'Hindia', plays: '2.1M', duration: '3:12', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: 13, title: 'Proses Rekam', artist: 'Hindia', plays: '180K', duration: '5:45', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
  { id: 14, title: 'Arti Lirik', artist: 'Hindia', plays: '90K', duration: '4:20', img: '/album_hindia.png', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' }
]

// Computed states synchronized with global playerState
const isCurrentTrackInAlbum = computed(() => {
  return tracks.some(t => t.audioUrl === playerState.currentTrack.audioUrl)
})

const isAlbumPlaying = computed(() => {
  return playerState.isPlaying && isCurrentTrackInAlbum.value
})

const activeTrackId = computed(() => {
  const index = tracks.findIndex(t => t.audioUrl === playerState.currentTrack.audioUrl)
  return index !== -1 ? tracks[index].id : null
})

const togglePlayAlbum = () => {
  if (isAlbumPlaying.value) {
    playerState.pause()
  } else {
    const activeIndex = tracks.findIndex(t => t.audioUrl === playerState.currentTrack.audioUrl)
    if (activeIndex !== -1) {
      playerState.play(tracks[activeIndex], tracks)
    } else {
      playerState.play(tracks[0], tracks)
    }
  }
}

const playTrack = (trackId) => {
  const track = tracks.find(t => t.id === trackId)
  if (track) {
    playerState.play(track, tracks)
  }
}

const isLiked = ref(false)
const isDescriptionExpanded = ref(false)

// Context Menu (Three Dots Options) setup
const activeMenuTrackId = ref(null)
const isMobile = ref(false)

const toggleMenu = (trackId) => {
  if (activeMenuTrackId.value === trackId) {
    activeMenuTrackId.value = null
  } else {
    activeMenuTrackId.value = trackId
  }
}

const closeMenu = () => {
  activeMenuTrackId.value = null
}

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Toast notification setup
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimeout = null

const showToast = (message) => {
  toastMessage.value = message
  isToastVisible.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    isToastVisible.value = false
  }, 3000)
}

const addToQueue = (track) => {
  if (!playerState.queue.some(t => t.audioUrl === track.audioUrl)) {
    playerState.queue.push(track)
    showToast(`Added "${track.title}" to Queue`)
  } else {
    showToast(`"${track.title}" is already in Queue`)
  }
  closeMenu()
}

const playNext = (track) => {
  const currentIdx = playerState.currentIndex
  const existingIdx = playerState.queue.findIndex(t => t.audioUrl === track.audioUrl)
  if (existingIdx !== -1) {
    playerState.queue.splice(existingIdx, 1)
  }
  playerState.queue.splice(currentIdx + 1, 0, track)
  showToast(`Will play "${track.title}" next`)
  closeMenu()
}

const addToPlaylist = (track) => {
  showToast(`Added "${track.title}" to Playlist`)
  closeMenu()
}

const toggleFavoriteTrack = (track) => {
  showToast(`Liked "${track.title}"`)
  closeMenu()
}

const shareTrack = (track) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`${window.location.origin}/track/${track.id}`)
    showToast(`Copied share link to clipboard!`)
  } else {
    showToast(`Share Link: ${window.location.origin}/track/${track.id}`)
  }
  closeMenu()
}

const shareAlbum = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
    showToast(`Copied album share link to clipboard!`)
  } else {
    showToast(`Album Share Link: ${window.location.href}`)
  }
}

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile)
  window.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="album-detail-view">
    <!-- Album Header Banner -->
    <div class="album-header-banner flex gap-8 items-end relative overflow-hidden">
      <!-- Blurred Background Image Container -->
      <div class="banner-blur-bg" :style="{ backgroundImage: `url(${props.album.img})` }"></div>
      <div class="banner-overlay"></div>
      
      <!-- cover art -->
      <div class="album-cover-card shrink-0 relative overflow-hidden">
        <img :src="props.album.img" alt="Album Cover" class="album-cover-img" />
        <!-- Kolektix Circular Badge Overlay -->
        <div class="brand-logo-badge absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] shadow-lg">
          <span class="text-white text-sm font-black font-sans">k</span>
        </div>
        <!-- overlay play button -->
        <div class="cover-overlay" @click="togglePlayAlbum">
          <i class="ph ph-fill text-white text-3xl" :class="isAlbumPlaying ? 'ph-pause' : 'ph-play'"></i>
        </div>
      </div>

      <!-- header details text -->
      <div class="album-header-details flex flex-col justify-end min-w-0 flex-1">
        <div class="verified-badge mb-2">
          <i class="ph ph-fill ph-check-circle text-sm"></i> Verified Artist
        </div>
        <h1 class="album-title text-4xl font-extrabold mb-3 text-white tracking-tight leading-tight">
          {{ props.album.title }}
        </h1>
        
        <div class="artist-meta mb-6">
          <!-- Artist name row -->
          <div class="artist-name-row flex items-center justify-center gap-1">
            <span class="artist-link text-sm font-bold text-white hover:underline cursor-pointer">
              {{ props.album.artist }} <i class="ph ph-caret-right text-xs"></i>
            </span>
          </div>
          <!-- Streams & duration row — visible only on mobile, below artist name -->
          <div class="artist-stats-row">
            <span class="text-secondary/60">•</span>
            <span class="text-secondary font-normal">{{ props.album.streams }}</span>
            <span class="text-secondary/60">•</span>
            <span class="text-secondary font-normal">{{ props.album.duration }}</span>
          </div>
          <!-- Desktop inline separators + stats (hidden on mobile) -->
          <div class="artist-desktop-stats flex items-center gap-2">
            <span class="text-secondary/60">•</span>
            <span class="text-xs text-secondary font-semibold">{{ props.album.streams }}</span>
            <span class="text-secondary/60">•</span>
            <span class="text-xs text-secondary font-semibold">{{ props.album.duration }}</span>
          </div>
        </div>

        <!-- Album description -->
        <p 
          class="album-desc text-xs text-secondary leading-relaxed max-w-2xl cursor-pointer hover:text-white transition-colors"
          @click="isDescriptionExpanded = !isDescriptionExpanded"
          title="Click to expand or collapse details"
        >
          <span v-if="!isDescriptionExpanded">
            Album penuh dari {{ props.album.artist }} yang jujur, sinematik, dan emosional. Tentang akhir, kehilangan, dan menerima kehidupan.
            <span class="text-[#2563EB] font-bold">... more</span>
          </span>
          <span v-else>
            Album penuh dari {{ props.album.artist }} yang jujur, sinematik, dan emosional. Tentang akhir, kehilangan, dan menerima kehidupan. Lagipula hidup akan berakhir, namun musik dan cerita akan abadi. Sesi rekaman diolah secara detail untuk menghadirkan kualitas audio analog yang kaya dan hangat.
            <span class="text-[#2563EB] font-bold"> show less</span>
          </span>
        </p>

        <!-- Buttons controls -->
        <div class="controls-row">
          <!-- Play button full-width centered -->
          <div class="controls-play-row">
            <button @click="togglePlayAlbum" class="btn-play flex items-center gap-2">
              <i class="ph ph-fill text-white text-sm" :class="isAlbumPlaying ? 'ph-pause' : 'ph-play'"></i>
              <span>{{ isAlbumPlaying ? 'Pause' : 'Play' }}</span>
            </button>
          </div>
          <!-- Secondary buttons row -->
          <div class="controls-secondary-row flex items-center gap-4">
            <button class="btn-shuffle flex items-center gap-2">
              <i class="ph ph-shuffle"></i>
              <span class="shuffle-text">Shuffle</span>
            </button>
            <button @click="isLiked = !isLiked" class="btn-action-circle" :class="{ 'liked': isLiked }">
              <i class="ph" :class="isLiked ? 'ph-fill ph-heart text-red-500' : 'ph-heart text-white'"></i>
            </button>
            <button @click="shareAlbum" class="btn-action-circle" title="Share Album">
              <i class="ph ph-share-network text-lg text-white"></i>
            </button>
            <button class="btn-action-circle">
              <i class="ph ph-dots-three text-lg text-white"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- top right actions (Share & More) -->
      <div class="header-top-right absolute top-0 right-0 flex items-center gap-4">
        <button class="header-more-btn text-secondary hover:text-white transition-colors" title="More menu">
          <i class="ph ph-dots-three text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Pill Metrics Row -->
    <div class="metrics-pill-row scrollbar-hide">
      <div class="metric-pill">
        <i class="ph ph-waveform text-xl text-[#2563EB]"></i>
        <div class="flex flex-col">
          <span class="metric-val">{{ props.album.streams }}</span>
          <span class="metric-lbl">Streams</span>
        </div>
      </div>
      <div class="metric-pill">
        <i class="ph ph-heart text-xl text-[#2563EB]"></i>
        <div class="flex flex-col">
          <span class="metric-val">{{ props.album.likes }}</span>
          <span class="metric-lbl">Likes</span>
        </div>
      </div>
      <div class="metric-pill">
        <i class="ph ph-music-notes text-xl text-[#2563EB]"></i>
        <div class="flex flex-col">
          <span class="metric-val">14</span>
          <span class="metric-lbl">Songs</span>
        </div>
      </div>
      <div class="metric-pill">
        <i class="ph ph-clock text-xl text-[#2563EB]"></i>
        <div class="flex flex-col">
          <span class="metric-val">48 Min</span>
          <span class="metric-lbl">Duration</span>
        </div>
      </div>
      <div class="metric-pill">
        <i class="ph ph-calendar-blank text-xl text-[#2563EB]"></i>
        <div class="flex flex-col">
          <span class="metric-val">Released</span>
          <span class="metric-lbl">30 Nov 2023</span>
        </div>
      </div>
    </div>

    <!-- Tracklist Section Header -->
    <div class="tracklist-header flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-bold text-white">Tracklist</h3>
        <span class="badge-count text-xs font-bold text-white bg-[#2563EB] px-2 py-0.5 rounded-full">14</span>
      </div>
      <div class="flex items-center gap-3">
        <button class="tracklist-layout-btn active" title="List View"><i class="ph ph-list-bullets text-base"></i></button>
        <button class="tracklist-layout-btn" title="Sort Duration"><i class="ph ph-clock text-base"></i></button>
      </div>
    </div>

    <!-- Tracklist Grid -->
    <div class="tracklist-grid flex flex-col w-full">
      <!-- header row -->
      <div class="track-header-row flex items-center py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider border-b border-white/5">
        <span class="col-title">Title</span>
        <span class="col-plays">Plays</span>
        <span class="col-time"><i class="ph ph-clock text-base"></i></span>
        <span class="col-menu"></span>
      </div>

      <!-- track items -->
      <div 
        v-for="track in tracks" 
        :key="track.id"
        class="track-row flex items-center py-3.5 px-4 border-b border-white/5 cursor-pointer hover:bg-white/3 transition-colors"
        :class="{ 'is-active': activeTrackId === track.id }"
        @click="playTrack(track.id)"
      >

        <!-- title & thumbnail -->
        <div class="col-title">
          <div class="track-thumb">
            <img :src="track.img" class="w-full h-full object-cover" />
            <!-- Hover play overlay -->
            <div class="thumb-play-overlay">
              <i class="ph ph-fill text-white text-xs" :class="activeTrackId === track.id && isAlbumPlaying ? 'ph-pause' : 'ph-play'"></i>
            </div>
            <!-- Playing visualizer overlay -->
            <div v-if="activeTrackId === track.id && isAlbumPlaying" class="thumb-visualizer">
              <span class="viz-bar"></span>
              <span class="viz-bar"></span>
              <span class="viz-bar"></span>
            </div>
          </div>
          <div class="min-w-0 track-title-wrap">
            <div
              class="track-title-inner"
              :class="{
                'track-title-marquee': isMobile && track.title.split(' ').length > 3
              }"
            >
              <h4
                class="text-sm font-semibold"
                :class="activeTrackId === track.id ? 'text-[#2563EB]' : 'text-white'"
              >{{ track.title }}</h4>
              <!-- Duplicate for seamless loop -->
              <!-- <h4
                v-if="isMobile && track.title.split(' ').length > 3"
                class="text-sm font-semibold track-title-clone"
                :class="activeTrackId === track.id ? 'text-[#2563EB]' : 'text-white'"
                aria-hidden="true"
              >{{ track.title }}</h4> -->
            </div>
            <p class="text-xs text-secondary mt-0.5 truncate">{{ track.artist }}</p>
          </div>
        </div>

        <!-- plays -->
        <div class="col-plays text-xs font-semibold text-secondary" :class="{ 'text-[#2563EB]': activeTrackId === track.id }">{{ track.plays }}</div>

        <!-- duration -->
        <div class="col-time text-xs font-semibold text-secondary" :class="{ 'text-[#2563EB]': activeTrackId === track.id }">{{ track.duration }}</div>

        <!-- options -->
        <div class="col-menu relative">
          <button class="btn-icon text-secondary hover:text-white" @click.stop="toggleMenu(track.id)">
            <i class="ph ph-dots-three text-lg"></i>
          </button>
          
          <!-- Desktop/Tablet Floating Context Menu -->
          <transition name="menu-scale">
            <div v-if="!isMobile && activeMenuTrackId === track.id" class="track-context-menu" @click.stop>
              <button @click="addToQueue(track)" class="menu-item">
                <i class="ph ph-list-plus text-base text-[#2563EB]"></i>
                <span>Add to Queue</span>
              </button>
              <button @click="playNext(track)" class="menu-item">
                <i class="ph ph-play-circle text-base text-[#2563EB]"></i>
                <span>Play Next</span>
              </button>
              <button @click="addToPlaylist(track)" class="menu-item">
                <i class="ph ph-folder-plus text-base text-[#2563EB]"></i>
                <span>Add to Playlist</span>
              </button>
              <button @click="toggleFavoriteTrack(track)" class="menu-item">
                <i class="ph ph-heart text-base text-[#2563EB]"></i>
                <span>Favorite Track</span>
              </button>
              <button @click="shareTrack(track)" class="menu-item">
                <i class="ph ph-share-network text-base text-[#2563EB]"></i>
                <span>Share Link</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Mobile Slide-up Bottom Sheet (Teleported to body for overflow container escape) -->
    <teleport to="body">
      <transition name="sheet-slide">
        <div v-if="isMobile && activeMenuTrackId !== null" class="bottom-sheet-overlay" @click="closeMenu">
          <div class="bottom-sheet-content" @click.stop>
            <div class="sheet-drag-handle"></div>
            <div class="sheet-header">
              <img :src="tracks.find(t => t.id === activeMenuTrackId)?.img" class="sheet-track-img"/>
              <div class="sheet-track-info">
                <h4 class="text-sm font-bold text-white">{{ tracks.find(t => t.id === activeMenuTrackId)?.title }}</h4>
                <p class="text-xs text-secondary mt-0.5">{{ tracks.find(t => t.id === activeMenuTrackId)?.artist }}</p>
              </div>
            </div>
            <div class="sheet-items">
              <button @click="addToQueue(tracks.find(t => t.id === activeMenuTrackId))" class="sheet-item">
                <i class="ph ph-list-plus"></i>
                <span>Add to Queue</span>
              </button>
              <button @click="playNext(tracks.find(t => t.id === activeMenuTrackId))" class="sheet-item">
                <i class="ph ph-play-circle"></i>
                <span>Play Next</span>
              </button>
              <button @click="addToPlaylist(tracks.find(t => t.id === activeMenuTrackId))" class="sheet-item">
                <i class="ph ph-folder-plus"></i>
                <span>Add to Playlist</span>
              </button>
              <button @click="toggleFavoriteTrack(tracks.find(t => t.id === activeMenuTrackId))" class="sheet-item">
                <i class="ph ph-heart"></i>
                <span>Favorite Track</span>
              </button>
              <button @click="shareTrack(tracks.find(t => t.id === activeMenuTrackId))" class="sheet-item">
                <i class="ph ph-share-network"></i>
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Global Toast Notification -->
    <transition name="toast-fade">
      <div v-if="isToastVisible" class="premium-toast">
        <i class="ph ph-info-circle text-[#2563EB] text-lg"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Reset scoped buttons from browser default white boxes */
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  font: inherit;
  outline: none;
}

.btn-back-home {
  background: transparent;
  border: none;
  padding: 0;
  color: #9CA3AF;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-back-home:hover {
  color: #FFFFFF;
}

.album-detail-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C;
  height: calc(100% - 0.25rem);
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  color: #FFFFFF;
  min-width: 0;
}

.album-header-banner {
  display: flex;
  gap: 2.5rem;
  align-items: flex-end;
  position: relative;
  width: calc(100% + 6rem); /* Stretches edge-to-edge relative to parent padding */
  padding: 5rem 3rem 2.5rem 3rem;
  margin: -2.5rem -3rem 0 -3rem; /* Bleeds to outer borders */
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  flex-shrink: 0;
  min-height: 400px;
}

@media (max-width: 1200px) {
  .album-header-banner {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1.5rem !important;
    padding-top: 5rem !important;
    min-height: auto !important;
  }
}

.album-cover-card {
  width: 280px;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  z-index: 2;
}

.brand-logo-badge {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.album-cover-card:hover .album-cover-img {
  transform: scale(1.05);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.album-cover-card:hover .cover-overlay {
  opacity: 1;
}

.verified-badge {
  color: #FFFFFF;
  background-color: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(37, 99, 235, 0.45);
  padding: 4px 10px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: fit-content;
}

.verified-badge i {
  color: #60A5FA;
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
}

.album-header-details {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.header-top-right {
  z-index: 2;
}

.desktop-hide {
  display: none !important;
}

/* Artist stats row (streams/duration) — hidden on desktop, shown on mobile */
.artist-stats-row {
  display: none;
}

/* Desktop inline stats — shown on desktop, hidden on mobile */
.artist-desktop-stats {
  display: none;
}

/* Artist name row — flex row on desktop */
.artist-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Artist meta — flex column on desktop (only name visible) */
.artist-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.banner-blur-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(40px) brightness(0.35);
  transform: scale(1.15);
  z-index: 0;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(26, 26, 28, 0.4) 60%, #1A1A1C 100%);
  z-index: 1;
}

.album-title {
  font-size: 4.5rem; /* Enlarged album title */
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem; /* Placed under description, breathes into the bottom border */
}

.controls-play-row {
  display: contents; /* Transparent wrapper on desktop — children join the parent flex row */
}

.controls-secondary-row {
  display: contents; /* Transparent wrapper on desktop — children join the parent flex row */
}

.album-desc {
  margin-top: 0.5rem; /* Positioned closer to metadata (keatasin sedikit) */
  margin-bottom: 2.25rem; /* Wider gap between description and controls-row button */
}

.artist-link:hover i {
  transform: translateX(2px);
}
.artist-link i {
  transition: transform 0.2s ease;
}

.btn-play {
  background-color: #2563EB;
  color: #FFFFFF;
  padding: 0.7rem 2.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.btn-play:hover {
  background-color: #3b82f6;
  transform: translateY(-1px);
}

.btn-shuffle {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  padding: 0.7rem 2.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-shuffle:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-action-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-circle:hover {
  border-color: rgba(255, 255, 255, 0.35);
  background-color: rgba(255, 255, 255, 0.05);
}

.btn-action-circle.liked {
  border-color: rgba(239, 68, 68, 0.3);
  background-color: rgba(239, 68, 68, 0.05);
}

.mobile-metrics-text {
  display: none;
}

/* Metrics Row */
.metrics-pill-row {
  display: flex;
  gap: 2.5rem;
  padding: 1.5rem 2.5rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  margin: 2.5rem 0;
  width: 100%;
}

.metric-pill {
  display: flex;
  align-items: center;
  gap: 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding-right: 2.5rem;
  flex-shrink: 0;
  flex: 1;
}

.metric-pill:last-child {
  border-right: none;
  padding-right: 0;
}

.metric-val {
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
}

.metric-lbl {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 2px;
}

.badge-count {
  line-height: 1;
}

/* Track list columns & alignment */
.col-num {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.col-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.col-plays {
  width: 120px;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
  padding-right: 2.5rem;
}

.col-time {
  width: 80px;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
  padding-right: 1.5rem;
}

.col-menu {
  width: 40px;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

/* ── Track title marquee ── */
.track-title-wrap {
  overflow: hidden;
  min-width: 0;
}

/* Default: single-line truncate (desktop & short titles) */
.track-title-inner {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-title-inner h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  max-width: 100%;
}

/* Marquee state — activated on mobile for long titles */
/* .track-title-marquee {
  overflow: visible;
  text-overflow: unset;
  animation: track-marquee 12s linear infinite;
} */

.track-title-marquee h4 {
  overflow: visible;
  text-overflow: unset;
  flex-shrink: 0;
}

.track-title-clone {
  padding-left: 3rem; /* Visual gap between repeated copies */
  flex-shrink: 0;
}

/* @keyframes track-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
} */

/* Track list rows */
.tracklist-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.track-row {
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.85rem 1.25rem; /* Extra padding for premium feel */
  transition: background-color 0.2s ease;
}

.track-row.is-active {
  background-color: rgba(37, 99, 235, 0.07);
}

.track-thumb {
  width: 64px; /* Increased thumbnail size */
  height: 64px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.track-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumb-play-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 2;
}

.thumb-play-overlay i {
  font-size: 1.5rem; /* Enlarged play icon */
}

.track-row:hover .thumb-play-overlay {
  opacity: 1;
}

/* Wave visualizer inside thumb */
.thumb-visualizer {
  position: absolute;
  inset: 0;
  background-color: rgba(11, 14, 20, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2.5px;
  padding: 6px;
  z-index: 3;
}

.viz-bar {
  width: 3px;
  background-color: #2563EB;
  height: 4px;
  border-radius: 1px;
  animation: viz-bounce 0.6s ease infinite alternate;
}

.viz-bar:nth-child(2) { animation-delay: 0.15s; }
.viz-bar:nth-child(3) { animation-delay: 0.3s; }

@keyframes viz-bounce {
  0% { height: 4px; }
  100% { height: 20px; }
}

.animate-pulse-waveform {
  animation: pulse-wave 1s infinite alternate;
}

@keyframes pulse-wave {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.1); opacity: 1; }
}

/* Layout selection buttons */
.tracklist-layout-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tracklist-layout-btn.active {
  background-color: #2563EB;
  border-color: #2563EB;
  color: #FFFFFF;
}

.tracklist-layout-btn:hover:not(.active) {
  border-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

/* 2. Responsive layout breakpoints */
@media (max-width: 1024px) {
  .album-detail-view {
    padding: 1.25rem;
    margin: 0;
    height: 100%;
    border: none;
    border-radius: 0;
  }
  .album-header-banner {
    margin: -1.25rem -1.25rem 0 -1.25rem;
    padding: 4rem 1.25rem 1.5rem 1.25rem;
    width: calc(100% + 2.5rem); /* Bleeds edge-to-edge under tablet padding */
    min-height: auto !important;
  }
  .album-title {
    font-size: 3.5rem !important;
  }
  .btn-back-home {
    top: 1.25rem !important;
    left: 1.25rem !important;
  }
}

@media (max-width: 768px) {
  .album-detail-view {
    grid-column: 1; /* Fix grid placement bug on mobile */
    grid-row: 2;
    padding: 1rem 1.25rem 6rem 1.25rem;
    margin: 0;
    height: 100%;
    border: none;
    border-radius: 0;
  }

  .album-header-banner {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
    gap: 1.5rem !important;
    padding: 1.5rem 1rem 1.5rem 1rem !important;
    margin: -1rem -1.25rem 0 -1.25rem;
    width: calc(100% + 2.5rem); /* Bleeds edge-to-edge under mobile padding */
    min-height: auto !important;
  }

  .btn-back-home {
    top: 1.25rem !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }

  .album-cover-card {
    width: 180px;
    height: 180px;
    align-self: center !important;
  }

  .desktop-hide {
    display: inline !important;
  }

  .album-header-details {
    align-items: center !important;
    text-align: center;
    width: 100%;
  }

  .album-title {
    font-size: 2.25rem !important; /* Smaller, fits better on mobile */
    text-align: center;
    line-height: 1.2 !important;
  }

  .artist-meta {
    justify-content: center;
    font-size: 0.65rem !important;
  }

  .artist-link {
    font-size: 0.65rem !important;
    font-weight: 400 !important;
    text-align: center;
  }

  .controls-row {
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    gap: 10px !important;
  }

  .controls-play-row {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .controls-secondary-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px !important;
    width: 100%;
  }

  .btn-play {
    padding: 0.65rem 1.75rem !important;
  }

  .btn-shuffle {
    width: 42px !important;
    height: 42px !important;
    border-radius: 50% !important;
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: none !important;
    color: #FFFFFF !important;
  }

  .btn-shuffle .shuffle-text {
    display: none !important;
  }

  .btn-shuffle i {
    font-size: 1.25rem;
  }

  .btn-action-circle {
    width: 42px !important;
    height: 42px !important;
    border-radius: 50% !important;
    border: none !important;
    background: transparent !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .metrics-pill-row {
    display: none !important;
  }

  .track-thumb {
    width: 56px;
    height: 56px;
  }

  .track-row {
    padding: 0.75rem 0.5rem; /* Tightened for small screens */
  }

  .track-row h4 {
    font-size: 0.8rem !important; /* Smaller title text */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-row p {
    font-size: 0.7rem !important; /* Smaller artist text */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .col-num {
    width: 30px !important;
  }

  .col-title {
    gap: 8px !important;
  }

  .col-time {
    width: 50px !important;
    padding-right: 0.5rem !important;
  }

  .col-menu {
    width: 30px !important;
  }

  .col-plays {
    display: none !important;
  }

  .album-desc {
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.7rem !important; /* Smaller description text */
    line-height: 1.5 !important;
  }

  .header-top-right {
    display: none !important;
  }
}

/* Context Menu & Dropdown styles */
.track-context-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 5px);
  background: rgba(30, 30, 35, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  width: 190px;
  padding: 6px 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 0.825rem;
  font-weight: 500;
  color: #E5E7EB;
  text-align: left;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #FFFFFF;
}

.menu-item i {
  transition: transform 0.2s ease;
}

.menu-item:hover i {
  transform: scale(1.1);
}

/* Animations */
.menu-scale-enter-active,
.menu-scale-leave-active {
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-scale-enter-from,
.menu-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

/* Mobile Bottom Sheet Drawer */
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bottom-sheet-content {
  background: #18181C;
  width: 100%;
  max-width: 500px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: none;
  display: flex;
  flex-direction: column;
}

.sheet-drag-handle {
  width: 40px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 0 auto 1.25rem auto;
}

.sheet-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.sheet-track-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
}

.sheet-track-info {
  display: flex;
  flex-direction: column;
}

.sheet-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sheet-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #E5E7EB;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.sheet-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #FFFFFF;
}

.sheet-item i {
  font-size: 1.25rem;
  color: #2563EB;
}

.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Premium Toast styles */
.premium-toast {
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 20, 25, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  padding: 12px 24px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  font-size: 0.85rem;
  font-weight: 600;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
