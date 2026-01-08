import { toggleFavorite } from '../redux/slices/favoritesSlice'
import { selectFavoriteIds, selectFavoriteProducts } from '../features/products/productsSelectors'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export function useFavorites() {
  const dispatch = useAppDispatch()
  const favoriteProducts = useAppSelector(selectFavoriteProducts)
  const favoriteIds = useAppSelector(selectFavoriteIds)

  const toggle = (productId: number) => {
    dispatch(toggleFavorite(productId))
  }

  const isFavorite = (productId: number) => {
    return favoriteIds.includes(productId)
  }

  return { favoriteProducts, toggle, isFavorite }
}
