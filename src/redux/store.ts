import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { saveFavoritesToStorage } from '../utils/localStorage'

const favoritesMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action)

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (action.type === 'favorites/addFavorite' ||
      action.type === 'favorites/removeFavorite' ||
      action.type === 'favorites/toggleFavorite')
  ) {
    const state = store.getState() as ReturnType<typeof rootReducer>
    saveFavoritesToStorage(state.favoritesReducer.favoriteIds)
  }

  return result
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

