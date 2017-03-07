<template>
  <div 
    class="arrow"
    :class="classNames">
    <i class="iconfont icon-arrow"></i>
  </div>
</template>

<script>
  export default {
  	props: {
  		direction: {
  			type: String,
  			required: true
  		},
  		last: {
  			type: Boolean,
  			required: true
  		},
  		loop: {
  			type: Boolean,
  			required: true
  		}
  	},
  	computed: {
  		classNames() {
  			const names = [`${this.direction}-arrow`]

        names.push({
          'is-loop': this.loop,
          'is-last': this.last
        })

        return names
  		}
  	}
  }
</script>

<style lang="scss">
	@keyframes arrowAnimation {
    0%, 30% {
      opacity: 0;
      transform: translate(0, 10px);
    }

    60% {
      opacity: 1;
      transform: translate(0, 0);
    }

    100% {
      opacity: 0;
      transform: translate(0, -8px);
    }
  }

  .arrow {
    position: absolute;
    z-index: 99;
    font-size: 1.4rem;
    color: #fff;
    line-height: 1.4rem;

    &.is-last:not(.is-loop) {
      display: none;
    }

    .icon-arrow {
      display: block;
      animation: arrowAnimation 1.5s infinite ease-in-out;
    }
  }

  .vertical-arrow {
    left: 50%;
    bottom: 0.5rem;
    margin-left: -0.7rem;
  }

  .horizontal-arrow {
    right: 0.5rem;
    top: 50%;
    margin-top: -0.7rem;
    transform: rotate(-90deg);
  }
</style>
