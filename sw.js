const CacheName = 'Cache:v1'

// selfはサービスワーカー自身
self.addEventListener('install', (event) => {  
  console.log('ServiceWorker install:', event)  
})  
  
self.addEventListener('activate', (event) => {  
  console.log('ServiceWorker activate:', event)  
})

const networkFallingBackToCache = async (request) => {
  // キャッシュを開く
  const cache = await caches.open(CacheName)
  try {
    // リクエストに対してレスポンスを保持する
    const response = await fetch(request)

    // レスポンスをキャッシュに保存
    await cache.put(request, response.clone())
    return response
  } catch (err) {
    console.error(err)

    // キャッシュの内容を返却する
    return cache.match(request)
  }
}

// ネットワークリクエストに介入
self.addEventListener('fetch', (event) => {
  // リクエストの内容を表示
  // console.log('Fetch to:', event.request.url)

  // ネットワークリクエストを行って結果をメインスレッドに戻す処理
  // event.respondWith(fetch(event.request))
  event.respondWith(networkFallingBackToCache(event.request))
})