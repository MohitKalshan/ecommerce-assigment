import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductByIdThunk, clearSelectedProduct } from '../redux/slices/productsSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export function useProduct() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { selectedProduct: product, loading, error } = useAppSelector(
    (state) => state.products
  )

  const parseValidId = (idParam: string | undefined): number | null => {
    if (!idParam) return null
    const parsedId = Number.parseInt(idParam, 10)
    return Number.isInteger(parsedId) ? parsedId : null
  }

  useEffect(() => {
    const productId = parseValidId(id)
    if (productId !== null) {
      dispatch(fetchProductByIdThunk(productId))
    }

    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [id, dispatch])

  const retry = () => {
    const productId = parseValidId(id)
    if (productId !== null) {
      dispatch(fetchProductByIdThunk(productId))
    }
  }

  return { product, loading, error, retry }
}
