import {useEffect, useState} from "react";

export  function CustomerItemComponent({item}) {
    console.log(item)
    return (
        <div className="bg-black text-white overflow-auto pb-5">
            <div className="mx-auto max-w-2xl h-screen px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Wishlist</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                    { item && item["items"].map((product,index) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={item["images"] && `http://localhost:8000/media/${JSON.parse(item["images"])[index]["fields"]["img"]}`}
                                    alt={"Product Image"}
                                    className="h-full w-full object-contain lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-white">
                                        <a href={`http://localhost:3000/product/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.item_name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <p className="text-sm font-medium text-white">Days:{product.max_no_of_days}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
