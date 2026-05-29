<script setup>
import { ref, computed } from 'vue'

const activeStep = ref(1) // Current step in the wizard (1, 2, 3, or 4)
const isDragging = ref(false)
const audioFileInput = ref(null)
const artworkFileInput = ref(null)

// Accordion Expand/Collapse States
const isTipsExpanded = ref(true)
const isTimelineExpanded = ref(true)
const isHelpExpanded = ref(true)

// Form States (Multi-file upload support)
const audioFiles = ref([]) // Array of uploaded song objects
const activeEditIndex = ref(0) // Index of track currently being configured

const useSameArtwork = ref(true) // Whether all tracks share the same artwork
const universalArtworkUrl = ref(null)
const universalArtworkFile = ref(null)

const showSuccessModal = ref(false)

// Active Step Name helper for the bottom bar
const activeStepName = computed(() => {
  switch (activeStep.value) {
    case 1: return 'Upload Audio File'
    case 2: return 'Add Song Information'
    case 3: return 'Add Cover Image'
    case 4: return 'Review and Publish'
    default: return ''
  }
})

// Formatting utilities
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// File Handlers for Audio
const triggerAudioSelect = () => {
  audioFileInput.value.click()
}

const handleAudioUpload = (file) => {
  if (!file) return
  if (file.size > 100 * 1024 * 1024) {
    alert('File size exceeds 100MB requirement.')
    return
  }
  
  // Create new track object
  const dotIndex = file.name.lastIndexOf('.')
  const defaultTitle = dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name
  
  const newTrack = {
    id: Date.now() + Math.random(),
    file: file,
    name: file.name,
    size: file.size,
    progress: 0,
    isUploading: true,
    title: defaultTitle,
    artist: 'Aldi Ramadhan',
    genre: 'Pop',
    description: '',
    releaseDate: new Date().toISOString().substr(0, 10),
    isExplicit: false,
    artworkFile: null,
    artworkUrl: null
  }
  
  audioFiles.value.push(newTrack)
  const trackIdx = audioFiles.value.length - 1
  
  // Simulate progress
  let prg = 0
  const interval = setInterval(() => {
    if (prg >= 100) {
      clearInterval(interval)
      audioFiles.value[trackIdx].isUploading = false
      audioFiles.value[trackIdx].progress = 100
    } else {
      prg += 10
      audioFiles.value[trackIdx].progress = prg
    }
  }, 100 + Math.random() * 100)
}

const onAudioFileChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach(file => handleAudioUpload(file))
}

const onAudioDrop = (e) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer.files)
  const audioFilesFiltered = files.filter(f => f.type.startsWith('audio/'))
  if (audioFilesFiltered.length > 0) {
    audioFilesFiltered.forEach(file => handleAudioUpload(file))
  } else {
    alert('Please drop valid audio files.')
  }
}

const removeAudioFile = (index) => {
  audioFiles.value.splice(index, 1)
  // Adjust activeEditIndex if necessary
  if (activeEditIndex.value >= audioFiles.value.length) {
    activeEditIndex.value = Math.max(0, audioFiles.value.length - 1)
  }
}

// File Handlers for Artwork
const triggerArtworkSelect = () => {
  artworkFileInput.value.click()
}

const handleArtworkUpload = (file) => {
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    if (useSameArtwork.value) {
      universalArtworkFile.value = file
      universalArtworkUrl.value = e.target.result
    } else {
      const activeTrack = audioFiles.value[activeEditIndex.value]
      if (activeTrack) {
        activeTrack.artworkFile = file
        activeTrack.artworkUrl = e.target.result
      }
    }
  }
  reader.readAsDataURL(file)
}

const onArtworkFileChange = (e) => {
  const file = e.target.files[0]
  handleArtworkUpload(file)
}

const removeArtwork = (idx = null) => {
  if (useSameArtwork.value) {
    universalArtworkFile.value = null
    universalArtworkUrl.value = null
  } else {
    const track = idx !== null ? audioFiles.value[idx] : audioFiles.value[activeEditIndex.value]
    if (track) {
      track.artworkFile = null
      track.artworkUrl = null
    }
  }
}

// Navigation Actions
const nextStep = () => {
  if (activeStep.value === 1 && audioFiles.value.length === 0) {
    alert('Please upload at least one audio file first.')
    return
  }
  
  // Validation for Step 2 (Details)
  if (activeStep.value === 2) {
    for (let i = 0; i < audioFiles.value.length; i++) {
      const t = audioFiles.value[i]
      if (!t.title || !t.artist) {
        alert(`Please complete the title and artist for "${t.name}".`)
        return
      }
    }
  }
  
  // Validation for Step 3 (Artwork)
  if (activeStep.value === 3) {
    if (useSameArtwork.value && !universalArtworkUrl.value) {
      alert('Please upload a cover artwork.')
      return
    } else if (!useSameArtwork.value) {
      for (let i = 0; i < audioFiles.value.length; i++) {
        if (!audioFiles.value[i].artworkUrl) {
          alert(`Please upload artwork for "${audioFiles.value[i].title}".`)
          return
        }
      }
    }
  }
  
  if (activeStep.value < 4) {
    activeStep.value++
  } else {
    // Publish Action
    showSuccessModal.value = true
  }
}

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--
  }
}

const finishUpload = () => {
  showSuccessModal.value = false
  // Reset all states
  activeStep.value = 1
  audioFiles.value = []
  activeEditIndex.value = 0
  universalArtworkFile.value = null
  universalArtworkUrl.value = null
  useSameArtwork.value = true
}
</script>

