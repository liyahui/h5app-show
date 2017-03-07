<template>
  <div class="music" :class="classNames" @click="toggle">
  	<i class="iconfont icon-music"></i>
  	<audio :src="data.url" preload="auto" ref="music" loop></audio>
  </div>
</template>

<script>
  export default {
  	props: {
  		data: {
  			type: Object,
  			required: true
  		}
  	},
  	computed: {
  		classNames() {
  			return {
  				'is-play': this.isPlay
  			}
  		}
  	},
  	methods: {
  		play() {
  			this.$refs.music && this.$refs.music.play()
  		},
  		pause() {
  			this.$refs.music && this.$refs.music.pause()
  		},
  		toggle() {
  			this.isPlay ? this.pause() : this.play()
  		},
  		startPlay() {
  			this.isPlay = true
  			document.removeEventListener('touchstart', this.touchstartPlay, false)
  		},
  		pausePlay() {
  			this.isPlay = false
  		},
  		touchstartPlay() {
  			if (this.complete && !this.isPlay) {
  				this.play()
  			}
  		},
  		init() {
  			this.play()
  			document.addEventListener('touchstart', this.touchstartPlay, false)
				window.WeixinJSBridge && window.WeixinJSBridge.invoke('getNetworkType', {}, e => {
					!this.isPlay && this.play()
				})
  		}
  	},
  	data() {
  		return {
  			isPlay: false
  		}
  	},
  	mounted() {
  		this.$refs.music.addEventListener('play', this.startPlay, false)
  		this.$refs.music.addEventListener('pause', this.pausePlay, false)
  		this.init()
  	}
  }
</script>

<style lang="scss">
	.music {
		position: absolute;
		z-index: 99;
		color: #fff;
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
		border: 2px solid #fff;
		text-align: center;
		font-size: 1rem;
		right: 8px;
		top: 8px;

		.icon-music {
			margin-top: 0.25rem;
			display: inline-block;
		}

		&.is-play {
			animation: rotateEast 1s linear infinite;
		}
	}
</style>
