import filtersReducer, {
  setSearchQuery,
  setCategory,
  setSortBy,
  resetFilters,
} from '../../redux/slices/filtersSlice'

describe('filtersSlice', () => {
  const initialState = {
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'none' as const,
  }

  it('should return initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setSearchQuery', () => {
    const query = 'test query'
    const action = setSearchQuery(query)
    const state = filtersReducer(initialState, action)
    expect(state.searchQuery).toBe(query)
  })

  it('should handle setCategory', () => {
    const category = 'electronics'
    const action = setCategory(category)
    const state = filtersReducer(initialState, action)
    expect(state.selectedCategory).toBe(category)
  })

  it('should handle setSortBy', () => {
    const sortBy = 'price-asc'
    const action = setSortBy(sortBy)
    const state = filtersReducer(initialState, action)
    expect(state.sortBy).toBe(sortBy)
  })

  it('should handle resetFilters', () => {
    const modifiedState = {
      searchQuery: 'test',
      selectedCategory: 'electronics',
      sortBy: 'price-desc' as const,
    }
    const action = resetFilters()
    const state = filtersReducer(modifiedState, action)
    expect(state).toEqual(initialState)
  })
})

