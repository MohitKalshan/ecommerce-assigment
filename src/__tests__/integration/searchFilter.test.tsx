import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ProductListingPage } from '../../pages/ProductListingPage'
import productsReducer from '../../redux/slices/productsSlice'
import filtersReducer from '../../redux/slices/filtersSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'
import categoriesReducer from '../../redux/slices/categoriesSlice'
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
    title: 'Laptop Computer',
    price: 999.99,
    description: 'A powerful laptop',
    category: 'electronics',
    image: 'https://example.com/laptop.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Gold Ring',
    price: 299.99,
    description: 'Beautiful gold ring',
    category: 'jewelery',
    image: 'https://example.com/ring.jpg',
    rating: { rate: 4.8, count: 50 },
  },
  {
    id: 3,
    title: 'T-Shirt',
    price: 19.99,
    description: 'Comfortable t-shirt',
    category: "men's clothing",
    image: 'https://example.com/tshirt.jpg',
    rating: { rate: 4.2, count: 200 },
  },
]

function createMockStore() {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
      categories: categoriesReducer,
    },
  })
}

describe('Search and Filter Integration', () => {
  beforeEach(() => {
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockFetchCategories.mockResolvedValue(['electronics', 'jewelery', "men's clothing"])
  })

  it('searches products by title', async () => {
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
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const searchInput = screen.getByLabelText('Search products')
    await user.type(searchInput, 'Laptop')

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      expect(screen.queryByText('Gold Ring')).not.toBeInTheDocument()
    })
  })

  it('filters products by category', async () => {
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
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const categorySelect = screen.getByLabelText('Filter by category')
    await user.selectOptions(categorySelect, 'electronics')

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      expect(screen.queryByText('Gold Ring')).not.toBeInTheDocument()
    })
  })

  it('sorts products by price ascending', async () => {
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
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const sortSelect = screen.getByLabelText('Sort by price')
    await user.selectOptions(sortSelect, 'price-asc')

    await waitFor(() => {
      const prices = screen.getAllByText(/\$\d+\.\d{2}/)
      // Check that prices are in ascending order
      expect(prices[0]).toHaveTextContent('$19.99')
    })
  })

  it('combines search, filter, and sort', async () => {
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
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    // Search
    const searchInput = screen.getByLabelText('Search products')
    await user.type(searchInput, 'Gold')

    // Filter by category
    const categorySelect = screen.getByLabelText('Filter by category')
    await user.selectOptions(categorySelect, 'jewelery')

    // Sort
    const sortSelect = screen.getByLabelText('Sort by price')
    await user.selectOptions(sortSelect, 'price-desc')

    await waitFor(() => {
      expect(screen.getByText('Gold Ring')).toBeInTheDocument()
      expect(screen.queryByText('Laptop Computer')).not.toBeInTheDocument()
    })
  })
})

