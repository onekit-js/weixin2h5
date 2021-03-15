import html2canvas from 'html2canvas'
import vconsole from 'vconsole'
import Animation from './api/Animation'
import RealtimeLogManager from './api/RealtimeLogManager'
import LogManager from './api/LogManager'
import RequestTask from './api/RequestTask'
import SocketTask from './api/SocketTask'
import UpdateManager from './api/UpdateManager'
import TheKit from './js/TheKit'
import DownloadTask from './api/DownloadTask'
import UploadTask from './api/UploadTask'
import PROMISE from 'oneutil/PROMISE'
import TASK from 'oneutil/TASK'
import axios from 'axios'
import $ from 'jquery'
import NoSleep from 'nosleep.js'
import STRING from 'oneutil/STRING'
import RecorderManager from "./api/RecorderManager"
import MobileDetect from 'mobile-detect'
import BackgroundManager from './api/BackgroundAudioManager'
import InnerAudioContext from './api/InnerAudioContext'
import VideoContext from './api/VideoContext'
import LivePusherContext from './api/LivePusherContext'
import CameraContext from './api/CameraContext'
import LivePlayerContext from './api/LivePusherContext'
import FileSystemManager from './api/FileSystemManager'
import MediaContainer from './api/MediaContainer'
import _MediaRecorder from './api/MediaRecorder'
import VideoDecoder from './api/VideoDecoder'
import 'jquery-confirm'
import 'jquery-confirm/css/jquery-confirm.css'
import './js/PrevewImage'
import config from './config'
import AudioContext from './api/AudioContext'
import MediaRecorder from './api/MediaRecorder'
import UDPSocket from './api/UDPSocket'
import NFCAdapter from './api/NFCAdapter'

export default class WX {
  constructor(fn_global) {
    this.fn_global = fn_global
  }

  /////////////////////////基础////////////////////////
  /** 基础 */
  canIUse() {
    return true
  }

  base64ToArrayBuffer(base64) {
    return STRING.base64ToArrayBuffer(base64)
  }

  arrayBufferToBase64(arrayBuffer) {
    return STRING.arrayBufferToBase64(arrayBuffer)
  }

