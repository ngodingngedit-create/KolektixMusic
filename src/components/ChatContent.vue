<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['chat-pane-change'])

// Define active state and navigation
const currentChatId = ref(1) // Nadya Putri by default
const searchQuery = ref('')
const activeFilter = ref('All') // 'All', 'Unread', 'Groups'
const messageInput = ref('')
const mobileActivePane = ref('list') // 'list' or 'chat'

watch(mobileActivePane, (newVal) => {
  emit('chat-pane-change', newVal === 'chat')
}, { immediate: true })
const messageThreadScrollContainer = ref(null)
const fileInput = ref(null)

// Notification state for Archived Chats
const showArchivedToast = ref(false)

// Chat list database
const chats = ref([
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
])

// Message threads database
const messageThreads = ref({
  1: [
    { id: 101, text: 'Hey Aldi! 👋', sender: 'other', time: '10:26 AM' },
    { id: 102, text: 'I just listened to your "Midnight Drive" playlist. The vibes are amazing!', sender: 'other', time: '10:26 AM' },
    { id: 103, text: 'Hey Nadya! 🙌', sender: 'me', time: '10:29 AM' },
    { id: 104, text: 'Thank you so much! I\'m glad you enjoy it. Which track is your favorite?', sender: 'me', time: '10:29 AM' },
    { id: 105, text: 'Definitely "City Lights" 🌆\n\nIt gives me so much energy at night. You have a great taste in music!', sender: 'other', time: '10:30 AM' },
    { id: 106, text: 'Ahh that means a lot! I\'ll keep updating the playlist with more good vibes soon 🔥', sender: 'me', time: '10:31 AM' },
    { id: 107, text: 'Can\'t wait! I\'ll be waiting for it 😊', sender: 'other', time: '10:31 AM' }
  ],
  2: [
    { id: 201, text: 'Hey man! Just wanted to say your music production is next level.', sender: 'other', time: '9:10 AM' },
    { id: 202, text: 'I really like your latest track 🔥', sender: 'other', time: '9:15 AM' },
    { id: 203, text: 'Yo Rafi! Thanks a lot dude, really appreciate the support!', sender: 'me', time: '9:20 AM' }
  ],
  3: [
    { id: 301, text: 'Welcome everyone to the Indie Room group chat! Let\'s share some new releases.', sender: 'other', time: 'Yesterday' },
    { id: 302, text: 'Arman: Check out this new track!', sender: 'other', time: 'Yesterday' },
    { id: 303, text: 'Awesome vibe on that one!', sender: 'me', time: 'Yesterday' }
  ],
  4: [
    { id: 401, text: 'Hi Aldi! I was wondering if you\'re open for collab?', sender: 'other', time: 'Yesterday' },
    { id: 402, text: 'Let\'s collaborate soon!', sender: 'other', time: 'Yesterday' },
    { id: 403, text: 'Hey Dita! Absolutely, let\'s schedule a call next week.', sender: 'me', time: 'Yesterday' }
  ],
  5: [
    { id: 501, text: 'Thanks for the feedback!', sender: 'other', time: 'May 20' },
    { id: 502, text: 'No worries! Keep polishing the vocals, the melody is strong.', sender: 'me', time: 'May 20' }
  ],
  6: [
    { id: 601, text: 'Hey, did everyone buy their tickets for the festival?', sender: 'other', time: 'May 18' },
    { id: 602, text: 'Dita: Don\'t forget to bring your ticket!', sender: 'other', time: 'May 18' }
  ],
  7: [
    { id: 701, text: 'Sent you a track', sender: 'other', time: 'May 17' },
    { id: 702, text: 'Let me check it out, I\'ll let you know what I think.', sender: 'me', time: 'May 17' }
  ]
})

// Active chat item
const activeChat = computed(() => {
  if (currentChatId.value === null) return null
  return chats.value.find(c => c.id === currentChatId.value) || null
})

// Messages for active thread
const activeMessages = computed(() => {
  return messageThreads.value[currentChatId.value] || []
})

// Filter & search chat threads
const filteredChats = computed(() => {
  return chats.value.filter(chat => {
    // Filter type
    const matchesFilter = 
      activeFilter.value === 'All' ||
      (activeFilter.value === 'Unread' && chat.unreadCount > 0) ||
      (activeFilter.value === 'Groups' && chat.group)

    // Search query
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          chat.snippet.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesFilter && matchesSearch
  })
})

