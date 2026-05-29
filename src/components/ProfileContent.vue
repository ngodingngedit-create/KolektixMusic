<script setup>
import { ref, computed } from 'vue'
import { playerState } from '../playerState.js'

const emit = defineEmits(['open-queue'])

// User Profile Data
const userProfile = ref({
  name: 'Aldi Ramadhan',
  email: 'aldi.ramadhan@gmail.com',
  bio: 'Music is my therapy.',
  avatar: '/aldi_ramadhan_avatar.png',
  banner: '/concert_crowd_banner.png',
  totalPlaylists: 6,
  followers: '1,245',
  following: '358'
})

// Playlists data matching mockups
const playlists = ref([
  { id: 1, title: 'Chill Vibes', songs: 35, img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=250&h=250' },
  { id: 2, title: 'Workout Hits', songs: 48, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=250&h=250' },
  { id: 3, title: 'Night Drive', songs: 32, img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=250&h=250' },
  { id: 4, title: 'lofi beats', songs: 50, img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=250&h=250' },
  { id: 5, title: 'Indie Essentials', songs: 60, img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=250&h=250' }
])

const searchQuery = ref('')
const filteredPlaylists = computed(() => {
  if (!searchQuery.value) return playlists.value
  return playlists.value.filter(p => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const activeProfileTab = ref('You Playlist')

const isListeningStatsExpanded = ref(true)
const isPlaylistOverviewExpanded = ref(true)
const isWidgetSidebarOpen = ref(true)

const editForm = ref({
  name: 'Aldi Ramadhan',
  username: '@aldiramadhan',
  email: 'aldi.ramadhan@gmail.com',
  bio: 'Music lover and playlist curator.',
  location: 'Jakarta, Indonesia',
  dob: '12 March 1996'
})

const showSaveSuccess = ref(false)

const saveProfile = () => {
  userProfile.value.name = editForm.value.name
  userProfile.value.email = editForm.value.email
  userProfile.value.bio = editForm.value.bio
  showSaveSuccess.value = true
  setTimeout(() => {
    showSaveSuccess.value = false
    activeProfileTab.value = 'You Playlist'
  }, 1200)
}

// Recently played tracks
const recentlyPlayed = ref([
  { id: 1, title: 'To the Bone', artist: 'Pamungkas', img: '/pamungkas.jpg', isActive: true },
  { id: 2, title: 'Hindia', artist: 'Hindia', img: '/album_hindia.png' },
  { id: 3, title: 'Sun Eater', artist: 'Lizzy McAlpine', img: '/nadin.jpg' },
  { id: 4, title: 'Doves, 25 on Blank Canvas', artist: 'd4vd', img: '/album_bernadya1.png' },
  { id: 5, title: 'Nadin Amizah', artist: 'Nadin Amizah', img: '/nadin.jpg' }
])

const togglePlayTrack = (track) => {
  if (track.title === 'To the Bone') {
    const defaultTrack = {
      id: 1,
      title: 'To the Bone',
      artist: 'Pamungkas',
      img: '/pamungkas.jpg',
      plays: '890K',
      duration: '3:32',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }
    playerState.play(defaultTrack)
  }
}
</script>

<template>
  <div class="profile-view">
    <!-- Wide Hero Banner Section -->
    <div class="hero-banner-section" :style="{ backgroundImage: `url(${userProfile.banner})` }">
      <div class="hero-banner-overlay"></div>
      <div class="hero-banner-content">
        <!-- Left: Circular Profile Picture & Info -->
        <div class="hero-left-info">
          <div class="avatar-container">
            <img :src="userProfile.avatar" :alt="userProfile.name" class="profile-avatar-img-large" />
          </div>
          <div class="profile-details">
            <h1 class="profile-name">
              {{ userProfile.name }}
              <i class="ph ph-fill ph-check-circle verified-icon-blue"></i>
            </h1>
            <p class="profile-email">{{ userProfile.email }}</p>
          </div>
        </div>
        
        <!-- Right: Minimalist Metric Columns -->
        <div class="hero-right-metrics">
          <div class="metric-column">
            <span class="metric-label">Total Playlist</span>
            <span class="metric-number">{{ userProfile.totalPlaylists }}</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-column">
            <span class="metric-label">Followers</span>
            <span class="metric-number">{{ userProfile.followers }}</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-column">
            <span class="metric-label">Following</span>
            <span class="metric-number">{{ userProfile.following }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Active Tab Bar -->
    <div class="profile-tab-bar flex items-center justify-between">
      <div class="flex items-center gap-6">
        <button 
          @click="activeProfileTab = 'You Playlist'" 
          class="tab-btn" 
          :class="{ 'tab-active': activeProfileTab === 'You Playlist' }"
        >
          <i class="ph ph-user tab-icon"></i>
          <span>You Playlist</span>
        </button>
        
        <button 
          @click="activeProfileTab = 'Edit Profile'" 
          class="tab-btn" 
          :class="{ 'tab-active': activeProfileTab === 'Edit Profile' }"
        >
          <i class="ph ph-pencil-simple tab-icon"></i>
          <span>Edit Profile</span>
        </button>
      </div>

      <!-- Toggle Widgets Sidebar Button (Desktop only) -->
      <button 
        @click="isWidgetSidebarOpen = !isWidgetSidebarOpen" 
        class="sidebar-toggle-btn"
        :title="isWidgetSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'"
      >
        <i class="ph" :class="isWidgetSidebarOpen ? 'ph-sidebar-simple' : 'ph-sidebar-simple-fill'"></i>
        <span>{{ isWidgetSidebarOpen ? 'Hide Stats' : 'Show Stats' }}</span>
      </button>
    </div>

    <!-- Main Content Layout Below Tabs -->
    <div class="profile-main-grid" :class="{ 'sidebar-closed': !isWidgetSidebarOpen }">
      <!-- Left Column (Playlists and Tracks) -->
      <div class="main-left-column">
        <!-- TAB: You Playlist -->
        <div v-if="activeProfileTab === 'You Playlist'" class="playlist-view-content">
          <!-- Playlists Section Header -->
          <div class="playlists-header-row">
            <h2 class="section-title">My Playlists ({{ playlists.length + 1 }})</h2>
            <div class="playlists-actions">
              <!-- Search Bar -->
              
              <!-- Create Playlist CTA -->
              <button class="btn btn-primary create-playlist-cta">
                <i class="ph ph-plus"></i> Create Playlist
              </button>
            </div>
          </div>

          <!-- Playlists Grid -->
          <div class="playlists-grid-six">
            <div 
              v-for="playlist in filteredPlaylists" 
              :key="playlist.id" 
              class="playlist-card-new"
            >
              <div class="playlist-art-wrapper-new">
                <img :src="playlist.img" :alt="playlist.title" class="playlist-cover-art-new" />
                <div class="playlist-play-overlay">
                  <i class="ph ph-fill ph-play"></i>
                </div>
              </div>
              <div class="playlist-info-new">
                <h4 class="playlist-title-new">{{ playlist.title }}</h4>
                <p class="playlist-songs-count-new">{{ playlist.songs }} songs</p>
              </div>
            </div>
            
            <!-- Create New Playlist Card at the end of the grid -->
            <div class="playlist-card-new create-new-card">
              <div class="create-new-circle">
                <i class="ph ph-plus"></i>
              </div>
              <span class="create-new-text">Create New Playlist</span>
            </div>
          </div>

          <!-- Recently Played Shelf -->
          <div class="recently-played-shelf-section">
            <div class="section-header-row mb-4">
              <h3 class="section-title">Recently Played</h3>
              <a href="#" @click.prevent="emit('open-queue')" class="view-all-link">View All</a>
            </div>

            <div class="recently-played-carousel-new scrollbar-hide">
              <div 
                v-for="track in recentlyPlayed" 
                :key="track.id"
                class="recent-track-card-new"
                @click="togglePlayTrack(track)"
              >
                <div class="track-thumbnail-wrapper-new">
                  <img :src="track.img" :alt="track.title" class="track-thumbnail-new" />
                  
                  <!-- Play Overlay / Audio Wave -->
                  <div v-if="track.title === 'To the Bone' && playerState.isPlaying" class="audio-wave-overlay-new">
                    <span class="wave-bar-new"></span>
                    <span class="wave-bar-new"></span>
                    <span class="wave-bar-new"></span>
                  </div>
                  <div v-else class="track-hover-play-new">
                    <i class="ph ph-fill ph-play"></i>
                  </div>
                </div>
                <div class="track-meta-new">
                  <h4 class="track-title-new truncate">{{ track.title }}</h4>
                  <p class="track-artist-new truncate">{{ track.artist }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB: Listening Stats (Detailed version in main area) -->
        <div v-else-if="activeProfileTab === 'Listening Stats'" class="listening-stats-detail-content glass-panel">
          <div class="stats-detail-header mb-6">
            <h3 class="section-title">Detailed Listening Performance</h3>
            <span class="text-secondary text-sm">Real-time statistics synced with your listener account.</span>
          </div>
          
          <div class="stats-grid-dashboard mb-8">
            <div class="stats-dashboard-card">
              <i class="ph ph-music-note dashboard-card-icon"></i>
              <span class="dashboard-card-value">3,842</span>
              <span class="dashboard-card-label">Songs Played</span>
              <div class="dashboard-card-trend"><i class="ph ph-arrow-up"></i> +12% this week</div>
            </div>
            
            <div class="stats-dashboard-card">
              <i class="ph ph-clock dashboard-card-icon"></i>
              <span class="dashboard-card-value">12,540</span>
              <span class="dashboard-card-label">Minutes Listened</span>
              <div class="dashboard-card-trend"><i class="ph ph-arrow-up"></i> +8% this week</div>
            </div>

            <div class="stats-dashboard-card">
              <i class="ph ph-waveform dashboard-card-icon"></i>
              <span class="dashboard-card-value text-blue">Indie Pop</span>
              <span class="dashboard-card-label">Top Genre</span>
              <span class="dashboard-card-subtext">52% of total playback</span>
            </div>

            <div class="stats-dashboard-card">
              <i class="ph ph-user dashboard-card-icon"></i>
              <span class="dashboard-card-value text-blue">Hindia</span>
              <span class="dashboard-card-label">Top Artist</span>
              <span class="dashboard-card-subtext">145 songs streamed</span>
            </div>
          </div>

          <!-- Mini charts mock for high-fidelity feel -->
          <div class="listening-chart-mock">
            <h4 class="chart-mock-title mb-4">Listening Activity (Last 7 Days)</h4>
            <div class="chart-bars-container">
              <div class="chart-bar-col" style="height: 40%"><span>Mon</span></div>
              <div class="chart-bar-col" style="height: 60%"><span>Tue</span></div>
              <div class="chart-bar-col" style="height: 85%"><span>Wed</span></div>
              <div class="chart-bar-col" style="height: 50%"><span>Thu</span></div>
              <div class="chart-bar-col" style="height: 95%"><span class="day-highlight">Fri</span></div>
              <div class="chart-bar-col" style="height: 70%"><span>Sat</span></div>
              <div class="chart-bar-col" style="height: 30%"><span>Sun</span></div>
            </div>
          </div>
        </div>

        <!-- TAB: Edit Profile Form -->
        <div v-else-if="activeProfileTab === 'Edit Profile'" class="edit-profile-detail-content">
          <!-- Save Success Notification Toast -->
          <div v-if="showSaveSuccess" class="save-success-toast">
            <i class="ph ph-fill ph-check-circle success-toast-icon"></i>
            <span>Profile successfully updated!</span>
          </div>

          <form @submit.prevent="saveProfile" class="edit-profile-form-new">
            <!-- Single Card: Edit Profile (Personal Info & Banner) -->
            <div class="edit-profile-section-card glass-panel">
              <!-- Personal Information Sub-Section (Sejajar/Parallel layout) -->
              <div class="edit-profile-sub-section">
                <h3 class="sub-section-title-new">Personal Information</h3>
                
                <div class="personal-info-grid">
                  <!-- Left: Profile picture + upload button -->
                  <div class="avatar-upload-column">
                    <div class="avatar-circle-wrapper">
                      <img :src="userProfile.avatar" class="avatar-preview-img-new" />
                    </div>
                    <button type="button" class="btn btn-outline upload-photo-btn">
                      <i class="ph ph-upload-simple"></i>
                      <span>Upload New Photo</span>
                    </button>
                  </div>
                  
                  <!-- Right: Inputs layout (sejajar) -->
                  <div class="inputs-grid-layout-sejajar">
                    <div class="form-group-new">
                      <label class="form-label-new">Display Name</label>
                      <input type="text" v-model="editForm.name" class="form-input-new-field" required />
                    </div>
                    <div class="form-group-new">
                      <label class="form-label-new">Username</label>
                      <input type="text" v-model="editForm.username" class="form-input-new-field" required />
                    </div>
                    <div class="form-group-new">
                      <label class="form-label-new">Email</label>
                      <input type="email" v-model="editForm.email" class="form-input-new-field" required />
                    </div>
                    
                    <div class="form-group-new">
                      <label class="form-label-new">Bio</label>
                      <input type="text" v-model="editForm.bio" class="form-input-new-field" placeholder="Tell us about yourself..." />
                    </div>
                    
                    <div class="form-group-new">
                      <label class="form-label-new">Location</label>
                      <div class="input-with-right-icon">
                        <input type="text" v-model="editForm.location" class="form-input-new-field" />
                        <i class="ph ph-map-pin right-field-icon"></i>
                      </div>
                    </div>
                    
                    <div class="form-group-new">
                      <label class="form-label-new">Date of Birth</label>
                      <div class="input-with-right-icon">
                        <input type="text" v-model="editForm.dob" class="form-input-new-field" />
                        <i class="ph ph-calendar right-field-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Thin elegant section divider -->
              <div class="section-divider-new"></div>

              <!-- Profile Banner Sub-Section -->
              <div class="edit-profile-sub-section">
                <h3 class="sub-section-title-new">Profile Banner</h3>
                
                <div class="profile-banner-grid">
                  <!-- Left: Text -->
                  <div class="banner-texts-column">
                    <span class="banner-current-label">Current Banner</span>
                    <div class="banner-specs-wrap mt-2">
                      <span class="spec-label">Recommended:</span>
                      <span class="spec-value">1920x480</span>
                      <span class="spec-value">PNG/JPG</span>
                    </div>
                  </div>
                  
                  <!-- Right: Banner Image preview + Upload Button Overlay -->
                  <div class="banner-preview-column">
                    <div class="banner-preview-img-wrapper" :style="{ backgroundImage: `url(${userProfile.banner})` }">
                      <div class="banner-upload-overlay-btn">
                        <button type="button" class="btn btn-outline upload-banner-overlay-btn">
                          <i class="ph ph-upload-simple"></i>
                          <span>Upload New Banner</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Changes Button at the very bottom right of the single card -->
              <div class="single-card-save-row">
                <button type="submit" class="btn btn-primary save-btn-new">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column (Widget Cards Sidebar) -->
      <div class="main-right-column">
        <!-- Widget: Listening Stats -->
        <div class="widget-card glass-panel">
          <div 
            class="widget-header" 
            :class="{ 'header-collapsed': !isListeningStatsExpanded }"
            @click="isListeningStatsExpanded = !isListeningStatsExpanded"
            style="cursor: pointer;"
          >
            <div class="widget-title-wrap">
              <i class="ph ph-headphones widget-icon"></i>
              <span class="widget-title">Listening Stats</span>
            </div>
            <i class="ph collapse-icon" :class="isListeningStatsExpanded ? 'ph-caret-up' : 'ph-caret-down'"></i>
          </div>
          
          <div class="widget-body" :class="{ 'collapsed': !isListeningStatsExpanded }">
            <div class="widget-row">
              <span class="widget-row-label">Songs Played</span>
              <span class="widget-row-value">3,842</span>
            </div>
            <div class="widget-row">
              <span class="widget-row-label">Minutes Listened</span>
              <span class="widget-row-value">12,540</span>
            </div>
            <div class="widget-row">
              <span class="widget-row-label">Top Genre</span>
              <span class="widget-row-value text-blue">Indie Pop</span>
            </div>
            <div class="widget-row">
              <span class="widget-row-label">Top Artist</span>
              <span class="widget-row-value text-blue">Hindia</span>
            </div>
          </div>
        </div>

        <!-- Widget: Playlist Overview -->
        <div class="widget-card glass-panel mt-4">
          <div 
            class="widget-header" 
            :class="{ 'header-collapsed': !isPlaylistOverviewExpanded }"
            @click="isPlaylistOverviewExpanded = !isPlaylistOverviewExpanded"
            style="cursor: pointer;"
          >
            <div class="widget-title-wrap">
              <i class="ph ph-music-notes widget-icon"></i>
              <span class="widget-title">Playlist Overview</span>
            </div>
            <i class="ph collapse-icon" :class="isPlaylistOverviewExpanded ? 'ph-caret-up' : 'ph-caret-down'"></i>
          </div>
          
          <div class="widget-body" :class="{ 'collapsed': !isPlaylistOverviewExpanded }">
            <div class="widget-row">
              <span class="widget-row-label">Total Playlists</span>
              <span class="widget-row-value">6</span>
            </div>
            <div class="widget-row">
              <span class="widget-row-label">Total Songs</span>
              <span class="widget-row-value">267</span>
            </div>
            <div class="widget-row">
              <span class="widget-row-label">Total Duration</span>
              <span class="widget-row-value">28h 45m</span>
            </div>
            
            <!-- Most Played Playlist Row -->
            <div class="most-played-section">
              <span class="most-played-label">Most Played Playlist</span>
              <div class="most-played-card">
                <div class="most-played-art">
                  <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=250&h=250" alt="Chill Vibes cover" />
                </div>
                <div class="most-played-meta">
                  <span class="most-played-name">Chill Vibes</span>
                  <span class="most-played-count">1,245 plays</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C; /* Same background color as home page */
  height: calc(100% - 0.25rem);
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  color: #FFFFFF;
  scrollbar-width: thin;
}

/* Wide Hero Banner Section */
.hero-banner-section {
  height: 240px;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.hero-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(11, 14, 20, 0.85) 30%, rgba(11, 14, 20, 0.5) 60%, rgba(11, 14, 20, 0.9) 100%);
  z-index: 1;
}

.hero-banner-content {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.hero-left-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-container {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.profile-avatar-img-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
}

.profile-name {
  font-size: 2.25rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

.verified-icon-blue {
  color: #2563EB;
  font-size: 1.5rem;
}

.profile-email {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.hero-right-metrics {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(11, 14, 20, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem 1.75rem;
  border-radius: var(--radius-md);
}

.metric-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.metric-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-top: 0.25rem;
}

.metric-divider {
  width: 1px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Interactive Active Tab Bar */
.profile-tab-bar {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.75rem 0.5rem 1rem 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn:hover {
  color: #FFFFFF;
}

.tab-active {
  color: #2563EB !important;
}

.tab-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #2563EB;
  border-radius: 99px;
}

.tab-icon {
  font-size: 1.15rem;
}

/* Main Content Layout Below Tabs */
.profile-main-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: start;
}

.main-left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
}

.main-right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
  align-self: start;
}

/* Playlists Section Header */
.playlists-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.01em;
}

.playlists-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}





.playlists-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 0.85rem;
  width: 100%;
}

.playlists-search-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.search-icon {
  color: var(--text-secondary);
  margin-right: 0.5rem;
  font-size: 0.95rem;
}

.create-playlist-cta {
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: var(--radius-full);
  padding: 0.55rem 1.25rem;
  background-color: #2563EB;
  border: none;
}

/* Playlists Grid */
.playlists-grid-six {
  display: flex;
  overflow-x: auto;
  gap: 1.25rem;
  width: 100%;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.playlists-grid-six::-webkit-scrollbar {
  display: none;
}

.playlist-card-new {
  flex-shrink: 0;
  width: 165px;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 1 / 1.35;
  justify-content: space-between;
  overflow: hidden;
}

.playlist-card-new:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.playlist-art-wrapper-new {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: #1e1e1e;
  margin-bottom: 0.5rem;
  position: relative;
}

.playlist-cover-art-new {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.playlist-card-new:hover .playlist-cover-art-new {
  transform: scale(1.05);
}

.playlist-play-overlay {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #2563EB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.playlist-card-new:hover .playlist-play-overlay {
  opacity: 1;
  transform: translateY(0);
}

.playlist-info-new {
  text-align: left;
}

.playlist-title-new {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-songs-count-new {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

/* Create New Playlist Card */
.create-new-card {
  border: 1px dashed rgba(37, 99, 235, 0.3);
  background: rgba(37, 99, 235, 0.02);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.create-new-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563EB;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.create-new-card:hover .create-new-circle {
  transform: scale(1.1);
  background: rgba(37, 99, 235, 0.2);
}

.create-new-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
}

/* Recently Played Shelf Section */
.recently-played-shelf-section {
  margin-top: 2.5rem;
}

.view-all-link {
  color: #2563EB;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #3B82F6;
  text-decoration: underline;
}

.recently-played-carousel-new {
  display: flex;
  overflow-x: auto;
  gap: 1.25rem;
  width: 100%;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.recently-played-carousel-new::-webkit-scrollbar {
  display: none;
}

.recent-track-card-new {
  flex-shrink: 0;
  width: 165px;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 1 / 1.35;
  justify-content: space-between;
  text-align: left;
}

.recent-track-card-new:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.track-thumbnail-wrapper-new {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
  background: #1e1e1e;
  margin-bottom: 0.5rem;
}

.track-thumbnail-new {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.audio-wave-overlay-new {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.wave-bar-new {
  width: 3px;
  height: 16px;
  background: #2563EB;
  border-radius: 1px;
  animation: wavePulseNew 1.2s infinite ease-in-out;
}

.wave-bar-new:nth-child(2) {
  animation-delay: 0.15s;
  height: 24px;
}

.wave-bar-new:nth-child(3) {
  animation-delay: 0.3s;
  height: 14px;
}

@keyframes wavePulseNew {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}

.track-hover-play-new {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.recent-track-card-new:hover .track-hover-play-new {
  opacity: 1;
}

.track-meta-new {
  display: flex;
  flex-direction: column;
}

.track-title-new {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
}

.track-artist-new {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

/* Detailed Stats Dashboard TAB View */
.listening-stats-detail-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-detail-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
}

.stats-grid-dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stats-dashboard-card {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
}

.dashboard-card-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.1);
}

.dashboard-card-value {
  font-size: 2rem;
  font-weight: 800;
  color: #FFFFFF;
}

.dashboard-card-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  font-weight: 500;
}

.dashboard-card-trend {
  font-size: 0.75rem;
  color: #10B981;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dashboard-card-subtext {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.75rem;
}

.listening-chart-mock {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  text-align: left;
}

.chart-mock-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
}

.chart-bars-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 150px;
  padding-top: 1rem;
}

.chart-bar-col {
  width: 32px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.chart-bar-col::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: #2563EB;
  border-radius: 4px 4px 0 0;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.chart-bar-col:hover::before {
  opacity: 0.7;
}

.chart-bar-col span {
  font-size: 0.7rem;
  color: var(--text-secondary);
  position: absolute;
  bottom: -20px;
  white-space: nowrap;
}

.day-highlight {
  color: #2563EB !important;
  font-weight: 700;
}

/* Edit Profile Form TAB View */
.edit-profile-detail-content {
  padding: 0.5rem 0; /* Align with main-left-column container spacing */
}

.edit-profile-form-new {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-profile-section-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.sub-section-title-new {
  font-size: 1.1rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2rem;
  text-align: left;
}

.section-divider-new {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 2rem 0;
}

.personal-info-grid {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.avatar-upload-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.avatar-circle-wrapper {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #FFFFFF;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.avatar-preview-img-new {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-photo-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  width: 100%;
}

.upload-photo-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.inputs-grid-layout-sejajar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem 1.5rem;
}

.form-group-new {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.form-label-new {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input-new-field {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.85rem;
  color: #FFFFFF;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.form-input-new-field:focus {
  border-color: #2563EB;
  background: rgba(255, 255, 255, 0.02);
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.15);
}

.input-with-right-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-right-icon .form-input-new-field {
  padding-right: 2.5rem;
}

.right-field-icon {
  position: absolute;
  right: 0.85rem;
  color: var(--text-secondary);
  font-size: 1rem;
  pointer-events: none;
}

.single-card-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
}

.save-btn-new {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  padding: 0.65rem 2rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
  min-width: 140px;
}

.save-btn-new:hover {
  background: #1D4ED8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* Sidebar Toggle & Closed State Styles */
.sidebar-toggle-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.sidebar-toggle-btn:hover {
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}

.profile-main-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: start;
  transition: all 0.3s ease;
}

.profile-main-grid.sidebar-closed {
  grid-template-columns: 1fr !important;
}

.profile-main-grid.sidebar-closed .main-right-column {
  display: none !important;
}

/* Profile Banner Section */
.profile-banner-grid {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2.5rem;
  align-items: center;
}

.banner-texts-column {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.banner-current-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
}

.banner-specs-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.spec-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.spec-value {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.banner-preview-column {
  width: 100%;
}

.banner-preview-img-wrapper {
  width: 100%;
  height: 120px;
  border-radius: var(--radius-sm);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.banner-upload-overlay-btn {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-banner-overlay-btn {
  background: rgba(18, 18, 18, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.upload-banner-overlay-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Save Success Notification Toast */
.save-success-toast {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #10B981;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  animation: slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-size: 0.9rem;
}

.success-toast-icon {
  font-size: 1.15rem;
}

@keyframes slideInToast {
  from {
    transform: translate(-50%, -24px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* Widget Cards Sidebar */
.widget-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  width: 100%;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding-bottom: 0.75rem;
  transition: margin-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, padding-bottom 0.3s ease;
}

.widget-header.header-collapsed {
  border-bottom-color: transparent;
  margin-bottom: 0;
  padding-bottom: 0;
}

.widget-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.widget-icon {
  color: #2563EB;
  font-size: 1.25rem;
}

.widget-title {
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
}

.collapse-icon {
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: transform 0.3s ease;
}

.widget-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin-top 0.3s ease;
}

.widget-body.collapsed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

.widget-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-row-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.widget-row-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
}

.text-blue {
  color: #2563EB !important;
}

.most-played-section {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.most-played-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.most-played-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
}

.most-played-art {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}

.most-played-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.most-played-meta {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.most-played-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FFFFFF;
}

.most-played-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.1rem;
}

/* Responsive Breakpoints & Scroll Rows on Mobile */

@media (max-width: 992px) {
  .profile-main-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .main-right-column {
    flex-direction: row;
    width: 100%;
    gap: 1.5rem;
  }
  .widget-card {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .profile-view {
    grid-column: 1;
    grid-row: 2;
    margin: 0;
    border-radius: 0;
    border: none;
    height: 100%;
    padding: 1rem 1rem 7.5rem 1rem; /* Padding for mobile player bar & navbar space */
  }

  /* Mobile Active Tab Button size fixes */
  .profile-tab-bar {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .tab-btn {
    padding: 0.5rem 0.25rem 0.75rem 0.25rem;
    font-size: 0.75rem !important; /* Smaller text size on mobile active tab buttons */
    gap: 0.35rem;
  }

  .tab-icon {
    font-size: 0.95rem !important;
  }

  .sidebar-toggle-btn {
    display: none !important; /* Hide show/hide stats button completely on mobile */
  }

  .hero-banner-section {
    height: auto;
    padding: 1.5rem 1rem;
    min-height: 200px;
    margin-bottom: 1.5rem;
  }

  .hero-banner-content {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
  }

  .hero-left-info {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .avatar-container {
    width: 80px;
    height: 80px;
  }

  .profile-name {
    font-size: 1.75rem;
    justify-content: center;
  }

  .hero-right-metrics {
    width: 100%;
    justify-content: space-around;
    padding: 0.75rem 1rem;
    gap: 0;
  }

  .metric-divider {
    display: none;
  }

  .playlists-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
  }

  .playlists-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  

  .create-playlist-cta {
    width: 100%;
    justify-content: center;
  }

  /* Carousel swipeable behavior on Mobile */
  .playlists-grid-six {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scroll-snap-type: x mandatory;
    width: 100%;
    scrollbar-width: none;
  }

  .playlists-grid-six::-webkit-scrollbar {
    display: none;
  }

  .playlist-card-new {
    flex-shrink: 0;
    width: 140px;
    scroll-snap-align: start;
  }

  .create-new-card {
    flex-shrink: 0;
    width: 140px;
    scroll-snap-align: start;
    aspect-ratio: 1 / 1.35;
  }

  .recently-played-carousel-new {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .recently-played-carousel-new::-webkit-scrollbar {
    display: none;
  }

  .recent-track-card-new {
    flex-shrink: 0;
    width: 140px;
    scroll-snap-align: start;
  }

  .main-right-column {
    flex-direction: column;
  }

  .form-group-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid-dashboard {
    grid-template-columns: 1fr;
  }

  .edit-profile-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* Edit Profile Mobile Styles */
  .edit-profile-detail-content {
    padding: 0;
  }

  .edit-profile-section-card {
    padding: 1.5rem 1rem;
  }

  .personal-info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .avatar-upload-column {
    gap: 0.75rem;
  }

  .avatar-circle-wrapper {
    width: 100px;
    height: 100px;
  }

  .upload-photo-btn {
    width: auto;
    padding: 0.5rem 1rem;
  }

  .inputs-grid-layout-sejajar {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .single-card-save-row {
    margin-top: 1.5rem;
    padding-top: 1rem;
    justify-content: center;
  }

  .save-btn-new {
    width: 100%;
    padding: 0.75rem;
  }

  .profile-banner-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    align-items: stretch;
  }

  .banner-texts-column {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .banner-specs-wrap {
    flex-direction: row;
    gap: 0.5rem;
  }

  .banner-preview-img-wrapper {
    height: 90px;
  }

  .upload-banner-overlay-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}
</style>
