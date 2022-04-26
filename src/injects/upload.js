
import path from 'path-browserify'

// 公共fetch功能
const fetchFile = async (url) => {
  const res = await fetch(url)
  if (res.status === 404) {
    return false
  }
  const blob = await res.blob()
  const text = await blob.text()
  return { url, blob, text }
}

// 提取html文件URL
const getHtmls = async () => {
  const iteration = (nodes) => {
    let _urls = []
    nodes.forEach(node => {
      if (node.url) {
        _urls = [..._urls, node.url]
      }
      if (node.children) {
        _urls = [..._urls, ...iteration(node.children)]
      }
    })

    return _urls
  }

  const urls = iteration($axure.document.sitemap.rootNodes)
  const coreUrls = ['index.html', 'start.html']
  return [...coreUrls, ...urls]
}

// 提取单个文件内引用的资源文件URL
const getUrlsByReg = (file) => {
  const url = file.url
  const text = file.text
  const regs = [
    /(?<=<script\s.*src=")[^"]*(?=".*?><\/script>)/ig,
    /(?<=<link\s.*href=")[^"]*\.css(?=".*?\/>)/ig,
    /(?<=<img\s.*src=")[^"]+?\.(svg|png|jpe?g)(?=".*?\/>)/ig,
    /(?<=background:\s.*?url\(('|")).+?.(svg|png|jpe?g)(?=('|")\))/ig
  ]
  const urls = regs.reduce((urls, reg) => {
    const matchRes = text.match(reg)
    if (!matchRes) return urls
    const childUrls = matchRes.map(matchUrl => {
      const realUrl = path.join(path.dirname(url), matchUrl)
      return realUrl
    })
    return urls.concat(childUrls)
  }, [])

  return urls
}

// 提取所有文件URL和文件内容
const getSourceFiles = async (htmlUrls = []) => {
  let allUrls = []
  let allFileObjects = []

  const iteration = async (urls) => {
    // 去除全局重复的文件
    let filterUrls = urls.filter(url => !allUrls.includes(url))
    if (filterUrls.length === 0) return

    // 加载文件内容
    let tempFileObjects = await Promise.all(filterUrls.map(url => fetchFile(url)))
    // 过滤404的文件
    filterUrls = filterUrls.filter((item, index) => tempFileObjects[index])
    tempFileObjects = tempFileObjects.filter(item => item)

    // 加入全量列表
    allUrls = allUrls.concat(filterUrls)
    allFileObjects = allFileObjects.concat(tempFileObjects)

    let childUrls = []
    for (const file of tempFileObjects) {
      // 不是图片，提取其引用的文件
      if (!file.blob.type.startsWith('image/')) {
        childUrls = childUrls.concat(getUrlsByReg(file))
      }
    }
    // urls的子文件去重
    const uniqChildUrls = [...new Set(childUrls)]

    if (uniqChildUrls.length > 0) {
      await iteration(uniqChildUrls)
    }
  }

  await iteration(htmlUrls)
  return { allUrls, allFileObjects }
}

// 程序入口
const start = async () => {
  // 内置文件URL
  const coreUrls = [
    'plugins/sitemap/sitemap.js',
    'plugins/page_notes/page_notes.js',
    'plugins/debug/debug.js'
  ]

  try {
    const htmlUrls = await getHtmls()
    // eslint-disable-next-line no-unused-vars
    const { allUrls, allFileObjects } = await getSourceFiles([...htmlUrls, ...coreUrls])
    // console.log('axhub - files', allUrls, allFileObjects)

    // 文件采集成功
    window.postMessage({ type: 'upload', data: { code: 1, data:allFileObjects } })
  } catch (error) {
    // 文件采集失败
    window.postMessage({ type: 'upload', data: { code: 0, data:null } })
  }
}

// 启动
start()