// Select active chat thread
const selectChat = (id) => {
  currentChatId.value = id
  
  // Clear unread badge
  const chatIndex = chats.value.findIndex(c => c.id === id)
  if (chatIndex !== -1) {
    chats.value[chatIndex].unreadCount = 0
  }

  // Switch mobile layout view
  mobileActivePane.value = 'chat'
  
  // Scroll to bottom
  scrollToBottom()
}

// Back to list on mobile
const backToList = () => {
  mobileActivePane.value = 'list'
}

// Send a message
const sendMessage = () => {
  if (!messageInput.value.trim()) return

  const now = new Date()
  let hours = now.getHours()
  const minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  const minStr = minutes < 10 ? '0' + minutes : minutes
  const timeStr = `${hours}:${minStr} ${ampm}`

  const newMsg = {
    id: Date.now(),
    text: messageInput.value.trim(),
    sender: 'me',
    time: timeStr
  }

  // Add message
  if (!messageThreads.value[currentChatId.value]) {
    messageThreads.value[currentChatId.value] = []
  }
  messageThreads.value[currentChatId.value].push(newMsg)

  // Update snippet in chats list
  const chatIndex = chats.value.findIndex(c => c.id === currentChatId.value)
  if (chatIndex !== -1) {
    chats.value[chatIndex].snippet = messageInput.value.trim()
    chats.value[chatIndex].time = timeStr
  }

  messageInput.value = ''
  
  // Scroll to bottom
  scrollToBottom()
}

// Scroll active thread to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messageThreadScrollContainer.value) {
      messageThreadScrollContainer.value.scrollTop = messageThreadScrollContainer.value.scrollHeight
    }
  })
}

// Trigger archived chats toast notification
const handleArchivedChatsClick = () => {
  showArchivedToast.value = true
  setTimeout(() => {
    showArchivedToast.value = false
  }, 3000)
}

// Responsive listener
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// File selection handlers
const triggerFileSelect = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const now = new Date()
  let hours = now.getHours()
  const minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const minStr = minutes < 10 ? '0' + minutes : minutes
  const timeStr = `${hours}:${minStr} ${ampm}`

  const newMsg = {
    id: Date.now(),
    text: `📎 Sent file: ${file.name}`,
    sender: 'me',
    time: timeStr
  }

  if (!messageThreads.value[currentChatId.value]) {
    messageThreads.value[currentChatId.value] = []
  }
  messageThreads.value[currentChatId.value].push(newMsg)

  // Update snippet in chats list
  const chatIndex = chats.value.findIndex(c => c.id === currentChatId.value)
  if (chatIndex !== -1) {
    chats.value[chatIndex].snippet = `📎 File: ${file.name}`
    chats.value[chatIndex].time = timeStr
  }

  e.target.value = ''
  scrollToBottom()
}

// Emoji picker state & logic
const showEmojiPicker = ref(false)
const emojiCategories = ref([
  {
    name: 'Smileys',
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😭', '😡', '🤬', '🤯']
  },
  {
    name: 'Gestures',
    emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜']
  },
  {
    name: 'Hearts & Symbols',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '🔥', '✨', '🌟', '🎉', '🎈', '🎵', '🎶', '🎧', '📻', '🎸', '🎹', '🎤', '📷', '🌆', '🌃', '💯', '🆗', '✅', '⚠️']
  }
])

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const addEmoji = (emoji) => {
  messageInput.value += emoji
}

// Options Menu state & actions
const showOptionsMenu = ref(false)
const toggleOptionsMenu = () => {
  showOptionsMenu.value = !showOptionsMenu.value
}

const deleteActiveChat = () => {
  const idToDelete = currentChatId.value
  const index = chats.value.findIndex(c => c.id === idToDelete)
  if (index === -1) return

  chats.value.splice(index, 1)
  delete messageThreads.value[idToDelete]

  // Set currentChatId to null so we stay in active chat page but show no selected conversation state
  currentChatId.value = null
  showOptionsMenu.value = false
}

const clearActiveChatMessages = () => {
  if (currentChatId.value) {
    messageThreads.value[currentChatId.value] = []
    const chatIndex = chats.value.findIndex(c => c.id === currentChatId.value)
    if (chatIndex !== -1) {
      chats.value[chatIndex].snippet = 'No messages yet'
    }
  }
  showOptionsMenu.value = false
}

