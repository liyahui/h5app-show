const userAgent = window.navigator.userAgent.toLowerCase()

// 编辑器视口宽高
export const VIEWPORT_WIDTH = 320
export const VIEWPORT_HEIGHT = 504

// 是否微信
export const isWechat = userAgent.indexOf('micromessenger') !== -1

export const API_HOST = process.env.NODE_ENV === 'production' ? 'http://liyahui.cn:8888' : 'http://192.168.99.175:8888'

// 图片加载进度
export const loadImages = (list = [], options) => {
  let defaults = {
    directory: '',
    progress: () => {},
    complete: () => {},
    onerror: () => {}
  }
  options = Object.assign({}, defaults, options)

  if (options.directory && !options.directory.endsWith('/')) {
    options.directory += '/'
  }

  if (!list.length) {
    options.progress(100)
    options.complete()
    return
  }

  let current = 0

  let computed = () => {
    let num = parseInt(current / list.length * 100)
    options.progress(num)

    if (num === 100) {
      options.complete()
    }
  }

  computed()

  list.forEach((item, index) => {
    var img = new Image()
    img.src = options.directory + list[index]

    img.onload = () => {
      current++
      computed()
    }

    img.onerror = () => {
      current++
      computed()
      options.onerror(img.src)
    }
  })
}

// 微信 js 动态修改网页标题
export const changeTitle = title => {
  if (!isWechat) {
    document.title = title
    return
  }

  setTimeout(function() {
    document.title = title

    const iframe = document.createElement('iframe')
    iframe.src = '/favicon.ico'
    iframe.style.visibility = 'hidden'
    iframe.style.width = '1px'
    iframe.style.height = '1px'

    iframe.onload = function() {
      setTimeout(function() {
        document.body.removeChild(iframe)
      }, 0)
    }
    document.body.appendChild(iframe)
  }, 0)
}
