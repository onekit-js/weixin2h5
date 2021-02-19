export default class MediaRecorder {
  constructor() {

  }

  pause(){}

  resume() {}

  start() {}

  stop() {}

  requestFrame(callback) {
    callback()
  }

  on(eventName, callback) {

  }

  off(eventName, callback) {

  }

  destroy() {
    MediaRecorder = null
  }
}