<template>
  <main class="upload-view">
    <div class="upload-content-scrollable">
      <!-- Main Content Header & Stepper -->
      <div class="upload-header">
        <div class="header-texts text-left">
          <h1 class="upload-title text-4xl font-bold text-white">Upload Music</h1>
          <p class="upload-subtitle text-xs text-secondary mt-1">
            Share your music with the world. Follow the steps below to upload your track.
          </p>
        </div>

        <!-- Horizontal Multi-step Progress Wizard Bar -->
        <div class="stepper-container">
          <div class="stepper-track">
            <!-- Connector line behind nodes -->
            <div class="stepper-line-bg"></div>
            <div 
              class="stepper-line-active" 
              :style="{ width: 'calc(' + ((activeStep - 1) / 3) + ' * (100% - 120px))' }"
            ></div>

            <!-- Step 1 -->
            <div 
              class="step-node active cursor-pointer z-10"
              @click="audioFiles.length > 0 && (activeStep = 1)"
              :class="{ 'active': activeStep === 1, 'completed': activeStep > 1 }"
            >
              <div class="node-circle">
                <span v-if="activeStep <= 1">1</span>
                <i v-else class="ph ph-check font-bold"></i>
              </div>
              <div class="node-texts">
                <p class="node-title">Upload</p>
                <p class="node-desc">Add audio files</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div 
              class="step-node z-10"
              :class="{ 
                'active': activeStep === 2, 
                'completed': activeStep > 2, 
                'disabled': audioFiles.length === 0, 
                'cursor-pointer': audioFiles.length > 0 
              }"
              @click="audioFiles.length > 0 && (activeStep = 2)"
            >
              <div class="node-circle">
                <span v-if="activeStep <= 2">2</span>
                <i v-else class="ph ph-check font-bold"></i>
              </div>
              <div class="node-texts">
                <p class="node-title">Details</p>
                <p class="node-desc">Add song information</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div 
              class="step-node z-10"
              :class="{ 
                'active': activeStep === 3, 
                'completed': activeStep > 3, 
                'disabled': audioFiles.length === 0 || !audioFiles[0]?.title || !audioFiles[0]?.artist, 
                'cursor-pointer': audioFiles.length > 0 && audioFiles[0]?.title && audioFiles[0]?.artist 
              }"
              @click="audioFiles.length > 0 && audioFiles[0]?.title && audioFiles[0]?.artist && (activeStep = 3)"
            >
              <div class="node-circle">
                <span v-if="activeStep <= 3">3</span>
                <i v-else class="ph ph-check font-bold"></i>
              </div>
              <div class="node-texts">
                <p class="node-title">Artwork</p>
                <p class="node-desc">Add cover image</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div 
              class="step-node z-10"
              :class="{ 
                'active': activeStep === 4, 
                'disabled': audioFiles.length === 0 || !audioFiles[0]?.title || !audioFiles[0]?.artist || (useSameArtwork ? !universalArtworkUrl : !audioFiles[0]?.artworkUrl), 
                'cursor-pointer': audioFiles.length > 0 && audioFiles[0]?.title && audioFiles[0]?.artist && (useSameArtwork ? universalArtworkUrl : audioFiles[0]?.artworkUrl) 
              }"
              @click="audioFiles.length > 0 && audioFiles[0]?.title && audioFiles[0]?.artist && (useSameArtwork ? universalArtworkUrl : audioFiles[0]?.artworkUrl) && (activeStep = 4)"
            >
              <div class="node-circle">
                <span>4</span>
              </div>
              <div class="node-texts">
                <p class="node-title">Review</p>
                <p class="node-desc">Review and publish</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout Grid -->
      <div class="upload-content-grid">
        <!-- Left Column: Wizard Panels -->
        <div class="wizard-panel-container">
          
          <!-- STEP 1: UPLOAD AUDIO -->
          <div v-if="activeStep === 1" class="wizard-step-content">
            <div class="panel-header">
              <h2 class="panel-title text-xl font-bold text-white">Upload Audio Files</h2>
              <p class="panel-subtitle text-xs text-secondary mt-1">Upload your tracks. You can select and upload multiple tracks at once.</p>
            </div>

            <!-- File Upload Dropzone Container -->
            <div 
              class="dropzone-container"
              :class="{ 'dragging': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onAudioDrop"
              @click="triggerAudioSelect"
            >
              <input 
                type="file" 
                ref="audioFileInput" 
                @change="onAudioFileChange" 
                accept="audio/mp3, audio/wav, audio/mpeg, audio/x-wav, audio/flac" 
                multiple
                style="display: none;" 
              />
              
              <div class="dropzone-inner-content">
                <div class="cloud-icon-wrapper">
                  <i class="ph ph-cloud-arrow-up text-4xl text-[#2563EB]"></i>
                </div>
                <div class="dropzone-texts">
                  <p class="dropzone-title">Drag & drop your audio files here or</p>
                  <button @click.stop="triggerAudioSelect" class="btn btn-primary choose-btn">Choose Files</button>
                </div>
                <p class="dropzone-formats">Supports MP3, WAV, FLAC • Max 100MB per file</p>
              </div>
            </div>

            <!-- Uploaded Files List -->
            <div v-if="audioFiles.length > 0" class="uploaded-files-list">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Uploaded Tracks ({{ audioFiles.length }})</h4>
              
              <div class="tracks-stack">
                <div 
                  v-for="(song, idx) in audioFiles" 
                  :key="song.id" 
                  class="uploaded-file-card"
                >
                  <div class="file-info-section">
                    <div class="file-icon-wrapper">
                      <i class="ph ph-music-notes"></i>
                    </div>
                    <div class="file-meta">
                      <div 
                        class="file-name-marquee-wrap" 
                        :class="{ 'is-marquee': song.name.length > 28 }"
                      >
                        <!-- Text is doubled so translateX(-50%) creates a seamless infinite loop -->
                        <span class="file-name-text">
                          {{ song.name }}<template v-if="song.name.length > 28">&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{{ song.name }}</template>
                        </span>
                      </div>
                      <p class="file-status" v-if="!song.isUploading">{{ formatBytes(song.size) }} • Upload complete</p>
                      <div class="progress-bar-wrap" v-else>
                        <div class="progress-track">
                          <div class="progress-fill" :style="{ width: song.progress + '%' }"></div>
                        </div>
                        <span class="progress-text">Uploading... {{ song.progress }}%</span>
                      </div>
                    </div>
                  </div>
                  <button @click.stop="removeAudioFile(idx)" class="remove-file-btn" title="Remove File">
                    <i class="ph ph-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Requirements Checklist -->
            <div class="requirements-section">
              <h4 class="text-sm font-bold text-white">Upload Requirements</h4>
              <ul class="requirements-list">
                <li class="requirement-item">
                  <i class="ph ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  <span>High quality audio (320kbps or higher)</span>
                </li>
                <li class="requirement-item">
                  <i class="ph ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  <span>Original content only</span>
                </li>
                <li class="requirement-item">
                  <i class="ph ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  <span>You own the rights to this music</span>
                </li>
                <li class="requirement-item">
                  <i class="ph ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  <span>No copyrighted material</span>
                </li>
                <li class="requirement-item">
                  <i class="ph ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  <span>No hate speech or offensive content</span>
                </li>
              </ul>
            </div>

            <!-- Info Banner -->
            <div class="info-banner">
              <i class="ph ph-info text-[#2563EB] text-xl shrink-0 mt-0.5"></i>
              <p class="info-banner-text">
                Make sure your track meets our guidelines before uploading.
                <a href="#" class="text-[#2563EB] font-semibold hover:underline flex inline-flex items-center gap-1">
                  Read our Community Guidelines <i class="ph ph-arrow-square-out text-[11px]"></i>
                </a>
              </p>
            </div>
          </div>

          <!-- STEP 2: DETAILS -->
          <div v-else-if="activeStep === 2" class="wizard-step-content">
            <div class="panel-header">
              <h2 class="panel-title text-xl font-bold text-white">Add Song Information</h2>
              <p class="panel-subtitle text-xs text-secondary mt-1">Provide metadata details to help listeners discover your tracks.</p>
            </div>

            <!-- Track editor tabs if multiple songs -->
            <div v-if="audioFiles.length > 1" class="song-editor-tabs-container">
              <span class="text-xs font-semibold text-secondary block mb-2">Select track to edit details:</span>
              <div class="song-editor-tabs">
                <button 
                  v-for="(song, idx) in audioFiles" 
                  :key="song.id"
                  @click="activeEditIndex = idx"
                  class="song-tab-btn"
                  :class="{ 'active': activeEditIndex === idx }"
                >
                  <i class="ph ph-music-note"></i>
                  <span class="song-tab-title">{{ song.title || 'Untitled Track' }}</span>
                </button>
              </div>
            </div>

            <div class="details-form" v-if="audioFiles[activeEditIndex]">
              <!-- Song Title -->
              <div class="form-group">
                <label class="form-label">Song Title <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  v-model="audioFiles[activeEditIndex].title" 
                  placeholder="Enter song title"
                  class="form-input-field" 
                />
              </div>

              <!-- Artist / Contributor -->
              <div class="form-group">
                <label class="form-label">Primary Artist <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  v-model="audioFiles[activeEditIndex].artist" 
                  placeholder="Enter primary artist"
                  class="form-input-field" 
                />
              </div>

              <!-- Genre & Release Date Row -->
              <div class="grid-layout-row">
                <div class="form-group">
                  <label class="form-label">Genre</label>
                  <select v-model="audioFiles[activeEditIndex].genre" class="form-input-field form-select-field">
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Indie">Indie</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="R&B">R&B</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Release Date</label>
                  <input 
                    type="date" 
                    v-model="audioFiles[activeEditIndex].releaseDate" 
                    class="form-input-field" 
                  />
                </div>
              </div>

              <!-- Description -->
              <div class="form-group">
                <label class="form-label">Description / Lyrics Preview</label>
                <textarea 
                  v-model="audioFiles[activeEditIndex].description" 
                  rows="4" 
                  placeholder="Tell your listeners about your track or add key lyrics..."
                  class="form-input-field textarea-field"
                ></textarea>
              </div>

              <!-- Explicit checkbox -->
              <div class="explicit-checkbox">
                <input 
                  type="checkbox" 
                  :id="'explicitCheck-' + activeEditIndex" 
                  v-model="audioFiles[activeEditIndex].isExplicit" 
                  class="checkbox-input"
                />
                <label :for="'explicitCheck-' + activeEditIndex" class="checkbox-label">
                  <strong class="text-white">Contains Explicit Content</strong>. Check this if the track features strong language or mature themes.
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 3: ARTWORK -->
          <div v-else-if="activeStep === 3" class="wizard-step-content">
            <div class="panel-header">
              <h2 class="panel-title text-xl font-bold text-white">Add Cover Image</h2>
              <p class="panel-subtitle text-xs text-secondary mt-1">Upload a stunning high-resolution cover artwork for your track.</p>
            </div>

            <!-- Artwork Options -->
            <div class="artwork-settings p-4 bg-white/2 border border-white/5 rounded-xl space-y-3" v-if="audioFiles.length > 1">
              <div class="explicit-checkbox p-0 bg-transparent border-none">
                <input 
                  type="checkbox" 
                  id="useSameArtworkCheck" 
                  v-model="useSameArtwork" 
                  class="checkbox-input"
                />
                <label for="useSameArtworkCheck" class="checkbox-label">
                  <strong class="text-white">Use same artwork for all tracks</strong>. Keep this checked to apply the same image to all tracks.
                </label>
              </div>
            </div>

            <!-- Track editor tabs if multiple artwork mode -->
            <div v-if="audioFiles.length > 1 && !useSameArtwork" class="song-editor-tabs-container">
              <span class="text-xs font-semibold text-secondary block mb-2">Select track to edit artwork:</span>
              <div class="song-editor-tabs">
                <button 
                  v-for="(song, idx) in audioFiles" 
                  :key="song.id"
                  @click="activeEditIndex = idx"
                  class="song-tab-btn"
                  :class="{ 'active': activeEditIndex === idx }"
                >
                  <i class="ph ph-image"></i>
                  <span class="song-tab-title">{{ song.title || 'Untitled Track' }}</span>
                </button>
              </div>
            </div>

            <!-- Upload Core -->
            <div class="artwork-upload-row">
              <!-- Artwork Dropzone -->
              <div 
                class="artwork-dropzone"
                @click="triggerArtworkSelect"
              >
                <input 
                  type="file" 
                  ref="artworkFileInput" 
                  @change="onArtworkFileChange" 
                  accept="image/jpeg, image/png" 
                  style="display: none;" 
                />
                
                <!-- Image Preview (Universal) -->
                <div v-if="useSameArtwork && universalArtworkUrl" class="artwork-preview-wrapper group">
                  <img :src="universalArtworkUrl" alt="Artwork Preview" class="artwork-img" />
                  <div class="artwork-hover">
                    <span><i class="ph ph-pencil-simple"></i> Change Artwork</span>
                  </div>
                </div>

                <!-- Image Preview (Individual) -->
                <div v-else-if="!useSameArtwork && audioFiles[activeEditIndex]?.artworkUrl" class="artwork-preview-wrapper group">
                  <img :src="audioFiles[activeEditIndex].artworkUrl" alt="Artwork Preview" class="artwork-img" />
                  <div class="artwork-hover">
                    <span><i class="ph ph-pencil-simple"></i> Change Artwork</span>
                  </div>
                </div>

                <!-- Empty state -->
                <div v-else class="artwork-empty-state">
                  <i class="ph ph-image"></i>
                  <p class="artwork-empty-title">Upload Artwork</p>
                  <p class="artwork-empty-sub">Recommended: 1000 x 1000px JPG/PNG</p>
                </div>
              </div>

              <!-- Artwork Guidelines -->
              <div class="artwork-tips-wrap">
                <h4 class="artwork-tips-title">
                  Artwork Guidelines 
                  <span v-if="!useSameArtwork && audioFiles[activeEditIndex]" class="text-[#2563EB]">
                    (for "{{ audioFiles[activeEditIndex].title }}")
                  </span>
                </h4>
                <ul class="artwork-tips-list">
                  <li class="artwork-tips-item">
                    <i class="ph ph-info text-[#2563EB] text-base shrink-0 mt-0.5"></i>
                    <span>Must be a square image with a minimum resolution of 500 x 500 pixels.</span>
                  </li>
                  <li class="artwork-tips-item">
                    <i class="ph ph-info text-[#2563EB] text-base shrink-0 mt-0.5"></i>
                    <span>Do not include links, website addresses, email, logo watermarks, or prices.</span>
                  </li>
                  <li class="artwork-tips-item">
                    <i class="ph ph-info text-[#2563EB] text-base shrink-0 mt-0.5"></i>
                    <span>Ensure your artwork represents the vibe or theme of your music properly.</span>
                  </li>
                </ul>
                <button 
                  v-if="(useSameArtwork && universalArtworkUrl) || (!useSameArtwork && audioFiles[activeEditIndex]?.artworkUrl)"
                  @click.stop="removeArtwork(useSameArtwork ? null : activeEditIndex)" 
                  class="btn btn-outline artwork-remove-btn"
                >
                  <i class="ph ph-trash"></i> Remove Artwork
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 4: REVIEW -->
          <div v-else-if="activeStep === 4" class="wizard-step-content">
            <div class="panel-header">
              <h2 class="panel-title text-xl font-bold text-white">Review and Publish</h2>
              <p class="panel-subtitle text-xs text-secondary mt-1">Review all your track details before publishing to Kolektix.</p>
            </div>

            <!-- Tracks stack review -->
            <div class="review-tracks-container">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Tracks Summary ({{ audioFiles.length }})</h4>
              
              <div class="review-list">
                <div v-for="song in audioFiles" :key="song.id" class="review-summary-card">
                  <!-- Header section of review -->
                  <div class="review-header">
                    <div class="review-artwork-wrap">
                      <img v-if="useSameArtwork && universalArtworkUrl" :src="universalArtworkUrl" alt="Artwork Summary" class="w-full h-full object-cover" />
                      <img v-else-if="!useSameArtwork && song.artworkUrl" :src="song.artworkUrl" alt="Artwork Summary" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center"><i class="ph ph-music-note text-2xl text-secondary"></i></div>
                    </div>
                    <div class="review-texts">
                      <div class="review-title-container">
                        <span v-if="song.isExplicit" class="explicit-badge">EXPLICIT</span>
                        <h3 class="review-title">
                          {{ song.title || 'Untitled Track' }}
                        </h3>
                      </div>
                      <p class="review-artist">{{ song.artist || 'Unknown Artist' }}</p>
                      <div class="review-tags">
                        <span class="genre-tag">
                          {{ song.genre }}
                        </span>
                        <span class="date-tag">
                          Released: {{ song.releaseDate }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- File details list -->
                  <div class="review-details-list">
                    <div class="review-details-item">
                      <span class="detail-label">Uploaded File</span>
                      <span class="detail-value">{{ song.name }}</span>
                    </div>
                    <div class="review-details-item">
                      <span class="detail-label">File Size</span>
                      <span class="detail-value">{{ formatBytes(song.size) }}</span>
                    </div>
                    <div class="review-details-item" v-if="song.description">
                      <span class="detail-label">Description</span>
                      <span class="detail-value">{{ song.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terms acceptance -->
            <p class="review-terms-text">
              By clicking "Publish Track", you certify that you own all copyrights to the uploaded files and artworks, and agree to Kolektix's 
              <a href="#" class="text-[#2563EB] hover:underline">Terms of Service</a>.
            </p>
          </div>

        </div>

        <!-- Right Column: Sidebar Stack -->
        <div class="upload-sidebar">
          
          <!-- CARD 1: UPLOAD TIPS -->
          <div class="widget-card-panel">
            <div class="widget-card-header cursor-pointer" @click="isTipsExpanded = !isTipsExpanded">
              <div class="widget-header-title-wrap">
                <i class="ph ph-lightbulb text-[#2563EB] text-xl"></i>
                <h3 class="widget-card-title">Upload Tips</h3>
              </div>
              <i class="ph ph-caret-down collapse-icon animate-icon" :class="{ 'is-collapsed': !isTipsExpanded }"></i>
            </div>
            
            <transition name="slide-down">
              <ul v-show="isTipsExpanded" class="widget-card-list">
                <li class="widget-card-item">
                  <i class="ph ph-check"></i>
                  <span>Use MP3 or WAV format for uploading.</span>
                </li>
                <li class="widget-card-item">
                  <i class="ph ph-check"></i>
                  <span>Minimum 320kbps quality for premium listening experience.</span>
                </li>
                <li class="widget-card-item">
                  <i class="ph ph-check"></i>
                  <span>Keep your audio levels balanced (avoid clipping).</span>
                </li>
                <li class="widget-card-item">
                  <i class="ph ph-check"></i>
                  <span>Use clear and relevant artwork for better engagement.</span>
                </li>
                <li class="widget-card-item">
                  <i class="ph ph-check"></i>
                  <span>Accurate metadata helps more listeners find your music.</span>
                </li>
              </ul>
            </transition>
          </div>

          <!-- CARD 2: WHAT HAPPENS NEXT? -->
          <div class="widget-card-panel">
            <div class="widget-card-header cursor-pointer" @click="isTimelineExpanded = !isTimelineExpanded">
              <div class="widget-header-title-wrap">
                <i class="ph ph-clock text-[#2563EB] text-xl"></i>
                <h3 class="widget-card-title">What happens next?</h3>
              </div>
              <i class="ph ph-caret-down collapse-icon animate-icon" :class="{ 'is-collapsed': !isTimelineExpanded }"></i>
            </div>
            
            <!-- Vertical Timeline Stepper -->
            <transition name="slide-down">
              <div v-show="isTimelineExpanded" class="vertical-timeline">
                <div class="timeline-trail-line"></div>
                
                <!-- Node 1 -->
                <div class="timeline-node">
                  <div class="timeline-bullet active"></div>
                  <div class="timeline-node-content">
                    <p class="timeline-node-title active-title">Review</p>
                    <p class="timeline-node-desc">We'll review your tracks within 1-2 business days.</p>
                  </div>
                </div>

                <!-- Node 2 -->
                <div class="timeline-node">
                  <div class="timeline-bullet"></div>
                  <div class="timeline-node-content">
                    <p class="timeline-node-title">Publish</p>
                    <p class="timeline-node-desc">Once approved, your music will be live on Kolektix.</p>
                  </div>
                </div>

                <!-- Node 3 -->
                <div class="timeline-node">
                  <div class="timeline-bullet"></div>
                  <div class="timeline-node-content">
                    <p class="timeline-node-title">Reach Listeners</p>
                    <p class="timeline-node-desc">Share your music and grow your audience.</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- CARD 3: NEED HELP? -->
          <div class="widget-card-panel">
            <div class="widget-card-header cursor-pointer" @click="isHelpExpanded = !isHelpExpanded">
              <div class="widget-header-title-wrap">
                <i class="ph ph-question text-[#2563EB] text-xl"></i>
                <h3 class="widget-card-title">Need Help?</h3>
              </div>
              <i class="ph ph-caret-down collapse-icon animate-icon" :class="{ 'is-collapsed': !isHelpExpanded }"></i>
            </div>
            
            <transition name="slide-down">
              <div v-show="isHelpExpanded" class="widget-card-body">
                <p class="widget-card-text">Read our detailed guide on how to upload your music.</p>
                <button class="btn btn-outline help-action-btn">
                  View Upload Guide <i class="ph ph-arrow-square-out text-sm"></i>
                </button>
              </div>
            </transition>
          </div>

        </div>
      </div>
    </div>

    <!-- SUCCESS PUBLISHING MODAL -->
    <div v-if="showSuccessModal" class="modal-overlay flex items-center justify-center z-50">
      <div class="modal-card">
        <div class="success-icon-wrap">
          <i class="ph ph-fill ph-check-circle"></i>
        </div>
        
        <div class="modal-texts">
          <h3 class="modal-title">Tracks Submitted Successfully!</h3>
          <p class="modal-desc">
            Your tracks are currently in the review queue. They will be live on Kolektix within 1-2 business days.
          </p>
        </div>
        
        <button @click="finishUpload" class="btn btn-primary w-full modal-btn">
          Awesome
        </button>
      </div>
    </div>

    <!-- Custom bottom wizard bar replacing the player bar -->
    <div class="wizard-bottom-bar">
      <div class="bottom-bar-left">
        <span class="bottom-step-count">Step {{ activeStep }} of 4</span>
        <span class="bottom-step-divider">|</span>
        <span class="bottom-step-name">{{ activeStepName }}</span>
        <span class="bottom-step-track-count" v-if="audioFiles.length > 0">
          ({{ audioFiles.length }} track{{ audioFiles.length > 1 ? 's' : '' }} loaded)
        </span>
      </div>
      <div class="bottom-bar-right">
        <button 
          @click="prevStep" 
          class="btn btn-outline navigation-back-btn"
          :disabled="activeStep === 1"
          :class="{ 'disabled-btn': activeStep === 1 }"
        >
          Back
        </button>
        <button 
          @click="nextStep" 
          class="btn btn-primary navigation-next-btn"
        >
          {{ activeStep === 4 ? 'Publish Tracks' : 'Next' }}
          <i class="ph ph-arrow-right" v-if="activeStep < 4"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.upload-view {
  grid-column: 2;
  grid-row: 2;
  background-color: #1A1A1C; /* Background matched with Home background precisely */
  height: calc(100% - 0.25rem);
  margin: 0.25rem 1.5rem 0 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent parent from scrolling */
  position: relative;
  transition: all 0.3s ease;
}

.upload-content-scrollable {
  flex: 1;
  overflow-y: auto;
  padding: 2.25rem;
  padding-bottom: 3rem; /* Spacing above bottom bar */
}

.upload-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.02em;
}

.upload-subtitle {
  font-size: 0.8rem !important;
  color: var(--text-secondary);
}

/* Stepper Wizard Styles */
.stepper-container {
  width: 100%;
  padding: 1rem 0;
  margin-top: 1rem;
}

.stepper-track {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align nodes to top so circles line up */
  position: relative;
}

.stepper-line-bg {
  position: absolute;
  top: 18px; /* Center height of 36px circle */
  left: 60px; /* Start center of first node */
  right: 60px; /* End center of last node */
  height: 2px;
  background-color: rgba(255, 255, 255, 0.05);
  z-index: 1;
}

.stepper-line-active {
  position: absolute;
  top: 18px;
  left: 60px;
  height: 2px;
  background-color: #2563EB;
  z-index: 1;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-node {
  position: relative;
  display: flex;
  flex-direction: column; /* Stacks label under the circle on desktop */
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  z-index: 10;
  width: 120px; /* Limits width and centers text below circle */
  transition: all 0.3s ease;
}

.node-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1A1A1C;
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.step-node.active .node-circle {
  background-color: #2563EB;
  border-color: #2563EB;
  color: #FFFFFF;
  box-shadow: 0 0 14px rgba(37, 99, 235, 0.4);
}

.step-node.completed .node-circle {
  background-color: rgba(16, 185, 129, 0.1);
  border-color: #10B981;
  color: #10B981;
}

.step-node.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.node-texts {
  line-height: 1.25;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.node-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  transition: color 0.3s;
  margin: 0;
}

.step-node.active .node-title {
  color: #FFFFFF;
}

.step-node.completed .node-title {
  color: #10B981;
}

.node-desc {
  font-size: 0.7rem;
  color: var(--text-secondary);
  opacity: 0.6;
  margin: 0;
}

/* Layout Grid */
.upload-content-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  align-items: start;
}

.wizard-panel-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.wizard-step-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.panel-header {
  text-align: left;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.panel-subtitle {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

/* Dropzone Styles */
.dropzone-container {
  border: 2px dashed rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.005);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
}

.dropzone-inner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.dropzone-container:hover, .dropzone-container.dragging {
  border-color: #2563EB;
  background-color: rgba(37, 99, 235, 0.02);
}

.cloud-icon-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(37, 99, 235, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.dropzone-container:hover .cloud-icon-wrapper {
  transform: translateY(-4px) scale(1.05);
}

.dropzone-texts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.dropzone-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
}

.choose-btn {
  padding: 0.6rem 2rem !important;
  font-weight: 600;
}

.dropzone-formats {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Uploaded Files Stack */
.uploaded-files-list {
  text-align: left;
}

.tracks-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  overflow: hidden;
}

/* Uploaded File card display styles */
.uploaded-file-card {
  width: 100%;
  overflow: hidden; /* Prevent card expanding with long filenames */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.02);
  box-sizing: border-box;
}

.file-info-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  flex: 1;
  min-width: 0;
}

.file-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background-color: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-icon-wrapper i {
  font-size: 1.5rem;
  color: #2563EB;
}

.file-meta {
  flex: 1;
  min-width: 0;
}

/* File name marquee wrapper - hard clip window */
.file-name-marquee-wrap {
  /* Must be strictly bounded to its parent */
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  flex: 1;
  min-width: 0;
}

/* The text span - static by default (desktop) */
.file-name-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  display: block; /* block so it respects parent width */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-status {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.progress-bar-wrap {
  width: 100%;
  margin-top: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #2563EB;
  border-radius: 99px;
  transition: width 0.15s linear;
}

.progress-text {
  font-size: 0.65rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  display: block;
}

.remove-file-btn {
  background: transparent;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  color: #F87171;
}

.remove-file-btn i {
  font-size: 1.25rem;
}

/* Multi-song editor tabs styling */
.song-editor-tabs-container {
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
}

.song-editor-tabs {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.song-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.song-tab-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.06);
}

.song-tab-btn.active {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.song-tab-title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Requirements list styling */
.requirements-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Info banner styling */
.info-banner {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.15);
  border-radius: var(--radius-md);
  align-items: flex-start;
  text-align: left;
}

.info-banner-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Details Form layout */
.details-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input-field {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: #FFFFFF;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.form-input-field:focus {
  border-color: #2563EB;
  background: rgba(255, 255, 255, 0.02);
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.15);
}