  /** 更新 */
  updateWeChatApp(wx_object) {
    const wx_success = wx_object.success || ''
    const wx_fail = wx_object.fail || ''
    const wx_complete = wx_object.complete || ''
    // window.open("https://support.weixin.qq.com/update/", '_blank')

    try {
      const wx_res = {
        errMsg: 'private_openUrl:ok',
      }
      if (wx_success) {
        wx_success(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    } catch (e) {
      const wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  getUpdateManager() {
    return new UpdateManager()
  }

  /** 小程序生命周期 */
  getLaunchOptionsSync() {
    return this.fn_global().OPTION
  }

  getEnterOptionsSync() {
    return this.fn_global().OPTION
  }

  exitMiniProgram(options) {
    const success = options.success
    const complete = options.complete
    const fail = options.fail
    PROMISE((SUCCESS) => {
      $.confirm({
        title: '是否退出?',
        content: '',
        type: 'green',
        buttons: {
          ok: {
            text: 'ok!',
            btnClass: 'btn-primary',
            keys: ['enter'],
            action: () => {
              window.location.href = 'about:blank'
              window.close()
              const res = {
                errMsg: 'exitMiniProgram:ok',
              }
              SUCCESS(res)
            },
          },
          cancel: function () {},
        },
      })
    }, success, complete, fail)
  }

  canIPutStuffOverComponent() {
    return true
  }

  /** 应用级事件 */
  onUnhandledRejection(wx_callback) {
    this.fn_global().onUnhandledRejection = wx_callback
  }

  onThemeChange(wx_callback) {
    this.fn_global().onThemeChange = wx_callback
  }

  onPageNotFound(wx_callback) {
    this.fn_global().onPageNotFound = wx_callback
  }

  onError(wx_callback) {
    this.fn_global().onError = wx_callback
  }

  onAudioInterruptionEnd(wx_callback) {
    this.fn_global().onAudioInterruptionEnd = wx_callback
  }

  onAudioInterruptionBegin(wx_callback) {
    this.fn_global().onAudioInterruptionBegin = wx_callback
  }

  onAppShow(wx_callback) {
    this.fn_global().onAppShow = wx_callback
  }

  onAppHide(wx_callback) {
    this.fn_global().onAppHide = wx_callback
  }

  offUnhandledRejection() {
    this.fn_global().onUnhandledRejection = NaN
  }

  offThemeChange() {
    this.fn_global().onThemeChange = null
  }

  offPageNotFound() {
    this.fn_global().onPageNotFound = null
  }

  offError() {
    this.fn_global().onError = null
  }

  offAudioInterruptionEnd() {
    this.fn_global().onAudioInterruptionBegin = null
  }

  offAudioInterruptionBegin() {
    this.fn_global().offAudioInterruptionBegin = null
  }

  offAppShow() {
    this.fn_global().onAppShow = null
  }

  offAppHide() {
    this.fn_global().onAppHide = null
  }

  /** 调试 */
  setEnableDebug(wx_object) {
    const wx_enableDebug = wx_object.enableDebug
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    try {
      if (wx_enableDebug) {
        new vconsole()
        if (wx_success) {
          wx_success()
        }
        if (wx_complete) {
          wx_complete()
        }
      }
    } catch (e) {
      const wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  getRealtimeLogManager() {
    return new RealtimeLogManager()
  }

  getLogManager(wx_object) {
    const wx_level = wx_object.level ? wx_object.level : 0
    const reg = /[0-1]/
    if (wx_level.natch(reg)) {
      return new LogManager()
    } else {
      return false
    }
  }


  enableAlertBeforeUnload() {

  }

  disableAlertBeforeUnload() {

  }

  createAnimation(OBJECT) {
    const animation = new Animation()
    if (OBJECT) {
      if (OBJECT['duration'] != null) {
        animation.duration = OBJECT['duration']
      }
      if (OBJECT['timingFunction'] != null) {
        animation.timingFunction = OBJECT['timingFunction']
      }
      if (OBJECT['delay'] != null) {
        animation.delay = OBJECT['delay']
      }
      if (OBJECT['transformOrigin'] != null) {
        animation.transformOrigin = OBJECT['transformOrigin']
      }
    }
    return animation
  }

  /** 环境变量 */
  get env() {
    const VERSION = 'production'
    const USER_DATA_PATH = 'wxfile://user'
    const obj = {
      VERSION,
      USER_DATA_PATH,
    }
    return Object(obj)
  }

  // /////////////////////////网络/////////////////////////
  /** 发起请求 */
  request(wx_object) {
    const url = wx_object.url
    const data = wx_object.data
    const header = wx_object.header
    const method = wx_object.method || 'GET'
    const timeout = wx_object.timeout
    const wx_responseType = wx_object.responseType || 'text'
    const wx_dataType = wx_object.dataType || 'json'
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    //
    //  let wx_enableHttp2 = wx_object.enableHttp2
    // let wx_enableQuic = wx_object.enableQuic
    //   let wx_enableCahe = wx_object.enableChache
    wx_object = null
    // ////////////////////////
    let vue_responseType
    switch (wx_responseType) {
      case 'text':
        switch (wx_dataType) {
          case 'json':
            vue_responseType = 'json'
            break
          default:
            vue_responseType = 'text'
            break
        }
        break
      case 'arraybuffer':
        vue_responseType = 'arraybuffer'
        break
      default:
        throw wx_responseType
    }

    const axios_instance = axios.create({
      data: data,
      headers: header,
      timeout: timeout,
      method: method,
      responseType: vue_responseType,
    })

    const requestTask = new RequestTask(axios_instance)

    setTimeout(() => {
      axios_instance({
        url: url,
      }).then((response) => {
        const wx_res = {
          cookies: response.cookies || [],
          data: response.data || null,
          errMsg: `request: ${response.statusText}`,
          header: response.headers,
          statusCode: response.status,
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }).catch((error) => {
        if (wx_fail) {
          wx_fail(error)
        }
        if (wx_complete) {
          wx_complete(error)
        }
      })
    }, 500)

    return requestTask
  }

  /** 下载 */
  downloadFile(wx_object) {
    const wx_url = wx_object.url
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    //
    const wx_header = wx_object.header
    const wx_mehotd = wx_object.method || 'GET'

    const axios_instance = axios.create({
      headers: wx_header,
      responseType: 'blob',
    })

    const downloadTask = new DownloadTask(axios_instance)
    setTimeout(() => {
      axios_instance({
        url: wx_url,
        method: wx_mehotd,
      }).then((res) => {
        const tempFilePath = TheKit.createTempPath(wx_url.substr(wx_url.lastIndexOf('/')))
        this.fn_global().TEMP[tempFilePath] = res.data
        if (wx_success) {
          wx_success({
            tempFilePath,
          })
        }
        if (wx_complete) {
          wx_complete()
        }
      }).catch((err) => {
        if (wx_fail) {
          wx_fail({
            errMsg: err.message,
          })
        }
        if (wx_complete) {
          wx_complete()
        }
      })
    }, 500)


    return downloadTask
  }

  /** 上传 */
  uploadFile(wx_object) {
    const url = wx_object.url
    const filePath = wx_object.filePath
    const name = wx_object.name
    let header = wx_object.header
    const formData = wx_object.formData
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    // /////////////////

    let blob
    if (filePath.startsWith('wxfile://store/onekit_')) {
      blob = null // sessionStorage.getItem(filePath)
    } else if (filePath.startsWith('wxfile://tmp_onekit_')) {
      blob = this.fn_global().TEMP[filePath]
    } else {
      throw new Error(filePath)
    }
    if (!header) {
      header = {}
    }
    header['Content-Type'] = 'multipart/form-data'
    // ///////////////
    const data = new FormData()

    const fData = new File([blob], filePath)

    data.append(name, fData, filePath)


    // if(formData) {
    // for (const key of Object.keys(formData)) {
    //   data.append(key, formData[key])
    // }
    // console.log(data)
    // }

    const axios_instance = axios.create({
      headers: header,
    })

    const uploadTask = new UploadTask(axios_instance)

    setTimeout(() => {
      axios_instance({
        url,
        data,
        method: 'post',
        // ...config
      }).then((res) => {
        if (wx_success) {
          wx_success(res)
        }
        if (wx_complete) {
          wx_complete(res)
        }
      }).catch((err) => {
        if (wx_fail) {
          wx_fail(err)
        }
        if (wx_complete) {
          wx_complete(err)
        }
      })
    }, 0)

    return uploadTask
  }

  /** webSocket */
  sendSocketMessage(wx_object) {
    const wx_data = wx_object.data
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    // /////////////////////////////
    if (!this.onSocketOpen) {
      return false
    }
    PROMISE((SUCCESS /* FAIL*/ ) => {
      this.fn_global()._socket.send(wx_data)
      SUCCESS()
    }, wx_success, wx_fail, wx_complete)
  }

  onSocketOpen(callback) {
    if (!this.fn_global()._socket) {
      return false
    }

    this.fn_global()._socket.addEventListener('open', (event) => {
      if (callback) {
        return callback(event)
      }
    })
  }

  onSocketMessage(callback) {
    if (!this.fn_global()._socket) {
      return null
    }

    this.fn_global()._socket.addEventListener('message', (event) => {
      if (callback) {
        return callback(event)
      }
    })
  }

  onSocketError(callback) {
    if (!this.fn_global()._socket) {
      return null
    }
    this.fn_global()._socket.addEventListener('error', () => {
      if (callback) {
        callback()
      }
    })
  }

  onSocketClose(callback) {
    if (!this.fn_global()._socket.close) {
      return null
    }

    this.fn_global()._socket.addEventListener('close', () => {
      const wx_code = this.fn_global()._socket_closeCode
      const wx_reson = this.fn_global()._socket_coloseReson

      this.fn_global()._socket_closeCode = null
      this.fn_global()._socket_coloseReson = null
      if (callback) {
        callback(wx_code, wx_reson)
      }
    })
  }

  connectSocket(wx_object) {
    const wx_url = wx_object.url
    const wx_protocols = wx_object.protocols
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    return PROMISE((SUCCESS) => {
      const vue_socket = new WebSocket(wx_url, wx_protocols)
      let socketCount = this.socketCount || 0
      socketCount++
      this.socketCount = socketCount
      if (this.socketCount === 5) {
        return
      }
      const wx_res = {
        errMsg: 'connectSocket:ok',
        socketTaskId: this.socketCount,
      }
      const wx_socket = new SocketTask(vue_socket)
      SUCCESS(wx_res)
      return wx_socket
    }, wx_success, wx_fail, wx_complete)
  }

  closeSocket() {
    this.fn_global()._socketTask.close()
  }

  /** mDNS */
  offLocalServiceResolveFail() {
    console.error('HTML5 is not support mDNS!!')
  }
  onLocalServiceResolveFail() {
    console.error('HTML5 is not support mDNS!!')
  }
  offLocalServiceDiscoveryStop() {
    console.error('HTML5 is not support mDNS!!')
  }
  onLocalServiceDiscoveryStop() {
    console.error('HTML5 is not support mDNS!!')
  }
  offLocalServiceLost() {
    console.error('HTML5 is not support mDNS!!')
  }
  onLocalServiceLost() {
    console.error('HTML5 is not support mDNS!!')
  }
  offLocalServiceFound() {
    console.error('HTML5 is not support mDNS!!')
  }
  onLocalServiceFound() {
    console.error('HTML5 is not support mDNS!!')
  }
  stopLocalServiceDiscovery() {
    console.error('HTML5 is not support mDNS!!')
  }
  startLocalServiceDiscovery() {
    console.error('HTML5 is not support mDNS!!')
  }

  /** UDP */
  createUDPSocket() {
    return new UDPSocket()
  }

  ////////////////////数据缓存//////////////////
  setStorageSync(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (vue_e) {
      const wx_e = vue_e
      throw wx_e
    }
  }

  setStorage(wx_object) {
    if (!wx_object) {
      return
    }
    const wx_key = wx_object.key
    const wx_data = wx_object.data
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    // //////////
    PROMISE((SUCCESS) => {
      const vue_key = wx_key
      const vue_data = wx_data

      this.setStorageSync(vue_key, vue_data)
      const wx_errMsg = 'setStorage:ok'
      const vue_res = {
        errMsg: wx_errMsg,
      }
      SUCCESS(vue_res)
    }, wx_success, wx_fail, wx_complete)
  }

  removeStorageSync(key) {
    localStorage.removeItem(key)
  }

  removeStorage(wx_object) {
    const key = wx_object.key
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    const res = {}

    PROMISE((SUCCESS) => {
      this.removeStorageSync(key)
      res.errMsg = 'removeStorage:ok'
      SUCCESS(res)
    }, wx_success, wx_fail, wx_complete)
  }

  getStorageSync(key) {
    return localStorage.getItem(key)
  }

  getStorageInfoSync() {
    let wx_res
    try {
      const keysArray = new Array()
      for (let i = 0; i < localStorage.length; i++) {
        const getKey = localStorage.key(i)
        keysArray.push(getKey)
      }
      let sizeStore = 0
      if (localStorage) {
        for (const item of Object.keys(localStorage)) {
          sizeStore += localStorage.getItem(item).length
        }
      }
      wx_res = {
        keys: keysArray,
        currentSize: Math.ceil((sizeStore / 1024).toFixed(2)),
        limitSize: '5110',
      }
      return wx_res
    } catch (e) {
      throw new Error(e.message)
    }
  }

  getStorageInfo(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null

    PROMISE((SUCCESS) => {
      const wx_res = this.getStorageInfoSync()
      wx_res['errMsg'] = 'getStorageInfo:ok'
      SUCCESS(wx_res)
    }, wx_success, wx_fail, wx_complete)
  }

  getStorage(wx_object) {
    const key = wx_object.key
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    const res = {}

    PROMISE((SUCCESS, FAIL, COMPLETE) => {
      const value = localStorage.getItem(key)
      if (value) {
        res.errMsg = 'getStorage:ok'
        res.data = value
        if (wx_success) {
          SUCCESS(res)
        }
      } else {
        res.errMsg = 'getStorage:fail data not found'
        if (wx_fail) {
          FAIL(res)
        }
      }
      if (wx_complete) {
        COMPLETE(res)
      }
    }, wx_success, wx_fail, wx_complete)
  }


  clearStorageSync() {
    localStorage.clear()
  }

  clearStorage(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    const res = {}
    PROMISE((SUCCESS) => {
      this.clearStorageSync()
      res.errMsg = 'clearStorage:ok'
      SUCCESS(res)
    }, wx_success, wx_fail, wx_complete)
  }


  /** 周期性更新 */
  setBackgroundFetchToken() {
    console.warn('html5 is not support setBackgroundFetchToken')
  }
  onBackgroundFetchData() {
    console.warn('html5 is not support onBackgroundFetchData')
  }
  getBackgroundFetchToken() {
    console.warn('html5 is not support getBackgroundFetchToken')
  }
  getBackgroundFetchData() {
    console.warn('html5 is not support getBackgroundFetchData')
  }

  ///////////////////////媒体/////////////////////////////
  /** 图片 */
  saveImageToPhotosAlbum(wx_object) {
    const wx_filePath = wx_object.filePath
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete

    PROMISE((SUCCESS) => {
      const vue_filePath = wx_filePath
      const fileName = TheKit.createTempPath('Photos')
      TheKit.downloadPicture(vue_filePath, fileName)
      const res = {
        errMsg: 'saveImageToPhotosAlbum:ok',
      }
      SUCCESS(res)
    }, wx_success, wx_fail, wx_complete)
  }

  previewImage(wx_object) {
    const wx_urls = wx_object.urls
    const wx_current = wx_object.current
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    PROMISE((SUCCESS) => {
      if (wx_urls[0].startsWith('wxfile://tmp_onekit_')) {
        const blobs = []
        for (const i in wx_urls) {
          blobs.push(this.fn_global().TEMP[wx_urls[i]])
        }
        const vue_current = this.fn_global().TEMP[wx_current]
        if (vue_current === undefined) {
          const urls = []
          for (const i in blobs) {
            TheKit.blobToBase64(blobs[i], (res) => {
              urls.push(res)
              const obj = {
                urls: urls,
                current: urls[0],
              }
              // eslint-disable-next-line no-undef
              _preview_.start(obj)
            })
          }
        }

        TheKit.blobToBase64(vue_current, (res) => {
          const url = res
          const urls = []
          for (const i in blobs) {
            TheKit.blobToBase64(blobs[i], (res) => {
              urls.push(res)
              const obj = {
                urls: urls,
                current: url,
              }
              // eslint-disable-next-line no-undef
              _preview_.start(obj)
            })
          }
        })
      } else {
        const obj = {
          urls: wx_urls,
          current: wx_current,
        }
        // eslint-disable-next-line no-undef
        _preview_.start(obj)
      }
      const res = {
        errMsg: 'previewImage: ok',
      }
      SUCCESS(res)
    }, wx_success, wx_complete, wx_fail)
  }

  getImageInfo(wx_object) {
    const wx_src = wx_object.src
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete

    PROMISE((SUCCESS) => {
      let vue_src = wx_src

      function functiongetOrientation(file, callback) {
        const reader = new window.FileReader()
        reader.onload = function (e) {
          const view = new window.DataView(e.target.result)
          if (view.getUint16(0, false) != 0xFFD8) {
            return callback(-2)
          }
          const length = view.byteLength
          let offset = 2
          while (offset < length) {
            const marker = view.getUint16(offset, false)
            offset += 2
            if (marker == 0xFFE1) {
              if (view.getUint32(offset += 2, false) != 0x45786966) {
                return callback(-1)
              }
              const little = view.getUint16(offset += 6, false) == 0x4949
              offset += view.getUint32(offset + 4, little)
              const tags = view.getUint16(offset, little)
              offset += 2
              for (let i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                  return callback(view.getUint16(offset + (i * 12) + 8, little))
                }
              }
            } else if ((marker & 0xFF00) != 0xFF00) {
              break
            } else {
              offset += view.getUint16(offset, false)
            }
          }
          return callback(-1)
        }
        reader.readAsArrayBuffer(file)
      }

      function own_fn() {
        const base64 = TheKit.getBase64Image(pic_res)
        eImage.src = base64
        const formData = new FormData()
        const file = TheKit.fileBtof(base64, 'text')
        formData.append('filenaem', file)
        functiongetOrientation(file, (res) => {
          const orientation = res
          const errMsg = 'getImageInfo:ok'
          const height = pic_res.naturalHeight
          const width = pic_res.naturalWidth
          const type = file.type
          const _res = {
            errMsg,
            height,
            orientation,
            path: vue_src,
            type,
            width,
          }
          SUCCESS(_res)
        })
      }
      const eImage = document.createElement('img')
      eImage.setAttribute('crossOrigin', 'Anonymous')
      const pic_res = new Image()
      if (vue_src.startsWith('wxfile://tmp_onekit_')) {
        const blob = this.fn_global().TEMP[vue_src]
        TheKit.blobToBase64(blob, (res) => {
          vue_src = res
          eImage.setAttribute('src', vue_src)
          pic_res.onload = () => own_fn()
          pic_res.src = vue_src
        })
      } else if (vue_src.startsWith('http')) {
        console.warn('网络路径')
      } else {
        eImage.setAttribute('src', vue_src)
        pic_res.onload = () => own_fn()
        pic_res.src = vue_src
      }
    }, wx_success, wx_fail, wx_complete)
  }

  compressImage(wx_object) {
    const wx_src = wx_object.src
    const wx_quality = wx_object.wx_quality || 0.6
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    PROMISE((SUCCESS) => {
      const vue_src = wx_src
      if (vue_src.startsWith('wxfile://tmp_onekit')) {
        console.log('临时路径')
        const blob = this.fn_global().TEMP[vue_src]
        TheKit.blobToBase64(blob, (res) => {
          console.log(res)
          const eimge = new Image()
          eimge.src = res
          document.body.appendChild(eimge)
          TheKit.dealImage(res, 500, wx_quality, (data) => {
            console.log(data)
            const eimge1 = new Image()
            eimge1.src = data
            document.body.appendChild(eimge1)
          })
        })
      }


      const res = {
        errMsg: 'compressImage:ok',
        tempFilePath: vue_src,
      }
      SUCCESS(res)
    }, wx_success, wx_fail, wx_complete)
  }

  chooseMessageFile(wx_object) {
    // console.error("[x2x] chooseMessageFile is not surport!!")
    const wx_conunt = wx_object.count
    const wx_type = wx_object.type || 'all'
    const wx_extensions = wx_object.extensions
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    PROMISE((SUCCESS) => {
      const vue_count = wx_conunt
      const vue_type = wx_type
      const vue_extensions = wx_extensions
      this._chooseMessage(SUCCESS, vue_count, vue_type, vue_extensions)
    }, wx_success, wx_complete, wx_fail)
  }

  _chooseMessage(SUCCESS, COUNT, TYPE, EXTENSION) {
    $.confirm({
      title: '是否允许打开文件夹?',
      content: '',
      type: 'green',
      buttons: {
        ok: {
          text: 'ok!',
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: () => {
            const eChooseFile = document.createElement('input')
            eChooseFile.setAttribute('type', 'file')
            eChooseFile.setAttribute('style', 'display: none')
            eChooseFile.setAttribute('multiple', 'multipl')
            eChooseFile.setAttribute('accept', `${TYPE}/*`)
            if (EXTENSION && TYPE == 'file') {
              eChooseFile.setAttribute('accept', `.${EXTENSION}`)
            }

            eChooseFile.click()
            eChooseFile.addEventListener('change', (e) => {
              let fileFactory
              if (COUNT) {
                const dosth = [...e.target.files]
                fileFactory = [...dosth.slice(0, COUNT)]
              } else {
                fileFactory = e.target.files
              }
              TASK(fileFactory, (file, itemCallback) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                  let blob
                  if (typeof e.target.result == 'object') {
                    blob = new Blob([e.target.result])
                  } else {
                    blob = e.target.result
                  }
                  const size = blob.size
                  const path = this.fn_global().TEMP[path] = fileFactory
                  this.fn_global().TEMP[path] = fileFactory
                  const name = file.name
                  const time = Math.round(file.lastModifiedDate / 1000)
                  const type = file.type
                  itemCallback({
                    name,
                    path,
                    size,
                    time,
                    type,
                  })
                }
                reader.readAsArrayBuffer(file)
              }, (tempFiles) => {
                const res = {
                  errMsg: 'chooseMessageFile:ok',
                  tempFiles,
                }
                SUCCESS(res)
              })
            })
          },
        },
        cancel: function () {},
      },
    })
  }

  chooseImage(wx_object) {
    const wx_count = wx_object.count || 9
    const wx_sizeType = wx_object.sizeType || ['original', 'compressed']
    const wx_sourceType = wx_object.sourceType || ['album', 'camera']
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null
    PROMISE((SUCCESS) => {
      const vue_sourceType = wx_sourceType
      const vue_sorts = 'image'
      const vue_count = wx_count
      const vue_camera = 'back'
      const vue_compressd = wx_sizeType
      this._chooseMedia(SUCCESS, vue_sourceType, vue_sorts, vue_camera, vue_count, vue_compressd)
    }, wx_success, wx_fail, wx_complete)
  }

  /** 视频 */
  saveVideoToPhotosAlbum(options) {

    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE((SUCCESS) => {
      const xsw_A = document.createElement('a')
      xsw_A.innerHTML = '<button>保存</button>'
      xsw_A.setAttribute('id', 'xswAH')
      xsw_A.setAttribute('download', 'download')
      xsw_A.setAttribute('href', filePath)
      xsw_A.setAttribute('target', "view-window")
      xsw_A.click()
      const res = {
        errMsg: 'saveVideoToPhotosAlbum:ok'
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  getVideoInfo(wx_object) {
    const wx_src = wx_object.src
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete


    PROMISE((SUCCESS) => {
      const _video = document.createElement('video')
      _video.setAttribute('src', wx_src)
      _video.setAttribute('crossorigin', 'Anonymous')
      _video.src = src
      // document.body.append(_video)
      _video.load()

      console.log('ok')
      _video.onloadeddata = function () {
        const height = _video.videoHeight
        const width = _video.videoWidth
        const duration = _video.duration
        console.log(_video.mozPresentedFrames)
        const res = {
          errMsg: 'getVedioInfo: ok',
          audioBitrate: '',
          audioChannel: '',
          audioSampleRate: '',
          bitrate: '',
          duration,
          fps: '',
          height,
          orientation: '',
          size: '',
          type: '',
          width,
        }
        SUCCESS(res)
      }

      document.remove(_video)
    }, wx_success, wx_fail, wx_complete)
  }

  createVideoContext(id, component) {
    const videoDom = document.getElementById(id)
    if (this.fn_global().videoContext) {
      return this.fn_global().videoContext
    } else {
      const videoContext = new VideoContext(videoDom)
      this.fn_global().VideoContext = videoContext
      return videoContext
    }
  }

  compressVideo() {
    console.error('html5 is not support!')
  }

  chooseVideo(options) {
    const sourceType = options.sourceType || ['album', 'camara']
    // const wx_compressed = wx_Object.compressed || true  // HTML5 is not support
    // const wx_maxDuration = wx_object.maxDuration || 60  // HTML5 is not support
    const camera = options.camera || 'back'
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    options = null
    PROMISE((SUCCESS) => {
      const html_sourceType = sourceType
      const html_sorts = 'vedio'
      this._chooseMedia(SUCCESS, html_sourceType, html_sorts, camera)
    }, success, fail, complete)
  }

  chooseMedia(wx_object) {
    // const wx_count = wx_object.count || 9                                   //
    const wx_mediaType = wx_object.mediaType || ['image', 'video'] //
    const wx_sourceType = wx_object.sourceType || ['album', 'camera'] //
    // const wx_maxDuration = wx_object.maxDuration || 10                      // HTML5 is not support
    // const wx_sizeType = wx_object.signType || ['original', 'compressed']  
    const wx_camera = wx_object.camera || 'back' //
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    wx_object = null

    PROMISE((SUCCESS) => {
      const vue_sourceType = wx_sourceType
      const vue_sorts = wx_mediaType
      const vue_camera = wx_camera
      this._chooseMedia(SUCCESS, vue_sourceType, vue_sorts, vue_camera)
    }, wx_success, wx_fail, wx_complete)
  }

  _chooseMedia(SUCCESS, TYPE, SORTS, CAMERA, COUNT, COMPRESSPED) {
    const that = this
    $.confirm({
      title: '是否允许打开摄像头或相册?',
      content: '',
      type: 'green',
      buttons: {
        ok: {
          text: 'ok!',
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: () => {
            const eChooseImage = document.createElement('input')
            eChooseImage.setAttribute('type', 'file')
            eChooseImage.setAttribute('style', 'visibility: hidden')

            if (SORTS == 'vedio') {
              switch (TYPE) {
                case 'album':
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'vedio/*')
                  eChooseImage.setAttribute('multiple', 'multipl')
                  break

                case 'camera':
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'video/*')
                  if (CAMERA == 'back') {
                    eChooseImage.setAttribute('capture', 'back')
                  }
                  if (CAMERA == 'front') {
                    eChooseImage.setAttribute('capture', 'user')
                  }
                  break

                default:
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'video/*')
              }

              eChooseImage.addEventListener('change', (e) => {
                const file = e.target.files[0]
                const _url = URL.createObjectURL(file)
                const eVideo = document.createElement('video')
                eVideo.addEventListener('loadedmetadata', ({
                  target,
                }) => {
                  const tempFiles = [{
                    duration: target.duration,
                    fileType: file.type,
                    height: target.videoHeight,
                    size: file.size,
                    tempFilePath: TheKit.createTempPath(file.name),
                    thumTempFilePath: _url,
                    width: target.videoWidth,
                  }]
                  const res = {
                    errMsg: 'chooseMedia: ok',
                    type: file.type,
                    tempFiles,
                  }

                  SUCCESS(res)
                })
                eVideo.src = _url
              })
            }

            if (SORTS == 'image') {
              switch (TYPE) {
                case 'album':
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'image/*')
                  eChooseImage.setAttribute('multiple', 'multipl')
                  break

                case 'camera':
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'image/*')
                  eChooseImage.setAttribute('capture', 'camera')
                  break

                default:
                  eChooseImage.setAttribute('id', 'eChooseImage')
                  eChooseImage.setAttribute('accept', 'image/*')
              }


              eChooseImage.addEventListener('change', (e) => {
                let fileFactory
                if (COUNT) {
                  const dosth = [...e.target.files]
                  fileFactory = [...dosth.slice(0, COUNT)]
                } else {
                  fileFactory = e.target.files
                }

                TASK(fileFactory, (file, itemCallback) => {
                  if (COMPRESSPED.includes('original')) {
                    const reader = new FileReader()
                    reader.onload = function (e) {
                      let blob
                      if (typeof e.target.result === 'object') {
                        blob = new Blob([e.target.result])
                      } else {
                        blob = e.target.result
                      }

                      const path = TheKit.createTempPath(file.name)
                      that.fn_global().TEMP[path] = blob
                      const size = blob.size
                      itemCallback({
                        path,
                        size,
                      })
                    }
                    reader.readAsArrayBuffer(file)
                  } else {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function () {
                      const readImg = (file) => {
                        return new Promise((resolve, reject) => {
                          const img = new Image()
                          const reader = new FileReader()
                          reader.onload = function (e) {
                            img.src = e.target.result
                          }
                          reader.onerror = function (e) {
                            reject(e)
                          }
                          reader.readAsDataURL(file)
                          img.onload = function () {
                            resolve(img)
                          }
                          img.onerror = function (e) {
                            reject(e)
                          }
                        })
                      }
                      async function upload(file) {
                        const eImg = await readImg(file)
                        const blob = await TheKit.compressImg(eImg, file.type, 500, 500)
                        const size = blob.size

                        const path = TheKit.createTempPath(file.name)
                        that.fn_global().TEMP[path] = blob
                        itemCallback({
                          path,
                          size,
                        })
                      }

                      upload(file).catch((e) => console.log(e))
                    }
                  }
                  // reader.readAsArrayBuffer(file)
                }, (tempFiles) => {
                  const tempFilePaths = tempFiles.map((tempFile) => tempFile.path)
                  const wx_res = {
                    errMsg: 'chooseImage:ok',
                    tempFilePaths,
                    tempFiles,
                  }

                  SUCCESS(wx_res)
                })
              })
            }
            document.body.appendChild(eChooseImage)
            eChooseImage.click()
          },
        },
        cancel: function () {},
      },
    })
  }

  /** 音频 */
  stopVoice() {}

  setInnerAudioOption() {}

  playVoice() {}

  pauseVoice() {}

  getAvailableAudioSources() {}

  createMediaAudioPlayer() {

  }

  createInnerAudioContext() {
    const innerAudiocontext = new Audio()
    innerAudiocontext.crossOrigin = 'anonymous'
    if (this.fn_global().innerAudiocontext) {
      return this.fn_global().innerAudiocontext
    } else {
      const innerAudioManager = new InnerAudioContext(innerAudiocontext)
      this.fn_global().innerAudioManager = innerAudioManager
      return innerAudioManager
    }
  }

  createAudioContext(id) {
    const audioContext = document.getElementById(id)
    audioContext.crossOrigin = 'anonymous'
    if (this.fn_global().audioContext) {
      return this.fn_global().audioContext
    } else {
      const audioManager = new AudioContext(audioContext)
      this.fn_global().audioManager = audioManager
      return audioManager
    }
  }


  /** 背景音频 */
  stopBackgroundAudio(wx_object) {
    const xsw_audio = document.getElementById('xsw_autoplayId')
    if (!wx_object) {
      if (xsw_audio) {
        xsw_audio.pause()
        xsw_audio.currentTime = 0
      } else {
        throw new Error('请先播放音乐！')
      }
    } else {
      const wx_success = wx_object.success
      const wx_fail = wx_object.fail
      const wx_complete = wx_object.complete
      let wx_res
      try {
        if (xsw_audio) {
          xsw_audio.pause()
          wx_res = {
            pauseBackgroundAudio: 'ok',
          }
          if (wx_success) {
            wx_success(wx_res)
          }
          if (wx_complete) {
            wx_complete(wx_res)
          }
        } else {
          throw new Error('请先播放音乐！')
        }
      } catch (e) {
        wx_res = {
          errMsg: e.message,
        }
        if (wx_fail) {
          wx_fail(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    }
  }

  seekBackgroundAudio(wx_object) {
    const position = wx_object.position
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    let wx_res
    const xsw_audio = document.getElementById('xsw_autoplayId')
    try {
      if (xsw_audio) {
        xsw_audio.currentTime = position
        wx_res = {
          seekBackgroundAudio: 'ok',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      } else {
        throw new Error('请先播放音乐！')
      }
    } catch (e) {
      wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  playBackgroundAudio(wx_object) {
    const dataUrl = wx_object.dataUrl
    const title = wx_object.title
    const coverImgUrl = wx_object.coverImgUrl
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    let wx_res
    try {
      let wrap
      if (title || coverImgUrl) {
        wrap = document.createElement('div')
        wrap.innerHTML =
          '<div style="width: 80%background-color: #444margin-left: 10%"><img src="' +
          coverImgUrl +
          '" style="width: 80pxheight: 80pxdisplay: inline-blockpadding-left: 20pxmargin-top: 10px"><div style="display: inline-blockpadding-left: 20pxcolor: #fff">' +
          title +
          '</div></div><audio src="" id="xsw_autoplayId"  style="width: 80%margin-left: 10%"   controls="controls"  ></audio>'
        const firstT = document.body.firstChild
        document.body.insertBefore(wrap, firstT)
      } else {
        wrap = document.createElement('audio')
        wrap.setAttribute('id', 'xsw_autoplayId')
        wrap.setAttribute('autoplay', 'autoplay')
        wrap.setAttribute('style', 'visibility: hidden')
        const first = document.body.firstChild
        document.body.insertBefore(wrap, first)
      }
      const xsw_audio = document.getElementById('xsw_autoplayId')
      xsw_audio.src = dataUrl
      // xsw_audio.controls=true
      xsw_audio.autoplay = true
      wx_res = {
        playBackgroundAudio: 'ok',
      }
      if (wx_success) {
        wx_success(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    } catch (e) {
      wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  pauseBackgroundAudio(wx_object) {
    const xsw_audio = document.getElementById('xsw_autoplayId')
    if (!wx_object) {
      if (xsw_audio) {
        xsw_audio.pause()
      } else {
        throw new Error('请先播放音乐！')
      }
    } else {
      const wx_success = wx_object.success
      const wx_fail = wx_object.fail
      const wx_complete = wx_object.complete
      let wx_res
      try {
        if (xsw_audio) {
          xsw_audio.pause()
          wx_res = {
            pauseBackgroundAudio: 'ok',
          }
          if (wx_success) {
            wx_success(wx_res)
          }
          if (wx_complete) {
            wx_complete(wx_res)
          }
        } else {
          throw new Error('请先播放音乐！')
        }
      } catch (e) {
        wx_res = {
          errMsg: e.message,
        }
        if (wx_fail) {
          wx_fail(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    }
  }

  onBackgroundAudioStop(callback) {
    let audioStatus
    const zzz = setInterval(function () {
      const xsw_audio = document.getElementById('xsw_autoplayId')
      if (xsw_audio) {
        xsw_audio.addEventListener('pause', function () {
          if (xsw_audio.currentTime == 0) {
            audioStatus = '2'
          } else {
            audioStatus = '0'
          }
        })
        const panStatus = '2'
        if (panStatus == audioStatus) {
          callback(audioStatus)
          clearInterval(zzz)
        }
      }
    }, 1000)
  }

  onBackgroundAudioPlay(callback) {
    setTimeout(function () {
      const xsw_audio = document.getElementById('xsw_autoplayId')
      if (xsw_audio) {
        xsw_audio.addEventListener('playing', function () {
          const audioStatus = '1'
          callback(audioStatus)
        })
      }
    })
  }

  onBackgroundAudioPause(callback) {
    let audioStatus
    const zzz = setInterval(function () {
      const xsw_audio = document.getElementById('xsw_autoplayId')
      if (xsw_audio) {
        xsw_audio.addEventListener('pause', function () {
          if (xsw_audio.currentTime == 0) {
            audioStatus = '2'
          } else {
            audioStatus = '0'
          }
        })
        const panStatus = '0'
        // console.log(audioStatus)
        if (panStatus == audioStatus) {
          callback(audioStatus)
          clearInterval(zzz)
        }
      }
    }, 1000)
  }

  getBackgroundAudioPlayerState(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    let wx_res
    const xsw_audio = document.getElementById('xsw_autoplayId')
    try {
      if (xsw_audio) {
        let audioStatus = '2'
        xsw_audio.addEventListener('playing', function () {
          audioStatus = '1'
        })
        xsw_audio.addEventListener('pause', function () {
          audioStatus = '0'
        })
        setTimeout(function () {
          const duration = xsw_audio.duration
          const currentPosition = xsw_audio.currentTime
          const status = audioStatus
          const downloadPercent = parseInt((xsw_audio.buffered.end(0) / xsw_audio.duration) * 100)
          const dataUrl = xsw_audio.src
          wx_res = {
            getBackgroundAudioPlayerState: 'ok',
            duration: duration,
            currentPosition: currentPosition,
            status: status,
            downloadPercent: downloadPercent,
            dataUrl: dataUrl,
          }
          if (wx_success) {
            wx_fail(wx_res)
          }
          if (wx_complete) {
            wx_complete(wx_res)
          }
        }, 1000)
      } else {
        throw new Error('请先播放音乐！')
      }
    } catch (e) {
      wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  getBackgroundAudioManager() {
    const bgAudiocontext = new Audio()
    bgAudiocontext.crossOrigin = 'anonymous'
    if (this.fn_global().backgroundManager) {
      return this.fn_global().backgroundManager
    } else {
      const backgroundManager = new BackgroundManager(bgAudiocontext)
      this.fn_global().backgroundManager = backgroundManager
      return backgroundManager
    }
  }

  /** 实时音视频 */
  createLivePusherContext() {
    return new LivePusherContext()
  }

  createLivePlayerContext(id, component) {
    return new LivePlayerContext(id, component)
  }

  /** 录音 */
  stopRecord(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.success
    const wx_complete = wx_object.success
    // ////////////////////////////
    const wx_res = {}
    // let localId
    this.stopRecord({
      success: function (res) {
        if (wx_success) {
          wx_res.errMsg = 'startRecord:ok'
          wx_res.tempFilePath = res.localId // 小程序中会返回录音文件的临时存放路径 tempFilePath ，JS-SDK中会返回录音文件的 localId ，所以这里直接将 localId 赋值给 tempFilePath，让用户获取 tempFilePath 来播放录音。
          wx_success(wx_res)
        }
      },
      fail: function (wx_res) {
        wx_fail(wx_res)
      },
      complete: function (wx_res) {
        if (wx_complete) {
          wx_complete(wx_res)
        }
      },
    })
  }

  startRecord() {
    //  let wx_success = wx_object.success
    // let wx_fail = wx_object.success
    //  let wx_complete = wx_object.success
    // ////////////////////////////
    try {
      this.startRecord()
    } catch (error) {
      const wx_res = {}
      wx_res.errMsg = error.message
      console.log(wx_res)
    }
  }

  getRecorderManager() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    if (navigator.getUserMedia) {
      if (this.fn_global().recorderManager) {
        return this.fn_global().recorderManager;
      } else {
        const recorderManager = new RecorderManager()
        this.fn_global().recorderManager = recorderManager
        return recorderManager
      }
    }
    throw 'getRecorderManager: Your browser version is too low!'
  }

  /** 音视频合成 */
  createMediaContainer() {
    return new MediaContainer()
  }

  /** 实时语音 */
  updateVoIPChatMuteConfig() {}

  subscribeVoIPVideoMembers() {}

  onVoIPVideoMembersChanged() {}

  onVoIPChatSpeakersChanged() {}

  onVoIPChatInterrupted() {}

  offVoIPVideoMembersChanged() {}

  offVoIPChatMembersChanged() {}

  offVoIPChatInterrupted() {}

  joinVoIPChat() {}

  exitVoIPChat() {}

  /** 视频解码器 */
  createVideoDecoder() {
    return new VideoDecoder()
  }

  /** 画面录制器 */
  createMediaRecorder(canvas, options) {
    canvas = null
    const {
      duration,
      videoBitsPerSecond
    } = options

    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      }).then(strema => {
        let buf = []
        const options = {
          mimeType: 'video/webm;codecs=vp8',
          videoBitsPerSecond
        }
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error('不支持的视频格式');
          return;
        }

        const mediaRecorder = new MediaRecorder(strema, options)
        new _MediaRecorder(mediaRecorder, duration, buf)

      }).catch(err => {
        console.error(err)
      })
    } else {
      console.error('your browser is not support meida-recoder')
    }
  }

  ////////////////// 位置  ////////////////////
  stopLocationUpdate() {}

  startLocationUpdateBackground() {}

  startLocationUpdate() {}

  openLocation(wx_object) {
    const latitude = wx_object.latitude // （必填） 纬度，浮点数，范围为90 ~ -90
    const longitude = wx_object.longitude // （必填）经度，浮点数，范围为180 ~ -180
    // TODO: 5~18 转换为 1~28
    const scale = wx_object.latitude || 28 // 地图缩放级别,整形值,范围从1~28。默认为最大【小程序：缩放比例，范围5~18】
    const name = wx_object.name // 位置名
    const address = wx_object.address // 地址详情说明
    const infoUrl = wx_object.infoUrl // * 在查看位置界面底部显示的超链接,可点击跳转
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete

    try {
      let errorInfo = ''
      let hasError = false
      const onekit_global = {}
      if (typeof latitude !== 'number') {
        errorInfo =
          String.format(onekit_global.error_head, 'openLocation') +
          String.format(onekit_global.error_body, 'latitude', 'Number', typeof longitude)
        hasError = true
      } else if (!longitude) {
        // TODO: 无法进入这里判断
        errorInfo += String.format(onekit_global.error_body, 'longitude', 'Number')
        hasError = true
      }
      if (hasError) {
        throw new Error(errorInfo)
      }
    } catch (error) {
      console.error(error.message)
    }

    // INFO: success 会返回 res , fail 和 complete 不会返回
    this.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
      scale: scale,
      infoUrl: infoUrl,
      success: function (res) {
        if (wx_success) {
          wx_success(res)
        }
      },
      fail: function () {
        wx_fail()
      },
      complete: function () {
        if (wx_complete) {
          wx_complete()
        }
      },
    })
  }

  onLocationChange() {}

  offLocationChange() {}

  getLocation(options) {
    // const type = options.type
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    this._mapinit()
    PROMISE(SUCCESS => {

      window.addEventListener("load", () => {
        const mapObj = new AMap.Map('iCenter')
        mapObj.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation()
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete => {
            const resu = {
              accuracy: onComplete.accuracy,
              altitude: onComplete.accuracy,
              city: onComplete.addressComponent.city,
              errMsg: 'getLocation: ok',
              horizonralAccuracy: onComplete.accuracy,
              latitude: onComplete.position.lat,
              longitude: onComplete.position.lng,
              speed: onComplete.status,
              verticalAccuracy: onComplete.accuracy
            }
            SUCCESS(resu)

          })
          AMap.event.addListener(geolocation, 'error', onError)
        })
      })
    }, success, fail, complete)
  }

  choosePoi() {}

  chooseLocation() {}

  ///////////////// 转发 ////////////////////////////
  updateShareMenu() {}

  showShareMenu() {}

  showShareImageMenu() {}

  onCopyUrl() {}

  offCopyUrl() {}

  hideShareMenu() {}

  getShareInfo() {}

  authPrivateMessage() {}


  ///////////////////// 文件  //////////////////////
  saveFileToDisk() {}

  saveFile(options) {
    const tempFilePath = options.tempFilePath
    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null
    //
    PROMISE(SUCCESS => {
      const blob = this.fn_global().TEMP[tempFilePath]
      const filename = blob.type
      const savedFilePath = TheKit.createUserPath(filename)
      this.fn_global().FSO[savedFilePath] = blob
      this.fn_global().FSO[`${savedFilePath}_current_time`] = new Date().getTime()
      this.fn_global().FSO[`${savedFilePath}_size`] = blob.size
      const saveFile = {
        currentTime: this.fn_global().FSO[`${savedFilePath}_current_time`],
        filePath: savedFilePath,
        size: this.fn_global().FSO[`${savedFilePath}_size`]
      }
      this.fn_global().FSO_LIST_.push(saveFile)
      const res = {
        errMsg: 'saveFile: ok',
        savedFilePath: savedFilePath || filePath
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  removeSavedFile(options) {
    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null
    this.getFileSystemManager(this.fn_global()).removeSavedFile({
      filePath,
      success,
      fail,
      complete
    })
  }

  openDocument(options) {
    const filePath = options.filePath
    const fileType = options.fileType
    const fileName = options.fileName
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null
    PROMISE(SUCCESS => {
      const docContainer = document.createElement('a')
      docContainer.setAttribute('href', filePath)
      docContainer.setAttribute('download', fileName)
      docContainer.setAttribute('type', fileType)
      docContainer.click()
      const res = {
        errMsg: 'openDocument: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  getSavedFileList(options) {
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null
    this.getFileSystemManager(this.fn_global()).getSavedFileList({
      success,
      fail,
      complete
    })
  }

  getSavedFileInfo() {}

  getFileSystemManager() {
    return new FileSystemManager(this.fn_global())
  }

  getFileInfo(options) {
    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null
    this.getFileSystemManager(this.fn_global()).getFileInfo({
      filePath,
      success,
      fail,
      complete
    })
  }

  //////////////////// 设备 ////////////////////
  /** Wi-Fi */
  stopWiFi() {}

  startWiFi() {}

  setWiFiList() {}

  onWiFiConnected() {}

  onGetWiFiList() {}

  offWifiConnected() {}

  getWiFiList() {}

  getConnectedWifi(options) {
    console.warn('h5 is not support getConnectedWifi')
  }

  connectWiFi() {}

  /** NFC */
  stopHCE() {}
  startHCE() {}
  sendHCEMessage() {}
  onHCEMessage() {}
  offHCEMessage() {}
  getNFCAdapter() {
    return new NFCAdapter()
  }
  getHCEState() {}

  /** 日历 */
  addPhoneRepeatCalendar() {}
  addPhoneCalendar() {}

  /** 联系人 */
  chooseContact() {}
  addPhoneContact() {}

  /** 无障碍 */
  checkIsOpenAccessibility() {}

  /** 低功耗蓝牙 */
  writeBLECharacteristicValue() {}

  setBLEMTU() {}

  readBLECharacteristicValue() {}

  onBLEConnectionStateChange() {}

  onBLECharacteristicValueChange() {}

  offBLEConnectionStateChange() {}

  offBLECharacteristicValueChange() {}

  notifyBLECharacteristicValueChange() {}

  makeBluetoothPair() {}

  getBLEDeviceServices() {}

  getBLEDeviceRSSI() {}

  getBLEDeviceCharacteristics() {}

  createBLEConnection() {}

  closeBLEConnection() {}


  /** 蓝牙 */
  openBluetoothAdapter() {}

  closeBluetoothAdapter() {}

  getBluetoothAdapterState() {}

  onBluetoothAdapterStateChange() {}

  startBluetoothDevicesDiscovery() {}

  stopBluetoothDevicesDiscovery() {}

  getBluetoothDevices() {}

  getConnectedBluetoothDevices() {}

  onBluetoothDeviceFound() {}
  //////////////////// 地理位置 ////////////////////

  _mapinit() {
    const map_sdk = `https://webapi.amap.com/maps?v=1.4.15&key=${config.map.key}`
    const jsapi = document.createElement('script')
    jsapi.src = map_sdk
    document.head.appendChild(jsapi)
    window.addEventListener('load', () => {
      const map_ui = '//webapi.amap.com/ui/1.1/main.js?v=1.1.1'
      const jsuiapi = document.createElement('script')
      jsuiapi.src = map_ui
      document.head.appendChild(jsuiapi)
    })
    // document.head.removeChild(jsapi)
  }

  // chooseLocation(options) {
  //   const {latitude, longitude, success, fail, complete} = options
  //   PROMISE(SUCCESS => {
  //     this._mapinit()
  //     const map_container = document.createElement('div')
  //     map_container.setAttribute('style', 'height:100vh;width:100vw;')
  //     map_container.setAttribute('id', 'onekitmap-container')
  //     document.body.appendChild(map_container)
  //     const map = new AMap.Map('onekitmap-container', {
  //       resizeEnable: true,
  //       zoom: 16,
  //       center: [longitude, latitude]
  //     })
  //     const center_maker = new AMap.Marker({
  //       position: map.getCenter(),
  //       draggable: true,
  //       cursor: 'move',
  //       // 设置拖拽效果
  //       raiseOnDrag: true
  //     })

  //     center_maker.setMap(map)
  //     map.getCenter(res => {
  //       console.log(res)
  //     })
  //     center_maker.on('dragend', res => {
  //       const {lng, lat} = res.lnglat
  //       map.setCenter([lng, lat])
  //       // AMap.event.addListener(geolocation, 'complete', onComplete => {
  //         const geoCoder = new AMap.geoCoder({
  //           city: ''
  //         })

  //        geoCoder.getAddress([lng, lat], (status, result) => {
  //          console.log(status, result)
  //        })
  //         const resu = {
  //           errMsg: 'getLocation: ok',
  //           latitude: onComplete.position.lat,
  //           longitude: onComplete.position.lng,
  //           address: '',
  //           address
  //         }
  //         SUCCESS(resu)

  //       // })
  //     })
  //     const res = {

  //     }
  //     SUCCESS(res)
  //   }, success, fail, complete)
  // }


  //////////////////// 设备 ////////////////////////
  getNetworkType(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null

    PROMISE(SUCCESS => {
      const connectionInfo = navigator.connection
      const networkType = connectionInfo.effectiveType
      const res = {
        networkType
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  onNetworkStatusChange(callback) {
    const connection = navigator.connection
    const connectionInfo = {}
    connectionInfo.isOnline = true
    connectionInfo.networkType = connection.type || 'unknown'
    connection.addEventListener('change', () => {
      if (connection.type === 'cellular') {
        if (connection.rtt < 270) {
          connectionInfo.networkType = '4g'
        } else if (270 <= connection.rtt < 1400) {
          connectionInfo.networkType = '3g'
        } else if (1400 <= connection.rtt) {
          connectionInfo.networkType = '2g'
        } else {
          connectionInfo.networkType = 'unknown'
        }
      }
      if (!navigator.onLine) {
        connectionInfo.networkType = 'none'
        connectionInfo.isOnline = false
      }
      callback(connectionInfo)
    })
  }

  getWifiList(options) {
    options = null
    console.warn('h5 is not support getwifiList')
  }

  onGetWifiList(callback) {
    const errMsg = 'h5 is not support onGetWifiList'
    callback(errMsg)
  }

  offGetWifiList(callback) {
    const errMsg = 'h5 is not support offGetWifiList'
    callback(errMsg)
  }

  getSystemInfoSync() {
    try {
      const device_type = navigator.userAgent
      const md = new MobileDetect(device_type)
      const os = md.os()
      let model
      let system
      let platform
      switch (os) {
        case 'iOS':
          model = md.mobile()
          system = 'ios' + md.version('iPhone'),
            platform = 'ios'
          break
        case 'AndroidOS':
          system = 'Android ' + md.version('Android')
          model = md.mobile()
          platform = 'android'
          break
      }
      return {
        brand: 'www.onekit.cn',
        model: model,
        pixelRatio: window.devicePixelRatio,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        statusBarHeight: 20,
        language: window.navigator.language,
        version: '7.0',
        system: system,
        platform: platform,
        fontSizeSetting: 20,
        SDKVersion: '2.12.1',
        benchmarkLevel: 1,
        theme: 'light',
      }
    } catch (e) {
      throw new Error('getSystemInfoSync:fail')
    }
  }

  getSystemInfo(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    // ///////////////////////////
    PROMISE(SUCCESS => {
      const res = this.getSystemInfoSync()
      SUCCESS(res)
    }, success, fail, complete)
  }



  onAccelerometerChange(callback) {
    this.accleration = function _eventListener(e) {
      console.log(arguments[0])
      const accelerationdata = arguments[0].accelerationIncludingGravity
      let res = {
        x: accelerationdata.x,
        y: accelerationdata.y,
        z: accelerationdata.z
      }
      callback(res)
    }
    window.addEventListener('devicemotion', this.accleration, false)
  }

  startAccelerometer(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      if (!window.DeviceMotionEvent) throw Error('your browser is not support startAccelerometer')
      window.addEventListener('devicemotion', this.accleration, false)
      const res = {
        errMsg: 'startAccelerometer: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)

  }

  stopAccelerometer(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      window.removeEventListener('devicemotion', this.accleration, false)
      const res = {
        errMsg: 'stopAccelerometer: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  onCompassChange(callback) {
    this.compasschange_callback = function compassevent_callbak() {
      const duration = 360 - arguments[0].alpha
      callback(duration)
    }

    window.addEventListener('deviceorientation', this.compasschange_callback, false)
  }

  startCompass(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null

    PROMISE(SUCCESS => {
      window.addEventListener('deviceorientation', this.compasschange_callback, false)
      const res = {
        errMsg: 'startCompass: ok'
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  stopCompass(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      window.removeEventListener('deviceorientation', this.compasschange_callback, false)
      const res = {
        errMsg: 'stopCompass: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  makePhoneCall(options) {
    const {
      phoneNumber,
      success,
      fail,
      complete
    } = options

    PROMISE(SUCCESS => {
      location.href = 'tel:' + phoneNumber
      const res = {
        errMsg: 'makePhoneCall: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)

  }

  scanCode(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null

    PROMISE(SUCCESS => {
      const res = {
        errMsg: 'scanCode is not support now'
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  getClipboardData(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      function handler(event) {
        // event.clipboardData.setData('text/plain', "要进行复制的内容")
        const data = event.clipboardData.getClipboardData('Text')
        const res = {
          errMsg: 'getClipboardData: ok',
          data
        }
        SUCCESS(res)
      }
      document.addEventListener('copy', handler)
      document.execCommand('copy')


    }, success, fail, complete)
  }

  setClipboardData(options) {
    const {
      data,
      success,
      fail,
      complete
    } = options
    options = null

    PROMISE(SUCCESS => {
      function handler(event) {
        event.clipboardData.setData('text/plain', data)
        const res = {
          errMsg: 'setClipboardData: ok'
        }
        SUCCESS(res)
      }
      document.addEventListener('copy', handler)
      document.execCommand('copy')

    }, success, fail, complete)
  }

  setKeepScreenOn(options) {
    const {
      keepScreenOn,
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      const nosleep = new NoSleep()
      if (keepScreenOn) {
        nosleep.enable()
      } else {
        nosleep.disable()
      }
      const res = {
        errMsg: 'setKeepScreenOn: ok'
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  onUserCaptureScreen(callback) {
    this.captureScreen_callback = function event_captureScreen() {
      const key = arguments[0]
      if (key.altKey && key.key === 'a') {
        callback()
      }
      if (key.key == 's' && key.shiftKey) {
        callback()
      }
    }
    window.addEventListener('keyup', this.captureScreen_callback)
  }

  offUserCaptureScreen(callback) {
    window.removeEventListener('keyup', this.captureScreen_callback)
    callback()
  }

  getScreenBrightness(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      const userAgent = navigator.userAgent
      if (!userAgent.indexOf('Firefox') > -1) throw Error('your browser is not suppport getScreenBrightness')
      window.addEventListener('devicelight', e => {
        const res = {
          value: e.value / 1000,
          errMsg: 'getScreenBrightness: ok'
        }

        SUCCESS(res)
      })

    }, success, fail, complete)
  }

  setScreenBrightness() {
    console.warn('h5 is not support setScreenBrightness')
  }

  vibrateShort(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
      if (!navigator.vibrate) throw Error('your browser is not support vibrateShort')
      const mobile = navigator.userAgent

      if (mobile.indexOf('Android') > -1 || mobile.indexOf('Linux') > -1) {
        window.navigator.vibrate(30)
      } else if (!!mobile.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        window.navigator.vibrate(15)
      } else {
        throw Error('Your phone is not smart phone')
      }

      const res = {
        errMsg: 'vibrateShort: ok'
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  vibrateLong(options) {
    const {
      success,
      fail,
      complete
    } = options
    options = null
    PROMISE(SUCCESS => {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
      if (!navigator.vibrate) throw Error('your browser is not support vibrateLong')
      window.navigator.vibrate(400)
      const res = {
        errMsg: 'vibrateShort: ok'
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  onMemoryWarning(callback) {
    function _sourceful() {
      if (!window.performance.memory) throw Error('your browser is not support onMemoryWarning')
      const res = {}
      res.level = 1
      const memoryInfo = window.performance.memory
      const totalJSHeapSize = memoryInfo.totalJSHeapSize
      const usedJSHeapSize = memoryInfo.usedJSHeapSize
      const remainJsHeapSize = totalJSHeapSize - usedJSHeapSize
      const MEMORY_MODERATE = totalJSHeapSize * 0.15
      const MEMORY_LOW = totalJSHeapSize * 0.1
      const MEMORY_CRITICAL = totalJSHeapSize * 0.05
      if (MEMORY_LOW < remainJsHeapSize <= MEMORY_MODERATE) {
        res.level = 5
      } else if (MEMORY_CRITICAL < remainJsHeapSize <= MEMORY_LOW) {
        res.level = 10
      } else if (remainJsHeapSize <= MEMORY_CRITICAL) {
        res.level = 15
      } else {
        res.level = ''
      }
      callback(res)
    }

    performance.onresourcetimingbufferful = _sourceful
  }

  /////////////////////////////////////////////////

  // BackgroundAudioManager

  // LivePusher

  // share

  getSavedFileList() {}



  removeSavedFile() {}


  login() {
    const weiXdeng = document.createElement('button')
    weiXdeng.setAttribute('id', 'weiXingDeng')
    weiXdeng.setAttribute('style', 'width:80%margin:20px 0 0 10%')
    weiXdeng.setAttribute('onclick', 'OpenInterface.weixinDian()')
    weiXdeng.innerText = '微信登录'
    const firstDian = document.body.firstChild
    document.body.insertBefore(weiXdeng, firstDian)
    const zhiFdeng = document.createElement('button')
    zhiFdeng.setAttribute('id', 'zhiFBDeng')
    zhiFdeng.setAttribute('style', 'width:80%margin:20px 0 0 10%')
    zhiFdeng.setAttribute('onclick', 'OpenInterface.zhiFBDian()')
    zhiFdeng.innerText = '支付宝登录'
    document.body.appendChild(zhiFdeng)
    const weiBdeng = document.createElement('button')
    weiBdeng.setAttribute('id', 'weiBoDeng')
    weiBdeng.setAttribute('style', 'width:80%margin:20px 0 0 10%')
    weiBdeng.setAttribute('onclick', 'OpenInterface.weiBoDian()')
    weiBdeng.innerText = '微博登录'
    document.body.appendChild(weiBdeng)
    const QQdeng = document.createElement('button')
    QQdeng.setAttribute('id', 'QQDeng')
    QQdeng.setAttribute('style', 'width:80%margin:20px 0 0 10%')
    QQdeng.setAttribute('onclick', 'OpenInterface.QQDian()')
    QQdeng.innerText = 'QQ登录'
    document.body.appendChild(QQdeng)
  }
  weixinDian() {
    location.href =
      'https://open.weixin.qq.com/connect/qrconnect?appid=wx240ff52c65528fbb&scope=snsapi_login&redirect_uri=https%3A%2F%2Fwww.onekit.com%2Fpassport0%2Flogin%2FPlogin.php&state=' +
      Math.ceil(Math.random() * 1000) +
      '&login_type=jssdk&self_redirect=default'
  }
  zhiFBDian() {
    location.href =
      'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018030502321064&scope=auth_user&redirect_uri=https://www.onekit.com/passport/login/ZFlogin.php&state=' +
      Math.ceil(Math.random() * 1000)
  }
  weiBoDian() {
    location.href =
      'https://api.weibo.com/oauth2/authorize?client_id=1741134067&redirect_uri=https%3A%2F%2Fwww.onekit.cn%2Fpassport0%2Flogin%2FWBlogin%2FWlogin.php&response_type=code'
  }
  QQDian() {
    location.href =
      'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101475870&redirect_uri=https://www.onekit.cn/passport0/login/QQlogin.php&state=' +
      Math.ceil(Math.random() * 1000)
  }

  checkSession() {}

  reportMonitor() {}

  reportAnalytics() {

  }

  requestPayment(wx_object) {
    // 小程序参数
    const timestamp = wx_object.timestamp // 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
    const nonceStr = wx_object.nonceStr // 随机字符串，长度为32个字符以下
    const package_s = wx_object.package // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***（ package 为js关键词，所以取名为 package_s ）
    const signType = wx_object.signType // 签名算法
    const paySign = wx_object.paySign // 签名
    const wx_success = wx_object.success || ''
    const wx_fail = wx_object.fail || ''
    const wx_complete = wx_object.complete || ''
    //
    const res = {}
    this.chooseWXPay({
      // JS-SDK参数
      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: package_s, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign, // 支付签名
      success: wx_success(res),
      fail: wx_fail(res),
      complete: wx_complete(res),
    })
  }


  openSetting() {}

  getSetting() {}

  // Address

  addCard(wx_object) {
    const cardList = wx_object.cardList
    const wx_success = wx_object.success || ''
    const wx_fail = wx_object.fail || ''
    const wx_complete = wx_object.complete || ''
    // ///////////////////////////////
    this.openCard({
      cardList: cardList, // 需要添加的卡券列表
      success: wx_success,
      fail: wx_fail,
      complete: wx_complete,
    })
  }

  openCard(wx_object) {
    const cardList = wx_object.cardList
    const wx_success = wx_object.success || ''
    const wx_fail = wx_object.fail || ''
    const wx_complete = wx_object.complete || ''
    // ///////////////////////////////
    this.openCard({
      cardList: cardList, // 需要打开的卡券列表
      success: wx_success,
      fail: wx_fail,
      complete: wx_complete,
    })
  }

  checkIsSupportSoterAuthentication() {}

  startSoterAuthentication() {}

  checkIsSoterEnrolledInDevice() {}

  getWeRunData() {}

  // 小程序和 JS-SDK 都有 iBeacon 的实现，但是貌似不一样
  startBeaconDiscovery() {
    // let uuids = wx_object.uuids
    // let ignoreBluetoothAvailable = wx_object.ignoreBluetoothAvailable
    // let wx_success = wx_object.success
    // let wx_fail = wx_object.success
    // let wx_complete = wx_object.success
    // //////////////////////////////
    // this.startSearchBeacons({
    //   ticket: '', //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
    //   complete: function(argv) {
    //     //开启查找完成后的回调函数
    //   }
    // })
  }

  stopBeaconDiscovery() {}

  getBeacons() {}

  onBeaconUpdate() {}

  onBeaconServiceChange() {}



  

  // TODO: 未改未测试
  // HACK: 应该不能通过web方式实现
  addPhoneContact(wx_object) {
    const phoneNumber = wx_object.phoneNumber
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    let wx_res
    try {
      const oDiv = document.createElement('div')
      oDiv.innerHTML = '<a  id=\'biaoDown\' href=\'#\' style=\'display: none\'></a>'
      console.log(oDiv)
      document.body.appendChild(oDiv)
      const Url2 = document.getElementById('biaoDown')
      Url2.setAttribute('href', 'wtai://wp/ap' + phoneNumber + '')
      wx_res = {}
      if (wx_success) {
        wx_success(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    } catch (e) {
      wx_res = {
        errMsg: e.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  getBatteryInfo(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.success
    const wx_complete = wx_object.success
    // ////////////////////////////
    try {
      const wx_res = {}
      navigator.getBattery().then(function (battery) {
        wx_res.errMsg = 'getBatteryInfo:ok'
        wx_res.level = battery.level * 100
        wx_res.isCharging = battery.charging
      })
      if (wx_success) {
        wx_success(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    } catch (error) {
      const wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  getBatteryInfoSync(wx_object) {
    const wx_success = wx_object.success
    const wx_fail = wx_object.success
    const wx_complete = wx_object.success
    // ////////////////////////////
    try {
      const wx_res = {}
      navigator.getBattery().then(function (battery) {
        wx_res.errMsg = 'getBatteryInfoSync:ok'
        wx_res.level = battery.level * 100
        wx_res.isCharging = battery.charging
      })
      if (wx_success) {
        wx_success(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    } catch (error) {
      const wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  captureScreen() {
    html2canvas(document.body).then(function (canvas) {
      // let ctx = cas.getContext('2d')
      // canvas.width = 100, canvas.height = 100
      const dataURL = canvas.toDataURL('image/png', 1)
      if (this.fn_global().Screen_callback) {
        const wx_res = {
          image: dataURL,
        }
        this.fn_global().Screen_callback(wx_res)
      }
    })
  }

  _callback(event) {
    if (this.fn_global().Accelerometer_callback) {
      const acceleration = event.accelerationIncludingGravity
      const wx_res = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z,
      }
      this.fn_global().Accelerometer_callback(wx_res)
    }
  }


  _deviceorientation(event) {
    if (this.fn_global().Compass_callback) {
      const wx_res = {
        direction: event.alpha,
        accuracy: 'unknown',
      }
      this.fn_global().Compass_callback(wx_res)
    }
  }

  startDeviceMotionListening(wx_object) {
    if (!wx_object) {
      wx_object = {}
    }
    //  let interval = wx_object.interval || 'normal' // 监听陀螺仪数据回调函数的执行频率
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    // /////////////////////////////
    let wx_res
    try {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', this.fn_global().DeviceMotion_callback, false)
        wx_res = {
          errMsg: 'startDeviceMotionListening:ok',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      } else {
        wx_res = {
          errMsg: 'startDeviceMotionListening:fail',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    } catch (error) {
      wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  stopDeviceMotionListening(wx_object) {
    if (!wx_object) {
      wx_object = {}
    }
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    // ///////////////////////////////
    let wx_res
    try {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', this.fn_global().DeviceMotion_callback, false)
        wx_res = {
          errMsg: 'stopDeviceMotionListening:ok',
        }
      } else {
        wx_res = {
          errMsg: 'stopDeviceMotionListening:fail',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    } catch (error) {
      wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  onDeviceMotionChange(callback) {
    this.fn_global().DeviceMotioncallback = callback
  }

  startGyroscope(wx_object) {
    if (!wx_object) {
      wx_object = {}
    }
    // let interval = wx_object.interval || 'normal' // 监听陀螺仪数据回调函数的执行频率
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    // /////////////////////////////
    let wx_res
    try {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('devicemotion', this.fn_global().Gyroscope_callback, false)
        wx_res = {
          errMsg: 'startGyroscope:ok',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      } else {
        wx_res = {
          errMsg: 'startGyroscope:fail',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    } catch (error) {
      wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  stopGyroscope(wx_object) {
    if (!wx_object) {
      wx_object = {}
    }
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.complete
    // ///////////////////////////////
    let wx_res
    try {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('devicemotion', this.fn_global().Gyroscope_callback, false)
        wx_res = {
          errMsg: 'stopGyroscope:ok',
        }
      } else {
        wx_res = {
          errMsg: 'stopGyroscope:fail',
        }
        if (wx_success) {
          wx_success(wx_res)
        }
        if (wx_complete) {
          wx_complete(wx_res)
        }
      }
    } catch (error) {
      wx_res = {
        errMsg: error.message,
      }
      if (wx_fail) {
        wx_fail(wx_res)
      }
      if (wx_complete) {
        wx_complete(wx_res)
      }
    }
  }

  onGyroscopeChange(callback) {
    this.fn_global().Gyroscopecallback = callback
  }

  scanItem() {}

  createWorker() {}

  getExtConfig() {}

  getExtConfigSync() {}

  createSelectorQuery() {
    const xsw_document = document
    xsw_document.select = function (wx_object) {
      const ThatBox = xsw_document.querySelector(wx_object)
      ThatBox.boundingClientRect = function (callback) {
        const Html = ThatBox.innerHTML
        const boundingClientRectArray = []
        boundingClientRectArray['id'] = ThatBox.getAttribute('id')
        boundingClientRectArray['left'] = ThatBox.getBoundingClientRect().left
        if (Html) {
          boundingClientRectArray['dataset'] = {
            Html,
          }
        } else {
          boundingClientRectArray['dataset'] = {}
        }
        boundingClientRectArray['right'] = ThatBox.getBoundingClientRect().right
        boundingClientRectArray['top'] = ThatBox.getBoundingClientRect().top
        boundingClientRectArray['bottom'] = ThatBox.getBoundingClientRect().bottom
        boundingClientRectArray['width'] = ThatBox.getBoundingClientRect().width
        boundingClientRectArray['height'] = ThatBox.getBoundingClientRect().height
        if (callback) {
          const objT = {}
          for (const x in boundingClientRectArray) {
            objT[x] = boundingClientRectArray[x]
          }
          callback.exec = function () {
            callback(objT)
          }
        }
        xsw_document.execPush(boundingClientRectArray)
        return callback
      }
      const Tarray = []
      ThatBox.scrollOffset = function (callback) {
        const Html = ThatBox.innerHTML
        Tarray['id'] = ThatBox.getAttribute('id')
        if (Html) {
          Tarray['dataset'] = {
            Html,
          }
        } else {
          Tarray['dataset'] = {}
        }
        Tarray['scrollTop'] = ThatBox.scrollTop
        Tarray['scrollLeft'] = ThatBox.scrollLeft
        if (callback) {
          const objT = new Object()
          for (const x in Tarray) {
            objT[x] = Tarray[x]
          }
          callback.exec = function () {
            callback(objT)
          }
        }
        xsw_document.execPush(Tarray)
        return callback
      }
      ThatBox.fields = function (wx_object, callback) {
        const id = wx_object.id
        const dataset = wx_object.dataset
        const rect = wx_object.rect
        const size = wx_object.size
        const scrollOffset = wx_object.scrollOffset
        const properties = wx_object.properties
        const fieldsArray = []
        if (id && id == true) {
          fieldsArray['id'] = ThatBox.getAttribute('id')
        }
        if (dataset && dataset == true) {
          const Html = ThatBox.innerHTML
          if (Html) {
            fieldsArray['dataset'] = {
              Html,
            }
          } else {
            fieldsArray['dataset'] = {}
          }
        }
        if (rect && rect == true) {
          fieldsArray['left'] = ThatBox.getBoundingClientRect().left
          fieldsArray['right'] = ThatBox.getBoundingClientRect().right
          fieldsArray['top'] = ThatBox.getBoundingClientRect().top
          fieldsArray['bottom'] = ThatBox.getBoundingClientRect().bottom
        }
        if (size && size == true) {
          fieldsArray['width'] = ThatBox.getBoundingClientRect().width
          fieldsArray['height'] = ThatBox.getBoundingClientRect().height
        }
        if (scrollOffset && scrollOffset == true) {
          fieldsArray['scrollTop'] = ThatBox.scrollTop
          fieldsArray['scrollLeft'] = ThatBox.scrollLeft
        }
        if (properties && properties instanceof Array == true) {
          for (let xx = 0; xx < properties.length; xx++) {
            fieldsArray[properties[xx]] = ThatBox.getAttribute(properties[xx])
          }
        }
        const objF = new Object()
        for (const x in fieldsArray) {
          objF[x] = fieldsArray[x]
        }
        callback.exec = function () {
          callback(objF)
        }
        return callback
      }
      return ThatBox
    }

    xsw_document.selectAll = function (wx_object) {
      const ThatBox = xsw_document.querySelectorAll(wx_object)
      ThatBox.boundingClientRect = function (callback) {
        const objArray = new Array()
        const boundingClientRectArray = []
        for (let xd = 0; xd < ThatBox.length; xd++) {
          const Html = ThatBox[xd].innerHTML
          boundingClientRectArray['id'] = ThatBox[xd].getAttribute('id')
          boundingClientRectArray['left'] = ThatBox[xd].getBoundingClientRect().left
          if (Html) {
            boundingClientRectArray['dataset'] = {
              Html,
            }
          } else {
            boundingClientRectArray['dataset'] = {}
          }
          boundingClientRectArray['right'] = ThatBox[xd].getBoundingClientRect().right
          boundingClientRectArray['top'] = ThatBox[xd].getBoundingClientRect().top
          boundingClientRectArray['bottom'] = ThatBox[xd].getBoundingClientRect().bottom
          boundingClientRectArray['width'] = ThatBox[xd].getBoundingClientRect().width
          boundingClientRectArray['height'] = ThatBox[xd].getBoundingClientRect().height
          const objT = new Object()
          for (const x in boundingClientRectArray) {
            objT[x] = boundingClientRectArray[x]
          }
          objArray.push(objT)
        }
        if (callback) {
          callback.exec = function () {
            callback(objArray)
          }
        }
        xsw_document.execPush(objArray)
        return callback
      }
      ThatBox.scrollOffset = function (callback) {
        const objTArray = new Array()
        const Tarray = []
        for (let xd = 0; xd < ThatBox.length; xd++) {
          const Html = ThatBox[xd].innerHTML
          Tarray['id'] = ThatBox[xd].getAttribute('id')
          if (Html) {
            Tarray['dataset'] = {
              Html,
            }
          } else {
            Tarray['dataset'] = {}
          }
          Tarray['scrollTop'] = ThatBox[xd].scrollTop
          Tarray['scrollLeft'] = ThatBox[xd].scrollLeft
          const objT = new Object()
          for (const x in Tarray) {
            objT[x] = Tarray[x]
          }
          objTArray.push(objT)
        }
        if (callback) {
          callback.exec = function () {
            callback(objTArray)
          }
        }
        xsw_document.execPush(objTArray)
        return callback
      }
      ThatBox.fields = function (wx_object, callback) {
        const objTTArray = new Array()
        const fieldsArray = []
        for (let xd = 0; xd < ThatBox.length; xd++) {
          const id = wx_object.id
          const dataset = wx_object.dataset
          const rect = wx_object.rect
          const size = wx_object.size
          const scrollOffset = wx_object.scrollOffset
          const properties = wx_object.properties
          if (id && id == true) {
            fieldsArray['id'] = ThatBox[xd].getAttribute('id')
          }
          if (dataset && dataset == true) {
            const Html = ThatBox[xd].innerHTML
            if (Html) {
              fieldsArray['dataset'] = {
                Html,
              }
            } else {
              fieldsArray['dataset'] = {}
            }
          }
          if (rect && rect == true) {
            fieldsArray['left'] = ThatBox[xd].getBoundingClientRect().left
            fieldsArray['right'] = ThatBox[xd].getBoundingClientRect().right
            fieldsArray['top'] = ThatBox[xd].getBoundingClientRect().top
            fieldsArray['bottom'] = ThatBox[xd].getBoundingClientRect().bottom
          }
          if (size && size == true) {
            fieldsArray['width'] = ThatBox[xd].getBoundingClientRect().width
            fieldsArray['height'] = ThatBox[xd].getBoundingClientRect().height
          }
          if (scrollOffset && scrollOffset == true) {
            fieldsArray['scrollTop'] = ThatBox[xd].scrollTop
            fieldsArray['scrollLeft'] = ThatBox[xd].scrollLeft
          }
          if (properties && properties instanceof Array == true) {
            for (let xx = 0; xx < properties.length; xx++) {
              fieldsArray[properties[xx]] = ThatBox[xd].getAttribute(properties[xx])
            }
          }
          const objF = new Object()
          for (const x in fieldsArray) {
            objF[x] = fieldsArray[x]
          }
          objTTArray.push(objF)
        }
        if (callback) {
          callback.exec = function () {
            callback(objTTArray)
          }
        }
        xsw_document.execPush(objTTArray)
        return callback
      }
      return ThatBox
    }

    xsw_document.selectViewport = function () {
      const selectBody = document.body
      selectBody.boundingClientRect = function (callback) {
        const boundingClientRectArrayA = []
        const Html = selectBody.innerHTML
        boundingClientRectArrayA['left'] = selectBody.getBoundingClientRect().left
        if (Html) {
          boundingClientRectArrayA['dataset'] = {
            Html,
          }
        } else {
          boundingClientRectArrayA['dataset'] = {}
        }
        boundingClientRectArrayA['right'] = selectBody.getBoundingClientRect().right
        boundingClientRectArrayA['top'] = selectBody.getBoundingClientRect().top
        boundingClientRectArrayA['bottom'] = selectBody.getBoundingClientRect().bottom
        boundingClientRectArrayA['width'] = selectBody.getBoundingClientRect().width
        boundingClientRectArrayA['height'] = selectBody.getBoundingClientRect().height
        if (callback) {
          const objT = new Object()
          for (const x in boundingClientRectArrayA) {
            objT[x] = boundingClientRectArrayA[x]
          }
          callback.exec = function () {
            callback(objT)
          }
        }
        xsw_document.execPush(boundingClientRectArrayA)
        return callback
      }
      const Sarray = []
      selectBody.scrollOffset = function (callback) {
        const Html = selectBody.innerHTML
        Sarray['id'] = selectBody.getAttribute('id')
        if (Html) {
          Sarray['dataset'] = {
            Html,
          }
        } else {
          Sarray['dataset'] = {}
        }
        Sarray['scrollTop'] = selectBody.scrollTop
        Sarray['scrollLeft'] = selectBody.scrollLeft
        if (callback) {
          const objT = new Object()
          for (const x in Sarray) {
            objT[x] = Sarray[x]
          }
          callback.exec = function () {
            callback(objT)
          }
        }
        xsw_document.execPush(Sarray)
        return callback
      }
      selectBody.fields = function (wx_object, callback) {
        const id = wx_object.id
        const dataset = wx_object.dataset
        const rect = wx_object.rect
        const size = wx_object.size
        const scrollOffset = wx_object.scrollOffset
        const properties = wx_object.properties
        const fieldsArrayA = []
        if (id && id == true) {
          fieldsArrayA['id'] = selectBody.getAttribute('id')
        }
        if (dataset && dataset == true) {
          const Html = selectBody.innerHTML
          if (Html) {
            fieldsArrayA['dataset'] = {
              Html,
            }
          } else {
            fieldsArrayA['dataset'] = {}
          }
        }
        if (rect && rect == true) {
          fieldsArrayA['left'] = selectBody.getBoundingClientRect().left
          fieldsArrayA['right'] = selectBody.getBoundingClientRect().right
          fieldsArrayA['top'] = selectBody.getBoundingClientRect().top
          fieldsArrayA['bottom'] = selectBody.getBoundingClientRect().bottom
        }
        if (size && size == true) {
          fieldsArrayA['width'] = selectBody.getBoundingClientRect().width
          fieldsArrayA['height'] = selectBody.getBoundingClientRect().height
        }
        if (scrollOffset && scrollOffset == true) {
          fieldsArrayA['scrollTop'] = selectBody.scrollTop
          fieldsArrayA['scrollLeft'] = selectBody.scrollLeft
        }
        if (properties && properties instanceof Array == true) {
          for (let xx = 0; xx < properties.length; xx++) {
            fieldsArrayA[properties[xx]] = selectBody.getAttribute(properties[xx])
          }
        }
        const objF = new Object()
        for (const x in fieldsArrayA) {
          objF[x] = fieldsArrayA[x]
        }
        callback.exec = function () {
          callback(objF)
        }
        return callback
      }
      return selectBody
    }

    const execArray = []
    xsw_document.execPush = function (callback) {
      const objT = new Object()
      for (const x in callback) {
        objT[x] = callback[x]
      }
      execArray.push(objT)
    }
    xsw_document.exec = function (callback) {
      callback(execArray)
    }
    return xsw_document
  }

  // TODO: 未测试
  // INFO: Network Information API 兼容性很差 (https://caniuse.com/#feat=netinfo) (https://developer.mozilla.org/zh-CN/docs/Web/API/Network_Information_API)

  createIntersectionObserver() {}

  createRewardedVideoAd() {}
  createInterstitialAd() {}

  color() {} // canvas
  ble() {}
  fileSystem() {}
  livePlayer() {}
  livePusher() {}
  mediaContainer() {}
  accountInfo() {}
  chooseAddress() {}
  authorize() {}
  chooseInvoiceTitle() {}
  chooseInvoice() {}
  navigateToMiniProgram() {}
  navigateBackMiniProgram() {}
  UserInfo() {}
  getUserInfo() {}



  onKeyboardHeightChange() {
    console.warn('onKeyboardHeightChange are not currently supported')
  }

  offKeyboardHeightChange() {
    console.warn('offKeyboardHeightChange are not currently supported')
  }

  hideKeyboard() {
    console.warn('offKeyboardHeightChange are not currently supported')
  }

  getSelectedTextRange() {
    console.warn('getSelectedTextRange are not currently supported')
  }

  getMenuButtonBoundingClientRect() {
    console.warn('getMenuButtonBoundingClientRect are not currently supported')
  }

  setTopBarText() {
    console.warn('setTopBarText are not currently supported ')
  }

  nextTick(callback) {
    this.fn_global.$nextTick(callback)
  }

  setWindowSize() {
    console.warn('setWindowSize are not currently supported!')
  }

  onWindowResize() {
    console.warn('onWindowResize are not currently supported')
  }

  offWindowResize() {
    console.warn('offWindowResize are not currently supported')
  }
  appHide_callback() {
    let wx_res
    if (document.hidden) {
      wx_res = {
        errMsg: 'onAppHide:ok',
        path: location.href,
        query: {},
        referrerInfo: {},
        scene: 0,
        shareTicket: undefined,
      }
      if (Event.callback) {
        Event.callback(wx_res)
      }
    }
  }

  error_callback(e) {
    if (e) {
      if (Event.callback) {
        Event.callback(e.error)
      }
    }
  }


  setRealtimeManager() {

  }
  setLogManager() {

  }
}
