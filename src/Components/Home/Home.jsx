import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import MainSlider from '../MainSlider/MainSlider'
import { useQuery } from 'react-query'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'


function Home() {

  


    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let { data, isError, isFetched, isFetching, isLoading, refetch } = useQuery('products', getAllProducts, {
        cacheTime: 5000,
               enabled: true
    })

    console.log(isFetching);




    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <MainSlider />
            <CategoriesSlider/>

            <button onClick={refetch} className='btn bg-main text-white w-100 text-center'>Get All Products</button>
            <div className="row">
                {data?.data.data.map((product) => {
                    return <div key={product._id} className={"col-md-3"}>
                        <Product product={product} />
                    </div>
                })}
            </div>
        </>
    )
}

export default Home