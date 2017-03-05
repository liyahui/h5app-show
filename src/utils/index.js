// 编辑器视口宽高
export const VIEWPORT_WIDTH = 320
export const VIEWPORT_HEIGHT = 504

// 自动增加 px 的 css 属性
export const autoPX = ['width', 'height', 'top', 'left', 'fontSize', 'borderRadius', 'borderWidth']

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
