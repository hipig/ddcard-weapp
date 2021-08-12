import Taro from "@tarojs/taro"

export default {
  data() {
    return {
      audioContext: null
    }
  },
  onHide() {
    this.audioContext = null
  },
  methods: {
    initAudioContext() {
      let audioContext = Taro.createInnerAudioContext()

      audioContext.onPlay(this.listenPlaying)
      audioContext.onEnded(this.listenEnded)
      this.audioContext = audioContext
    },
    listenPlaying() {
      Taro.eventCenter.trigger('eventPlaying')
    },
    listenEnded() {
      Taro.eventCenter.trigger('eventEnded')
    }
  }
}
