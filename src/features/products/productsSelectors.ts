import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'
import type { Product } from '../../types/product'

const selectProducts = (state: RootState) => state.productsReducer.products
const selectSearchQuery = (state: RootState) => state.filtersReducer.searchQuery
const selectCategory = (state: RootState) => state.filtersReducer.selectedCategory
const selectSortBy = (state: RootState) => state.filtersReducer.sortBy

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery, selectCategory, selectSortBy],
  (products, searchQuery, category, sortBy): Product[] => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Sort by price
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }
)

export const selectFavoriteIds = (state: RootState) => state.favoritesReducer.favoriteIds

export const selectFavoriteProducts = createSelector(
  [selectProducts, selectFavoriteIds],
  (products, favoriteIds): Product[] => {
    return products.filter((product) => favoriteIds.includes(product.id))
  }
)

export const selectIsFavorite = (productId: number) => (state: RootState) =>
  state.favoritesReducer.favoriteIds.includes(productId)

