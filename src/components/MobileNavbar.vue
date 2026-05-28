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
      <span v-if="item.isLogo" class="mobile-nav-icon kolektix-logo-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 46" fill="none" class="kolektix-logo-svg">
          <path
            :fill="activeTab === 'Home' ? '#2563EB' : '#9CA3AF'"
            d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
          />
        </svg>
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
    height: 58px;
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
    height: 24px;
    transition: transform 0.2s ease;
  }

  .mobile-nav-btn.active .mobile-nav-icon {
    transform: scale(1.05);
  }

  .kolektix-logo-wrap {
    width: 24px;
    height: 24px;
  }

  .kolektix-logo-svg {
    display: block;
    transition: filter 0.2s ease;
  }

  .mobile-nav-btn.active .kolektix-logo-svg {
    filter: drop-shadow(0 0 6px rgba(37, 99, 235, 0.5));
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
