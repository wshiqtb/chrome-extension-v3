
// import path from 'path-browserify'

// 公共fetch功能
const fetchFile = async (url) => {
  const res = await fetch(url)
  const blob = await res.blob()
  const text = await blob.text()
  return { url, blob, text }
}

// 提取html文件
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

const getUrlsByReg = (file) => {
  const url = file.url
  const text = file.text
  console.log(1111, url)
  // const regs = [
  // /<script\s.*src="([^"]*)".*?><\/script>/ig
  // /<link\s.*href="([^"]*)".*?\/>/ig
  // /"[^"]+?\.js"/ig,
  // /"[^"]+?\.css"/ig,
  // /"[^"]+?\.(jp?eg|png|gif|svg)"/ig,
  // /'[^']+?\.(jp?eg|png|gif|svg)'/ig
  // ]
  const reg = /<script\s.*src="([^"]*)".*?><\/script>/g
  text.replaceAll(reg, '你好')
  // console.log(text.match(reg))
  // text.replace(reg, (a, b) => {
  //   console.log(11111, a, b)
  //   // childUrls.push(path.join(path.dirname(url), b))
  // })
  const urls = []
  // const urls = regs.reduce((urls, reg) => {
  //   const childUrls = []
  //   // console.log(text.match(reg))
  //   text.replace(reg, (a, b) => {
  //     console.log(11111, 1, b)
  //     // childUrls.push(path.join(path.dirname(url), b))
  //     return ''
  //   })
  //   // const matchRes = text.match(reg)
  //   // if (!matchRes) return urls
  //   // const childUrls = matchRes.map(matchUrl => {
  //   //   const relativeUrl = matchUrl.slice(1, matchUrl.length - 1)
  //   //   const realUrl = path.join(path.dirname(url), relativeUrl)
  //   //   console.log(realUrl)
  //   //   return realUrl
  //   // })
  //   return urls.concat(childUrls)
  // }, [])

  return urls
}

const getSourceFiles = async (htmlUrls = []) => {
  let allUrls = []
  let allFileObjects = []

  const iteration = async (urls) => {
    // 去除重复的文件
    const filterUrls = urls.filter(url => !allUrls.includes(url))
    if (filterUrls.length === 0) return

    // 加载文件内容
    const tempFileObjects = await Promise.all(filterUrls.map(url => fetchFile(url)))

    // 加入全量列表
    allUrls = allUrls.concat(filterUrls)
    allFileObjects = allFileObjects.concat(tempFileObjects)

    let childUrls = []
    for (const file of tempFileObjects) {
      // 从非图片文件中提取其引用的文件
      if (!file.blob.type.startsWith('image/')) {
        childUrls = childUrls.concat(getUrlsByReg(file))
      }
    }

    // 子文件去重
    const uniqChildUrls = [...new Set(childUrls)]

    if (uniqChildUrls.length > 0) {
      await iteration(uniqChildUrls)
    }
  }

  await iteration(htmlUrls)
  return { allUrls, allFileObjects }
}

// // 提取资源文件
// const getSourceFiles = async (htmlList, reg) => {
//   const urls = htmlList.reduce((temp, curHtml) => {
//     const curPageUrls = []
//     curHtml.htmlStr.replace(reg, (a, b) => {
//       b && curPageUrls.push(b)
//       return a
//     })
//     return [...temp, ...curPageUrls]
//   }, [])

//   const uniqUrls = [...new Set(urls)]
//   const fileList = []
//   for (const url of uniqUrls) {
//     const res = await fetchFile(url)
//     const blob = await res.blob()
//     fileList.push({ url, blob })
//   }
//   return fileList
// }

// 上传文件
const upload = async (files) => {
  const fd = new FormData()
  fd.append('id', 'c96knikrtt7fqgprnn30')
  fd.append('origin', 'extension')
  files.forEach(file => {
    fd.append('files', file.blob, file.url)
  })
  return fetch('http://node01v.zgb.shyc3.qianxin-inc.cn:6789/api/v1/upload/', {
    method: 'post',
    body: fd
  })
}

// 程序入口
const start = async () => {
  // const coreUrls = [
  //   'plugins/sitemap/sitemap.js',
  //   'resources/images/caret_down.svg',
  //   'resources/images/close_x_minimize.svg',
  //   'resources/images/overflow-icon.svg',
  //   'resources/images/axure9_logo.svg',
  //   'plugins/sitemap/sitemap.js',
  //   'plugins/page_notes/page_notes.js',
  //   'plugins/debug/debug.js'
  // ]

  try {
    const htmlUrls = await getHtmls()
    const { allUrls, allFileObjects } = await getSourceFiles(htmlUrls)
    console.log('axhub - files', allUrls, allFileObjects)
    // const imgUrls = await getSourceFilesUrl(htmlList, /<img\s.*src="([^"]*)".*?\/>/g)
    // const jsUrls = await getSourceFilesUrl(htmlList, /<script\s.*src="([^"]*)".*?><\/script>/g)
    // const cssUrls = await getSourceFilesUrl(htmlList, /<link\s.*href="([^"]*)".*?\/>/g)

    // const sourceFileList = await getSourceFilesBlob([...new Set([...coreUrls, ...imgUrls, ...jsUrls, ...cssUrls])])

    // const fileList = [...htmlList, ...sourceFileList]
    // console.log('axhub - files', fileList)
    // await upload(allFileObjects)
    // 上传成功
    window.postMessage({ type: 'uploaded', data: { code: 1 } })
  } catch (error) {
    console.log(error)
    // 上传失败
    window.postMessage({ type: 'uploaded', data: { code: 0 } })
  }
}

// 启动
start()
