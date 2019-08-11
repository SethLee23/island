import {
  classicBeh
} from '../classic-beh.js'
const backgroundAudioManager = wx.getBackgroundAudioManager()
// const mManager =  wx.getBackgroundAudioManager()
// const audioCtx = wx.createAudioContext()
Component({
  data: {

  },
  behaviors: [classicBeh],
  data: {
    playSrc: '../../images/player@play.png',
    pauseSrc: '../../images/player@pause.png',
    playing: false
  },
  properties: {
    musicSrc: String
  },
  attached: function() {
    this._resetMusicStatus()
    this._monitorSwitch()
  },
  methods: {
    playMusic() {
      let {
        playing
      } = this.data
      this.setData({
        playing: !playing
      })
      backgroundAudioManager.title = 'lovelysong'
      if (!playing) {
        backgroundAudioManager.src = this.properties.musicSrc
      } else {
        backgroundAudioManager.pause()
      }
    },
    _resetMusicStatus() {
      if (backgroundAudioManager.paused) {
        this.setData({
          playing: false,
        })
        return
      } else if (backgroundAudioManager.src === this.properties.musicSrc) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      backgroundAudioManager.onPlay(() => {
        this._resetMusicStatus()
      })
      backgroundAudioManager.onPause(() => {
        this._resetMusicStatus()
      })
      backgroundAudioManager.onStop(() => {
        this._resetMusicStatus()
      })
      backgroundAudioManager.onEnded(() => {
        this._resetMusicStatus()
      })
    }
  },

})