.form-select-field {
  cursor: pointer;
}

.textarea-field {
  resize: none;
}

.explicit-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  text-align: left;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: #2563EB;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
}

.grid-layout-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

/* Artwork Settings & Upload */
.artwork-settings {
  text-align: left;
}

.artwork-upload-row {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
}

.artwork-dropzone {
  width: 160px;
  height: 160px;
  border-radius: var(--radius-md);
  border: 2px dashed rgba(255, 255, 255, 0.08);
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.artwork-dropzone:hover {
  border-color: #2563EB;
  background-color: rgba(37, 99, 235, 0.02);
}

.artwork-preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.artwork-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-hover {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.artwork-preview-wrapper:hover .artwork-hover {
  opacity: 1;
}

.artwork-hover span {
  font-size: 0.75rem;
  font-weight: 700;
  color: #FFFFFF;
}

.artwork-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
}

.artwork-empty-state i {
  font-size: 2rem;
  color: var(--text-secondary);
}

.artwork-empty-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
}

.artwork-empty-sub {
  font-size: 0.65rem;
  color: var(--text-secondary);
  margin: 0;
}

.artwork-tips-wrap {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.artwork-tips-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.artwork-tips-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.artwork-tips-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.artwork-remove-btn {
  width: auto;
  align-self: flex-start;
  font-size: 0.75rem;
  padding: 0.4rem 1rem !important;
  color: #EF4444 !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
}

.artwork-remove-btn:hover {
  background-color: rgba(239, 68, 68, 0.05) !important;
}

/* Review Wizard Step Styling */
.review-tracks-container {
  text-align: left;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.review-summary-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-header {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  align-items: center;
}

.review-artwork-wrap {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-md);
  background-color: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.review-texts {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.review-title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  width: 100%;
}

.review-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
}

.explicit-badge {
  font-size: 8px;
  font-weight: 700;
  padding: 1px 4px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  border-radius: 2px;
  display: inline-block;
  line-height: 1;
}

.review-artist {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.review-tags {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.genre-tag {
  font-size: 0.75rem;
  background-color: rgba(37, 99, 235, 0.15);
  color: #2563EB;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(37, 99, 235, 0.25);
  display: inline-block;
}

.date-tag {
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: inline-block;
}

.review-details-list {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.review-details-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.detail-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  color: #FFFFFF;
  font-weight: 600;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.review-terms-text {
  font-size: 0.65rem;
  color: var(--text-secondary);
  line-height: 1.5;
  text-align: left;
  margin: 0;
}

/* Sidebar Widgets Sticky Layout */
.upload-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2.25rem;
  align-self: start;
}

.widget-card-panel {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0px; /* Gap handled by headers and collapsed state transitions */
}

.widget-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.widget-header-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.widget-card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.collapse-icon {
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: transform 0.3s ease;
  margin-left: auto;
}

.collapse-icon.is-collapsed {
  transform: rotate(-180deg);
}

.widget-card-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.75rem;
}

.widget-card-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
  text-align: left;
}

.widget-card-item i {
  color: #2563EB;
  font-size: 0.875rem;
  margin-top: 2px;
  flex-shrink: 0;
}

.widget-card-body {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.75rem;
}

.widget-card-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.help-action-btn {
  width: 100%;
  font-size: 0.75rem;
  padding: 0.5rem 1rem !important;
  font-weight: 600;
}

/* Sidebar Timeline */
.vertical-timeline {
  position: relative;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
}

.timeline-trail-line {
  position: absolute;
  top: 16px;
  bottom: 16px;
  left: 26px; /* 1.25rem padding (20px) + 7px (half of 14px bullet) - 1px = 26px */
  width: 2px;
  background-color: rgba(255, 255, 255, 0.05);
  z-index: 1;
}

.timeline-node {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.timeline-bullet {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #1A1A1C;
  border: 2px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-bullet.active {
  background-color: #2563EB;
  border-color: #2563EB;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
}

.timeline-node-content {
  text-align: left;
}

.timeline-node-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin: 0;
}

.timeline-node-title.active-title {
  color: #FFFFFF;
}

.timeline-node-desc {
  font-size: 0.65rem;
  color: var(--text-secondary);
  opacity: 0.8;
  margin-top: 0.25rem;
  margin-bottom: 0;
  line-height: 1.4;
}

/* Success Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.modal-card {
  background: #1A1A1C;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.success-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
  font-size: 2.5rem;
  margin: 0 auto;
}

.modal-texts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.modal-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.modal-btn {
  padding: 0.7rem !important;
  font-weight: 700;
}

/* Premium Wizard Bottom Navigation Bar (replaces music player bar) */
.wizard-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: rgba(18, 18, 18, 0.95); /* Matched to PlayerBar precisely */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.25rem;
  z-index: 200; /* Ensure it lies above other elements */
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.4), 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.bottom-bar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.bottom-step-count {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2563EB;
}

.bottom-step-divider {
  color: rgba(255, 255, 255, 0.15);
  font-size: 0.85rem;
}

.bottom-step-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #FFFFFF;
}

