import { TesloApi } from "@/assets/api/TesloApi"
import type { Product } from "@/assets/interfaces/product.interface"






export const getProductByIdAction = async (id: string | undefined): Promise<Product> => {

    if (!id) throw new Error('Id not Requiered')

    if (id == 'new') {
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            slug: '',
            stock: 0,
            sizes: [],
            gender: 'men',
            tags: [],
            images: []
        } as unknown as Product
    }

    const { data } = await TesloApi.get<Product>(`/products/${id}`)

    const images = data.images.map(image => {
        if (image.includes('http')) return image;
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`

    });

    return {
        ...data, images
    }

}