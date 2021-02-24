<template>
  <div id="app">

  </div>
</template>

<script>
  import WX from '../../wx'
  import Vue from 'vue'
  const wx = new WX(Vue.prototype)
  export default {
    created() {
      const videoDecoder = wx.createVideoDecoder()
      videoDecoder.start({
        source: './assets/logo.png'
      })
    }
  }
</script>

<style>

</style>