<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { playerState } from '../playerState.js'

// Lyrics database containing time-synced lyrics for multiple tracks
const lyricsDatabase = {
  'To the Bone': [
    { type: 'label', text: '[Verse 1]', translation: '[Bait 1]' },
    { time: 6, timestamp: '00:06', text: 'Have I ever told you', translation: 'Pernahkah ku memberitahumu' },
    { time: 10, timestamp: '00:10', text: 'I want you to the bone', translation: 'Kuingin dirimu sampai ke tulang' },
    { time: 14, timestamp: '00:14', text: 'Have I ever called you', translation: 'Pernahkah ku meneleponmu' },
    { time: 18, timestamp: '00:18', text: 'When you are all alone', translation: 'Saat kau sendirian saja' },
    { time: 22, timestamp: '00:22', text: 'Yeah, if I ever forget', translation: 'Yeah, jika ku pernah lupa' },
    { time: 26, timestamp: '00:26', text: 'To tell you how I feel', translation: 'Tuk nyatakan yang kurasa' },
    { time: 30, timestamp: '00:30', text: 'Listen to me now, babe', translation: 'Dengarlah aku sekarang, sayang' },
    { time: 34, timestamp: '00:34', text: 'I want you to the bone', translation: 'Kuingin dirimu sampai ke tulang' },
    
    { type: 'label', text: '[Chorus]', translation: '[Chorus]' },
    { time: 39, timestamp: '00:39', text: 'I want you to the bone, oh, oh, oh, oh', translation: 'Kuingin dirimu sampai ke tulang, oh, oh, oh, oh' },
    { time: 48, timestamp: '00:48', text: 'I want you to the bone, oh, oh, oh, oh', translation: 'Kuingin dirimu sampai ke tulang, oh, oh, oh, oh' },
    
    { type: 'label', text: '[Verse 2]', translation: '[Bait 2]' },
    { time: 57, timestamp: '00:57', text: 'Maybe if you can see', translation: 'Mungkin jika kau bisa melihat' },
    { time: 61, timestamp: '01:01', text: 'What I feel through my eyes', translation: 'Apa yang kurasa dari mataku' },
    { time: 66, timestamp: '01:06', text: 'Every single day I\'ve spent', translation: 'Setiap hari yang kuhabiskan' },
    { time: 70, timestamp: '01:10', text: 'With you by my side', translation: 'Denganmu di sisiku' },
    { time: 75, timestamp: '01:15', text: 'I\'m not good with words', translation: 'Aku tak pandai merangkai kata' },
    { time: 79, timestamp: '01:19', text: 'But I hope you understand', translation: 'Namun kuharap kau mengerti' },
    { time: 84, timestamp: '01:24', text: 'Yeah, I want you to the bone', translation: 'Yeah, kuingin dirimu sampai ke tulang' },
    { time: 88, timestamp: '01:28', text: 'I want you to the bone', translation: 'Kuingin dirimu sampai ke tulang' },
    
    { type: 'label', text: '[Pre-Chorus]', translation: '[Pre-Chorus]' },
    { time: 96, timestamp: '01:36', text: 'Of all the things that I\'ve been through', translation: 'Dari semua hal yang tlah kulalui' },
    { time: 101, timestamp: '01:41', text: 'The only thing I\'ll look back into', translation: 'Satu-satunya yang akan kukenang kembali' },
    { time: 106, timestamp: '01:46', text: 'Is you...', translation: 'Adalah dirimu...' },
    { time: 111, timestamp: '01:51', text: 'Yeah, it\'s you...', translation: 'Yeah, itu dirimu...' }
  ],
  'Lagipula Hidup Akan Berakhir': [
    { type: 'label', text: '[Verse 1]', translation: '[Verse 1]' },
    { time: 6, timestamp: '00:06', text: 'Di antara malam yang panjang', translation: 'In the middle of the long night' },
    { time: 12, timestamp: '00:12', text: 'Aku terjaga sendiri', translation: 'I stay awake alone' },
    { time: 18, timestamp: '00:18', text: 'Merenung, mencoba mengerti', translation: 'Contemplating, trying to understand' },
    { time: 24, timestamp: '00:24', text: 'Semua yang terjadi', translation: 'All that has happened' },
    
    { type: 'label', text: '[Pre-Chorus]', translation: '[Pre-Chorus]' },
    { time: 30, timestamp: '00:30', text: 'Tak selalu mudah melangkah', translation: "It's not always easy to take a step" },
    { time: 36, timestamp: '00:36', text: 'Lewati segala rasa', translation: 'Go through all feelings' },
    { time: 42, timestamp: '00:42', text: 'Namun ku tahu, ku kan kuat', translation: 'But I know I will be strong' },
    { time: 48, timestamp: '00:48', text: 'Meski hati terluka', translation: 'Even though the heart is wounded' },
    
    { type: 'label', text: '[Chorus]', translation: '[Chorus]' },
    { time: 54, timestamp: '00:54', text: 'Lagipula hidup akan berakhir', translation: 'After all, life will end' },
    { time: 60, timestamp: '01:00', text: 'Berbahagialah, kawan, di sisa waktu yang ada', translation: 'Be happy, friend, in the remaining time we have' },
    { time: 66, timestamp: '01:06', text: 'Jangan terlalu lelah, jangan terlalu keras', translation: "Don't be too tired, don't be too hard" },
    { time: 72, timestamp: '01:12', text: 'Nikmati saja, semua yang terbatas', translation: 'Just enjoy everything that is limited' },
    
    { type: 'label', text: '[Verse 2]', translation: '[Verse 2]' },
    { time: 84, timestamp: '01:24', text: 'Waktu terus berjalan', translation: 'Time keeps moving on' },
    { time: 90, timestamp: '01:30', text: 'Menanti yang tak pasti', translation: 'Waiting for the uncertain' },
    { time: 96, timestamp: '01:36', text: 'Hingga akhirnya kita sadar', translation: 'Until we finally realize' },
    { time: 102, timestamp: '01:42', text: 'Tak ada yang abadi', translation: 'Nothing is eternal' },
    
    { type: 'label', text: '[Pre-Chorus]', translation: '[Pre-Chorus]' },
    { time: 108, timestamp: '01:48', text: 'Tak selalu mudah melangkah', translation: "It's not always easy to take a step" },
    { time: 114, timestamp: '01:54', text: 'Lewati segala rasa', translation: 'Go through all feelings' },
    { time: 120, timestamp: '02:00', text: 'Namun ku tahu, ku kan kuat', translation: 'But I know I will be strong' },
    { time: 126, timestamp: '02:06', text: 'Meski hati terluka', translation: 'Even though the heart is wounded' },
    
    { type: 'label', text: '[Chorus]', translation: '[Chorus]' },
    { time: 132, timestamp: '02:12', text: 'Lagipula hidup akan berakhir', translation: 'After all, life will end' },
    { time: 138, timestamp: '02:18', text: 'Berbahagialah, kawan, di sisa waktu yang ada', translation: 'Be happy, friend, in the remaining time we have' },
    { time: 144, timestamp: '02:24', text: 'Jangan terlalu lelah, jangan terlalu keras', translation: "Don't be too tired, don't be too hard" },
    { time: 150, timestamp: '02:30', text: 'Nikmati saja, semua yang terbatas', translation: 'Just enjoy everything that is limited' },
    
    { type: 'label', text: '[Outro]', translation: '[Outro]' },
    { time: 156, timestamp: '02:36', text: 'Selesai semua tangisan', translation: 'All tears have ended' },
    { time: 162, timestamp: '02:42', text: 'Sambut esok penuh harapan', translation: 'Welcome tomorrow full of hope' },
    { time: 168, timestamp: '02:48', text: 'Nikmati saja...', translation: 'Just enjoy it...' },
    { time: 174, timestamp: '02:54', text: 'Semua yang terbatas...', translation: 'Everything that is limited...' }
  ],
  'Bila Nanti': [
    { type: 'label', text: '[Verse 1]', translation: '[Bait 1]' },
    { time: 5, timestamp: '00:05', text: 'Bila nanti kita berpisah', translation: 'If later we go our separate ways' },
    { time: 11, timestamp: '00:11', text: 'Jangan kau lupakan kenangan kita', translation: 'Do not forget our memories' },
    { time: 18, timestamp: '00:18', text: 'Semua yang tlah kita lewati', translation: 'All that we have been through' },
    { time: 25, timestamp: '00:25', text: 'Kan tersimpan rapi di hati', translation: 'Will be stored neatly in the heart' },
    { type: 'label', text: '[Chorus]', translation: '[Chorus]' },
    { time: 32, timestamp: '00:32', text: 'Bahagialah selalu di sana', translation: 'Be always happy over there' },
    { time: 39, timestamp: '00:39', text: 'Temukan pengganti diriku', translation: 'Find a replacement for me' },
    { time: 46, timestamp: '00:46', text: 'Yang bisa mencintaimu lebih', translation: 'Who can love you more' },
    { time: 53, timestamp: '00:53', text: 'Lebih dari diriku...', translation: 'More than I did...' }
  ]
}

