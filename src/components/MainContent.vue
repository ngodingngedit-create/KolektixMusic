<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const mixesGridRef = ref(null)
const recentGridRef = ref(null)

const activeCategory = ref('All')
const categories = [
  'All',
  'New Releases',
  'Top Charts',
  'Indie',
  'Pop',
  'Rock',
  'Hip Hop',
  'Chill',
  '...'
]

const featuredArtists = [
  {
    name: 'Pamungkas',
    role: 'Singer, Songwriter, & Producer',
    location: 'Jakarta, Indonesia',
    listeners: '1.2M Monthly Listeners',
    img: '/pamungkas.jpg',
    verified: true,
    latestRelease: {
      title: 'To the Bone',
      artist: 'Pamungkas',
      meta: '10 Songs • 32 Min',
      desc: 'Album baru dari Pamungkas berisi 10 lagu dengan cerita tentang perjalanan, kehilangan, dan menemukan diri sendiri.',
      img: '/album_to_the_bone.jpg'
    }
  },
  {
    name: 'Nadin Amizah',
    role: 'Singer & Songwriter',
    location: 'Bandung, Indonesia',
    listeners: '950K Monthly Listeners',
    img: '/nadin.jpg',
    verified: true,
    latestRelease: {
      title: 'Bila Nanti',
      artist: 'Nadin Amizah',
      meta: '1 Song • 4 Min',
      desc: 'Single menyayat hati menceritakan tentang perpisahan yang mendalam dan cara mengikhlaskan seseorang.',
      img: '/nadin.jpg'
    }
  },
  {
    name: 'Hindia',
    role: 'Singer, Composer & Producer',
    location: 'Jakarta, Indonesia',
    listeners: '1.5M Monthly Listeners',
    img: '/album_hindia.png',
    verified: true,
    latestRelease: {
      title: 'Lagipula Hidup Akan Berakhir',
      artist: 'Hindia',
      meta: '14 Songs • 48 Min',
      desc: 'Album evaluasi kritis tentang kehidupan urban, krisis eksistensial, dan pergulatan sosial oleh Hindia.',
      img: '/album_hindia.png'
    }
  }
]

const currentArtistIndex = ref(0)
let carouselTimer = null

const nextArtist = () => {
  currentArtistIndex.value = (currentArtistIndex.value + 1) % featuredArtists.length
}

const prevArtist = () => {
  currentArtistIndex.value = (currentArtistIndex.value - 1 + featuredArtists.length) % featuredArtists.length
}

onMounted(() => {
  carouselTimer = setInterval(nextArtist, 7000) // auto rotate every 7s
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
})

