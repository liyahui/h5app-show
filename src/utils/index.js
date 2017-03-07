// 编辑器视口宽高
export const VIEWPORT_WIDTH = 320
export const VIEWPORT_HEIGHT = 504

export const API_HOST = process.env.NODE_ENV === 'production' ? 'http://liyahui.cn:8888' : 'http://localhost:8888'

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
