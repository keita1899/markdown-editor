import * as marked from 'marked'
import * as sanitizeHtml from 'sanitize-html'

// TypeScript特有の書き方
const worker: Worker = self as any  

// メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener('message', (event) => {  
  console.log('Worker Received:', event.data)

  // let count: number = 1
  // while (count < 1_000_000_000) {
  //   count++
  // }

  // メインスレッドに処理結果を送信
  // worker.postMessage({ result: event.data })  

  const text = event.data
  const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2']})
  worker.postMessage({html})
})
