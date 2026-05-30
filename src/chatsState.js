import { reactive } from 'vue'

export const chatsState = reactive({
  chats: [
    {
      id: 1,
      name: 'Nadya Putri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      avatarGradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      initials: 'NP',
      unreadCount: 2,
      snippet: 'See you at the event!',
      time: '10:30 AM',
      online: true,
      group: false
    },
    {
      id: 2,
      name: 'Rafi Maulana',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      avatarGradient: 'linear-gradient(135deg, #4E65FF, #92EFFD)',
      initials: 'RM',
      unreadCount: 1,
      snippet: 'I really like your latest track 🔥',
      time: '9:15 AM',
      online: false,
      group: false
    },
    {
      id: 3,
      name: 'Indie Room',
      avatar: '',
      avatarGradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
      initials: 'IR',
      unreadCount: 0,
      snippet: 'Arman: Check out this new track!',
      time: 'Yesterday',
      online: false,
      group: true
    },
    {
      id: 4,
      name: 'Dita Aulia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      avatarGradient: 'linear-gradient(135deg, #f857a6, #ff5858)',
      initials: 'DA',
      unreadCount: 0,
      snippet: 'Let\'s collaborate soon!',
      time: 'Yesterday',
      online: true,
      group: false
    },
    {
      id: 5,
      name: 'Fikriansyah',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      avatarGradient: 'linear-gradient(135deg, #fc00ff, #00dbde)',
      initials: 'F',
      unreadCount: 0,
      snippet: 'Thanks for the feedback!',
      time: 'May 20',
      online: false,
      group: false
    },
    {
      id: 6,
      name: 'Concert Buddies',
      avatar: '',
      avatarGradient: 'linear-gradient(135deg, #F3904F, #3B4371)',
      initials: 'CB',
      unreadCount: 0,
      snippet: 'Dita: Don\'t forget to bring your ticket!',
      time: 'May 18',
      online: false,
      group: true
    },
    {
      id: 7,
      name: 'Bagas Pratama',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      avatarGradient: 'linear-gradient(135deg, #111111, #444444)',
      initials: 'BP',
      unreadCount: 0,
      snippet: 'Sent you a track',
      time: 'May 17',
      online: false,
      group: false
    }
  ],

  get unreadCount() {
    return this.chats.reduce((sum, chat) => sum + chat.unreadCount, 0)
  }
})
