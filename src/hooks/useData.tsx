const dataMap: Map<string, any> = new Map()

export function useData<T>(cacheKey: string, fetcher: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined
  if (cachedData === undefined) {
    throw fetcher().then((d) => dataMap.set(cacheKey, d))
  }
  return cachedData
}
