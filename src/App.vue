<template>
  <div id="app" :style="appStyle">
    <page
      v-for="page, index in app.pages"
      :show="pageIndex === index"
      :key="page.id"
      :data="page"
      :action="action"
      :direction="app.extends.direction">
    </page>

    <loading 
      v-if="pageIndex === -1"
      :progress="progress">
    </loading>
  </div>
</template>

<script>
  /* eslint-disable */
  import { autoPX, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, loadImages }  from 'utils'
  import axios from 'axios'
  import loading from 'components/loading'
  import page from 'components/page'
  import Hammer from 'hammerjs'

  export default {
    components: {
      page,
      loading
    },
    computed: {
      appStyle() {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },

      images() {
        const list = []

        this.app.pages.forEach(page => {
          page.widgets.forEach(widget => {
            widget.type === 'image' && list.push(widget.url)
          })
        })

        return list
      }
    },
    methods: {
      screenAdapter() {
        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight

        if (width > height) {
          width = (height / VIEWPORT_HEIGHT) * VIEWPORT_WIDTH
        }

        document.querySelector('html').style.fontSize = (width / 20) + 'px'

        this.width = width
        this.height = height
      },
      async fetchAppData() {
        const res = await axios.get('http://localhost:8888/data/2.json')
        this.app = res.data

        document.title = res.data.title

        this.loadAppImages()
        this.listenSwipeEvent()
      },
      loadAppImages() {
        loadImages(this.images, {
          progress: value => {
            this.progress = value
          },
          complete: () => {
            setTimeout(() => {
              this.pageIndex = 0
            }, 300)
          }
        })
      },
      listenSwipeEvent() {
        const app = new Hammer(this.$el, {
          preventDefault: true,
          gesture: true
        })

        app.get('swipe').set({
          direction: Hammer.DIRECTION_ALL
        })

        if (this.app.extends && this.app.extends.direction === 'vertical') {
          app.on('swipeup', this.nextPage)
          app.on('swipedown', this.prevPage)
        }

        if (this.app.extends && this.app.extends.direction === 'horizontal') {
          app.on('swipeleft', this.nextPage)
          app.on('swiperight', this.prevPage)
        }
      },
      nextPage() {
        this.action = 'next'
        this.$nextTick(() => {
          if (this.pageIndex < this.app.pages.length - 1) {
            this.pageIndex++
          } else if (this.app.extends.loop) {
            this.pageIndex = 0
          }
        })
      },
      prevPage() {
        this.action = 'prev'
        this.$nextTick(() => {
          if (this.pageIndex > 0) {
            this.pageIndex--
          } else if (this.app.extends.loop) {
            this.pageIndex = this.app.pages.length - 1
          }
        })
      }
    },
    data() {
      return {
        app: {},
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        action: '',
        pageIndex: -1,
        progress: 0
      }
    },
    created() {
      this.fetchAppData()
    },
    mounted() {
      window.addEventListener('resize', this.screenAdapter, false)
      window.addEventListener('touchmove', e => e.preventDefault(), false)

      this.screenAdapter()
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  html {
    font-size: 16px;
  }

  body {
    background: #fafafa;
  }

  #app {
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }

  .fade-enter-active {
    animation: fadeIn 0.3s;
  }

  .fade-leave-active {
    animation: fadeOut 0.3s;
  }
</style>
