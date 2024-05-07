import Dexie from 'dexie'

// IndexedDBのデータ型を定義
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

// インスタンスを生成 = データベースを作成
const database = new Dexie('markdown-editor')

// データベースのバージョンと、使用するテーブルとインデックス
database.version(1).stores({ memos: '&datetime'})

// テーブルクラスを取得
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// 保存処理
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10


export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count() // メモの総数
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE) // ページの総数
  return pageCount > 0 ? pageCount : 1
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
  // 新しい順に取得して配列に変換して返却
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray()
}