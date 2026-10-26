import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumButron } from "../../components/CustomJumButron"
import { useParams } from "react-router"
import { useProducts } from "../../hooks/useProducts"
import { ProductsGrid } from "../../components/ProductsGrid"



export const GenderPages = () => {
    const { gender } = useParams()
    const { data } = useProducts()

    const genderLabel = gender == 'men'
        ? 'Hombres' :
        gender == 'women'
            ? 'Mujeres' :
            'Niños'

    console.log(data)

    return (

        <>
            <CustomJumButron title={`Productos Para :${genderLabel}`} subTitle="Esta es la ropa de subtitulo" />
            <ProductsGrid products={data?.products || []}></ProductsGrid>
            <CustomPagination numberPages={data?.pages || 1} />
        </>

    )
}
