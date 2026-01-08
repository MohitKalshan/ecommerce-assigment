import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { SearchBar } from '../../components/SearchBar'
import productsReducer from '../../redux/slices/productsSlice'
import filtersReducer from '../../redux/slices/filtersSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'

function createMockStore() {
  return configureStore({
    reducer: {
      productsReducer,
      filtersReducer,
      favoritesReducer,
    },
  })
}

describe('SearchBar', () => {
  it('renders search input', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByLabelText('Search products')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Search products by title...')
  })

  it('updates search query with debounce', async () => {
    const user = userEvent.setup()
    const store = createMockStore()
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByLabelText('Search products')
    await user.type(input, 'test')

    // Check local state updates immediately
    expect(input).toHaveValue('test')

    // Wait for debounced dispatch
    await waitFor(
      () => {
        const state = store.getState()
        expect(state.filtersReducer.searchQuery).toBe('test')
      },
      { timeout: 500 }
    )
  })
})

