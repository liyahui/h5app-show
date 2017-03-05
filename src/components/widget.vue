<template>
  <div class="widget" :style="widgetStyle">
  	<div class="inner" :style="innerStyle">
	  	<div 
	  		:class="data.type" 
	  		v-if="data.type === 'image'" 
	  		:style="{backgroundImage: `url(${data.url})`}">
  		</div>
	  	<div :class="data.type" v-if="data.type === 'text'">
				{{data.content}}
	  	</div>
  	</div>
  </div>
</template>

<script>
	/* eslint-disable */
	import { autoPX, VIEWPORT_WIDTH, VIEWPORT_HEIGHT }	from 'utils'
	import extend from 'extend'

  export default {
  	props: {
  		play: {
  			type: Boolean,
  			required: true
  		},
  		data: {
  			type: Object,
  			required: true
  		}
  	},
  	computed: {
  		widgetStyle() {
  			const style = {}

  			style.width = this.transformPercent(this.data.style.width, VIEWPORT_WIDTH)
  			style.left = this.transformPercent(this.data.style.left, VIEWPORT_WIDTH)
  			style.top = this.transformPercent(this.data.style.top, VIEWPORT_HEIGHT)

  			if (this.data.type === 'text') {
  				delete style.height
  			} else {
  				style.height = this.transformPercent(this.data.style.height, VIEWPORT_HEIGHT)
  			}

  			return style
  		},
  		innerStyle() {
  			const { width, height, left, top, ...style } = extend(true, {}, this.data.style)

  			style.fontSize = style.fontSize / 16 + 'rem'
  			style.borderWidth += 'px'
  			style.borderRadius += 'px'

  			const transform = style.transform
  			style.transform = `rotate(${transform.rotate}deg)`

  			return style
  		}
  	},
  	methods: {
  		transformPercent(a, b) {
  			return (a / b) * 100 + '%'
  		},
  		playAnimation() {
  			if (this.animationIndex < this.data.animations.length) {
          let animation = this.data.animations[this.animationIndex]
          let name = animation.name.replace('$1', animation.direction)
          let { duration, timing, delay, count } = animation
          count = count === 0 ? 'infinite' : count
          
          this.$el.style.animation = `${name} ${duration}s ${timing} ${delay}s ${count} both`
          this.animationIndex++
        }
  		},
      stopAnimation() {
        this.$el.style.animation = ''
      }
  	},
  	watch: {
  		play(val) {
        if (val) {
          this.animationIndex = 0
          this.playAnimation()
        } else {
          this.animationIndex = this.data.animations.length
          this.stopAnimation()
        }
  		}
  	},
  	data() {
  		return {
  			animationIndex: 0
  		}
  	},
  	mounted() {
  		this.$el.addEventListener('webkitAnimationEnd', this.playAnimation, false)
  	}
  }
</script>

<style lang="scss">
	.widget {
		position: absolute;

		.inner, .inner > div, img {
			width: 100%;
			height: 100%;
			display: block;
		}

		.text {
			padding: 0.3125rem 0.625rem;
		}

		.image {
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
</style>
