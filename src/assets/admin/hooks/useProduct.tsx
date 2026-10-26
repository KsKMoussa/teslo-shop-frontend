import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-byId-action"
import { createProductUpdateAction } from "../actions/create-product-update.action"



//


export const useProduct = (id: string | undefined) => {

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5
    })



    //TODO MUTATION

    const mutation = useMutation({
        mutationFn: createProductUpdateAction,
        onSuccess: (product) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })
            queryClient.setQueryData(['products', { id: product.id }], product)
        },

    })


    return {
        ...query,
        mutation,
    }
}
