<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const mixesGridRef = ref(null)
const recentGridRef = ref(null)
const albumsGridRef = ref(null)
const liveGridRef = ref(null)

const emit = defineEmits(['select-album'])

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
      img: '/pamungkas.jpg'
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
  { title: 'the cure', artist: 'Olivia Rodrigo', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=120&h=120', explicit: true, plays: '4.8M' },
  { title: 'SS26', artist: 'Charli xcx', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=120&h=120', plays: '950K' },
  { title: 'STOP', artist: 'Bella Kay', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=120&h=120', plays: '1.2M' },
  { title: 'Barbie Doll', artist: 'Hurricane Wisdom, Chance the Rapper', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=120&h=120', explicit: true, plays: '2.5M' },
  // Column 2
  { title: 'From Down Here', artist: 'Lola Young', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=120&h=120', plays: '150K' },
  { title: 'Thick One (feat. Skilla Baby) [Remix]', artist: '42 Dugg, Kash Doll', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=120&h=120', explicit: true, plays: '1.8M' },
  { title: 'All That Matters', artist: '6LACK, AZ Chike, Leon Thomas', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=120&h=120', explicit: true, plays: '620K' },
  { title: 'Life On The Run', artist: 'Brandi Carlile', img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=120&h=120', plays: '310K' },
  // Column 3
  { title: 'ONE of ONE', artist: 'Master Peace', img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?auto=format&fit=crop&q=80&w=120&h=120', plays: '420K' },
  { title: 'All The Best', artist: 'Ingrid Andress', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=120&h=120', plays: '1.1M' },
  { title: 'Goals', artist: 'LISA, Anitta, Rema', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=120&h=120', plays: '7.4M' },
  { title: 'End of an Era', artist: 'Niall Horan', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=120&h=120', plays: '2.1M' }
]

const songColumns = computed(() => {
  const cols = []
  for (let i = 0; i < bestNewSongs.length; i += 4) {
    cols.push(bestNewSongs.slice(i, i + 4))
  }
  return cols
})

const recentlyPlayed = [
  { name: 'To the Bone', artist: 'Pamungkas', img: '/pamungkas.jpg' },
  { name: 'Bila Nanti', artist: 'Nadin Amizah', img: '/nadin.jpg' },
  { name: 'Lagipula Hidup Akan Berakhir', artist: 'Hindia', img: '/album_hindia.png' },
  { name: 'Sialnya, Hidup Bernadya', artist: 'Bernadya', img: '/album_bernadya1.png' },
  { name: 'Sialnya, Hidup Harus Tetap Berjalan', artist: 'Bernadya', img: '/album_bernadya2.png' },
  { name: 'Berhati', artist: 'Sal Priadi', img: '/album_sal_priadi.png' },
  { name: 'Nalar', artist: 'Fiersa Besari', img: '/pamungkas.jpg' },
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

const scrollAlbumsLeft = () => {
  if (albumsGridRef.value) {
    albumsGridRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollAlbumsRight = () => {
  if (albumsGridRef.value) {
    albumsGridRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

const scrollLiveLeft = () => {
  if (liveGridRef.value) {
    liveGridRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollLiveRight = () => {
  if (liveGridRef.value) {
    liveGridRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

const madeForYou = [
  {
    id: 1,
    title: 'Zedd Mix',
    subtitle: 'Playlist • Spotify',
    description: 'Jonas Blue, Martin Garrix and Zara Larsson',
    miniImg: '/zedd_mix.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-club-42283-large.mp4',
    posterUrl: '/zedd_mix.png',
    previewAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    logoBg: '#A06AF2'
  },
  {
    id: 2,
    title: 'Man Osman Radio',
    subtitle: 'Playlist • Spotify',
    description: 'With Traffic Jam, Harra., BIANCADIMAS and more',
    miniImg: '/man_osman.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-futuristic-neon-lights-42861-large.mp4',
    posterUrl: '/man_osman.png',
    previewAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    logoBg: '#C37299'
  },
  {
    id: 3,
    title: 'Shape of My Heart Radio',
    subtitle: 'Playlist • Spotify',
    description: 'With Backstreet Boys, *NSYNC, M2M and more',
    miniImg: '/shape_of_heart.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-dancing-at-a-music-concert-43282-large.mp4',
    posterUrl: '/shape_of_heart.png',
    previewAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    logoBg: '#4A90E2'
  }
]

const liveSessions = [
  {
    title: 'Hindia Live at Istora Senayan',
    artist: 'Hindia',
    img: '/album_hindia.png',
    date: '24 May 2026',
    location: 'Jakarta, ID',
    venue: 'Istora Senayan',
    color: '#8B0000',
    type: 'LIVE'
  },
  {
    title: 'Nadin Amizah Acoustic Showcase',
    artist: 'Nadin Amizah',
    img: '/nadin.jpg',
    date: '12 Jun 2026',
    location: 'Bandung, ID',
    venue: 'Gedung Kesenian',
    color: '#4E6E5D',
    type: 'ACOUSTIC'
  },
  {
    title: 'Pamungkas Solipsism Session',
    artist: 'Pamungkas',
    img: '/pamungkas.jpg',
    date: '30 Jul 2026',
    location: 'London, UK',
    venue: 'St Pancras',
    color: '#997D30',
    type: 'LIVE'
  },
  {
    title: 'Bernadya Intimate Tour',
    artist: 'Bernadya',
    img: '/album_bernadya1.png',
    date: '18 Aug 2026',
    location: 'Surabaya, ID',
    venue: 'Balai Pemuda',
    color: '#2E1C40',
    type: 'SHOWCASE'
  }
]

const ambientSoundscapes = [
  {
    title: 'Rainy Nights in Tokyo',
    artist: 'Sora Noise',
    img: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=250&h=250',
    category: 'Focus Rain',
    vinylColor: '#4C3A69'
  },
  {
    title: 'Deep Space Resonance',
    artist: 'Lumen Astral',
    img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=250&h=250',
    category: 'Cosmic Sleep',
    vinylColor: '#1D2A44'
  },
  {
    title: 'Forest Whisperings',
    artist: 'Woodland Synth',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=250&h=250',
    category: 'Green Noise',
    vinylColor: '#2D4F37'
  },
  {
    title: 'Coffee Shop Binaural',
    artist: 'Roast & Chatter',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=250&h=250',
    category: 'Cozy Focus',
    vinylColor: '#50372F'
  }
]

const commentaryCassettes = [
  {
    title: 'Evaluasi (Behind The Album)',
    artist: 'Hindia',
    img: '/album_hindia.png',
    bgColor: '#EAA15F',
    tracks: ['1. Kenapa Evaluasi (3:12)', '2. Proses Rekam (5:45)', '3. Arti Lirik (4:20)'],
    totalTime: '13:17'
  },
  {
    title: 'Solipsism (Commentary Edition)',
    artist: 'Pamungkas',
    img: '/pamungkas.jpg',
    bgColor: '#2E2E2E',
    tracks: ['1. Intro Commentary (2:05)', '2. To the Bone Meaning (6:18)', '3. Studio Hacks (4:50)'],
    totalTime: '13:13'
  },
  {
    title: 'Berhati (Storyteller Special)',
    artist: 'Sal Priadi',
    img: '/album_sal_priadi.png',
    bgColor: '#8F3E33',
    tracks: ['1. Nyanyian Storyteller (4:10)', '2. Filosofi Berhati (5:22)', '3. Recording Bloopers (3:45)'],
    totalTime: '13:17'
  },
  {
    title: 'Tutur Batin (Voice Notes)',
    artist: 'Yura Yunita',
    img: '/nadin.jpg',
    bgColor: '#C58498',
    tracks: ['1. Awal Mula Ide (3:05)', '2. Emosional Sesi (4:40)', '3. Pesan Tersembunyi (5:15)'],
    totalTime: '13:00'
  }
]

const activePreviewId = ref(null)
let previewAudio = null

const togglePreview = (card) => {
  if (activePreviewId.value === card.id) {
    if (previewAudio) {
      previewAudio.pause()
    }
    activePreviewId.value = null
    return
  }

  if (previewAudio) {
    previewAudio.pause()
    previewAudio = null
  }

  activePreviewId.value = card.id
  previewAudio = new Audio(card.previewAudioUrl)
  previewAudio.play().catch(err => {
    console.error("Audio playback error:", err)
    activePreviewId.value = null
  })

  previewAudio.onended = () => {
    activePreviewId.value = null
    previewAudio = null
  }
}

onUnmounted(() => {
  if (previewAudio) {
    previewAudio.pause()
    previewAudio = null
  }
})

const artistAlbums = [
  {
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
  },
  {
    title: 'To the Bone',
    artist: 'Pamungkas',
    img: '/pamungkas.jpg',
    genre: 'Indie/Pop',
    songs: '10 Songs',
    duration: '32 Min',
    year: '2020',
    releasedDate: '01 Jun 2020',
    streams: '2.5M Streams',
    likes: '120K Likes',
    color: '#997D30'
  },
  {
    title: 'Bila Nanti',
    artist: 'Nadin Amizah',
    img: '/nadin.jpg',
    genre: 'Indie/Folk',
    songs: '12 Songs',
    duration: '42 Min',
    year: '2020',
    releasedDate: '28 May 2020',
    streams: '1.8M Streams',
    likes: '85K Likes',
    color: '#4E6E5D'
  },
  {
    title: 'Sialnya, Hidup Harus Tetap Berjalan',
    artist: 'Bernadya',
    img: '/album_bernadya2.png',
    genre: 'Pop/Folk',
    songs: '10 Songs',
    duration: '35 Min',
    year: '2024',
    releasedDate: '24 Jun 2024',
    streams: '3.1M Streams',
    likes: '190K Likes',
    color: '#2E1C40'
  },
  {
    title: 'Berhati',
    artist: 'Sal Priadi',
    img: '/album_sal_priadi.png',
    genre: 'Pop/Indie',
    songs: '11 Songs',
    duration: '39 Min',
    year: '2020',
    releasedDate: '20 Feb 2020',
    streams: '920K Streams',
    likes: '55K Likes',
    color: '#8F3E33'
  },
  {
    title: 'Fabula',
    artist: 'Mahalini',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=250&h=250',
    genre: 'Pop',
    songs: '10 Songs',
    duration: '34 Min',
    year: '2023',
    releasedDate: '23 Jan 2023',
    streams: '4.2M Streams',
    likes: '240K Likes',
    color: '#A06AF2'
  },
  {
    title: 'Selamat Ulang Tahun',
    artist: 'Nadin Amizah',
    img: '/nadin.jpg',
    genre: 'Indie/Folk',
    songs: '10 Songs',
    duration: '38 Min',
    year: '2020',
    releasedDate: '28 May 2020',
    streams: '3.5M Streams',
    likes: '185K Likes',
    color: '#4E6E5D'
  },
  {
    title: 'Menari Dengan Bayangan',
    artist: 'Hindia',
    img: '/album_hindia.png',
    genre: 'Indie/Rock',
    songs: '12 Songs',
    duration: '45 Min',
    year: '2019',
    releasedDate: '29 Nov 2019',
    streams: '5.1M Streams',
    likes: '320K Likes',
    color: '#8C3F2B'
  },
  {
    title: 'Sialnya, Hidup Harus Tetap Berjalan (Deluxe)',
    artist: 'Bernadya',
    img: '/album_bernadya2.png',
    genre: 'Pop',
    songs: '13 Songs',
    duration: '46 Min',
    year: '2024',
    releasedDate: '15 Aug 2024',
    streams: '1.5M Streams',
    likes: '95K Likes',
    color: '#2E1C40'
  }
]
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
        <div class="hero-actions mobile-actions">
          <!-- Play button row -->
          <div class="mobile-play-row">
            <button class="btn btn-primary mobile-play-btn">
              <i class="ph ph-fill ph-play text-sm"></i> Play
            </button>
          </div>
          <!-- Follow + dots row -->
          <div class="mobile-secondary-row">
            <button class="btn btn-outline mobile-follow-btn">Follow</button>
            <button class="btn btn-outline mobile-dots-btn"><i class="ph ph-dots-three text-lg"></i></button>
          </div>
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
          class="category-btn shrink-0"
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
            @click="emit('select-album', mix)"
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
      <div class="best-songs-grid grid gap-x-6">
        <div v-for="(col, colIdx) in songColumns" :key="colIdx" class="song-column flex flex-col">
          <template v-for="(song, songIdx) in col" :key="song.title">
            <div 
              class="song-row flex items-center justify-between p-2 hover:bg-white/5 transition-colors group"
            >
              <div class="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                <div class="song-row-img-wrapper relative overflow-hidden shrink-0">
                  <img :src="song.img" :alt="song.title" class="w-full h-full object-cover" />
                  <!-- Play Button Overlay on Hover -->
                  <div class="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="ph ph-fill ph-play text-white text-xs"></i>
                  </div>
                </div>
                <div class="song-row-info min-w-0 flex-1 overflow-hidden">
                  <h4 class="text-sm font-semibold text-white flex items-center gap-1.5 w-full overflow-hidden">
                    <div class="marquee-wrapper flex-1 min-w-0">
                      <div class="marquee-content" :class="{ 'animate-marquee': song.title.length > 18 }">
                        <span class="song-title-text">{{ song.title }}</span>
                        <span v-if="song.title.length > 18" class="track-title-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span v-if="song.title.length > 18" class="song-title-text">{{ song.title }}</span>
                      </div>
                    </div>
                    <span v-if="song.explicit" class="explicit-badge shrink-0">E</span>
                  </h4>
                  <div class="marquee-wrapper mt-0.5">
                    <div class="marquee-content" :class="{ 'animate-marquee': song.artist.length > 20 }">
                      <span class="text-xs text-secondary">{{ song.artist }}</span>
                      <span class="text-xs text-secondary/60 ml-1.5">• {{ song.plays }} plays</span>
                      <span v-if="song.artist.length > 20" class="track-title-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span v-if="song.artist.length > 20" class="text-xs text-secondary">{{ song.artist }}</span>
                      <span v-if="song.artist.length > 20" class="text-xs text-secondary/60 ml-1.5">• {{ song.plays }} plays</span>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn-icon text-secondary hover:text-white ml-2 shrink-0">
                <i class="ph ph-dots-three text-lg"></i>
              </button>
            </div>
            <!-- Inset separator: only between items, not after last -->
            <div v-if="songIdx < col.length - 1" class="song-col-divider"></div>
          </template>
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
          <div v-for="item in recentlyPlayed" :key="item.name" class="recent-card group cursor-pointer shrink-0" @click="emit('select-album', item)">
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

    <!-- Made for you Section -->
    <section class="mb-10 made-for-you-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Made for you</h3>
      </div>
      <div class="made-for-you-grid grid gap-6">
        <div 
          v-for="card in madeForYou" 
          :key="card.id" 
          class="video-card group cursor-pointer"
          :style="{ '--glow-color': card.logoBg }"
        >
          <!-- Background Video (Muted, looping, auto-playing) -->
          <video 
            class="card-video-bg"
            autoplay 
            loop 
            muted 
            playsinline
            :poster="card.posterUrl"
          >
            <source :src="card.videoUrl" type="video/mp4" />
          </video>
          
          <!-- Gradient Overlay -->
          <div class="card-video-overlay"></div>
          
          <!-- Floating Interactive Tag (Top Right) -->
          <div class="card-tag">
            <span class="pulse-dot"></span>
            <span>INTERACTIVE</span>
          </div>

          <!-- Glass Control Card (Bottom) -->
          <div class="glass-control-panel flex flex-col">
            <!-- Header Row: Artwork + Title -->
            <div class="flex items-center gap-3">
              <div class="mini-artwork shrink-0" :style="{ boxShadow: '0 0 10px ' + card.logoBg }">
                <img :src="card.miniImg" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="video-card-title truncate">{{ card.title }}</h4>
                <p class="video-card-subtitle mt-0.5">{{ card.subtitle }}</p>
              </div>
            </div>
            
            <!-- Description -->
            <p class="video-card-desc mt-2.5">{{ card.description }}</p>
            
            <!-- Action Row (Expands/Fades in on Hover) -->
            <div class="action-row flex items-center justify-between mt-3">
              <!-- Preview Pill -->
              <button 
                @click.stop="togglePreview(card)" 
                class="btn-glass-preview flex items-center gap-1.5"
                :class="{ 'preview-active': activePreviewId === card.id }"
              >
                <i class="ph" :class="activePreviewId === card.id ? 'ph-waveform' : 'ph-headphones'"></i>
                <span>{{ activePreviewId === card.id ? 'Stop' : 'Preview' }}</span>
              </button>
              
              <!-- Standard Actions -->
              <div class="flex items-center gap-2">
                <button class="btn-glass-circle" title="More options">
                  <i class="ph ph-dots-three text-lg"></i>
                </button>
                <button class="btn-glass-circle" title="Add to Library">
                  <i class="ph ph-plus text-base"></i>
                </button>
                <button class="btn-glass-play" title="Play Playlist">
                  <i class="ph ph-fill ph-play text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Sessions Section -->
    <section class="mb-10 live-sessions-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Live Sessions & Concerts</h3>
      </div>
      <div class="live-sessions-wrapper relative">
        <div ref="liveGridRef" class="live-sessions-grid flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          <div 
            v-for="session in liveSessions" 
            :key="session.title" 
            class="ticket-card shrink-0"
            :style="{ '--ticket-color': session.color }"
          >
            <!-- Main Ticket Body (Left): Artist name on top, rectangular image below -->
            <div class="ticket-main">
              <span class="ticket-artist-name">{{ session.artist }}</span>
              <div class="ticket-art-wrapper">
                <img :src="session.img" :alt="session.title" class="ticket-art" />
                <div class="ticket-art-overlay"></div>
                <div class="ticket-play-icon">
                  <i class="ph ph-fill ph-play text-white"></i>
                </div>
              </div>
            </div>
            
            <!-- Dashed Perforation Line -->
            <div class="ticket-divider">
              <div class="punch-hole punch-top"></div>
              <div class="dashed-line"></div>
              <div class="punch-hole punch-bottom"></div>
            </div>
            
            <!-- Ticket Stub (Right): Event name, date, location left-aligned -->
            <div class="ticket-stub">
              <!-- Event Name & Badge -->
              <div class="w-full flex flex-col gap-1 min-w-0">
                <div class="stub-badge" :style="{ backgroundColor: session.color }">{{ session.type }}</div>
                <h4 class="ticket-album-title truncate mt-1" :title="session.title">{{ session.title }}</h4>
              </div>

              <!-- Date -->
              <div class="w-full flex items-center gap-2 min-w-0 text-white">
                <i class="ph ph-calendar-blank text-xs shrink-0" style="color: var(--text-secondary);"></i>
                <div class="marquee-wrapper flex-1">
                  <div class="marquee-content" :class="{ 'animate-marquee': session.date.length > 20 }">
                    <span class="stub-date">{{ session.date }}</span>
                    <span v-if="session.date.length > 20" class="track-title-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="session.date.length > 20" class="stub-date">{{ session.date }}</span>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="w-full flex items-center gap-2 min-w-0 text-white">
                <i class="ph ph-map-pin text-xs shrink-0" style="color: var(--text-secondary);"></i>
                <div class="marquee-wrapper flex-1">
                  <div class="marquee-content" :class="{ 'animate-marquee': (session.venue + ', ' + session.location).length > 20 }">
                    <span class="venue-name">{{ session.venue }}, {{ session.location }}</span>
                    <span v-if="(session.venue + ', ' + session.location).length > 20" class="track-title-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="(session.venue + ', ' + session.location).length > 20" class="venue-name">{{ session.venue }}, {{ session.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div @click="scrollLiveLeft" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg"></i>
        </div>
        <div @click="scrollLiveRight" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-right text-lg"></i>
        </div>
      </div>
    </section>

    <!-- Ambient & Focus Section -->
    <section class="mb-10 ambient-vinyl-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">Ambient & Focus (Spatial Vinyls)</h3>
      </div>
      <div class="ambient-vinyl-wrapper relative">
        <div class="ambient-vinyl-grid flex overflow-x-auto gap-6 pb-4">
          <div 
            v-for="soundscape in ambientSoundscapes" 
            :key="soundscape.title" 
            class="vinyl-card-container shrink-0"
          >
            <!-- Sleeved Card Cover -->
            <div class="vinyl-sleeve-wrapper">
              <!-- Spinning Vinyl Disc (Z-Indexed Behind Sleeve) -->
              <div class="vinyl-disc" :style="{ backgroundColor: soundscape.vinylColor }">
                <div class="vinyl-groove-lines"></div>
                <div class="vinyl-center-label">
                  <div class="vinyl-center-dot"></div>
                </div>
              </div>
              
              <!-- Main Sleeve Cover -->
              <div class="vinyl-sleeve">
                <img :src="soundscape.img" :alt="soundscape.title" class="sleeve-art" />
                <div class="sleeve-overlay"></div>
                <!-- Badge indicating focusing type -->
                <div class="sleeve-badge">{{ soundscape.category }}</div>
                <div class="sleeve-play-btn">
                  <i class="ph ph-fill ph-play"></i>
                </div>
              </div>
            </div>
            
            <!-- Album Details -->
            <div class="vinyl-info">
              <h4 class="vinyl-title">{{ soundscape.title }}</h4>
              <p class="vinyl-artist">{{ soundscape.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Albums by Featured Artists Section -->
    <section class="mb-10 albums-section">
      <div class="section-header flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">
          <i class="ph ph-vinyl text-[#2563EB]"></i> Albums by Artists
        </h3>
      </div>
      <div class="albums-container-wrapper relative">
        <div ref="albumsGridRef" class="albums-grid-scroll flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
          <div 
            v-for="album in artistAlbums" 
            :key="album.title" 
            class="album-card group cursor-pointer shrink-0"
            @click="emit('select-album', album)"
          >
            <div class="album-img-wrapper relative rounded-lg overflow-hidden aspect-square mb-2.5">
              <img :src="album.img" :alt="album.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="play-btn-overlay absolute bottom-2.5 right-2.5 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                <i class="ph ph-fill ph-play text-white text-xs ml-0.5"></i>
              </div>
              <!-- Small logo badge -->
              <div class="album-badge-mini absolute top-2 left-2 flex items-center justify-center w-4 h-4 rounded-full bg-[#2563EB]/80 text-[8px] text-white font-black">
                k
              </div>
            </div>
            <h4 class="text-xs font-bold truncate text-white group-hover:text-[#2563EB] transition-colors">{{ album.title }}</h4>
            <p class="text-[10px] text-secondary mt-0.5 truncate">{{ album.artist }} • {{ album.year }}</p>
          </div>
        </div>
        <div @click="scrollAlbumsLeft" class="scroll-arrow scroll-arrow-left flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
          <i class="ph ph-caret-left text-lg"></i>
        </div>
        <div @click="scrollAlbumsRight" class="scroll-arrow scroll-arrow-right flex items-center justify-center rounded-full bg-black/60 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors">
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

/* Best New Songs Grid Layout */
.best-songs-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
}

.song-column {
  min-width: 0;
  overflow: hidden;
}

.song-row {
  min-width: 0;
  overflow: hidden;
}

.song-row-info {
  min-width: 0;
  overflow: hidden;
  flex: 1;
}

.song-row-img-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  flex-shrink: 0;
}

.song-row-divider {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.song-column .song-row-divider:last-child {
  border-bottom: none;
}

/* Inset separator between song rows — starts from text area, not full width */
.song-col-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-left: 52px; /* 40px img + 12px gap — aligns with text start */
  margin-right: 8px;
}

/* Infinity Loop Marquee styles for song list */
.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  position: relative;
  display: block;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
}

.animate-marquee {
  animation: marquee 12s linear infinite;
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
  flex-shrink: 0;
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
.mixes-container-wrapper, .recently-played-wrapper, .live-sessions-wrapper, .albums-container-wrapper {
  position: relative;
  width: auto;
  margin-right: -1.5rem;
}

.mixes-grid, .recently-played-grid, .live-sessions-grid, .albums-grid-scroll {
  width: 100%;
  scroll-behavior: smooth;
  overflow-x: auto;
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease;
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

.mixes-container-wrapper:hover .scroll-arrow,
.recently-played-wrapper:hover .scroll-arrow,
.live-sessions-wrapper:hover .scroll-arrow,
.albums-container-wrapper:hover .scroll-arrow {
  opacity: 1;
  pointer-events: auto;
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
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 1.5rem;
    width: 100%;
    order: 3;
    padding: 0 1.5rem;
  }

  .mobile-play-row {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .mobile-play-btn {
    min-width: 180px;
    padding-left: 2.5rem !important;
    padding-right: 2.5rem !important;
    justify-content: center;
  }

  .mobile-secondary-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .mobile-follow-btn {
    min-width: 140px;
    justify-content: center;
  }

  .mobile-dots-btn {
    width: 44px;
    height: 44px;
    border-radius: 50% !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none !important;
    background: transparent !important;
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

  .mixes-grid, .recently-played-grid, .live-sessions-grid, .albums-grid-scroll {
    padding-bottom: 0.5rem;
  }
  .mixes-container-wrapper, .recently-played-wrapper, .live-sessions-wrapper, .albums-container-wrapper {
    margin-right: -1rem;
  }
  .albums-container-wrapper {
    max-width: none;
  }
  .album-card {
    width: 125px;
    padding: 8px;
  }
  .album-card h4 {
    font-size: 0.75rem;
  }
  .album-card p {
    font-size: 0.65rem;
  }

  /* Responsive Ticket Card styles on mobile */
  .ticket-card {
    width: 310px !important;
    height: 150px !important;
  }
  .ticket-art-wrapper {
    width: 115px !important;
    height: 75px !important;
  }
  .ticket-artist-name {
    font-size: 0.65rem !important;
  }
  .ticket-stub {
    padding: 10px 12px !important;
    justify-content: flex-start !important;
    gap: 8px !important;
  }
  .ticket-main {
    padding: 10px 12px !important;
    justify-content: flex-start !important;
    gap: 6px !important;
  }
  .ticket-album-title {
    font-size: 0.8rem !important;
  }
  .stub-date, .venue-name {
    font-size: 0.7rem !important;
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
  width: 44px;
  height: 44px;
  border-radius: 5px;
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

/* Made For You Section Styles */
.made-for-you-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.video-card {
  position: relative;
  height: 360px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background-color: #1A1A1C;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px var(--glow-color);
}

.card-video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.video-card:hover .card-video-bg {
  transform: scale(1.05);
}

.card-video-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0.4) 0%, rgba(18, 18, 18, 0.1) 40%, rgba(18, 18, 18, 0.85) 100%);
  transition: background 0.3s ease;
}

.video-card:hover .card-video-overlay {
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0.3) 0%, rgba(18, 18, 18, 0.05) 30%, rgba(18, 18, 18, 0.9) 100%);
}

/* Floating tag */
.card-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 8px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 5px;
  letter-spacing: 0.05em;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #10B981;
  box-shadow: 0 0 8px #10B981;
  animation: pulse-dot-anim 1.2s infinite alternate;
}

@keyframes pulse-dot-anim {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 1; }
}

/* Glass control panel */
.glass-control-panel {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(18, 18, 18, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mini-artwork {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.3s ease;
}

.mini-artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.2;
}

.video-card-subtitle {
  font-size: 0.72rem;
  color: var(--text-secondary);
  line-height: 1.2;
}

.video-card-desc {
  font-size: 0.72rem;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.85;
}

.action-row {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease;
}

.video-card:hover .action-row {
  max-height: 40px;
  opacity: 1;
}

/* Glass buttons style */
.btn-glass-preview {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-glass-preview:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-glass-preview.preview-active {
  background: var(--accent-blue) !important;
  border-color: var(--accent-blue) !important;
  box-shadow: 0 0 10px var(--accent-blue);
}

.btn-glass-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-glass-circle:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  transform: scale(1.05);
}

.btn-glass-play {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FFFFFF;
  border: none;
  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.btn-glass-play:hover {
  background: #F3F4F6;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.btn-glass-play i {
  margin-left: 1px;
}

/* Responsive Made For You Grid */
@media (max-width: 1024px) {
  .made-for-you-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 640px) {
  .made-for-you-grid {
    grid-template-columns: 1fr !important;
  }
  .video-card {
    height: 300px;
  }
}
/* Live Sessions Ticket Card Styles */
.live-sessions-grid {
  width: 100%;
  scroll-behavior: smooth;
  overflow-x: auto;
}

.ticket-card {
  display: flex;
  width: 390px;
  height: 170px;
  border-radius: 12px;
  background-color: #1E1E22;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5), 0 0 15px var(--ticket-color);
  border-color: rgba(255, 255, 255, 0.15);
}

.ticket-main {
  flex: 1.3;
  display: flex;
  flex-direction: column;
  padding: 14px 12px;
  justify-content: flex-start;
  gap: 8px;
  min-width: 0;
}

.ticket-art-wrapper {
  position: relative;
  width: 140px !important;
  height: 90px !important;
  border-radius: 8px;
  overflow: hidden;
  align-self: flex-start;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.ticket-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-art-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.ticket-card:hover .ticket-art-overlay {
  opacity: 1;
}

.ticket-play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.25s ease;
}

.ticket-card:hover .ticket-play-icon {
  opacity: 1;
  transform: scale(1);
}

.ticket-artist-name {
  font-size: 0.75rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: left;
}

.ticket-album-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
}

/* Dashed divider perforation */
.ticket-divider {
  position: relative;
  width: 1px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.dashed-line {
  width: 0;
  height: 70%;
  border-left: 1px dashed rgba(255, 255, 255, 0.15);
}

.punch-hole {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: #1A1A1C; /* Matches MainContent background to look like a cutout */
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--border-color);
  z-index: 10;
}

.punch-top {
  top: -8px;
}

.punch-bottom {
  bottom: -8px;
}

/* Ticket Stub */
.ticket-stub {
  flex: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  background-color: rgba(255, 255, 255, 0.01);
  text-align: left;
  min-width: 0;
}

.stub-badge {
  align-self: flex-start;
  font-size: 8px;
  font-weight: 800;
  color: #FFFFFF;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stub-label {
  font-size: 0.6rem;
  color: var(--text-secondary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.stub-date {
  font-size: 0.8rem;
  font-weight: 800;
  color: #FFFFFF;
  white-space: nowrap;
}

.venue-name {
  font-size: 0.7rem;
  font-weight: 700;
  color: #FFFFFF;
  white-space: nowrap;
}

/* Ambient Vinyl Disc styles */
.ambient-vinyl-grid {
  width: 100%;
  scroll-behavior: smooth;
  overflow-x: auto;
  padding-top: 12px;
}

.vinyl-card-container {
  position: relative; /* Create relative stacking context for hover */
  width: 200px;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 0.3s ease;
  z-index: 1;
  overflow: visible !important;
}

.vinyl-card-container:hover {
  transform: translateY(-4px);
  z-index: 15; /* Float on top of adjacent covers to reveal the sliding vinyl */
}

/* Slide adjacent sibling cards to the right when a card is hovered */
.vinyl-card-container:hover ~ .vinyl-card-container {
  transform: translateX(80px);
}

.vinyl-sleeve-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: visible !important; /* To let vinyl slide out */
}

/* Vinyl Disc styling */
.vinyl-disc {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Grooves on vinyl */
.vinyl-groove-lines {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8),
              0 0 0 5px rgba(255, 255, 255, 0.01),
              0 0 0 15px rgba(255, 255, 255, 0.01),
              0 0 0 25px rgba(255, 255, 255, 0.01),
              0 0 0 35px rgba(255, 255, 255, 0.01),
              0 0 0 45px rgba(255, 255, 255, 0.01),
              0 0 0 55px rgba(255, 255, 255, 0.01);
}

.vinyl-center-label {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.vinyl-center-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #121212;
}

/* Main Sleeve Cover */
.vinyl-sleeve {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
}

.sleeve-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.sleeve-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.8) 100%);
}

.sleeve-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 8px;
  font-weight: 700;
  color: #FFFFFF;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sleeve-play-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FFFFFF;
  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.3s ease;
}

.sleeve-play-btn i {
  font-size: 11px;
  margin-left: 1.5px;
}

/* Sleeve Hover interaction: disc slides out and spins */
.vinyl-card-container:hover .vinyl-disc {
  transform: translateX(80px);
  animation: spin 3s linear infinite;
  animation-delay: 0.4s;
}

.vinyl-card-container:hover .sleeve-play-btn {
  opacity: 1;
  transform: translateY(0);
}

.vinyl-card-container:hover .sleeve-art {
  transform: scale(1.03);
}

@keyframes spin {
  0% { transform: translateX(80px) rotate(0deg); }
  100% { transform: translateX(80px) rotate(360deg); }
}

.vinyl-info {
  margin-top: 12px;
}

.vinyl-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vinyl-artist {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 2px;
}

/* Albums by Featured Artists Section Styles */
.albums-grid-scroll {
  width: 100%;
  scroll-behavior: smooth;
  overflow-x: auto;
}

.album-card {
  position: relative;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 12px;
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  width: 190px; /* Slightly larger card size */
  flex-shrink: 0;
}

.album-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.album-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.album-badge-mini {
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn-overlay {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.album-card:hover .play-btn-overlay {
  opacity: 1;
}

.album-card h4 {
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.4;
}

.album-card p {
  font-size: 0.75rem;
  line-height: 1.3;
}
</style>
