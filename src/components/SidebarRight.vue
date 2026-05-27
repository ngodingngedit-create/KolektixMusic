<script setup>
defineProps({
  isCollapsed: Boolean
})
defineEmits(['toggle-collapse'])

const popularSongs = [
  { rank: 1, title: 'To the Bone', artist: 'Pamungkas', plays: '1.2M', img: '/album_to_the_bone.jpg', active: true },
  { rank: 2, title: 'Monolog', artist: 'Pamungkas', plays: '890K', img: '/album_to_the_bone.jpg' },
  { rank: 3, title: 'Kenangan Manis', artist: 'Pamungkas', plays: '765K', img: '/album_to_the_bone.jpg' },
  { rank: 4, title: 'One Only', artist: 'Pamungkas', plays: '620K', img: '/album_to_the_bone.jpg' },
  { rank: 5, title: 'I Love You so Bad', artist: 'Pamungkas', plays: '540K', img: '/album_to_the_bone.jpg' }
]

const activityFeed = [
  { name: 'Nadin Amizah', action: 'uploaded a new song', target: 'Bila Nanti', time: '2h ago', img: '/nadin.jpg' },
  { name: 'Yura Yunita', action: 'will be live on Kolektix', target: 'Live Session • 24 May', time: '5h ago', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: 'Pamungkas', action: 'added a new song', target: 'To the Bone', time: '1d ago', img: '/pamungkas.jpg' }
]
</script>

