import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ProductListingPage } from '../../pages/ProductListingPage'
import { FavoritesPage } from '../../pages/FavoritesPage'
import productsReducer from '../../redux/slices/productsSlice'
import filtersReducer from '../../redux/slices/filtersSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'
import * as api from '../../services/api'
import type { Product } from '../../types/product'

jest.mock('../../services/api')

const mockFetchProducts = api.fetchProducts as jest.MockedFunction<
  typeof api.fetchProducts
>
const mockFetchCategories = api.fetchCategories as jest.MockedFunction<
  typeof api.fetchCategories
>

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 19.99,
    description: 'Test description 1',
    category: 'electronics',
    image: 'https://example.com/product1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 29.99,
    description: 'Test description 2',
    category: 'jewelery',
    image: 'https://example.com/product2.jpg',
    rating: { rate: 4.8, count: 50 },
  },
]

function createMockStore() {
  return configureStore({
    reducer: {
      productsReducer,
      filtersReducer,
      favoritesReducer,
    },
  })
}

describe('Favorites Integration', () => {
  beforeEach(() => {
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockFetchCategories.mockResolvedValue(['electronics', 'jewelery'])
  })

  it('adds product to favorites from listing page', async () => {
    const user = userEvent.setup()
    const store = createMockStore()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListingPage />
        </BrowserRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    const favoriteButtons = screen.getAllByLabelText('Add to favorites')
    await user.click(favoriteButtons[0])

    await waitFor(() => {
      const state = store.getState()
      expect(state.favoritesReducer.favoriteIds).toContain(1)
    })
  })

  it('displays favorites on favorites page', async () => {
    const user = userEvent.setup()
    const store = createMockStore()

    // First add a favorite
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListingPage />
        </BrowserRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    const favoriteButtons = screen.getAllByLabelText('Add to favorites')
    await user.click(favoriteButtons[0])

    await waitFor(() => {
      const state = store.getState()
      expect(state.favoritesReducer.favoriteIds).toContain(1)
    })

    // Now navigate to favorites page
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesPage />
        </BrowserRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })
  })

  it('removes product from favorites', async () => {
    const user = userEvent.setup()
    const store = createMockStore()

    // Set initial favorite
    store.dispatch({ type: 'favorites/addFavorite', payload: 1 })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesPage />
        </BrowserRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    const removeButton = screen.getByLabelText('Remove from favorites')
    await user.click(removeButton)

    await waitFor(() => {
      const state = store.getState()
      expect(state.favoritesReducer.favoriteIds).not.toContain(1)
    })
  })

  it('shows empty state when no favorites', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesPage />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
    expect(screen.getByText('Browse Products')).toBeInTheDocument()
  })
})