const topMixes = [
  {
    title: 'Punk Mix',
    genre: 'Rock',
    artists: 'Stand Here Alone, Threesixty, and more',
    img: '/mix_punk.png',
    color: '#341A4C',
    logoBg: '#A06AF2'
  },
  {
    title: 'Indie Mix',
    genre: 'Indie',
    artists: 'Pamungkas, Hindia, Feast, Nadin Amizah and more',
    img: '/mix_indie.png',
    color: '#8C3F2B',
    logoBg: '#C37299'
  },
  {
    title: 'Pop Mix',
    genre: 'Pop',
    artists: 'Billie Eilish, Justin Bieber, Bruno Mars and more',
    img: '/mix_pop.png',
    color: '#132845',
    logoBg: '#4A90E2'
  },
  {
    title: 'Chill Mix',
    genre: 'Chill',
    artists: 'keshi, Lauv, NIKI, dan Ardhito Pramono',
    img: '/mix_chill.png',
    color: '#273C3F',
    logoBg: '#8FAAA6'
  },
  {
    title: 'Hip Hop Mix',
    genre: 'Hip Hop',
    artists: 'Rich Brian, NIKI, RAMENGVRL, TUAN TIGABELAS and more',
    img: '/mix_hiphop.png',
    color: '#5C381E',
    logoBg: '#E07B53'
  },
  {
    title: 'Acoustic Mix',
    genre: 'Acoustic',
    artists: 'Pamungkas, Kunto Aji, Tulus, Fourtwnty and more',
    img: '/mix_acoustic.png',
    color: '#423229',
    logoBg: '#C2A392'
  },
  {
    title: 'Synthwave Mix',
    genre: 'Electronic',
    artists: 'Lazerhawk, Kavinsky, The Midnight',
    img: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#5C1D42',
    logoBg: '#FF4D80'
  },
  {
    title: 'R&B Mix',
    genre: 'R&B',
    artists: 'The Weeknd, SZA, Frank Ocean, Khalid',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#3C2018',
    logoBg: '#D17C64'
  },
  {
    title: 'Indie Folk Mix',
    genre: 'Folk',
    artists: 'Bon Iver, Fleet Foxes, Phoebe Bridgers',
    img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#2B3C2A',
    logoBg: '#7FA87B'
  },
  {
    title: 'Metal Mix',
    genre: 'Metal',
    artists: 'Metallica, System of a Down, Slipknot',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#2A2B2F',
    logoBg: '#8A8C90'
  },
  {
    title: 'Jazzy Mix',
    genre: 'Jazz',
    artists: 'Miles Davis, John Coltrane, Bill Evans',
    img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#3D2C1F',
    logoBg: '#EAA15F'
  },
  {
    title: 'Classical Mix',
    genre: 'Classical',
    artists: 'Beethoven, Mozart, Bach, Chopin',
    img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#1F2E3D',
    logoBg: '#5FA6EA'
  },
  {
    title: 'Reggae Mix',
    genre: 'Reggae',
    artists: 'Bob Marley, Damien Marley, Jimmy Cliff',
    img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#263D1F',
    logoBg: '#7AEA5F'
  },
  {
    title: 'Latin Mix',
    genre: 'Latin',
    artists: 'Bad Bunny, J Balvin, Shakira, Daddy Yankee',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#3D1F26',
    logoBg: '#EA5F7A'
  },
  {
    title: 'Blues Mix',
    genre: 'Blues',
    artists: 'B.B. King, Muddy Waters, Eric Clapton',
    img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#1F3D38',
    logoBg: '#5FEAD1'
  },
  {
    title: 'Lofi Beats',
    genre: 'Chill',
    artists: 'Lofi Girl, ChilledCow, Feardog, Kudasai',
    img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=250&h=250',
    color: '#2C1F3D',
    logoBg: '#A85FEA'
  }
]

