import productsReducer, {
  clearSelectedProduct,
} from '../../redux/slices/productsSlice'
import {
  fetchProductsThunk,
  fetchProductByIdThunk,
} from '../../redux/slices/productsSlice'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'test',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
}

describe('productsSlice', () => {
  const initialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  }

  it('should return initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle fetchProductsThunk.pending', () => {
    const action = { type: fetchProductsThunk.pending.type }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchProductsThunk.fulfilled', () => {
    const products = [mockProduct]
    const action = {
      type: fetchProductsThunk.fulfilled.type,
      payload: products,
    }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.products).toEqual(products)
    expect(state.error).toBe(null)
  })

  it('should handle fetchProductsThunk.rejected', () => {
    const errorMessage = 'Failed to fetch'
    const action = {
      type: fetchProductsThunk.rejected.type,
      payload: errorMessage,
    }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })

  it('should handle fetchProductByIdThunk.pending', () => {
    const action = { type: fetchProductByIdThunk.pending.type }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchProductByIdThunk.fulfilled', () => {
    const action = {
      type: fetchProductByIdThunk.fulfilled.type,
      payload: mockProduct,
    }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.selectedProduct).toEqual(mockProduct)
    expect(state.error).toBe(null)
  })

  it('should handle fetchProductByIdThunk.rejected', () => {
    const errorMessage = 'Failed to fetch product'
    const action = {
      type: fetchProductByIdThunk.rejected.type,
      payload: errorMessage,
    }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })

  it('should handle clearSelectedProduct', () => {
    const stateWithProduct = {
      ...initialState,
      selectedProduct: mockProduct,
    }
    const action = clearSelectedProduct()
    const state = productsReducer(stateWithProduct, action)
    expect(state.selectedProduct).toBe(null)
  })
})

