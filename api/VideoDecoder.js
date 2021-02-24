export default class VideoDecoder {
  
  getFrameData() {}
  
  off() {}
  
  on() {}
  
  remove() {}
  
  seek() {}
  
  start(wx_object) {
    const {source, mode } = wx_object
    console.log(source, mode)
  }
  
  stop() {}
}