const closePickersAndMenus = (e) => {
  if (showEmojiPicker.value && !e.target.closest('.emoji-picker-container')) {
    showEmojiPicker.value = false
  }
  if (showOptionsMenu.value && !e.target.closest('.options-menu-container')) {
    showOptionsMenu.value = false
  }
}

// Compose Modal state and suggested contacts
const showComposeModal = ref(false)
const nextContactId = ref(100) // Dummy sequence for new contacts
const availableContacts = ref([
  {
    name: 'Nadin Amizah',
    avatar: '/nadin.jpg',
    avatarGradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    initials: 'NA',
    online: true,
    group: false,
    snippet: 'Hi! Let\'s talk about music 🎶',
    messages: [
      { id: 901, text: 'Hi! Let\'s talk about music 🎶', sender: 'other', time: '10:00 AM' }
    ]
  },
  {
    name: 'Pamungkas',
    avatar: '/pamungkas.jpg',
    avatarGradient: 'linear-gradient(135deg, #F3904F, #3B4371)',
    initials: 'P',
    online: false,
    group: false,
    snippet: 'Hey there! How is it going?',
    messages: [
      { id: 902, text: 'Hey there! How is it going?', sender: 'other', time: '10:15 AM' }
    ]
  },
  {
    name: 'Bernadya',
    avatar: '/album_bernadya1.png',
    avatarGradient: 'linear-gradient(135deg, #fc00ff, #00dbde)',
    initials: 'B',
    online: true,
    group: false,
    snippet: 'Hello! I listened to your remix.',
    messages: [
      { id: 903, text: 'Hello! I listened to your remix.', sender: 'other', time: '10:20 AM' }
    ]
  }
])

