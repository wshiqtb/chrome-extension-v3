
(function () {
  // 公共fetch功能
  const fetchFile = async (url) => {
    const res = await fetch(url)
    return res
  }

  // 提取html文件
  const getHtmls = async () => {
    let urls = ['index.html', 'start.html']
    const iteration = (nodes) => {
      nodes.forEach(node => {
        if (node.url) {
          urls = [...urls, node.url]
        }
        if (node.children) {
          iteration(node.children)
        }
      })
    }

    iteration($axure.document.sitemap.rootNodes)

    const htmlList = []
    for (const url of urls) {
      const res = await fetchFile(url)
      const htmlStr = await res.text()
      htmlList.push({
        url: url,
        htmlStr: htmlStr,
        blob: new Blob([htmlStr], { type: 'text/html' })
      })
    }

    return htmlList
  }

  // 提取资源文件URL
  const getSourceFilesUrl = (htmlList, reg) => {
    const urls = htmlList.reduce((temp, curHtml) => {
      const curPageUrls = []
      curHtml.htmlStr.replace(reg, (a, b) => {
        b && curPageUrls.push(b)
        return a
      })
      return [...temp, ...curPageUrls]
    }, [])

    return [...new Set(urls)]
  }

  // 获取资源文件内容
  const getSourceFilesBlob = async (urls) => {
    const fileList = []
    for (const url of urls) {
      const res = await fetchFile(url)
      const blob = await res.blob()
      const text = await blob.text()
      fileList.push({ url, blob, text })
    }
    return fileList
  }

  // 提取资源文件
  const getSourceFiles = async (htmlList, reg) => {
    const urls = htmlList.reduce((temp, curHtml) => {
      const curPageUrls = []
      curHtml.htmlStr.replace(reg, (a, b) => {
        b && curPageUrls.push(b)
        return a
      })
      return [...temp, ...curPageUrls]
    }, [])

    const uniqUrls = [...new Set(urls)]
    const fileList = []
    for (const url of uniqUrls) {
      const res = await fetchFile(url)
      const blob = await res.blob()
      fileList.push({ url, blob })
    }
    return fileList
  }

  // 上传文件
  const upload = async (files) => {
    // for (const file of files) {
    //   const fd = new FormData()
    //   fd.append('id', 'c96knikrtt7fqgprnn30')
    //   fd.append('files', file.blob, file.url)
    //   console.log(11111, '开始上传', file.url)
    //   const res = await fetch('http://node01v.zgb.shyc3.qianxin-inc.cn:6789/api/v1/upload/', {
    //     method: 'post',
    //     body: fd
    //   })

    //   console.log(11111, '上传完成', file.url, res)
    // }

    // return true

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
    const coreUrls = [
      'plugins/sitemap/sitemap.js',
      'resources/images/caret_down.svg',
      'resources/images/close_x_minimize.svg',
      'resources/images/overflow-icon.svg',
      'resources/images/axure9_logo.svg',
      'plugins/sitemap/sitemap.js',
      'plugins/page_notes/page_notes.js',
      'plugins/debug/debug.js'
    ]

    try {
      const htmlList = await getHtmls()
      const imgUrls = await getSourceFilesUrl(htmlList, /<img\s.*src="([^"]*)".*?\/>/g)
      const jsUrls = await getSourceFilesUrl(htmlList, /<script\s.*src="([^"]*)".*?><\/script>/g)
      const cssUrls = await getSourceFilesUrl(htmlList, /<link\s.*href="([^"]*)".*?\/>/g)

      const sourceFileList = await getSourceFilesBlob([...new Set([...coreUrls, ...imgUrls, ...jsUrls, ...cssUrls])])

      const fileList = [...htmlList, ...sourceFileList]
      console.log('axhub - files', fileList)
      await upload(fileList)
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
})()