.bottom-step-track-count {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.bottom-bar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.disabled-btn {
  opacity: 0.4;
  pointer-events: none;
}

/* Accordion Smooth Slide Transition */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 300px;
  overflow: hidden;
}

.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Responsive Overrides */
@media (max-width: 768px) {
  .upload-content-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    margin-top: 1.5rem !important;
  }

  .wizard-panel-container {
    padding: 1.25rem !important;
    min-height: auto !important;
    gap: 1.5rem !important;
  }

  .upload-title {
    font-size: 1.75rem !important;
  }

  .grid-layout-row {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .song-tab-btn {
    padding: 0.4rem 0.75rem !important;
    font-size: 0.75rem !important;
  }

  .form-input-field {
    padding: 0.6rem 0.8rem !important;
    font-size: 0.8rem !important;
  }

  .form-label {
    font-size: 0.7rem !important;
  }

  .checkbox-label {
    font-size: 0.7rem !important;
  }

  .review-summary-card {
    padding: 1rem !important;
    gap: 1.25rem !important;
  }

  .review-tags {
    justify-content: center !important;
  }

  .detail-value {
    max-width: 140px !important;
  }

  .upload-view {
    grid-column: 1;
    grid-row: 2;
    margin: 0;
    border-radius: 0;
    border: none;
    height: 100%;
    padding: 0; /* padding handled inside scrollable content */
  }

  .upload-content-scrollable {
    padding: 1.25rem;
    padding-bottom: 110px; /* Leave space for bottom bar */
  }

  .upload-sidebar {
    position: static; /* Disable sticky sidebar on mobile */
  }

  .stepper-line-bg, .stepper-line-active {
    display: none;
  }

  .stepper-track {
    display: flex;
    flex-wrap: nowrap !important; /* Single line */
    overflow-x: auto;
    padding-bottom: 0.75rem;
    gap: 0.75rem;
    justify-content: flex-start !important; /* Align to start for scrolling */
    scrollbar-width: none; /* Hide scrollbar for clean look */
    -ms-overflow-style: none;
  }
  
  .stepper-track::-webkit-scrollbar {
    display: none;
  }

  .step-node {
    flex-shrink: 0; /* Prevent steps from shrinking */
    width: auto !important; /* Auto width based on content */
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: var(--radius-md);
    flex-direction: row !important; /* Horizontal flex on mobile */
    align-items: center;
    gap: 0.5rem;
  }

  .step-node.active {
    background: rgba(37, 99, 235, 0.05);
    border-color: rgba(37, 99, 235, 0.2);
  }

  .step-node.completed {
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.2);
  }

  .node-texts {
    display: block !important;
    text-align: left;
    align-items: flex-start;
  }

  .node-desc {
    display: none !important; /* Hide description on mobile to keep it compact */
  }

  .node-circle {
    width: 24px !important;
    height: 24px !important;
    font-size: 0.7rem !important;
  }

  .node-title {
    font-size: 0.75rem !important;
  }

  .artwork-dropzone {
    width: 120px;
    height: 120px;
  }
  
  .artwork-upload-row {
    flex-direction: column;
    text-align: center;
  }
  
  .artwork-tips-wrap {
    text-align: center;
    align-items: center;
  }
  
  .artwork-tips-item {
    justify-content: center;
  }
  
  .artwork-remove-btn {
    align-self: center;
  }

  .review-header {
    flex-direction: column;
    text-align: center;
  }
  
  .review-texts {
    text-align: center;
  }
  
  .review-title-container {
    align-items: center !important;
  }

  .review-title {
    text-align: center !important;
  }

  /* Card Resizing on Mobile Viewports */
  .dropzone-container {
    min-height: 150px !important;
    padding: 1.25rem !important;
    border-radius: var(--radius-md) !important;
  }

  .cloud-icon-wrapper {
    width: 50px !important;
    height: 50px !important;
  }

  .cloud-icon-wrapper i {
    font-size: 1.5rem !important;
  }

  .choose-btn {
    padding: 0.4rem 1.25rem !important;
    font-size: 0.75rem !important;
  }

  .dropzone-title {
    font-size: 0.75rem !important;
  }

  .dropzone-formats {
    font-size: 0.65rem !important;
  }

  .uploaded-file-card {
    padding: 0.75rem !important;
    border-radius: var(--radius-md) !important;
  }

  .file-icon-wrapper {
    width: 36px !important;
    height: 36px !important;
    border-radius: var(--radius-sm) !important;
  }

  .file-icon-wrapper i {
    font-size: 1.15rem !important;
  }

  .file-name {
    font-size: 0.8rem !important;
  }

  .file-status {
    font-size: 0.7rem !important;
  }

  .progress-track {
    height: 4px !important;
  }

  .progress-text {
    font-size: 0.6rem !important;
  }

  .remove-file-btn i {
    font-size: 1rem !important;
  }

  .widget-card-panel {
    padding: 0.85rem 1rem !important;
    border-radius: var(--radius-md) !important;
  }

  .widget-card-header {
    padding-bottom: 0.5rem !important;
  }

  .widget-card-title {
    font-size: 0.8rem !important;
  }

  .widget-card-list {
    padding-top: 0.5rem !important;
    gap: 0.5rem !important;
  }

  .widget-card-item {
    font-size: 0.7rem !important;
  }

  .widget-card-item i {
    font-size: 0.75rem !important;
    margin-top: 1px !important;
  }

  .widget-card-body {
    padding-top: 0.5rem !important;
    gap: 0.75rem !important;
  }

  .widget-card-text {
    font-size: 0.7rem !important;
  }

  .help-action-btn {
    padding: 0.4rem 0.75rem !important;
    font-size: 0.7rem !important;
  }

  .vertical-timeline {
    padding-top: 0.75rem !important;
    gap: 1rem !important;
    padding-left: 1rem !important;
  }

  .timeline-trail-line {
    top: 12px !important;
    bottom: 12px !important;
    left: 20px !important;
  }

  .timeline-bullet {
    width: 10px !important;
    height: 10px !important;
    margin-top: 2px !important;
  }

  .timeline-node-title {
    font-size: 0.7rem !important;
  }

  .timeline-node-desc {
    font-size: 0.6rem !important;
  }

  /* Wizard bottom bar anchored to the very bottom on mobile (replacing mobile navbar) */
  .wizard-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 75px;
    border-radius: 0;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background-color: rgba(18, 18, 18, 0.95);
    padding: 0 1.25rem;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
    z-index: 200;
  }

  .bottom-bar-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }

  .bottom-step-divider {
    display: none;
  }

  .bottom-step-count {
    font-size: 0.75rem;
  }

  .bottom-step-name {
    font-size: 0.75rem;
  }

  .bottom-step-track-count {
    font-size: 0.65rem;
  }

  .navigation-back-btn, .navigation-next-btn {
    padding: 0.5rem 1rem !important;
    font-size: 0.75rem;
  }

  /* ---- Mobile marquee for long filenames ---- */
  .file-name-marquee-wrap {
    overflow: hidden !important;    /* This is the clipping window - must never be violated */
    width: 100% !important;
    max-width: 100% !important;     /* Hard cap - never wider than parent */
    white-space: nowrap !important;
    height: 1.2em;                  /* Fixed height - card won't grow */
    display: flex;
    align-items: center;
    min-width: 0;                   /* Crucial for flex children */
  }

  .file-name-text {
    display: inline-block;
    white-space: nowrap;
    font-size: 0.8rem !important;
    /* DO NOT set overflow:visible - that breaks the parent clip */
    overflow: hidden !important;
    text-overflow: clip !important;
    /* Default: no animation (short filenames stay put) */
    animation: none;
    /* Don't constrain to 100% - we need it to be wider for the scroll */
    max-width: none !important;
  }

  /* Active marquee scroll: Vue adds .is-marquee class on long names */
  .file-name-marquee-wrap.is-marquee .file-name-text {
    /* Once scrolling, text is allowed to overflow INSIDE the clipped wrapper */
    overflow: visible !important;
    animation: marquee-scroll 10s linear infinite;
    padding-right: 3rem; /* visible gap between the two text copies */
  }
}

/* ---- Keyframe lives OUTSIDE media query so it's always available ---- */
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
