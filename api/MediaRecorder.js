export default class MediaRecorder {
  constructor(mediaRecorder, duration, buf) {
    this.mediaRecorder = mediaRecorder
    this.duration = duration
    this.buf = buf

    this.mediaRecorder.ondataavailable = e => {
      if(e && e.data && e.size > 0) {
        this.buf.push(e.data)
      }
    }
  }

  pause() {
    this.mediaRecorder.pause()
  }

  resume() {
    this.mediaRecorder.resume()
  }

  start() {
    this.mediaRecorder.start(this.duration)
  }

  stop() {
    this.mediaRecorder.stop()
  }

  requestFrame(callback) {
    callback()
  }

  on(eventName, callback) {
    if(eventName === 'start') this.mediaRecorder.onstart(e => callback(e))
    if(eventName === 'stop') this.mediaRecorder.onstop(e => callback(e))
  }

  off(eventName) {
    if(eventName === 'start') this.mediaRecorder.onstart = null 
    if(eventName === 'stop') this.mediaRecorder.onstop = null
  }

  destroy() {
    MediaRecorder = null
  }
}