// Compute the current lyrics set based on the active song title in playerState
const currentLyrics = computed(() => {
  const title = playerState.currentTrack?.title
  return lyricsDatabase[title] || null
})

// Check if the current track has synced lyrics
const currentTrackHasLyrics = computed(() => {
  return !!currentLyrics.value
})

// Dynamically supply lyricsData based on active song
const lyricsData = computed(() => {
  return currentLyrics.value || []
})

// State management
const showTranslation = ref(false)
const isSeeking = ref(false)
const isMobile = ref(false)
const lyricsScrollContainer = ref(null)

// Check if current track is the Hindia track
const isHindiaTrack = computed(() => {
  return playerState.currentTrack?.title === 'Lagipula Hidup Akan Berakhir'
})

// Play Hindia's track directly
const playHindiaTrack = () => {
  playTrackByName('Lagipula Hidup Akan Berakhir')
}

// Play any of the supported tracks directly
const playTrackByName = (name) => {
  let track = null
  if (name === 'To the Bone') {
    track = {
      id: 1,
      title: 'To the Bone',
      artist: 'Pamungkas',
      img: '/pamungkas.jpg',
      plays: '890K',
      duration: '3:32',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }
  } else if (name === 'Bila Nanti') {
    track = {
      id: 2,
      title: 'Bila Nanti',
      artist: 'Nadin Amizah',
      img: '/nadin.jpg',
      plays: '765K',
      duration: '4:11',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
  } else if (name === 'Lagipula Hidup Akan Berakhir') {
    track = {
      id: 3,
      title: 'Lagipula Hidup Akan Berakhir',
      artist: 'Hindia',
      img: '/album_hindia.png',
      plays: '1.1M',
      duration: '3:45',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  }
  if (track) {
    playerState.play(track)
  }
}

// Format seconds into MM:SS
const formatTime = (secs) => {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

// Calculate the active line index based on playerState.currentTime
const activeLineIndex = computed(() => {
  const t = playerState.currentTime
  // Find the last lyric item that has a time <= current time
  let activeIndex = -1
  const data = lyricsData.value
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.type !== 'label' && item.time <= t) {
      activeIndex = i
    }
  }
  
  // Fallback: if no lyric has started yet, highlight the first actual lyric line
  if (activeIndex === -1 && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type !== 'label') {
        return i
      }
    }
  }
  
  return activeIndex
})

