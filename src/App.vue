<template>
  <div id="app" :style="appStyle">
    <page
      v-for="page, index in app.pages"
      :show="pageIndex === index"
      :key="page.id"
      :data="page"
      :action="action"
      :z-index="pageZindex(index)"
      :direction="app.props.direction"
      :effect="app.props.effect"
      @change-page="changePage">
    </page>

    <loading 
      v-if="pageIndex === -1 && !message"
      :progress="progress">
    </loading>

    <message
      v-if="message"
      :text="message">
    </message>

    <arrow
      v-if="app.props"
      :direction="app.props.direction"
      :loop="app.props.loop"
      :last="pageIndex === app.pages.length - 1">
    </arrow>

    <music
      v-if="app.props && app.props.music.url && progress === 100"
      :data="app.props.music">
    </music>
  </div>
</template>

<script>
  /* eslint-disable */
  import { API_HOST, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, loadImages, changeTitle }  from 'utils'
  import axios from 'axios'
  import loading from 'components/loading'
  import page from 'components/page'
  import message from 'components/message'
  import arrow from 'components/arrow'
  import music from 'components/music'
  import Hammer from 'hammerjs'
  import queryString from 'query-string'

  axios.defaults.baseURL = API_HOST

  export default {
    components: {
      page,
      loading,
      message,
      arrow,
      music
    },
    computed: {
      appStyle() {
        const bgcolor = this.app.props ? this.app.props.bgcolor : ''

        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: bgcolor
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
        const params = queryString.parse(window.location.search, true)

        const res = await axios.get(`data/${params.id}.json`)

        if (res.data.code === 1) {
          this.message = res.data.message
        } else {
          this.app = res.data
          changeTitle(res.data.title || '未命名')

          this.loadAppImages()

          if (this.app.pages.length > 1) {
            this.listenSwipeEvent()
          }
        }
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

        if (this.app.props && this.app.props.direction === 'vertical') {
          app.on('swipeup', this.nextPage)
          app.on('swipedown', this.prevPage)
        }

        if (this.app.props && this.app.props.direction === 'horizontal') {
          app.on('swipeleft', this.nextPage)
          app.on('swiperight', this.prevPage)
        }
      },
      nextPage() {
        this.action = 'next'
        this.$nextTick(() => {
          if (this.pageIndex < this.app.pages.length - 1) {
            this.pageIndex++
          } else if (this.app.props.loop) {
            this.pageIndex = 0
          }
        })
      },
      prevPage() {
        this.action = 'prev'
        this.$nextTick(() => {
          if (this.pageIndex > 0) {
            this.pageIndex--
          } else if (this.app.props.loop) {
            this.pageIndex = this.app.pages.length - 1
          }
        })
      },
      pageZindex(index) {
        return this.action === 'next' ? index : this.app.pages.length - index
      },
      changePage(id) {
        // findIndex 在 Android 有兼容问题
        let targetIndex = -1

        this.app.pages.forEach((page, index) => {
          if (page.id === id) {
            targetIndex = index
          }
        })

        if (targetIndex === -1) return

        if (targetIndex > this.pageIndex) {
          this.action = 'next'
        }

        if (targetIndex < this.pageIndex) {
          this.action = 'prev'
        }

        this.pageIndex = targetIndex
      }
    },
    data() {
      return {
        app: {},
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        action: '',
        pageIndex: -1,
        progress: 0,
        message: ''
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

    .iconfont {
      font-size: inherit;
    }
  }

  .fade-enter-active {
    animation: fadeIn 0.3s;
  }

  .fade-leave-active {
    animation: fadeOut 0.3s;
  }
</style>
