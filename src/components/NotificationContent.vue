<script setup>
import { ref, computed } from 'vue'
import { notificationsState } from '../notificationsState.js'

const activeFilter = ref('Semua')

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'Semua') {
    return notificationsState.notifications
  }
  return notificationsState.notifications.filter(item => item.category === activeFilter.value)
})

const markAllRead = () => {
  notificationsState.markAllRead()
}
</script>

<template>
  <main class="notifications-view">
    <div class="notifications-header">
      <h1>Notifikasi</h1>
      <button 
        v-if="notificationsState.notifications.some(n => n.unread)" 
        @click="markAllRead" 
        class="mark-read-btn"
      >
        <i class="ph ph-checks"></i> Tandai semua dibaca
      </button>
    </div>

    <!-- Tab Filters -->
    <div class="notifications-tabs">
      <button 
        v-for="tab in ['Semua', 'Aktivitas', 'Pesan', 'Sistem']" 
        :key="tab"
        class="tab-btn"
        :class="{ 'active': activeFilter === tab }"
        @click="activeFilter = tab"
      >
        {{ tab }}
        <span v-if="activeFilter === tab" class="active-line"></span>
      </button>
    </div>

    <!-- Notification Feed -->
    <div class="notifications-feed">
      <div v-if="filteredNotifications.length === 0" class="empty-feed">
        <i class="ph ph-bell-slash text-4xl opacity-30 mb-2"></i>
        <p class="text-secondary text-sm">Tidak ada notifikasi untuk kategori ini.</p>
      </div>

      <div 
        v-else 
        v-for="item in filteredNotifications" 
        :key="item.id" 
        class="notification-row"
        :class="{ 'is-unread': item.unread }"
      >
        <!-- Media layout container (Left column) -->
        <div class="notification-media">
          <div v-if="item.user" class="avatar-container">
            <img v-if="item.user.avatar" :src="item.user.avatar" :alt="item.user.name" class="user-avatar" />
            <div v-else class="user-avatar initials-avatar" :style="{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }">
              CB
            </div>
            <!-- Separated overlapping badge icon circle -->
            <div class="badge-circle" :style="{ backgroundColor: item.badgeBg }">
              <i class="ph" :class="item.badgeIcon"></i>
            </div>
          </div>

          <div v-else-if="item.artwork" class="artwork-container">
            <img :src="item.artwork" alt="Artwork" class="track-artwork" />
            <div class="badge-circle" :style="{ backgroundColor: item.badgeBg }">
              <i class="ph" :class="item.badgeIcon"></i>
            </div>
          </div>

          <div v-else class="icon-badge-only" :style="{ backgroundColor: item.badgeBg }">
            <i class="ph text-white" :class="item.badgeIcon"></i>
          </div>
        </div>

        <!-- Description texts (Middle column) -->
        <div class="notification-content">
          <div class="notification-text">
            <template v-if="item.type === 'like'">
              <span class="user-name">{{ item.user.name }}</span> menyukai track <span class="highlight">"{{ item.trackName }}"</span> kamu
            </template>
            <template v-else-if="item.type === 'comment'">
              <span class="user-name">{{ item.user.name }}</span> mengomentari track <span class="highlight">"{{ item.trackName }}"</span> kamu
            </template>
            <template v-else-if="item.type === 'follow'">
              <span class="user-name">{{ item.user.name }}</span> mulai mengikuti kamu
            </template>
            <template v-else>
              {{ item.text }}
            </template>
          </div>

          <!-- Comment quoted text -->
          <div v-if="item.quoteText" class="quote-block">
            "{{ item.quoteText }}"
          </div>

          <!-- Event / Milestone Subtitles -->
          <div v-if="item.subtitle" class="notification-subtitle">
            {{ item.subtitle }}
          </div>
        </div>

        <!-- Relative timestamp & Blue dot (Right column) -->
        <div class="notification-meta">
          <span class="timestamp">{{ item.time }}</span>
          <span v-if="item.unread" class="unread-dot"></span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.notifications-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C; /* Match Home page background color (#1A1A1C) */
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notifications-header {
  padding: 24px 32px 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notifications-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  margin: 0;
}

