import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { Helmet } from "react-helmet";

function ProductDetails() {

    let { id } = useParams()
    let [productDetails, setProductDetails] = useState()
    let [errorMessage, setErrorMessage] = useState("")
    let [isLoading, setIsLoading] = useState(false)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    useEffect(() => {
        getProductDetails(id)
    }, [])


    async function getProductDetails(productId) {
        setIsLoading(true)
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId).catch((err) => {
            console.log(err);
            setErrorMessage(err.response.data.errors.msg)
            setIsLoading(false)

        })
        setIsLoading(false)

        console.log(res?.data.data);
        setProductDetails(res?.data.data)
    }


    console.log(id);
    return (
        <>
            <Helmet>
                <title>{productDetails?.title}</title>
            </Helmet>
            {isLoading ? <div className='py-5 my-5 text-center'>
                <i className='fas fa-spinner fa-spin fa-2x'></i>
            </div>
                :
                <>
                
                    {productDetails ? <div className="row align-items-center my-5">
                        <div className="col-md-3">
                            <Slider {...settings}>

                                {productDetails?.images.map((img) => {
                                    return <img key={img} className='w-100' src={img} alt="" />
                                })}

                            </Slider>
                        </div>
                        <div className="col-md-9">
                            
                            <h2>{productDetails?.title}</h2>
                            <h5 className='text-main font-sm'>{productDetails?.category.name}</h5>
                            <p>
                                <span>Price: {productDetails?.price}EGP</span>
                                <span><i className='fas fa-star'></i>{productDetails?.ratingsAverage}</span>
                            </p>
                            <button className='btn bg-main text-white'>Add to cart</button>
                        </div>
                    </div> :
                        <div className='alert alert-danger text-center py-3 my-5'>
                            <h3>{errorMessage}</h3>
                        </div>}
                </>
            }

        </>
    )
}

export default ProductDetails