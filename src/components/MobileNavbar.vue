<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'Home'
  },
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change-tab'])

const navItems = [
  { name: 'Home', isLogo: true },
  { name: 'Discover', icon: 'ph-compass' },
  { name: 'Search', icon: 'ph-magnifying-glass' },
  { name: 'Events', icon: 'ph-calendar-blank' },
  { name: 'Artists', icon: 'ph-users' },
]
</script>

<template>
  <nav class="mobile-bottom-nav" :class="{ 'navbar-hidden': isSidebarOpen }">
    <button
      v-for="item in navItems"
      :key="item.name"
      class="mobile-nav-btn"
      :class="{ 'active': activeTab === item.name }"
      @click="$emit('change-tab', item.name)"
    >
      <!-- Home uses the Kolektix logo SVG -->
      <!-- Home uses the logo (2).png image -->
      <span v-if="item.isLogo" class="mobile-nav-icon kolektix-logo-wrap">
        <img src="/logo/logo (2).png" alt="Kolektix Logo" class="mobile-logo-img" />
      </span>
      <span v-else class="mobile-nav-icon">
        <i class="ph" :class="item.icon"></i>
      </span>
      <span class="mobile-nav-label">{{ item.name }}</span>
      <!-- Active indicator line at bottom -->
      <span v-if="activeTab === item.name" class="active-indicator"></span>
    </button>
  </nav>
</template>

<style scoped>
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: 62px;
    background: rgba(14, 14, 16, 0.6) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 0 4px;
    padding-bottom: env(safe-area-inset-bottom, 0);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease;
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.718);
  }

  .mobile-bottom-nav.navbar-hidden {
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
  }

  .mobile-nav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 6px 4px 4px;
    position: relative;
    transition: color 0.2s ease;
    min-width: 0;
    height: 100%;
  }

  .mobile-nav-btn.active {
    color: var(--accent-blue);
  }

  .mobile-nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    line-height: 1;
    height: 32px; /* Increased to accommodate larger logo */
    transition: transform 0.2s ease;
  }

  .mobile-nav-btn.active .mobile-nav-icon {
    transform: scale(1.05);
  }

  .kolektix-logo-wrap {
    width: 42px;
    height: 42px;
  }

  .mobile-logo-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: all 0.2s ease;
    filter: brightness(0) invert(0.65) opacity(0.65); /* Matches inactive color (#9CA3AF) precisely */
  }

  .mobile-nav-btn.active .mobile-logo-img {
    filter: none;
    opacity: 1;
  }

  .mobile-nav-label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    line-height: 1;
  }

  /* Blue active indicator line at bottom of button */
  .active-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2.5px;
    background: var(--accent-blue);
    border-radius: 2px 2px 0 0;
    box-shadow: 0 0 8px rgba(37, 99, 235, 0.7);
  }
}
</style>