const filteredSuggestedContacts = computed(() => {
  return availableContacts.value.filter(c => 
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    c.snippet.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleComposeModal = () => {
  showComposeModal.value = !showComposeModal.value
  searchQuery.value = ''
}

const startNewChat = (contact) => {
  searchQuery.value = ''
  // Check if contact already exists in active chats
  const existingChat = chats.value.find(c => c.name === contact.name)
  if (existingChat) {
    selectChat(existingChat.id)
    showComposeModal.value = false
    return
  }

  // Create new chat
  const newId = nextContactId.value++
  const newChat = {
    id: newId,
    name: contact.name,
    avatar: contact.avatar,
    avatarGradient: contact.avatarGradient,
    initials: contact.initials,
    unreadCount: 0,
    snippet: contact.snippet,
    time: '10:30 AM',
    online: contact.online,
    group: contact.group
  }

  // Prepend to chats
  chats.value.unshift(newChat)

  // Add message threads
  messageThreads.value[newId] = [...contact.messages]

  // Select new chat
  selectChat(newId)

  // Close modal
  showComposeModal.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('click', closePickersAndMenus)
  // Clear unread badge of active chat on load
  if (currentChatId.value) {
    const index = chats.value.findIndex(c => c.id === currentChatId.value)
    if (index !== -1) {
      chats.value[index].unreadCount = 0
    }
  }
  scrollToBottom()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('click', closePickersAndMenus)
})

// Watch for chat changes to scroll
watch(currentChatId, () => {
  scrollToBottom()
})
</script>

<template>
  <div class="chat-view" :class="{ 'mobile-view': isMobile, 'mobile-chat-active': isMobile && mobileActivePane === 'chat' }">
    <!-- Left Sidebar (Chat List Pane) -->
    <div 
      class="chat-list-pane" 
      :class="{ 'hidden-mobile': isMobile && mobileActivePane === 'chat' }"
    >
      <!-- Header -->
      <div class="chat-list-header">
        <h2 v-if="!showComposeModal">Messages</h2>
        <h2 v-else>New Message</h2>
        <button class="compose-btn" :title="showComposeModal ? 'Back to Chats' : 'New Message'" @click="toggleComposeModal">
          <i v-if="!showComposeModal" class="ph ph-note-pencil text-xl text-[#9CA3AF] hover:text-white transition-colors"></i>
          <i v-else class="ph ph-arrow-left text-xl text-[#9CA3AF] hover:text-white transition-colors"></i>
        </button>
      </div>

      <!-- Search Input -->
      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <i class="ph ph-magnifying-glass search-icon text-secondary"></i>
          <input 
            type="text" 
            :placeholder="showComposeModal ? 'Search contacts' : 'Search messages'" 
            v-model="searchQuery"
            class="chat-search-input"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">
            <i class="ph ph-x"></i>
          </button>
        </div>
      </div>

      <!-- Filter Pills -->
      <div v-if="!showComposeModal" class="filter-pills">
        <button 
          v-for="filter in ['All', 'Unread', 'Groups']" 
          :key="filter"
          class="pill-btn"
          :class="{ 'active': activeFilter === filter }"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Scrollable Chat Threads List / Compose Contacts List -->
      <div class="chat-threads-container">
        <template v-if="!showComposeModal">
          <div v-if="filteredChats.length === 0" class="empty-list">
            <i class="ph ph-chat-circle-dots text-3xl mb-2 opacity-40"></i>
            <p class="text-xs">No conversations found</p>
          </div>
          
          <div 
            v-for="chat in filteredChats" 
            :key="chat.id"
            class="chat-thread-row"
            :class="{ 'active': chat.id === currentChatId }"
            @click="selectChat(chat.id)"
          >
            <!-- Circular Avatar / Initial -->
            <div class="avatar-container">
              <div 
                v-if="chat.avatar"
                class="avatar-circle"
              >
                <img :src="chat.avatar" :alt="chat.name" />
              </div>
              <div 
                v-else
                class="avatar-circle avatar-initials"
                :style="{ background: chat.avatarGradient }"
              >
                {{ chat.initials }}
              </div>
              
              <!-- Online status indicator -->
              <span v-if="chat.online" class="online-indicator-dot"></span>
            </div>

            <!-- Name and snippet -->
            <div class="thread-info">
              <div class="thread-top-row">
                <span class="chat-name">{{ chat.name }}</span>
                <span class="chat-time">{{ chat.time }}</span>
              </div>
              <div class="thread-bottom-row">
                <p class="chat-snippet">{{ chat.snippet }}</p>
                
                <!-- Unread Message Badge -->
                <span v-if="chat.unreadCount > 0" class="unread-badge">
                  {{ chat.unreadCount }}
                </span>
              </div>
            </div>
          </div>
        </template>
        
        <!-- Compose Suggested Contacts Mode -->
        <template v-else>
          <div class="contacts-list-sidebar">
            <h4 class="section-title">Suggested Contacts</h4>
            <div v-if="filteredSuggestedContacts.length === 0" class="empty-list">
              <i class="ph ph-users text-3xl mb-2 opacity-40"></i>
              <p class="text-xs">No contacts found</p>
            </div>
            
            <div 
              v-for="contact in filteredSuggestedContacts" 
              :key="contact.name" 
              class="contact-suggestion-row sidebar-contact-row"
              @click="startNewChat(contact)"
            >
              <div class="avatar-container">
                <div v-if="contact.avatar" class="avatar-circle">
                  <img :src="contact.avatar" :alt="contact.name" />
                </div>
                <div 
                  v-else 
                  class="avatar-circle avatar-initials" 
                  :style="{ background: contact.avatarGradient }"
                >
                  {{ contact.initials }}
                </div>
                <span v-if="contact.online" class="online-indicator-dot"></span>
              </div>
              
              <div class="contact-info">
                <span class="contact-name">{{ contact.name }}</span>
                <span class="contact-snippet">{{ contact.snippet }}</span>
              </div>
              
              <div class="start-chat-btn">
                <i class="ph ph-chat-circle text-lg"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Right Main Panel (Active Chat Window) -->
    <div 
      class="active-chat-window"
      :class="{ 'hidden-mobile': isMobile && mobileActivePane === 'list' }"
    >
      <!-- Chat Header -->
      <div class="chat-window-header">
        <div class="header-contact-info">
          <!-- Back button on Mobile -->
          <button v-if="isMobile" @click="backToList" class="mobile-back-btn" title="Back to Chats">
            <i class="ph ph-caret-left text-xl text-secondary hover:text-white transition-colors"></i>
          </button>

          <template v-if="activeChat">
            <!-- Header Avatar -->
            <div class="avatar-container">
              <div 
                v-if="activeChat.avatar"
                class="avatar-circle"
              >
                <img :src="activeChat.avatar" :alt="activeChat.name" />
              </div>
              <div 
                v-else
                class="avatar-circle avatar-initials"
                :style="{ background: activeChat.avatarGradient }"
              >
                {{ activeChat.initials }}
              </div>
            </div>

            <!-- Header Name and Status -->
            <div class="header-name-status">
              <span class="header-chat-name">{{ activeChat.name }}</span>
              <span class="header-chat-status">
                <span class="status-indicator-dot" :class="{ 'online': activeChat.online }"></span>
                {{ activeChat.online ? 'Online' : 'Offline' }}
              </span>
            </div>
          </template>
          <template v-else>
            <!-- Header Name and Status when no active chat -->
            <div class="header-name-status">
              <span class="header-chat-name">Messages</span>
              <span class="header-chat-status">
                <span class="status-indicator-dot"></span>
                No conversation selected
              </span>
            </div>
          </template>
        </div>

        <!-- Menu actions -->
        <div v-if="activeChat" class="options-menu-container">
          <button class="options-btn" title="Chat Settings" @click.stop="toggleOptionsMenu">
            <i class="ph ph-dots-three-vertical text-xl text-secondary hover:text-white transition-colors"></i>
          </button>
          
          <Transition name="menu-fade">
            <div v-if="showOptionsMenu" class="options-dropdown">
              <button class="dropdown-item" @click="clearActiveChatMessages">
                <i class="ph ph-trash-simple text-base"></i>
                <span>Bersihkan Chat</span>
              </button>
              <button class="dropdown-item delete-option" @click="deleteActiveChat">
                <i class="ph ph-x-circle text-base"></i>
                <span>Hapus Chat</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <template v-if="activeChat">
        <!-- Message Thread Area -->
        <div class="message-thread-area" ref="messageThreadScrollContainer">
          <div class="date-stamp-divider">
            <span class="date-stamp">
              May 24, 2024
            </span>
          </div>

          <div class="messages-container">
            <div 
              v-for="msg in activeMessages" 
              :key="msg.id" 
              class="message-row"
              :class="[msg.sender === 'me' ? 'me' : 'other']"
            >
              <!-- Message Bubble -->
              <div 
                class="message-bubble"
                :class="[msg.sender === 'me' ? 'me-bubble' : 'other-bubble']"
              >
                <p class="message-text">{{ msg.text }}</p>
                
                <!-- Info footer inside bubble: time and double check -->
                <div class="message-meta-footer">
                  <span>{{ msg.time }}</span>
                  <i v-if="msg.sender === 'me'" class="ph ph-checks" title="Read"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Input Bar -->
        <div class="bottom-input-bar">
          <!-- Hidden file input for attachments -->
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileChange" 
            style="display: none;" 
          />
          
          <form @submit.prevent="sendMessage">
            <div class="input-actions-wrapper">
              <!-- Attachment Button -->
              <button type="button" class="action-icon-btn" title="Add Attachment" @click="triggerFileSelect">
                <i class="ph ph-paperclip text-lg text-secondary hover:text-white transition-colors"></i>
              </button>

              <!-- Text Area Input -->
              <input 
                type="text" 
                placeholder="Type a message..." 
                v-model="messageInput"
                class="message-text-input"
              />

              <!-- Emoji Button & Picker -->
              <div class="emoji-picker-container">
                <button 
                  type="button" 
                  class="action-icon-btn" 
                  title="Add Emoji"
                  @click.stop="toggleEmojiPicker"
                >
                  <i class="ph ph-smiley text-lg text-secondary hover:text-white transition-colors" :class="{ 'active-emoji-icon': showEmojiPicker }"></i>
                </button>
                
                <!-- Popover -->
                <div v-if="showEmojiPicker" class="emoji-popover">
                  <div v-for="cat in emojiCategories" :key="cat.name" class="emoji-category-section">
                    <h4 class="emoji-category-title">{{ cat.name }}</h4>
                    <div class="emoji-grid">
                      <button 
                        v-for="emoji in cat.emojis" 
                        :key="emoji" 
                        type="button"
                        class="emoji-item-btn"
                        @click="addEmoji(emoji)"
                      >
                        {{ emoji }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Send Button -->
            <button 
              type="submit" 
              class="send-btn"
              :class="{ 'disabled-btn': !messageInput.trim() }"
              title="Send Message"
            >
              <i class="ph ph-paper-plane-right text-lg"></i>
            </button>
          </form>
        </div>
      </template>
      <template v-else>
        <!-- Empty / No Active Chat State -->
        <div class="no-active-chat-placeholder">
          <i class="ph ph-chat-circle-dots text-5xl mb-3 opacity-30 animate-pulse"></i>
          <h3>No Conversation Selected</h3>
          <p class="text-secondary text-sm">Select a contact from the list or start a new chat.</p>
        </div>
      </template>
    </div>

    <!-- Archived chats notification toast -->
    <Transition name="fade">
      <div v-if="showArchivedToast" class="archived-toast">
        <i class="ph ph-info text-accent text-lg"></i>
        <span class="text-xs text-white font-medium">Archived folder is currently empty.</span>
      </div>
    </Transition>


  </div>
</template>

<style scoped>
.chat-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C; /* Home page matching background */
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
}

/* Split Pane Layout Details */
.chat-list-pane {
  width: 340px;
  background-color: #131315; /* Subtly darker list pane background */
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.active-chat-window {
  background-color: #1A1A1C;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

/* Chat list components */
.chat-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.chat-list-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
}

.compose-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.search-bar-container {
  margin-bottom: 1.25rem;
}

.search-input-wrapper {
  background-color: #161B26;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 0.6rem 0.8rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.search-input-wrapper:focus-within {
  border-color: rgba(37, 99, 235, 0.5);
  background-color: #1A2130;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.1);
}

.search-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.chat-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 0.875rem;
  flex: 1;
}

.chat-search-input::placeholder {
  color: #6B7280;
}

.clear-search-btn {
  background: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.1rem;
}

.clear-search-btn:hover {
  color: #FFFFFF;
}

/* Filter pills */
.filter-pills {
  margin-bottom: 1.25rem;
  display: flex;
  gap: 8px;
}

.pill-btn {
  background-color: #161B26;
  border: 1px solid rgba(255, 255, 255, 0.03);
  color: #9CA3AF;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 600;
}

.pill-btn:hover {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.05);
}

.pill-btn.active {
  background-color: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}

/* Scrollable thread rows */
.chat-threads-container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-right: -0.25rem;
  padding-right: 0.25rem;
  flex: 1;
}

