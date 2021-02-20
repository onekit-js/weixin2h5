export default class UpdateManager {
  applyUpdate() {
    console.warn('html5 is not support')
  }
  onCheckForUpdate(callback) {
    const res = {
      hasUpdate: false
    }
    callback(res)
  }
  onUpdateFailed() {
    console.warn('html5 is not support')
  }
  onUpdateReady() {
    console.warn('html5 is not support')
  }
}