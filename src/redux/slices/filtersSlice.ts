import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SortOption } from '../../types/product'

interface FiltersState {
  searchQuery: string
  selectedCategory: string
  sortBy: SortOption
}

const initialState: FiltersState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'none',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.searchQuery = ''
      state.selectedCategory = 'all'
      state.sortBy = 'none'
    },
  },
})

export const { setSearchQuery, setCategory, setSortBy, resetFilters } =
  filtersSlice.actions
export default filtersSlice.reducer

