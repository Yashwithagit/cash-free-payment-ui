import products from "@/lib/constant";
import React from "react";


export default function ProductPage() {
    return (
        <>
            <div className="bg-gray-100 ">
                {/* Remove py-8 */}
                <div className="mx-auto container py-8">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">
             {products.map((item) => (

                        <div key={item.id} className="mx-2 w-72 lg:mb-0 mb-8">
                            <div>
                                <img src={item.imgurl} className="w-full h-44" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </div>
                                    <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                        <p className="text-xs text-yellow-500">Featured</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                       
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">{item.desc}</p>
                                    <div className="flex mt-4">
                                        <div>
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">{item.warranty}</p>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-indigo-700 text-xs font-semibold">{item.place}</h2>
                                        <h3 className="text-indigo-700 text-xl font-semibold">${item.price}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                      ))}

                     </div>
                </div>
            </div>
        </>
    );
}