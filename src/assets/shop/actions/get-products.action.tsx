
import { TesloApi } from "@/assets/api/TesloApi"
import type { ProductsResponse } from "@/assets/interfaces/productsResponse"



interface options {
    limit?: number | string,
    offset?: number | string,
    sizes?: string,
    gender?: string,
    minPrice?: number,
    maxPrice?: number
    query?: string

}


export const getProductsAction = async (options: options): Promise<ProductsResponse> => {


    const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options

    const { data } = await TesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            sizes,
            gender,
            minPrice,
            maxPrice,
            q: query
        }
    })


    const imagesWithURLs = data.products.map((product) => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)

    }))

    return {
        ...data,
        products: imagesWithURLs
    }


}