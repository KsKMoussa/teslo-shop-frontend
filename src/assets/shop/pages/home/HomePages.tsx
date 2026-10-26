
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumButron } from "../../components/CustomJumButron"
import { ProductsGrid } from "../../components/ProductsGrid"

import { useProducts } from "../../hooks/useProducts"



export const HomePages = () => {

    const { data } = useProducts()


    return (

        <>
            <CustomJumButron title="Todos Los Productos" subTitle="Esta es la ropa de subtitulo" />
            <ProductsGrid products={data?.products || []} />
            <CustomPagination numberPages={data?.pages || 0} />
        </>

    )
}
