import { useState } from 'react'

// 文字列と関数を返す
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  // localStorageとstateを更新する
  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }
  
  return [value, setValueWithStorage]
}