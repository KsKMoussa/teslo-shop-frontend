import { Link } from "react-router"
import { AdminTitle } from "../../components/AdminTitle"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from "lucide-react"
import { useProducts } from "@/assets/shop/hooks/useProducts";
import { currencyFormatted } from "@/lib/currency-format";

export const AdminProductsPages = () => {

    const { data, isLoading } = useProducts()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>


            <div className="flex justify-between items-center">
                <AdminTitle title="TeslaShop" subtitle="Administra tus Productos aqui" />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new" >
                        <Button >
                            <PlusIcon />
                            Nuevo Producto
                        </Button>
                    </Link>

                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        data!.products.map(products => (
                            <TableRow key={products.id}>
                                <TableCell className="font-medium">01</TableCell>
                                <TableCell>
                                    <img
                                        src={products.images[0]}
                                        alt={products.title}
                                        className="w-20 h-20 object-cover" />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${products.id}`}
                                        className="hover:500-text-blue underline">
                                        {products.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{currencyFormatted(products.price)}</TableCell>
                                <TableCell>{products.gender}</TableCell>
                                <TableCell>{products.stock} stock</TableCell>
                                <TableCell>{products.sizes.join(', ')}</TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/admin/products/${products.id}`}
                                    >
                                        <PencilIcon

                                        />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )

                        )
                    }

                </TableBody>
            </Table>
            <CustomPagination numberPages={data?.pages || 0} />
        </>
    )
}
