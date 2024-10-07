import { api } from "@/lib/axios"

export type GetPopuçarProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<GetPopuçarProductsResponse>(
    '/metrics/popular-products'
  )

  return response.data
}