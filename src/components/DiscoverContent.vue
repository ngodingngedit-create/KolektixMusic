<script setup>
import { ref } from 'vue'

const activeCategory = ref('All')
const categories = ['All', 'Genres', 'Moods', 'Activities', 'Decades']

const genres = [
  { name: 'Pop', count: '1,245 playlists', icon: 'ph-microphone-stage', gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' },
  { name: 'Rock', count: '986 playlists', icon: 'ph-guitar', gradient: 'linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%)' },
  { name: 'Indie', count: '642 playlists', icon: 'ph-star', gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)' },
  { name: 'Hip Hop', count: '1,102 playlists', icon: 'ph-boombox', gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)' },
  { name: 'R&B', count: '532 playlists', icon: 'ph-heart', gradient: 'linear-gradient(135deg, #D946EF 0%, #4C1D95 100%)' },
  { name: 'Electronic', count: '879 playlists', icon: 'ph-waves', gradient: 'linear-gradient(135deg, #10B981 0%, #064E3B 100%)' },
  { name: 'Jazz', count: '412 playlists', icon: 'ph-music-note', gradient: 'linear-gradient(135deg, #F97316 0%, #7C2D12 100%)' },
  { name: 'K-Pop', count: '743 playlists', icon: 'ph-sparkles', gradient: 'linear-gradient(135deg, #FF69B4 0%, #C71585 100%)' },
  { name: 'Acoustic', count: '398 playlists', icon: 'ph-waveform', gradient: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)' },
  { name: 'Alternative', count: '563 playlists', icon: 'ph-lightning', gradient: 'linear-gradient(135deg, #84CC16 0%, #3F6212 100%)' },
  { name: 'Metal', count: '286 playlists', icon: 'ph-hand-horns', gradient: 'linear-gradient(135deg, #4B5563 0%, #111827 100%)' },
  { name: 'Reggae', count: '245 playlists', icon: 'ph-sun', gradient: 'linear-gradient(135deg, #10B981 0%, #B45309 100%)' },
  { name: 'Latin', count: '512 playlists', icon: 'ph-music-notes', gradient: 'linear-gradient(135deg, #F43F5E 0%, #9F1239 100%)' },
  { name: 'Country', count: '233 playlists', icon: 'ph-house-line', gradient: 'linear-gradient(135deg, #D97706 0%, #451A03 100%)' },
  { name: 'Classical', count: '412 playlists', icon: 'ph-piano', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }
]

const recommendedPlaylists = [
  { name: "Today's Top Hits", count: '50 songs', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Chill Vibes', count: '48 songs', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Workout Hits', count: '36 songs', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Night Drive', count: '42 songs', img: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Focus Flow', count: '30 songs', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Party Starter', count: '51 songs', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Morning Boost', count: '35 songs', img: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&fit=crop&q=80&w=250&h=250' },
  { name: 'Sad Songs', count: '40 songs', img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=250&h=250' }
]

const newReleases = [
  { title: 'To the Bone', artist: 'Pamungkas', meta: '10 Songs • 32 Min', img: '/pamungkas.jpg', explicit: true },
  { title: 'Bila Nanti', artist: 'Nadin Amizah', meta: '1 Song • 4 Min', img: '/nadin.jpg' },
  { title: 'Lagipula Hidup Akan Berakhir', artist: 'Hindia', meta: '14 Songs • 48 Min', img: '/album_hindia.png', explicit: true },
  { title: 'Nalar', artist: 'Fiersa Besari', meta: '11 Songs • 37 Min', img: '/pamungkas.jpg' },
  { title: 'Sialnya, Hidup Harus Tetap Berjalan', artist: 'Bernadya', meta: '13 Songs • 39 Min', img: '/album_bernadya2.png' }
]

const recommendedScrollContainer = ref(null)
const releasesScrollContainer = ref(null)

const scrollLeft = (el) => {
  if (el) {
    el.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const scrollRight = (el) => {
  if (el) {
    el.scrollBy({ left: 300, behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="discover-content">
    <!-- Header Title -->
    <div class="discover-header-section flex flex-col mb-8">
      <h1 class="discover-title text-5xl font-bold mb-6">Discover</h1>
      
      <!-- Category Pills -->
      <div class="categories-wrapper">
        <div class="categories flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            @click="activeCategory = cat"
            :class="{ 'active-category': activeCategory === cat }"
            class="category-btn shrink-0"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- Section 1: Browse by Genre -->
    <section class="mb-12 browse-genre-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Browse by Genre</h3>
        <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
      </div>
      <div class="genre-grid">
        <div 
          v-for="genre in genres" 
          :key="genre.name" 
          class="genre-card cursor-pointer group"
          :style="{ background: genre.gradient }"
        >
          <div class="genre-card-overlay"></div>
          <div class="genre-card-content flex flex-col justify-between h-full p-4 relative z-10">
            <div class="genre-icon-wrapper flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/10 group-hover:scale-110 transition-transform">
              <i class="ph text-lg text-white" :class="genre.icon"></i>
            </div>
            <div class="genre-info text-left">
              <h4 class="genre-name text-base font-bold text-white tracking-tight">{{ genre.name }}</h4>
              <p class="genre-playlists-count text-[11px] text-white/70 font-medium mt-0.5">{{ genre.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Recommended Playlists -->
    <section class="mb-12 recommended-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Recommended Playlists</h3>
        <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
      </div>
      <div class="playlists-container-wrapper relative">
        <div ref="recommendedScrollContainer" class="playlists-grid flex overflow-x-auto gap-6 pb-4">
          <div 
            v-for="playlist in recommendedPlaylists" 
            :key="playlist.name" 
            class="playlist-card group cursor-pointer shrink-0"
          >
            <div class="playlist-cover-wrapper relative aspect-square rounded-xl overflow-hidden mb-3">
              <img :src="playlist.img" :alt="playlist.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="playlist-hover-overlay"></div>
              
              <!-- Top Left Kolektix Logo Overlay -->
              <div class="playlist-brand-badge flex items-center justify-center bg-accent-blue w-6 h-6 rounded-md border border-white/10">
                <i class="ph ph-fill ph-music-notes-simple text-white text-xs"></i>
              </div>
              
              <!-- Floating Play Button -->
              <div class="playlist-play-btn flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-lg">
                <i class="ph ph-fill ph-play text-sm ml-0.5"></i>
              </div>
            </div>
            
            <div class="playlist-meta text-left">
              <h4 class="text-sm font-semibold text-white truncate">{{ playlist.name }}</h4>
              <p class="text-xs text-secondary mt-0.5">{{ playlist.count }}</p>
            </div>
          </div>
        </div>
        <!-- Scroll navigation arrows -->
        <div @click="scrollLeft(recommendedScrollContainer)" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg text-white"></i>
        </div>
        <div @click="scrollRight(recommendedScrollContainer)" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-right text-lg text-white"></i>
        </div>
      </div>
    </section>

    <!-- Section 3: New Releases -->
    <section class="mb-12 new-releases-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">New Releases</h3>
        <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
      </div>
      <div class="releases-container-wrapper relative">
        <div ref="releasesScrollContainer" class="releases-grid flex overflow-x-auto gap-6 pb-4">
          <div 
            v-for="item in newReleases" 
            :key="item.title" 
            class="release-card group cursor-pointer shrink-0 flex items-center gap-4"
          >
            <div class="release-cover-wrapper w-16 h-16 rounded-lg overflow-hidden shrink-0 relative border border-white/5">
              <img :src="item.img" :alt="item.title" class="w-full h-full object-cover" />
              <div class="release-hover-overlay bg-black/40 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="ph ph-fill ph-play text-white text-xs"></i>
              </div>
            </div>
            <div class="release-info text-left min-w-0">
              <h4 class="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                {{ item.title }}
                <span v-if="item.explicit" class="explicit-tag">E</span>
              </h4>
              <p class="text-xs text-secondary mt-0.5 truncate">{{ item.artist }}</p>
              <p class="text-[10px] text-secondary mt-1">{{ item.meta }}</p>
            </div>
          </div>
        </div>
        <!-- Scroll navigation arrows -->
        <div @click="scrollLeft(releasesScrollContainer)" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg text-white"></i>
        </div>
        <div @click="scrollRight(releasesScrollContainer)" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-right text-lg text-white"></i>
        </div>
      </div>
    </section>

    <!-- Bottom Spacing -->
    <div style="height: 100px;"></div>
  </main>
</template>

<style scoped>
.discover-content {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  background-color: #0B0E14; /* Deep charcoal discover background */
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  min-width: 0;
  overflow-x: hidden;
  transition: all 0.3s ease;
}

.discover-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

/* Category Filters */
.categories-wrapper {
  position: relative;
  width: 100%;
}

.categories {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.category-btn {
  background: rgba(255, 255, 255, 0.03);
  color: #9CA3AF;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.category-btn:hover {
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.06);
}

.category-btn.active-category {
  background-color: #2563EB; /* Active Accent Blue */
  color: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.section-header h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #FFFFFF;
}

/* Section 1: Browse by Genre (5-columns on desktop) */
.genre-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.25rem;
}

.genre-card {
  position: relative;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.genre-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.genre-card-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, rgba(255,255,255,0.05) 0%, transparent 70%),
              linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%);
  z-index: 1;
}

.genre-playlists-count {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* Section 2: Recommended Playlists */
.playlists-container-wrapper, .releases-container-wrapper {
  position: relative;
  width: auto;
  margin-right: -1.5rem;
}

.playlists-grid, .releases-grid {
  width: 100%;
  scroll-behavior: smooth;
}

.playlist-card {
  width: 180px;
  transition: transform 0.3s ease;
}

.playlist-card:hover {
  transform: translateY(-4px);
}

.playlist-brand-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.playlist-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.playlist-card:hover .playlist-hover-overlay {
  opacity: 1;
}

.playlist-play-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 10;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.playlist-card:hover .playlist-play-btn {
  opacity: 1;
  transform: translateY(0);
}

.playlist-play-btn:hover {
  transform: scale(1.08) !important;
}

.scroll-arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  z-index: 30;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease;
}

.scroll-arrow-left {
  left: 1rem;
}

.scroll-arrow-right {
  right: 2.5rem;
}

.scroll-arrow:hover {
  transform: translateY(-50%) scale(1.05);
}

.playlists-container-wrapper:hover .scroll-arrow,
.releases-container-wrapper:hover .scroll-arrow {
  opacity: 1;
  pointer-events: auto;
}

/* Section 3: New Releases */
.release-card {
  width: 280px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.release-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.explicit-tag {
  background-color: rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  font-size: 8px;
  font-weight: 700;
  padding: 1px 3px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 12px;
  line-height: 1;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .genre-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 900px) {
  .genre-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 768px) {
  .discover-content {
    padding: 2rem 1rem 7rem 1rem;
    margin: 0;
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: #0B0E14; /* Deep discover background on mobile */
  }

  .discover-title {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
  }

  /* Genre collapses to a tight 2-column layout */
  .genre-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.75rem;
  }

  .genre-card {
    height: 90px;
  }

  .scroll-arrow {
    display: none; /* Hide arrows on mobile screens */
  }

  .playlists-container-wrapper, .releases-container-wrapper {
    margin-right: -1rem;
  }

  .playlist-card {
    width: 140px;
  }

  .release-card {
    width: 240px;
  }
}
</style>
