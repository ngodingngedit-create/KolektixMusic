import { reactive } from 'vue'

export const notificationsState = reactive({
  notifications: [
    {
      id: 1,
      type: 'like',
      category: 'Aktivitas',
      user: {
        name: 'Nadya Putri',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      trackName: 'Midnight Drive',
      time: '2 menit lalu',
      unread: true,
      badgeBg: '#2563EB',
      badgeIcon: 'ph-heart-fill'
    },
    {
      id: 2,
      type: 'comment',
      category: 'Pesan',
      user: {
        name: 'Aldi Ramadhan',
        avatar: '/aldi_ramadhan_avatar.png'
      },
      trackName: 'City Lights',
      quoteText: 'Love this vibe! Keep it up 🔥',
      time: '15 menit lalu',
      unread: true,
      badgeBg: '#10B981',
      badgeIcon: 'ph-chat-circle-dots-fill'
    },
    {
      id: 3,
      type: 'follow',
      category: 'Aktivitas',
      user: {
        name: 'Concert Buddies',
        avatar: '' // Group icon fallback
      },
      time: '1 jam lalu',
      unread: true,
      badgeBg: '#8B5CF6',
      badgeIcon: 'ph-users-fill'
    },
    {
      id: 4,
      type: 'upload',
      category: 'Sistem',
      artwork: '/album_hindia.png',
      text: 'Track "Midnight Drive" kamu sudah dipublikasikan. Sekarang track kamu sudah bisa didengar semua orang.',
      time: '2 jam lalu',
      unread: true,
      badgeBg: '#3B82F6',
      badgeIcon: 'ph-cloud-arrow-up-fill'
    },
    {
      id: 5,
      type: 'event',
      category: 'Sistem',
      text: 'Ada acara baru di dekat kamu: "Synthwave Night Live"',
      subtitle: 'Jumat, 31 Mei • Jakarta',
      time: '3 jam lalu',
      unread: true,
      badgeBg: '#A78BFA',
      badgeIcon: 'ph-calendar-fill'
    },
    {
      id: 6,
      type: 'milestone',
      category: 'Sistem',
      text: 'Track "City Lights" kamu sudah mencapai 1K plays! 🎉',
      subtitle: 'Lihat statistik lengkapnya sekarang.',
      time: 'Kemarin',
      unread: true,
      badgeBg: '#F59E0B',
      badgeIcon: 'ph-chart-bar-fill'
    },
    {
      id: 7,
      type: 'update',
      category: 'Sistem',
      text: 'Kami telah memperbarui Panduan Komunitas kami. Yuk, luangkan waktu untuk membaca pembaruan terbaru.',
      time: '23 Mei 2024',
      unread: true,
      badgeBg: '#6B7280',
      badgeIcon: 'ph-gear-fill'
    }
  ],

  get unreadCount() {
    return this.notifications.filter(n => n.unread).length
  },

  markAllRead() {
    this.notifications.forEach(item => {
      item.unread = false
    })
  }
})
