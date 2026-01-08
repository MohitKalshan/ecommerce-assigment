const FAVORITES_STORAGE_KEY = 'favorites'

export function loadFavoritesFromStorage(): number[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const item = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (item) {
      const parsed = JSON.parse(item)
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'number')) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error)
  }

  return []
}

export function saveFavoritesToStorage(favoriteIds: number[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error)
  }
}
