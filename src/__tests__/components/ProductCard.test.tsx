import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ProductCard } from '../../components/ProductCard'
import productsReducer from '../../redux/slices/productsSlice'
import filtersReducer from '../../redux/slices/filtersSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
}

function createMockStore() {
  return configureStore({
    reducer: {
      productsReducer,
      filtersReducer,
      favoritesReducer,
    },
  })
}

describe('ProductCard', () => {
  it('renders product information', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renders favorite button', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Add to favorites')
    expect(favoriteButton).toBeInTheDocument()
  })

  it('has link to product detail page', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/1')
  })
})

