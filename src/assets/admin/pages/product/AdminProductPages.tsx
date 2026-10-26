
import { Navigate, useNavigate, useParams } from 'react-router';


import { useProduct } from '../../hooks/useProduct';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/assets/interfaces/product.interface';
import { toast } from 'sonner';



export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const { isLoading, isError, mutation, data: product } = useProduct(id || '')

    const title =
        id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';


    //

    const handleSubmit = async (ProductLike: Partial<Product> & { files?: File[] }) => {

        await mutation.mutateAsync(ProductLike, {
            onSuccess: (data) => {
                toast.success('Producto Actualizado Coreectamente', { position: 'top-right' })
                navigate(`/admin/products/${data.id}`)
            },
            onError: (error) => {
                console.log(error)
                toast.error('Error en la actualizacion')
            }
        });


    }


    if (isError) {

        return <Navigate to="/admin/products" />
    }

    if (isLoading) {
        return <h1>isloading</h1>
    }

    if (!product) {
        return <Navigate to='/admin/products' />
    }



    return <ProductForm
        title={title}
        subTitle={subtitle}
        product={product}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}

    />

};
