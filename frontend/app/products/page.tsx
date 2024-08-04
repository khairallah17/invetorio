"use client"
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api'
import React, { ChangeEvent, useState } from 'react'
import { SearchIcon, PlusCircleIcon } from 'lucide-react'
import Header from '@/app/(components)/header'
import Rating from '@/app/(components)/rating'
import CreateProductModal from '@/app/products/CreateProductModal'

type ProductFormData = {
    name: string
    price: number
    stockQuantity: number
    rating: number
}

const Products = () => {
    
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModelOpen] = useState(false)

    const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm)
    
    const [createProduct] = useCreateProductMutation()

    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData)
    }

    if (isLoading)
        return <div className="py-4">Loading...</div>

    if (isError || !products)
        return <div className="text-red-500 text-center py-4">Failed to Fetch Products</div>

    return (
        <div className="mx-auto pb-5 w-full">
            
            {/* SEARCH BAR */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
                    <input
                        type="text"
                        className="w-full py-2 px-4 rounded bg-white"
                        placeholder='search product....'
                        value={searchTerm}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <Header name="Products" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 gont-bold py-2 px-4 rounded"
                    onClick={() => setIsModelOpen(true)}>
                        <PlusCircleIcon className="w-5 h-5 mr-5 !text-gray-200" />
                        Create Product
                </button>
            </div>

            {/* BODY PRODUCTS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {
                    isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        products.map((product) => (
                            <div key={product.productId} className='border shadow rounded-md p-4 max-w-full w-full mx-auto'>
                                <div className="flex flex-col items-center">
                                    img
                                    <h3 className='text-lg text-gray-900 font-semibold'>{product.name}</h3>
                                    <p className="text-gray-800">${product.price.toFixed(2)}</p>
                                    <div className="text-sm-text-gray-600 mt-1">
                                        Stock: {product.stockQuantity}
                                    </div>
                                    {
                                        product.rating && (
                                            <div className="flex items-center mt-2">
                                                <Rating rating={product.rating}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            {/* MODAL */}
            <CreateProductModal isOpen={isModalOpen} onClose={() => setIsModelOpen(false)} onCreate={handleCreateProduct}/>

        </div>
    )
}

export default Products