.chat-thread-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  width: 100%;
}

.chat-thread-row:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.chat-thread-row.active {
  background-color: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.15);
}

/* Avatar styles */
.avatar-container {
  position: relative;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #1A1E29;
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-initials {
  font-weight: 700;
  font-size: 14px;
  color: #FFFFFF;
}

.online-indicator-dot {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #10B981;
  border: 2px solid #0E121B;
}

.status-indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #9CA3AF;
  display: inline-block;
}

.status-indicator-dot.online {
  background-color: #10B981;
}

/* Thread text styling */
.thread-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.thread-top-row, .thread-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.chat-name {
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
}

.chat-time {
  font-size: 11px;
  color: #9CA3AF;
  white-space: nowrap;
  flex-shrink: 0;
}

.chat-snippet {
  font-size: 12px;
  color: #9CA3AF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
}

.unread-badge {
  background-color: #2563EB;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
  border-radius: 9999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  flex-shrink: 0;
}

/* Sticky bottom Archived section */
.archived-section-sticky {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 1.25rem;
  margin-top: 1rem;
}

.archive-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #9CA3AF;
  transition: color 0.2s;
}

.archive-btn:hover {
  color: #FFFFFF;
}

.archive-btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
}

/* Active chat pane header */
.chat-window-header {
  height: 70px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1A1A1C;
}

