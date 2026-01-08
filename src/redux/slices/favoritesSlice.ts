import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadFavoritesFromStorage } from '../../utils/localStorage'

interface FavoritesState {
  favoriteIds: number[]
}

const initialState: FavoritesState = {
  favoriteIds: loadFavoritesFromStorage(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload)
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favoriteIds.indexOf(action.payload)
      if (index === -1) {
        state.favoriteIds.push(action.payload)
      } else {
        state.favoriteIds.splice(index, 1)
      }
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions
export default favoritesSlice.reducer