// Helper to determine if a line is active
const isLineActive = (index) => {
  return activeLineIndex.value === index
}

// Seek song to specific line time
const seekToLine = (time) => {
  if (time !== undefined) {
    playerState.seek(time)
    if (!playerState.isPlaying) {
      playerState.toggle()
    }
  }
}

// Progress bar binding
const progressPercent = computed(() => {
  if (!playerState.duration) return 0
  return (playerState.currentTime / playerState.duration) * 100
})

// Interactive progress bar seek
const handleProgressBarClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const width = rect.width
  const pct = Math.max(0, Math.min(1, clickX / width))
  const newSeconds = Math.floor(pct * (playerState.duration || 212))
  
  playerState.seek(newSeconds)
}

// Handle resizing for mobile stack responsive adjustments
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Watch active line changes to trigger smooth centering scroll
watch(() => activeLineIndex.value, async (newVal) => {
  if (newVal !== -1) {
    await nextTick()
    const scrollContainer = lyricsScrollContainer.value
    const activeLine = scrollContainer?.querySelector('.lyric-line.active-line')
    if (scrollContainer && activeLine) {
      const containerHeight = scrollContainer.clientHeight
      const lineOffsetTop = activeLine.offsetTop
      const lineElementHeight = activeLine.clientHeight
      
      scrollContainer.scrollTo({
        top: lineOffsetTop - (containerHeight / 2) + (lineElementHeight / 2),
        behavior: 'smooth'
      })
    }
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Trigger initial scroll to center if already playing
  setTimeout(() => {
    const scrollContainer = document.querySelector('.lyrics-scroll-container')
    const activeLine = scrollContainer?.querySelector('.lyric-line.active-line')
    if (scrollContainer && activeLine) {
      scrollContainer.scrollTop = activeLine.offsetTop - (scrollContainer.clientHeight / 2)
    }
  }, 300)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="lyrics-view flex flex-col md:flex-row">
    <!-- Preview Banner for when current track does not have lyrics -->
    <div v-if="!currentTrackHasLyrics" class="preview-banner flex items-center justify-between px-6 py-3 bg-accent-blue/10 border-b border-accent-blue/20">
      <div @click="playTrackByName('Lagipula Hidup Akan Berakhir')" class="flex items-center gap-2 text-xs md:text-sm cursor-pointer hover:underline flex-1 pr-4">
        <i class="ph ph-info-circle text-accent"></i>
        <span>Currently playing <strong>{{ playerState.currentTrack?.title || 'Unknown' }}</strong>. Click here to play a song with synced lyrics.</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button @click="playTrackByName('To the Bone')" class="btn btn-outline text-xs py-1 px-3">
          <i class="ph ph-play-circle"></i> Play To the Bone
        </button>
        <button @click="playTrackByName('Lagipula Hidup Akan Berakhir')" class="btn btn-primary text-xs py-1 px-3">
          <i class="ph ph-play-circle"></i> Play Hindia
        </button>
      </div>
    </div>

    <!-- Main Content Area Grid/Asymmetric Columns -->
    <div class="lyrics-content-grid flex-1">
      
      <!-- Left Section: Album Art Display -->
      <div class="left-section flex flex-col shrink-0">
        <div class="album-cover-wrapper aspect-square relative rounded-xl overflow-hidden shadow-2xl">
          <img :src="playerState.currentTrack?.img || '/album_hindia.png'" :alt="(playerState.currentTrack?.title || 'Album') + ' Cover'" class="w-full h-full object-cover"/>
          <!-- Verified Blue Badge Overlay top-left -->
          <div class="verified-badge-overlay absolute top-3 left-3">
            <i class="ph ph-fill ph-check-circle text-[#2563EB] text-2xl drop-shadow-md"></i>
          </div>
        </div>
        
        <div class="album-meta-info text-left">
          <h2 class="album-title">
            {{ playerState.currentTrack?.title || 'Unknown Song' }}
          </h2>
          <p class="artist-name">
            {{ playerState.currentTrack?.artist || 'Unknown Artist' }}
          </p>
        </div>

        <!-- Left Column Progress Bar -->
        <div class="progress-bar-container mt-8">
          <div 
            class="progress-track w-full h-1 bg-white/10 rounded-full relative cursor-pointer group"
            @click="handleProgressBarClick"
          >
            <div 
              class="progress-fill-active h-full bg-[#2563EB] rounded-full relative"
              :style="{ width: (currentTrackHasLyrics ? progressPercent : 0) + '%' }"
            >
              <div class="progress-indicator absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section: Interactive Time-Synced Lyrics or Fallback UI -->
      <div class="right-section flex-1 flex flex-col min-w-0">
        <!-- Lyrics Header Bar -->
        <div class="lyrics-header-row flex items-center justify-between pb-4 border-b border-white/5 mb-3">
          <div class="header-title-container relative">
            <h1 class="text-xl md:text-2xl font-bold text-white tracking-wide">Lyrics</h1>
            <span class="active-underline"></span>
          </div>
          <button 
            v-if="currentTrackHasLyrics"
            @click="showTranslation = !showTranslation" 
            class="btn-translation btn-outline text-xs px-3.5 py-1.5 flex items-center gap-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-secondary hover:text-white"
          >
            <i class="ph ph-translate text-sm"></i>
            <span>{{ showTranslation ? 'Show Original' : 'View Translation' }}</span>
          </button>
        </div>

        <!-- Lyrics Scrollable Container -->
        <div v-if="currentTrackHasLyrics" ref="lyricsScrollContainer" class="lyrics-scroll-container flex-1 overflow-y-auto pr-2 space-y-4">
          <div 
            v-for="(line, index) in lyricsData" 
            :key="index"
            class="lyric-line-wrapper"
          >
            <!-- Section Labels (e.g. [Verse 1]) — Indented to align with lyric texts -->
            <div 
              v-if="line.type === 'label'" 
              class="lyrics-label select-none"
            >
              <div class="lyric-leading"></div>
              <div class="label-text">{{ line.text }}</div>
            </div>
            
            <!-- Lyric Line with Timestamp and Arrow -->
            <div 
              v-else 
              @click="seekToLine(line.time)"
              class="lyric-line"
              :class="{ 'active-line': isLineActive(index) }"
            >
              <!-- Arrow Caret & Timestamp -->
              <div class="lyric-leading">
                <!-- Triangle active caret indicator (Play icon to the left of the timestamp) -->
                <span class="caret-indicator">
                  <i class="ph ph-fill ph-play text-[10px]"></i>
                </span>
                <span class="lyric-time">
                  {{ line.timestamp }}
                </span>
              </div>

              <!-- Lyric text original or translated -->
              <div class="lyric-text">
                {{ showTranslation ? line.translation : line.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback UI when no lyrics are available -->
        <div v-else class="lyrics-scroll-container flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <i class="ph ph-music-notes-slash text-3xl text-secondary/60"></i>
          </div>
          <div class="space-y-2 max-w-sm">
            <h3 class="text-lg font-bold text-white">No Synced Lyrics Available</h3>
            <p class="text-xs md:text-sm text-secondary/70">
              We don't have time-synced lyrics for <strong>{{ playerState.currentTrack?.title || 'this track' }}</strong> yet.
            </p>
          </div>
          
          <div class="w-full max-w-md bg-white/3 border border-white/5 rounded-xl p-5 space-y-4 text-left">
            <p class="text-xs font-semibold text-secondary uppercase tracking-wider text-center">Try playing a song with interactive lyrics:</p>
            <div class="flex flex-col gap-2.5">
              <button 
                @click="playTrackByName('To the Bone')" 
                class="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group text-left w-full"
              >
                <div class="flex items-center gap-3">
                  <img src="/pamungkas.jpg" class="w-9 h-9 rounded object-cover" />
                  <div>
                    <p class="text-sm font-semibold text-white">To the Bone</p>
                    <p class="text-xs text-secondary font-normal">Pamungkas</p>
                  </div>
                </div>
                <span class="text-xs text-[#2563EB] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Play Now <i class="ph ph-play-circle text-sm"></i>
                </span>
              </button>
              
              <button 
                @click="playTrackByName('Lagipula Hidup Akan Berakhir')" 
                class="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group text-left w-full"
              >
                <div class="flex items-center gap-3">
                  <img src="/album_hindia.png" class="w-9 h-9 rounded object-cover" />
                  <div>
                    <p class="text-sm font-semibold text-white">Lagipula Hidup Akan Berakhir</p>
                    <p class="text-xs text-secondary font-normal">Hindia</p>
                  </div>
                </div>
                <span class="text-xs text-[#2563EB] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Play Now <i class="ph ph-play-circle text-sm"></i>
                </span>
              </button>
              
              <button 
                @click="playTrackByName('Bila Nanti')" 
                class="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group text-left w-full"
              >
                <div class="flex items-center gap-3">
                  <img src="/nadin.jpg" class="w-9 h-9 rounded object-cover" />
                  <div>
                    <p class="text-sm font-semibold text-white">Bila Nanti</p>
                    <p class="text-xs text-secondary font-normal">Nadin Amizah</p>
                  </div>
                </div>
                <span class="text-xs text-[#2563EB] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Play Now <i class="ph ph-play-circle text-sm"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.lyrics-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C; /* Match sidebar background */
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-banner {
  flex-shrink: 0;
}

.lyrics-content-grid {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 2.5rem;
  gap: 3rem;
  overflow: hidden; /* Prevent parent from scrolling */
}

.left-section {
  width: 320px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}

.album-cover-wrapper {
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.verified-badge-overlay {
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
}

.progress-track {
  transition: background-color 0.2s;
}

.progress-track:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.progress-fill-active {
  transition: width 0.1s linear;
}

.progress-track:hover .progress-indicator {
  opacity: 1;
}

.active-underline {
  display: block;
  width: 50px;
  height: 4px;
  background-color: #2563EB;
  border-radius: 2px;
  position: absolute;
  bottom: -6px;
  left: 0;
}

.header-title-container h1 {
  font-size: 2.25rem !important; /* Larger Lyrics title */
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #FFFFFF;
}

.lyrics-scroll-container {
  flex: 1;
  overflow-y: auto; /* Enable scrolling for lyrics list only */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
  padding-bottom: 2rem;
}

.lyrics-scroll-container::-webkit-scrollbar {
  width: 5px;
}

.lyrics-scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
}

/* Album Metadata Styles */
.album-meta-info {
  margin-top: 1.5rem;
}

.album-title {
  font-size: 2.25rem !important; /* Larger text */
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
}

.artist-name {
  font-size: 1.125rem !important;
  color: #9CA3AF !important;
  margin-top: 0.75rem !important; /* Wider gap between album name and artist name */
}

/* Lyric Row Styles */
.lyric-line {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.5rem;
  margin-left: -0.5rem; /* Shift section left to align with Lyrics header */
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  position: relative;
}

.lyric-line:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.lyric-leading {
  display: flex;
  align-items: center;
  width: 100px;
  flex-shrink: 0;
  position: relative;
}

.caret-indicator {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563EB;
  margin-right: 8px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.lyric-line.active-line .caret-indicator {
  opacity: 1;
}

.lyric-time {
  font-size: 0.875rem;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s ease;
}

.lyric-line.active-line .lyric-time {
  color: #2563EB;
  font-weight: 700;
  font-size: 1.05rem; /* Larger active duration text */
}

.lyric-text {
  font-size: 1.25rem; /* Larger regular text on desktop */
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 1.2rem;
  transition: all 0.2s ease;
}

.lyric-line.active-line .lyric-text {
  color: #2563EB !important;
  font-weight: 700;
  font-size: 1.5rem; /* Larger active text on desktop */
}

/* Lyrics Label Alignment */
.lyrics-label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  margin-left: -0.5rem; /* Align left with lyric rows */
}

.lyrics-label .lyric-leading {
  width: 100px;
  flex-shrink: 0;
}

.lyrics-label .label-text {
  padding-left: 1.2rem;
}

.text-accent {
  color: #2563EB !important; /* Vibrant blue accent */
}

.active-text {
  font-size: 1.05rem; /* Slight scale up for active reading */
  text-shadow: 0 0 10px rgba(37, 99, 235, 0.15);
}

@media (max-width: 768px) {
  .lyrics-view {
    grid-column: 1;
    grid-row: 2;
    margin: 0;
    border-radius: 0;
    border: none;
    height: 100%;
  }

  .lyrics-content-grid {
    flex-direction: column !important;
    padding: 1.25rem !important;
    gap: 1rem !important;
    overflow: hidden;
  }

  .left-section {
    display: none !important; /* Hide album image/section on mobile */
  }

  .right-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .lyrics-scroll-container {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 150px !important;
  }

  .header-title-container h1 {
    font-size: 1.5rem !important;
  }

  .lyric-leading {
    width: 65px !important;
  }

  .lyric-text {
    font-size: 0.95rem !important;
    padding-left: 0.5rem !important;
  }

  .lyric-line.active-line .lyric-text {
    font-size: 1.15rem !important;
  }

  .lyrics-label .lyric-leading {
    width: 65px !important;
  }

  .lyrics-label .label-text {
    padding-left: 0.5rem !important;
  }
}
</style>