.header-contact-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-window-header .avatar-container {
  width: 40px;
  height: 40px;
}

.chat-window-header .avatar-circle {
  width: 40px;
  height: 40px;
}

.header-name-status {
  display: flex;
  flex-direction: column;
}

.header-chat-name {
  font-weight: 700;
  font-size: 14px;
  color: #FFFFFF;
}

.header-chat-status {
  font-size: 10px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}

.options-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
}

.options-btn:hover {
  color: #FFFFFF;
}

/* Message thread area */
.message-thread-area {
  flex: 1;
  overflow-y: auto;
  background-color: #1A1A1C;
  display: flex;
  flex-direction: column;
}

.date-stamp-divider {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.date-stamp {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #9CA3AF;
  padding: 4px 12px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.message-row {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-row.me {
  align-items: flex-end;
}

.message-row.other {
  align-items: flex-start;
}

/* Bubble Styling */
.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 65%;
  word-break: break-word;
  line-height: 1.5;
  font-size: 14px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.me-bubble {
  background-color: #2563EB;
  color: #FFFFFF;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}

.other-bubble {
  background-color: #1C202E;
  color: #E5E7EB;
  border-bottom-left-radius: 4px;
}

.message-text {
  margin: 0;
  white-space: pre-wrap;
}

.message-meta-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 6px;
  font-size: 9px;
  opacity: 0.6;
}

.message-meta-footer span {
  color: rgba(255, 255, 255, 0.6);
}

.message-meta-footer i {
  color: rgba(255, 255, 255, 0.8);
}

/* Bottom Input Bar Styles */
.bottom-input-bar {
  padding: 1.25rem 1.5rem;
  background-color: #1A1A1C;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
}

.bottom-input-bar form {
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-actions-wrapper {
  background-color: #131315;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 9999px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
}

/* Emoji Picker styling */
.emoji-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.active-emoji-icon {
  color: #FFFFFF !important;
}

.emoji-popover {
  position: absolute;
  bottom: 50px;
  right: 0;
  background-color: #1C202E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px;
  width: 290px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Custom scrollbar for emoji popover */
.emoji-popover::-webkit-scrollbar {
  width: 4px;
}
.emoji-popover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 99px;
}

.emoji-category-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.emoji-category-title {
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
  text-align: left;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.emoji-item-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-item-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.action-icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  transition: color 0.2s;
}

.action-icon-btn:hover {
  color: #FFFFFF;
}

.message-text-input {
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 14px;
  padding: 8px 4px;
  flex: 1;
}

.message-text-input::placeholder {
  color: #6B7280;
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #2563EB;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;
}

.send-btn:hover {
  background-color: #3B82F6;
  transform: translateY(-1px);
}

.send-btn:active {
  transform: scale(0.95);
}

.send-btn.disabled-btn {
  opacity: 0.5;
  pointer-events: none;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.05);
  color: #6B7280;
}

/* Mobile Back button */
.mobile-back-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Toast Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

.archived-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: #1C202E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  color: #9CA3AF;
}

/* Responsive configurations */
@media (max-width: 768px) {
  .chat-view {
    grid-column: 1;
    grid-row: 2;
    margin: 0;
    border-radius: 0;
    border: none;
    height: calc(100% - 62px - env(safe-area-inset-bottom, 0px)); /* Align perfectly above mobile bottom nav and account for safe area on iPhone Safari */
  }

  .chat-view.mobile-chat-active {
    height: calc(100% - env(safe-area-inset-bottom, 0px));
  }

  .chat-list-pane {
    width: 100%;
    border-right: none;
    height: 100%;
    padding: 1.25rem 1rem;
  }

  .active-chat-window {
    width: 100%;
    height: 100%;
  }

  .hidden-mobile {
    display: none !important;
  }
  
  .message-thread-area {
    padding-bottom: 0.5rem;
  }

  .message-bubble {
    max-width: 85%;
  }

  .messages-container {
    padding: 0 1rem 1rem 1rem;
  }

  .bottom-input-bar {
    padding: 0.75rem 1rem;
  }
}

/* Compose Sidebar Page Styles */
.contacts-list-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contacts-list-sidebar .section-title {
  margin-left: 4px;
}

.sidebar-contact-row {
  background-color: transparent !important;
  border-color: transparent !important;
}

.sidebar-contact-row:hover {
  background-color: rgba(255, 255, 255, 0.02) !important;
}

.contact-suggestion-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
  width: 100%;
}

.contact-suggestion-row:hover {
  background-color: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.15);
}

.contact-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
}

.contact-name {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
}

.contact-snippet {
  font-size: 11px;
  color: #9CA3AF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.start-chat-btn {
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.03);
  transition: all 0.2s;
}

.contact-suggestion-row:hover .start-chat-btn {
  background-color: #2563EB;
  color: #FFFFFF;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0;
  margin-bottom: 12px;
}

/* Options Menu Dropdown Styles */
.options-menu-container {
  position: relative;
  display: inline-block;
}

.options-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #1C202E;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 6px;
  width: 170px;
  z-index: 150;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: dropdownSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: #9CA3AF;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}

.dropdown-item.delete-option {
  color: #EF4444;
}

.dropdown-item.delete-option:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #F87171;
}

/* Menu transitions */
.menu-fade-enter-active, .menu-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-fade-enter-from, .menu-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

/* No Active Chat Placeholder */
.no-active-chat-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
  height: 100%;
}

.no-active-chat-placeholder h3 {
  color: #FFFFFF;
  margin: 12px 0 6px 0;
  font-size: 18px;
  font-weight: 700;
}
</style>