.mark-read-btn {
  background: transparent;
  border: none;
  color: #2563EB;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.mark-read-btn:hover {
  background-color: rgba(37, 99, 235, 0.08);
}

/* Horizontal borderless tabs */
.notifications-tabs {
  display: flex;
  gap: 24px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-btn {
  background: transparent;
  border: none;
  color: #9CA3AF;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 4px 16px 4px;
  position: relative;
  transition: color 0.2s ease;
}

.tab-btn:hover {
  color: #FFFFFF;
}

.tab-btn.active {
  color: #2563EB;
}

.active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563EB;
  border-radius: 99px;
}

/* Notification Feed list */
.notifications-feed {
  flex: 1;
  overflow-y: auto;
  padding: 8px 32px 32px 32px;
  display: flex;
  flex-direction: column;
}

.notifications-feed::-webkit-scrollbar {
  width: 6px;
}
.notifications-feed::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 99px;
}

.empty-feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
}

.notification-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease;
}

.notification-row:hover {
  background-color: rgba(255, 255, 255, 0.01);
}

/* Media Layout with avatar and badge */
.notification-media {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.avatar-container, .artwork-container {
  position: relative;
  width: 44px;
  height: 44px;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.initials-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  color: #FFFFFF;
}

.track-artwork {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.badge-circle {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 1.5px solid #1A1A1C;
}

.icon-badge-only {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Content Layout (Middle column) */
.notification-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.notification-text {
  font-size: 14px;
  color: #E5E7EB;
  line-height: 1.5;
}

.user-name {
  font-weight: 600;
  color: #FFFFFF;
}

.highlight {
  font-weight: 600;
  color: #FFFFFF;
}

.quote-block {
  font-size: 13px;
  color: #9CA3AF;
  background-color: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #10B981;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 4px;
  max-width: 90%;
  font-style: italic;
}

.notification-subtitle {
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 2px;
}

/* Meta Layout (Right column) */
.notification-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.timestamp {
  font-size: 12px;
  color: #6B7280;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2563EB;
  flex-shrink: 0;
}

/* Responsive configurations */
@media (max-width: 768px) {
  .notifications-view {
    grid-column: 1;
    grid-row: 2;
    margin: 0;
    border-radius: 0;
    border: none;
    height: calc(100% - 62px - env(safe-area-inset-bottom, 0px)); /* Align above mobile bottom nav */
  }

  .notifications-header {
    padding: 16px 20px 12px 20px;
  }

  .notifications-header h1 {
    font-size: 24px;
  }

  .mark-read-btn {
    font-size: 12px;
    padding: 4px 8px;
  }

  .notifications-tabs {
    padding: 0 20px;
    gap: 16px;
  }

  .tab-btn {
    font-size: 13px;
    padding: 10px 2px 12px 2px;
  }

  .notifications-feed {
    padding: 8px 20px 20px 20px;
  }

  .notification-row {
    gap: 12px;
    padding: 16px 0;
  }

  .avatar-container, .artwork-container {
    width: 38px;
    height: 38px;
  }

  .user-avatar, .track-artwork, .icon-badge-only {
    width: 38px;
    height: 38px;
  }

  .initials-avatar {
    font-size: 11px;
  }

  .badge-circle {
    width: 18px;
    height: 18px;
    font-size: 8px;
  }

  .icon-badge-only {
    font-size: 16px;
  }

  .notification-text {
    font-size: 13px;
  }

  .quote-block {
    font-size: 12px;
    max-width: 100%;
  }

  .notification-subtitle {
    font-size: 12px;
  }

  .timestamp {
    font-size: 11px;
  }

  .notification-meta {
    gap: 8px;
  }
}
</style>
