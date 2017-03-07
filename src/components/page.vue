<template>
  <transition :name="transitionName">
    <div class="page" :style="pageStyle" v-show="show">
    	<widget
        v-for="widget in data.widgets"
        :data="widget"
        :key="`${data.id}-${widget.id}`"
        :play="show"
        @change-page="$emit('change-page', $event)">
      </widget>
    </div>
  </transition>
</template>

<script>
  import widget from 'components/widget'

  export default {
  	props: {
      show: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
  		direction: {
  			type: String,
  			default: 'vertical'
  		},
  		effect: {
  			type: String,
  			default: 'slide'
  		},
      action: {
        type: String,
        default: ''
      },
      zIndex: {
        type: Number,
        required: true
      }
  	},
    components: {
      widget
    },
    computed: {
      pageStyle() {
        return {
          backgroundColor: this.data.background.color,
          backgroundImage: `url(${this.data.background.image})`,
          zIndex: this.zIndex
        }
      },
      transitionName() {
        const effect = this.data.effect || this.effect
        return `${this.direction}-${effect}-${this.action}`
      }
    }
  }
</script>

<style lang="scss">
	.page {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  $duration: 0.6s;
  @import '~assets/page/slide.scss';
  @import '~assets/page/fade.scss';
  @import '~assets/page/push.scss';
  @import '~assets/page/rotate.scss';
  @import '~assets/page/zoom.scss';
</style>
