import { reactive } from 'vue'

export const playerState = reactive({
  currentTrack: {
    id: 1,
    title: 'To the Bone',
    artist: 'Pamungkas',
    img: '/pamungkas.jpg',
    plays: '890K',
    duration: '3:32',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  isPlaying: false,
  currentTime: 0,
  duration: 212, // 3:32 in seconds
  volume: 70,
  audio: null,
  queue: [],
  currentIndex: 0,

  initAudio() {
    if (this.audio) return
    this.audio = new Audio(this.currentTrack.audioUrl)
    this.audio.volume = this.volume / 100
    this.setupListeners()
  },

  setupListeners() {
    if (!this.audio) return
    
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.audio.currentTime)
    })

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = Math.floor(this.audio.duration) || 180
    })

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false
      this.next()
    })
  },

  play(track, tracksList = []) {
    if (tracksList.length > 0) {
      this.queue = tracksList
      const index = tracksList.findIndex(t => t.audioUrl === track.audioUrl)
      if (index !== -1) {
        this.currentIndex = index
      }
    }

    const isSameTrack = this.currentTrack && this.currentTrack.audioUrl === track.audioUrl

    if (isSameTrack && this.audio) {
      if (!this.isPlaying) {
        this.audio.play().then(() => {
          this.isPlaying = true
        }).catch(err => console.error("Playback error:", err))
      }
      return
    }

    if (this.audio) {
      this.audio.pause()
      // Clean up previous event listeners just in case
    }

    this.currentTrack = track
    this.audio = new Audio(track.audioUrl)
    this.audio.volume = this.volume / 100
    this.setupListeners()

    this.audio.play().then(() => {
      this.isPlaying = true
    }).catch(err => {
      console.error("Playback error:", err)
      this.isPlaying = false
    })
  },

  pause() {
    if (this.audio) {
      this.audio.pause()
    }
    this.isPlaying = false
  },

  toggle() {
    if (!this.audio) {
      this.initAudio()
    }
    if (this.isPlaying) {
      this.pause()
    } else {
      this.audio.play().then(() => {
        this.isPlaying = true
      }).catch(err => {
        console.error("Playback error:", err)
        // Fallback if URL is blocked or errors
        this.isPlaying = false
      })
    }
  },

  seek(seconds) {
    if (this.audio) {
      this.audio.currentTime = seconds
      this.currentTime = seconds
    }
  },

  setVolume(val) {
    this.volume = val
    if (this.audio) {
      this.audio.volume = val / 100
    }
  },

  next() {
    if (this.queue.length === 0) return
    const nextIndex = (this.currentIndex + 1) % this.queue.length
    this.play(this.queue[nextIndex])
  },

  prev() {
    if (this.queue.length === 0) return
    const prevIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length
    this.play(this.queue[prevIndex])
  }
})
