import { TesloApi } from "@/assets/api/TesloApi";
import type { Product } from "@/assets/interfaces/product.interface";
import { sleep } from "@/lib/sleep";




export const createProductUpdateAction = async (



    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {

    await sleep(1500)


    const { id, user, images = [], files = [], ...rest } = productLike
    const isCreating = id == 'new'



    rest.stock = Number(rest.stock || 0)
    rest.price = Number(rest.price || 0)


    //Preparar las Imagenes

    if (files.length > 0) {
        const newImagesNames = await uploadFiles(files)
        images.push(...newImagesNames)
    }

    const imagesToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || '';
        return image
    })

    const { data } = await TesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest, images: imagesToSave
        }

    })

    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http')) return image
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`


        })
    }


}




export interface fileUploadResponse {
    secureUrl: string,
    fileName: string
}

const uploadFiles = async (files: File[]) => {

    const uploadPromise = files.map(async file => {
        const formData = new FormData()
        formData.append('file', file)


        const { data } = await TesloApi<fileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        })

        return data.fileName
    })


    const uploadFilesName = await Promise.all(uploadPromise)
    return uploadFilesName
}