const bestNewSongs = [
  // Column 1
  { title: 'the cure', artist: 'Olivia Rodrigo', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=120&h=120', explicit: true },
  { title: 'SS26', artist: 'Charli xcx', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'STOP', artist: 'Bella Kay', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'Barbie Doll', artist: 'Hurricane Wisdom, Chance the Rapper', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=120&h=120', explicit: true },
  // Column 2
  { title: 'From Down Here', artist: 'Lola Young', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'Thick One (feat. Skilla Baby) [Remix]', artist: '42 Dugg, Kash Doll', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=120&h=120', explicit: true },
  { title: 'All That Matters', artist: '6LACK, AZ Chike, Leon Thomas', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=120&h=120', explicit: true },
  { title: 'Life On The Run', artist: 'Brandi Carlile', img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=120&h=120' },
  // Column 3
  { title: 'ONE of ONE', artist: 'Master Peace', img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'All The Best', artist: 'Ingrid Andress', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'Goals', artist: 'LISA, Anitta, Rema', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=120&h=120' },
  { title: 'End of an Era', artist: 'Niall Horan', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=120&h=120' }
]

const songColumns = computed(() => {
  const cols = []
  for (let i = 0; i < bestNewSongs.length; i += 4) {
    cols.push(bestNewSongs.slice(i, i + 4))
  }
  return cols
})

const recentlyPlayed = [
  { name: 'To the Bone', artist: 'Pamungkas', img: '/album_to_the_bone.jpg' },
  { name: 'Bila Nanti', artist: 'Nadin Amizah', img: '/nadin.jpg' },
  { name: 'Lagipula Hidup Akan Berakhir', artist: 'Hindia', img: '/album_hindia.png' },
  { name: 'Sialnya, Hidup Bernadya', artist: 'Bernadya', img: '/album_bernadya1.png' },
  { name: 'Sialnya, Hidup Harus Tetap Berjalan', artist: 'Bernadya', img: '/album_bernadya2.png' },
  { name: 'Berhati', artist: 'Sal Priadi', img: '/album_sal_priadi.png' },
  { name: 'Nalar', artist: 'Fiersa Besari', img: '/album_to_the_bone.jpg' },
  { name: 'Tutur Batin', artist: 'Yura Yunita', img: '/nadin.jpg' }
]

const isLatestReleaseExpanded = ref(false)
const toggleLatestRelease = () => {
  isLatestReleaseExpanded.value = !isLatestReleaseExpanded.value
}

const scrollMixesLeft = () => {
  if (mixesGridRef.value) {
    mixesGridRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollMixesRight = () => {
  if (mixesGridRef.value) {
    mixesGridRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

const scrollRecentLeft = () => {
  if (recentGridRef.value) {
    recentGridRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollRecentRight = () => {
  if (recentGridRef.value) {
    recentGridRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="main-content">
    <!-- Hero Banner Carousel with smooth transitions -->
    <div class="hero-banner flex mb-8">
      <div class="hero-inner-wrapper flex w-full">
        <!-- Left side: Artist info -->
        <div class="hero-artist-info flex flex-col justify-center">
          <div class="verified-badge flex items-center gap-1.5 text-xs font-semibold mb-4">
            <i class="ph ph-fill ph-check-circle text-sm"></i> VERIFIED ARTIST
          </div>
          
          <!-- Dynamic text transitions -->
          <div class="artist-text-wrapper" style="min-height: 140px;">
            <transition name="hero-fade" mode="out-in">
              <div :key="currentArtistIndex">
                <h1 class="artist-name text-5xl font-bold mb-2">{{ featuredArtists[currentArtistIndex].name }}</h1>
                <p class="role-location text-secondary text-sm mb-4">
                  {{ featuredArtists[currentArtistIndex].role }}<br>{{ featuredArtists[currentArtistIndex].location }}
                </p>
                <p class="listeners text-sm font-semibold mb-6">{{ featuredArtists[currentArtistIndex].listeners }}</p>
              </div>
            </transition>
          </div>
          
          <div class="hero-actions desktop-actions flex gap-4">
            <button class="btn btn-primary px-8">
              <i class="ph ph-fill ph-play text-sm"></i> Play
            </button>
            <button class="btn btn-outline px-8">Follow</button>
            <button class="btn btn-outline px-3"><i class="ph ph-dots-three text-lg"></i></button>
          </div>
        </div>

        <!-- Center: Image -->
        <div class="hero-image-wrapper flex-1 relative">
          <transition name="hero-fade" mode="out-in">
            <img :key="currentArtistIndex" :src="featuredArtists[currentArtistIndex].img" class="hero-img" :alt="featuredArtists[currentArtistIndex].name"/>
          </transition>
        </div>

        <!-- Mobile actions: displayed only below photo on mobile -->
        <div class="hero-actions mobile-actions flex gap-3">
          <button class="btn btn-primary flex-1">
            <i class="ph ph-fill ph-play text-sm"></i> Play
          </button>
          <button class="btn btn-outline flex-1">Follow</button>
          <button class="btn btn-outline px-3"><i class="ph ph-dots-three text-lg"></i></button>
        </div>

        <!-- Right side: Latest Release -->
        <div class="latest-release-container flex flex-col">
          <div class="latest-release-header flex justify-between items-center mb-3">
            <span class="text-xs text-secondary font-bold uppercase tracking-wider">Latest Release</span>
            <div class="header-nav-arrows flex items-center gap-2">
              <button @click.stop="prevArtist" class="arrow-btn text-secondary hover:text-white transition-colors" title="Previous Artist">
                <i class="ph ph-caret-left"></i>
              </button>
              <button @click.stop="nextArtist" class="arrow-btn text-secondary hover:text-white transition-colors" title="Next Artist">
                <i class="ph ph-caret-right"></i>
              </button>
              <button @click.stop="toggleLatestRelease" class="expand-btn text-secondary hover:text-white transition-colors">
                <i class="ph" :class="isLatestReleaseExpanded ? 'ph-caret-up' : 'ph-caret-down'"></i>
              </button>
            </div>
          </div>
          <div class="latest-release-card glass-panel p-4 flex flex-col justify-between" :class="{ 'expanded': isLatestReleaseExpanded }">
            <transition name="hero-fade" mode="out-in">
              <div :key="currentArtistIndex" class="flex flex-col h-full justify-between">
                <div class="flex items-center gap-4 mb-3">
                  <img :src="featuredArtists[currentArtistIndex].latestRelease.img" class="latest-album-art w-16 h-16 rounded-md object-cover" :alt="featuredArtists[currentArtistIndex].latestRelease.title" />
                  <div>
                    <h5 class="album-title text-sm font-bold">{{ featuredArtists[currentArtistIndex].latestRelease.title }}</h5>
                    <p class="album-artist text-xs text-secondary">{{ featuredArtists[currentArtistIndex].latestRelease.artist }}</p>
                    <p class="album-meta text-xs text-secondary mt-1">{{ featuredArtists[currentArtistIndex].latestRelease.meta }}</p>
                  </div>
                </div>
                <p class="album-desc text-xs text-secondary mb-4 leading-relaxed">
                  {{ featuredArtists[currentArtistIndex].latestRelease.desc }}
                </p>
                <button class="btn btn-outline w-full text-xs listen-now-btn">Listen Now</button>
              </div>
            </transition>
          </div>
        </div>
        
        <!-- Small centered carousel indicators -->
        <div class="hero-indicators-centered flex gap-1.5 justify-center">
          <button 
            v-for="(artist, idx) in featuredArtists" 
            :key="idx" 
            @click="currentArtistIndex = idx"
            :class="{ 'active': currentArtistIndex === idx }"
            class="indicator-dot-small"
            :title="'Go to ' + artist.name"
          ></button>
        </div>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="categories-wrapper mb-10">
      <div class="categories flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          @click="activeCategory = cat"
          :class="{ 'active-category': activeCategory === cat }"
          class="category-btn"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Your Top Mixes Section -->
    <section class="mb-10 mixes-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Your Top Mixes</h3>
        <a href="#" class="text-sm text-accent font-semibold hover:underline">View All</a>
      </div>
      <div class="mixes-container-wrapper relative">
        <div ref="mixesGridRef" class="mixes-grid flex overflow-x-auto gap-6 pb-4">
          <div 
            v-for="mix in topMixes" 
            :key="mix.title" 
            class="mix-card group cursor-pointer shrink-0"
            :style="{ '--mix-color': mix.color }"
          >
            <!-- Card Image Area (top part) -->
            <div class="card-img-area">
              <img :src="mix.img" class="card-cover-image" :alt="mix.title" />
              <div class="card-image-overlay"></div>
              
              <!-- Branding Badge: small logo Kolektix at the top-left corner -->
              <div class="card-top-logo-clean">
                <div class="k-logo-mini" :style="{ backgroundColor: mix.logoBg }">K</div>
              </div>
              
              <!-- Floating Play button on image hover -->
              <div class="card-play-btn">
                <i class="ph ph-fill ph-play text-white"></i>
              </div>
            </div>
            
            <!-- Card Info Panel (bottom part) -->
            <div class="card-info-panel">
              <h4 class="mix-title truncate">{{ mix.title }}</h4>
              <p class="mix-artists truncate">{{ mix.artists }}</p>
            </div>
          </div>
        </div>
        <div @click="scrollMixesLeft" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg"></i>
        </div>
        <div @click="scrollMixesRight" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-right text-lg"></i>
        </div>
      </div>
    </section>

    <!-- Best New Songs Section -->
    <section class="mb-10 best-songs-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
          Best New Songs <i class="ph ph-caret-right text-base text-secondary"></i>
        </h3>
      </div>
      <div class="best-songs-grid grid gap-x-8 gap-y-2">
        <div v-for="(col, colIdx) in songColumns" :key="colIdx" class="song-column flex flex-col gap-3">
          <div 
            v-for="song in col" 
            :key="song.title" 
            class="song-row flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="song-row-img-wrapper relative w-8 h-8 rounded overflow-hidden shrink-0">
                <img :src="song.img" :alt="song.title" class="w-full h-full object-cover" />
                <!-- Play Button Overlay on Hover -->
                <div class="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i class="ph ph-fill ph-play text-white text-xs"></i>
                </div>
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                  {{ song.title }}
                  <span v-if="song.explicit" class="explicit-badge shrink-0">E</span>
                </h4>
                <p class="text-xs text-secondary truncate mt-0.5">{{ song.artist }}</p>
              </div>
            </div>
            <button class="btn-icon text-secondary hover:text-white ml-2 shrink-0">
              <i class="ph ph-dots-three text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Played Section -->
    <section class="mb-10 recently-played-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Recently Played</h3>
      </div>
      <div class="recently-played-wrapper relative">
        <div ref="recentGridRef" class="recently-played-grid flex overflow-x-auto gap-6 pb-4">
          <div v-for="item in recentlyPlayed" :key="item.name" class="recent-card group cursor-pointer shrink-0">
            <div class="img-wrapper relative rounded-lg overflow-hidden mb-3 aspect-square">
              <img :src="item.img" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <!-- Play Button Overlay -->
              <div class="play-btn-overlay absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <i class="ph ph-fill ph-play text-white text-xs ml-0.5"></i>
              </div>
            </div>
            <div class="recent-info">
              <h4 class="text-sm font-semibold truncate recent-title">{{ item.name }}</h4>
              <p class="text-xs text-secondary recent-artist mt-0.5 truncate">{{ item.artist }}</p>
            </div>
          </div>
        </div>
        <div @click="scrollRecentLeft" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg"></i>
        </div>
        <div @click="scrollRecentRight" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-right text-lg"></i>
        </div>
      </div>
    </section>

    <div style="height: 100px;"></div>
  </main>
</template>

<style scoped>
.main-content {
  padding: 1.25rem 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  height: calc(100% - 1rem);
  margin: 0.25rem 1.5rem 0.75rem 0.25rem;
  background-color: #1A1A1C;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  min-width: 0;
  overflow-x: hidden;
  transition: all 0.3s ease;
}

/* Hero Banner Layout */
.hero-banner {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(18, 18, 18, 0.6) 100%),
              radial-gradient(circle at 70% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 60%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 400px;
  backdrop-filter: blur(20px);
}

.hero-inner-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

/* Hero Transition animations */
.hero-fade-enter-active, .hero-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-fade-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.hero-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.hero-indicators-centered {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  gap: 6px;
}

.indicator-dot-small {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}

.indicator-dot-small:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.indicator-dot-small.active {
  background-color: #2563EB;
  transform: scale(1.25);
}

.hero-artist-info {
  flex: 1.2;
  padding: 3rem;
  z-index: 10;
  position: relative;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #3B82F6;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.artist-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.role-location {
  color: #9CA3AF;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.listeners {
  color: #FFFFFF;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.hero-actions .btn {
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background-color: #2563EB;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #1D4ED8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
}

.btn-outline {
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-dots {
  border-radius: 50%;
  aspect-ratio: 1/1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Hero Image Wrapper */
.hero-image-wrapper {
  position: absolute;
  top: 0;
  left: 35%;
  right: 25%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
}

/* Latest Release Card */
.latest-release-container {
  width: 320px;
  padding: 2rem;
  z-index: 10;
  position: relative;
  background: rgba(18, 18, 18, 0.4);
  backdrop-filter: blur(30px);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
}

.latest-release-header {
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
}

.header-nav-arrows {
  display: flex;
}

.arrow-btn, .expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.expand-btn {
  display: none;
}

.latest-release-card {
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
}

.latest-album-art {
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
  border-radius: 8px;
}

.album-title {
  color: #FFFFFF;
}

.album-artist {
  margin-top: 2px;
}

.album-meta {
  font-size: 0.75rem;
}

.album-desc {
  line-height: 1.6;
}

.listen-now-btn {
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: auto;
}

/* Category Filters */
.categories-wrapper {
  position: relative;
  width: 100%;
}

.categories {
  display: flex;
  gap: 1.25rem;
  width: 100%;
}

.category-btn {
  background: transparent;
  color: #9CA3AF;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.category-btn:hover {
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.03);
}

.category-btn.active-category {
  background-color: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

/* Section Styling */
.section-header h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Mixes Section Layout */
.mixes-container-wrapper, .recently-played-wrapper {
  position: relative;
  width: auto;
  margin-right: -1.5rem;
}

.mixes-grid, .recently-played-grid {
  width: 100%;
  scroll-behavior: smooth;
}

.mix-card {
  position: relative;
  width: 220px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  overflow: visible;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mix-card:hover {
  transform: translateY(-6px);
}

.card-img-area {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.3s ease;
}

.mix-card:hover .card-img-area {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
}

.card-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mix-card:hover .card-cover-image {
  transform: scale(1.08);
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mix-card:hover .card-image-overlay {
  opacity: 1;
}

.card-top-logo-clean {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
}

.k-logo-mini {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 900;
  font-size: 9px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.card-play-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--accent-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  z-index: 10;
}

.card-play-btn i {
  font-size: 14px;
  margin-left: 2px;
}

.mix-card:hover .card-play-btn {
  opacity: 1;
  transform: translateY(0);
}

.card-play-btn:hover {
  background-color: var(--accent-blue-hover);
  transform: scale(1.1) !important;
}

.card-info-panel {
  padding: 8px 0 0 0;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.mix-card .mix-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2px;
}

.mix-card .mix-artists {
  font-size: 0.65rem;
  color: #9CA3AF;
  line-height: 1.3;
}

.recent-card {
  width: 180px;
  flex-shrink: 0;
}

.img-wrapper {
  position: relative;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.play-btn-overlay {
  transform: translateY(4px);
}

.group:hover .play-btn-overlay {
  opacity: 1;
  transform: translateY(0);
}

.scroll-arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  z-index: 30;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  display: flex;
}

.scroll-arrow-left {
  left: 1.5rem;
}

.scroll-arrow-right {
  right: 1.5rem;
}

.scroll-arrow:hover {
  transform: translateY(-50%) scale(1.05);
}

/* Text and Titles */
.mix-title, .recent-title {
  color: #FFFFFF;
}

.mix-genre, .mix-artists, .recent-artist {
  color: #9CA3AF;
  font-size: 0.75rem;
}

.mix-artists {
  line-height: 1.4;
}

.mobile-actions {
  display: none;
}

/* Responsive Rules */

@media (max-width: 900px) {
  .main-content {
    padding: 1.25rem 1.5rem 2rem 1.5rem;
  }
  .hero-artist-info {
    padding: 2.5rem;
  }
  .hero-image-wrapper {
    left: 45%;
    right: 30%;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 2rem 1rem 7rem 1rem;
    margin: 0;
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: #121212;
    overflow-y: auto;
  }
  
  /* Mobile Hero Banner layout (Vertical Stack) */
  .hero-banner {
    min-height: auto;
    border-radius: 16px;
    background: linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(18, 18, 18, 0.8) 100%);
  }
  .hero-inner-wrapper {
    flex-direction: column;
    height: auto;
  }

  .hero-artist-info {
    flex: none;
    padding: 1.5rem;
    text-align: center;
    width: 100%;
    order: 1;
  }

  .artist-name {
    font-size: 2.75rem;
  }

  .desktop-actions {
    display: none;
  }

  .mobile-actions {
    display: flex;
    margin-top: 1.5rem;
    width: 100%;
    order: 3;
    padding: 0 1.5rem;
  }

  .hero-image-wrapper {
    position: relative;
    left: 0;
    right: 0;
    width: 100%;
    height: 280px;
    order: 2;
    mask-image: none;
    -webkit-mask-image: none;
    border-radius: 12px;
    overflow: hidden;
    padding: 0 1.5rem;
  }

  .hero-img {
    border-radius: 12px;
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }

  /* Latest release becomes expandable below actions */
  .latest-release-container {
    width: 100%;
    order: 4;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    background: transparent;
    padding: 1.25rem 1.5rem;
  }

  .latest-release-header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .expand-btn {
    display: flex;
  }

  .latest-release-card {
    height: 0;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
  }

  .latest-release-card.expanded {
    height: auto;
    opacity: 1;
    padding-top: 1rem;
    margin-top: 0.5rem;
  }

  /* Swipeable Categories */
  .categories-wrapper {
    margin-bottom: 2rem;
  }

  .category-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px; /* pill-shaped */
    font-size: 0.8rem;
  }

  /* Horizontally Scrollable list for mixes and recently played */
  .mix-card {
    width: 150px;
    height: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    overflow: visible;
  }

  .card-img-area {
    height: 150px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  }

  .card-play-btn {
    opacity: 1 !important;
    transform: none !important;
    width: 28px;
    height: 28px;
    right: 8px;
    bottom: 8px;
  }

  .card-play-btn i {
    font-size: 10px;
  }

  .card-info-panel {
    padding: 6px 0 0 0;
    background: transparent;
  }

  .mix-card .mix-title {
    font-size: 0.8rem;
  }

  .mix-card .mix-artists {
    font-size: 0.6rem;
  }

  .recent-card {
    width: 110px;
  }

  .scroll-arrow {
    display: none; /* Hide scroll navigation arrows on touch screens */
  }

  .mixes-grid, .recently-played-grid {
    padding-bottom: 0.5rem;
  }
  .mixes-container-wrapper, .recently-played-wrapper {
    margin-right: -1rem;
  }
}

@media (max-width: 480px) {
  .artist-name {
    font-size: 2.25rem;
  }
  .hero-image-wrapper {
    height: 220px;
  }
}

/* Best New Songs Section styling */
.best-songs-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.song-row {
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.song-row:hover {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.02);
}

.song-row-img-wrapper {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.2s ease;
}

.song-row:hover .song-row-img-wrapper {
  transform: scale(1.03);
}

.explicit-badge {
  background-color: rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  font-size: 9px;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  line-height: 1;
}

.play-overlay {
  transition: opacity 0.2s ease;
}

.play-overlay i {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

@media (max-width: 1024px) {
  .best-songs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 640px) {
  .best-songs-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
