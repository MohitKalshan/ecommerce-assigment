import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from '../../redux/slices/favoritesSlice'

describe('favoritesSlice', () => {
  const initialState = {
    favoriteIds: [],
  }

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addFavorite', () => {
    const productId = 1
    const action = addFavorite(productId)
    const state = favoritesReducer(initialState, action)
    expect(state.favoriteIds).toContain(productId)
    expect(state.favoriteIds.length).toBe(1)
  })

  it('should not add duplicate favorite', () => {
    const productId = 1
    const stateWithFavorite = {
      favoriteIds: [productId],
    }
    const action = addFavorite(productId)
    const state = favoritesReducer(stateWithFavorite, action)
    expect(state.favoriteIds.length).toBe(1)
  })

  it('should handle removeFavorite', () => {
    const productId = 1
    const stateWithFavorite = {
      favoriteIds: [productId, 2],
    }
    const action = removeFavorite(productId)
    const state = favoritesReducer(stateWithFavorite, action)
    expect(state.favoriteIds).not.toContain(productId)
    expect(state.favoriteIds.length).toBe(1)
  })

  it('should handle toggleFavorite - add', () => {
    const productId = 1
    const action = toggleFavorite(productId)
    const state = favoritesReducer(initialState, action)
    expect(state.favoriteIds).toContain(productId)
  })

  it('should handle toggleFavorite - remove', () => {
    const productId = 1
    const stateWithFavorite = {
      favoriteIds: [productId],
    }
    const action = toggleFavorite(productId)
    const state = favoritesReducer(stateWithFavorite, action)
    expect(state.favoriteIds).not.toContain(productId)
  })
})

