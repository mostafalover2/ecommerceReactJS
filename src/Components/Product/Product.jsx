import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext';
function Product({ product }) {


    let navigate = useNavigate()
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
    async function addProductToCart(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
            localStorage.removeItem("token")
            setIsUserLoggedIn(false)
            navigate("/login")
        })

        console.log(res);
        if (res?.data.status == "success") {

            toast.success(res.data.message)
        }
    }




    return (
        <div className="product p-3 overflow-hidden">
            <Link to={'/productDetails/' + product._id}>
                <img className='w-100' src={product.imageCover} alt="" />
                <h2>{product.title}</h2>
                <h5 className='text-main font-sm'>{product.category.name}</h5>
                <p className='d-flex justify-content-between'>
                    <span>Price: {product.price}EGP</span>
                    <span><i className='fas fa-star text-main'></i> {product.ratingsAverage}</span>
                </p>
            </Link>
            <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 my-2'>Add to cart</button>
        </div>
    )
}

export default Product