<template>
  <aside :class="{ 'sidebar-right': true, 'collapsed': isCollapsed }" class="flex flex-col justify-between">
    <!-- Scrollable Center Container -->
    <div class="menu-scroll-container flex-1 flex flex-col gap-6">
      <!-- Upcoming Events Card -->
      <div class="events-section">
        <div v-if="!isCollapsed" class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold uppercase tracking-wider text-secondary">Upcoming Events</h3>
          <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
        </div>
        <div class="event-card glass-panel flex flex-col justify-between" :class="{ 'p-4': !isCollapsed, 'p-2': isCollapsed }">
          <div class="flex items-start gap-3" :class="{ 'justify-center': isCollapsed }">
            <div class="date-badge flex flex-col items-center justify-center rounded-lg p-2 shrink-0">
              <span class="text-xl font-bold text-accent">24</span>
              <span class="text-xs font-semibold uppercase text-accent">May</span>
            </div>
            <div v-if="!isCollapsed" class="event-details flex-1 min-w-0">
              <h4 class="text-sm font-bold leading-tight truncate">Pamungkas Live in Jakarta</h4>
              <p class="text-xs text-secondary mt-1 truncate">Istora Senayan, Jakarta</p>
            </div>
          </div>
          <div v-if="!isCollapsed" class="event-artist-overlay flex items-center justify-between mt-4 pt-4">
            <div class="flex items-center gap-2">
              <div class="artist-thumb w-6 h-6 rounded-full overflow-hidden bg-gray-600">
                <img src="/pamungkas.jpg" alt="Pamungkas" class="w-full h-full object-cover"/>
              </div>
              <span class="text-xs text-secondary font-medium">Pamungkas</span>
            </div>
            <button class="btn btn-primary text-xs py-1 px-3">Get Tickets</button>
          </div>
        </div>
      </div>

      <!-- Popular Songs List -->
      <div class="popular-section flex-1">
        <div v-if="!isCollapsed" class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold uppercase tracking-wider text-secondary">Popular Songs</h3>
          <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
        </div>
        <div class="songs-list flex flex-col gap-3">
          <div 
            v-for="song in popularSongs" 
            :key="song.rank" 
            class="song-item flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer" 
            :class="{ 'active-song': song.active, 'justify-center': isCollapsed }"
            :title="isCollapsed ? `${song.title} - ${song.artist}` : ''"
          >
            <span v-if="!isCollapsed" class="rank-num text-xs font-bold text-secondary w-4 text-center">{{ song.rank }}</span>
            <div class="song-thumb w-10 h-10 rounded-md overflow-hidden bg-gray-600 shrink-0">
              <img :src="song.img" :alt="song.title" class="w-full h-full object-cover"/>
            </div>
            <div v-if="!isCollapsed" class="song-info flex-1 min-w-0">
              <h4 class="text-sm font-semibold truncate">{{ song.title }}</h4>
              <p class="text-xs text-secondary truncate">{{ song.artist }}</p>
            </div>
            <div v-if="!isCollapsed" class="song-indicator">
              <div v-if="song.active" class="wave-animation">
                <span class="bar bar-1"></span>
                <span class="bar bar-2"></span>
                <span class="bar bar-3"></span>
              </div>
              <span v-else class="text-xs text-secondary">{{ song.plays }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="activity-section">
        <div v-if="!isCollapsed" class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold uppercase tracking-wider text-secondary">Activity Feed</h3>
          <a href="#" class="text-xs text-accent font-semibold hover:underline">View All</a>
        </div>
        <div class="activity-list flex flex-col gap-4">
          <div 
            v-for="(act, i) in activityFeed" 
            :key="i" 
            class="activity-item flex gap-3" 
            :class="{ 'justify-center': isCollapsed }"
            :title="isCollapsed ? `${act.name} ${act.action} ${act.target}` : ''"
          >
            <div class="activity-avatar w-8 h-8 rounded-full overflow-hidden bg-gray-600 shrink-0">
              <img :src="act.img" :alt="act.name" class="w-full h-full object-cover"/>
            </div>
            <div v-if="!isCollapsed" class="activity-text flex-1 text-xs">
              <p class="leading-normal">
                <span class="font-bold text-primary mr-1">{{ act.name }}</span>
                <span class="text-secondary mr-1">{{ act.action }}</span>
                <span class="font-semibold text-accent block mt-0.5">{{ act.target }}</span>
              </p>
              <span class="text-[10px] text-secondary mt-1 block">{{ act.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Toggle Button (Mirroring SidebarLeft) -->
    <div class="bottom-section shrink-0 mt-4">
      <div class="toggle-container">
        <button @click="$emit('toggle-collapse')" class="toggle-sidebar-btn">
          <i class="ph text-lg" :class="isCollapsed ? 'ph-caret-left' : 'ph-caret-right'"></i>
          <span class="toggle-text">{{ isCollapsed ? '' : 'Close Sidebar' }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-right {
  width: 300px;
  height: calc(100% - 2.25rem);
  margin: 0.75rem 1.5rem 1.5rem 0.25rem;
  border-radius: 5px;
  padding: 2rem 1.5rem;
  background-color: #1A1A1C; /* Solid Apple-Music style card background */
  border: 1px solid var(--border-color);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Collapsed State Styles */
.sidebar-right.collapsed {
  width: 80px;
  padding: 2rem 1.25rem;
}

.menu-scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
}

/* Hide scrollbar when collapsed */
.sidebar-right.collapsed .menu-scroll-container {
  overflow-y: hidden;
  padding-right: 0;
}

.event-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%);
  border: 1px solid var(--border-color);
}

.date-badge {
  background-color: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  min-width: 50px;
}

.event-artist-overlay {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.song-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.active-song {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Audio wave animation */
.wave-animation {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  width: 14px;
}
.bar {
  display: block;
  width: 2px;
  background-color: var(--accent-blue);
  animation: wave 1.2s ease-in-out infinite alternate;
}
.bar-1 { height: 60%; animation-delay: 0.1s; }
.bar-2 { height: 100%; animation-delay: 0.3s; }
.bar-3 { height: 40%; animation-delay: 0.5s; }

@keyframes wave {
  0% { height: 20%; }
  100% { height: 100%; }
}

/* Toggle Container & Button (Mirror of SidebarLeft) */
.toggle-container {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  width: 100%;
}

.toggle-sidebar-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  padding: 0.5rem 0;
  gap: 0.5rem;
}

.toggle-sidebar-btn:hover {
  color: var(--text-primary);
}

.toggle-text {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  transition: opacity 0.2s ease, max-width 0.2s ease, visibility 0.2s;
  opacity: 1;
  white-space: nowrap;
}

.sidebar-right.collapsed .toggle-text {
  opacity: 0;
  max-width: 0;
  visibility: hidden;
  pointer-events: none;
}
</style>
