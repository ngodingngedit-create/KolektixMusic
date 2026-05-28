<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const popularSearches = ['Pamungkas', 'Nadin Amizah', 'Hindia', 'Bernadya', 'To the Bone']
const trendingGenres = [
  { name: 'Pop', gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', icon: 'ph-microphone-stage' },
  { name: 'Rock', gradient: 'linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%)', icon: 'ph-guitar' },
  { name: 'Hip Hop', gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)', icon: 'ph-boombox' },
  { name: 'Indie', gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)', icon: 'ph-star' }
]

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <main class="search-content">
    <div class="search-header-section flex flex-col mb-8">
      <h1 class="search-title text-5xl font-bold mb-6">Search</h1>
      
      <!-- Premium Search Input -->
      <div class="search-bar-wrapper relative">
        <i class="ph ph-magnifying-glass search-icon absolute left-4 top-1/2 -translate-y-1/2 text-xl text-secondary animate-pulse-subtle"></i>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search music, events, artists..." 
          class="search-input w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue focus:bg-white/10 transition-all"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-white">
          <i class="ph ph-x text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Suggested Searches / Results -->
    <div v-if="!searchQuery" class="search-suggestions-section">
      <!-- Popular Searches -->
      <section class="mb-8">
        <h3 class="text-sm font-bold tracking-wider uppercase mb-3 text-secondary">Popular Searches</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="search in popularSearches" 
            :key="search"
            @click="searchQuery = search"
            class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            {{ search }}
          </button>
        </div>
      </section>

      <!-- Browse All Genres / Trending -->
      <section>
        <h3 class="text-sm font-bold tracking-wider uppercase mb-4 text-secondary">Browse All</h3>
        <div class="grid grid-cols-2 gap-4">
          <div 
            v-for="genre in trendingGenres" 
            :key="genre.name" 
            class="genre-card flex flex-col justify-between p-4 rounded-xl h-24 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            :style="{ background: genre.gradient }"
          >
            <i class="ph text-2xl text-white opacity-80" :class="genre.icon"></i>
            <span class="text-white font-bold text-lg text-left">{{ genre.name }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Dummy search results -->
    <div v-else class="search-results-section">
      <section>
        <h3 class="text-sm font-bold tracking-wider uppercase mb-3 text-secondary">Search Results for "{{ searchQuery }}"</h3>
        <div class="flex flex-col gap-3">
          <!-- Mock song result -->
          <div class="search-result-item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                <img src="/pamungkas.jpg" alt="Pamungkas" class="w-full h-full object-cover" />
              </div>
              <div class="text-left">
                <h4 class="text-sm font-semibold text-white">To the Bone</h4>
                <p class="text-xs text-secondary">Pamungkas</p>
              </div>
            </div>
            <i class="ph ph-play text-xl text-accent"></i>
          </div>

          <!-- Mock artist result -->
          <div class="search-result-item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                <img src="/nadin.jpg" alt="Nadin Amizah" class="w-full h-full object-cover" />
              </div>
              <div class="text-left">
                <h4 class="text-sm font-semibold text-white">Nadin Amizah</h4>
                <p class="text-xs text-secondary">Artist</p>
              </div>
            </div>
            <i class="ph ph-user text-xl text-secondary"></i>
          </div>
        </div>
      </section>
    </div>

    <!-- Bottom Spacing -->
    <div style="height: 120px;"></div>
  </main>
</template>

<style scoped>
.search-content {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  background-color: #1A1A1C;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  min-width: 0;
  overflow-x: hidden;
  transition: all 0.3s ease;
}

.search-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

.search-bar-wrapper {
  width: 100%;
}

.search-input {
  font-size: 0.95rem;
}

.search-input:focus {
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.2);
}

.genre-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.search-results-section {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .search-content {
    padding: 2rem 1rem 7rem 1rem;
    margin: 0;
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: #1A1A1C;
  }

  .search-title {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
  }
}
</style>
