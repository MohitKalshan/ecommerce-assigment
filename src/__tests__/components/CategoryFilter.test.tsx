import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CategoryFilter } from '../../components/CategoryFilter'
import productsReducer from '../../redux/slices/productsSlice'
import filtersReducer from '../../redux/slices/filtersSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'
import categoriesReducer from '../../redux/slices/categoriesSlice'
import * as api from '../../services/api'

jest.mock('../../services/api')

const mockFetchCategories = api.fetchCategories as jest.MockedFunction<
  typeof api.fetchCategories
>

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

describe('CategoryFilter', () => {
  beforeEach(() => {
    mockFetchCategories.mockResolvedValue(['electronics', 'jewelery', 'men'])
  })

  it('renders category select', async () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    )

    const select = screen.getByLabelText('Filter by category')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('all')

    await waitFor(() => {
      expect(mockFetchCategories).toHaveBeenCalled()
    })
  })

  it('updates selected category', async () => {
    const user = userEvent.setup()
    const store = createMockStore()

    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    )

    await waitFor(() => {
      expect(mockFetchCategories).toHaveBeenCalled()
    })

    const select = screen.getByLabelText('Filter by category')
    await user.selectOptions(select, 'electronics')

    const state = store.getState()
    expect(state.filters.selectedCategory).toBe('electronics')
  })
})

