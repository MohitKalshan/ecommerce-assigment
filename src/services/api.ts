import type { Product } from '../types/product'

const API_BASE_URL = 'https://fakestoreapi.com'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`)
  return handleResponse<Product[]>(response)
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  return handleResponse<Product>(response)
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`)
  return handleResponse<string[]>(response)
}

