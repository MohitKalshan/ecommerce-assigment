import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById } from '../../services/api'
import type { Product } from '../../types/product'

interface ProductsState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchProductsThunk = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts()
      return products
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch products'
      )
    }
  }
)

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await fetchProductById(id)
      return product
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch product'
      )
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch product by ID
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedProduct } = productsSlice.actions
export default productsSlice.reducer

