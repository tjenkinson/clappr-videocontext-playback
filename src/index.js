import {$, Playback, Events} from 'clappr'
import VideoContext from 'videocontext'

export default class VideoContextPlayback extends Playback {
  get name() {return 'video_context_playback'}

  constructor(options) {
    super(options)
    this._context = options.src
    this._lastTimeOnCheck = null
    this._lastDurationOnCheck = null
    this.$el.css({
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })
    this.$el.append(this._context.canvas)
    $(this._context._canvas).css({width: "100%", height: "100%"})
  
    this._context.registerCallback("update", this._update.bind(this))
    this._context.registerCallback("ended", this._onEnded.bind(this))

    // to handle case where duration may change but content is paused    
    this._updateTimer = setInterval(() => {
      this._update()
    }, 1000);
    

    this.settings = {
      default: ['seekbar'],
      left: ["playpause", "position", "duration"],
      right: ["fullscreen"],
      seekEnabled: true
    }
    this.trigger(Events.PLAYBACK_SETTINGSUPDATE)

    this.trigger(Events.PLAYBACK_READY, this.name)
    options.autoPlay && this.play()
  }

  play() {
    this._context.play()
    this.trigger(Events.PLAYBACK_PLAY)
  }

  pause() {
    this._context.pause()
    this.trigger(Events.PLAYBACK_PAUSE)
  }

  seek(time) {
    this._context.currentTime = time
  }

  seekPercentage(percentage) {
    this._context.currentTime = this._context.duration * (percentage / 100)
  }

  getDuration() {
    return this._context.duration
  }

  isPlaying() {
    // TODO add public method to videocontext
    return this._context.state === VideoContext.STATE.PLAYING
  }

  get isReady() {
    return true
  }

  isHighDefinitionInUse() {
    return false
  }

  stop() {
    this._context.pause()
    this._context.currentTime = 0
    this.trigger(Events.PLAYBACK_STOP)
  }

  get ended() {
    return this._context.state === VideoContext.STATE.ENDED
  }

  getPlaybackType() {
    // TODO is this live or vod?
    return Playback.VOD
  }

  destroy() {
    clearInterval(this._updateTimer)
    this._context.unregisterCallback(this._update)
    this._context.unregisterCallback(this._onEnded)
  }

  _onEnded() {
    this.trigger(Events.PLAYBACK_ENDED)
    this.stop()
  }

  _update() {
    var changed = false
    if (this._context.duration !== this._lastDurationOnCheck) {
      changed = true
      this._lastDurationOnCheck = this._context.duration
    }
    if (this._context.currentTime !== this._lastTimeOnCheck) {
      changed = true
      this._lastTimeOnCheck = this._context.currentTime
    }
    changed && this.trigger(Events.PLAYBACK_TIMEUPDATE, {current: this._context.currentTime, total: this._context.duration}, this.name)
  }
}

VideoContextPlayback.canPlay = (resource) => {
  return resource instanceof VideoContext
}