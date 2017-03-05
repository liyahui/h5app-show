<template>
  <transition :name="transitionName">
    <div class="page" :style="pageStyle" v-show="show">
    	<widget
        v-for="widget in data.widgets"
        :data="widget"
        :key="`${data.id}-${widget.id}`"
        :play="show">
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
  			default: 'scroll'
  		},
      action: {
        type: String,
        default: ''
      }
  	},
    components: {
      widget
    },
    computed: {
      pageStyle() {
        return {
          backgroundColor: this.data.background.color,
          backgroundImage: `url(${this.data.background.image})`
        }
      },
      transitionName() {
        return `${this.direction}-${this.effect}-${this.action}`
      }
    }
  }
</script>

<style lang="scss">
	.page {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  $pageTransitionDuration: 0.5s;

  @keyframes verticalScrollInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }

    to {
      transform: none;
    }
  }

  @keyframes verticalScrollOutUp {
    from {
      transform: none;
    }

    to {
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes verticalScrollInDown {
    from {
      transform: translate3d(0, -100%, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes verticalScrollOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(0, 100%, 0);
    }
  }

  .vertical-scroll-next-enter-active {
    animation: verticalScrollInUp $pageTransitionDuration;
  }

  .vertical-scroll-next-leave-active {
    animation: verticalScrollOutUp $pageTransitionDuration;
  }

  .vertical-scroll-prev-enter-active {
    animation: verticalScrollInDown $pageTransitionDuration;
  }

  .vertical-scroll-prev-leave-active {
    animation: verticalScrollOutDown $pageTransitionDuration;
  }

  @keyframes horizontalScrollInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }

    to {
      transform: none;
    }
  }

  @keyframes horizontalScrollOutLeft {
    from {
      transform: none;
    }

    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes horizontalScrollInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }

    to {
      transform: none;
    }
  }

  @keyframes horizontalScrollOutRight {
    from {
      transform: none;
    }

    to {
      transform: translate3d(100%, 0, 0);
    }
  }

  .horizontal-scroll-next-enter-active {
    animation: horizontalScrollInRight $pageTransitionDuration;
  }

  .horizontal-scroll-next-leave-active {
    animation: horizontalScrollOutLeft $pageTransitionDuration;
  }

  .horizontal-scroll-prev-enter-active {
    animation: horizontalScrollInLeft $pageTransitionDuration;
  }

  .horizontal-scroll-prev-leave-active {
    animation: horizontalScrollOutRight $pageTransitionDuration;
  }
</style>
