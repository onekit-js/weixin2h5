export default class AudioContext {
  constructor(audioContext) {
    this.audioContext = audioContext
  }

  setSrc(src) {
    this.audioContext.src = src
  }

  play() {
    this.audioContext.play()
  }

  pause() {
    this.audioContext.pause()
  }

  seek(position) {
    this.audioContext.seek(position)
  }
}
