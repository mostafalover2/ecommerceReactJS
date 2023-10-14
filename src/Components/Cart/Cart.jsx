import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

function Cart() {

  let [totalCartPrice, setTotalCartPrice] = useState(0)
  let [numOfCartItems, setNumOfCartItems] = useState(0)
  let [products, setProducts] = useState([])
  let [cartId, setCartId] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  let [reqInterval, setReqInterval] = useState()
  let navigate = useNavigate()
  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  useEffect(() => {
    getUserCartProducts()
  }, [])


  async function getUserCartProducts() {
    let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
    })

    console.log(res);
    if (res) {
      setTotalCartPrice(res?.data.data.totalCartPrice)
      setProducts(res?.data.data.products)
      setCartId(res?.data.data._id)
      setNumOfCartItems(res?.numOfCartItems)
    }

  }

  async function removeCartProduct(productId) {
    let res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message)
      localStorage.removeItem("token")
      setIsUserLoggedIn(false)
      navigate("/login")
    })

    console.log(res);
    if (res) {
      setTotalCartPrice(res?.data.data.totalCartPrice)
      setProducts(res?.data.data.products)
      setNumOfCartItems(res?.numOfCartItems)
    }

  }

  async function clearCartProduct() {
    let res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/", {
      headers: {
        token: localStorage.getItem("token")
      }
    })

    console.log(res?.data);
    if (res?.data.message == 'success') {
      setTotalCartPrice(0)
      setProducts([])
      setNumOfCartItems(0)
    }

  }



  async function updateProductCount(productId, count, index) {


    let newProducts = [...products]
    newProducts[index].count = count

    setProducts(newProducts)


    clearTimeout(reqInterval)
    setReqInterval(setTimeout(async () => {
      let res
      if (count == 0) {
        removeCartProduct(productId)
      } else {
        res = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
          count
        }, {
          headers: {
            token: localStorage.getItem("token")
          }
        })

      }

      if (res) {
        setTotalCartPrice(res?.data.data.totalCartPrice)
        setProducts(res?.data.data.products)
        setNumOfCartItems(res?.numOfCartItems)
      }
      console.log(res);
    }, 500))



  }




  return (
    <>
      <button onClick={clearCartProduct} className='btn btn-outline-danger d-block ms-auto my-3'>Clear Cart</button>
      {errorMessage ?
        <div className='alert alert-warning text-center'>
          <h3>No products in your cart</h3>
        </div> :
        products.map((product, index) => {
          return <div className="row p-2 my-3 shadow rounded-2 align-items-center">
            <div className="col-md-2">
              <img className='w-100' src={product.product.imageCover} alt="" />
            </div>
            <div className="col-md-8">
              <h2>{product.product.title}</h2>
              <h5 className='font-sm text-main'>{product.product.category.name}</h5>
              <p>
                <span className='mx-3'>Price: {product.price}EGP</span>
                <span className='mx-3'><i className='fas fa-star text-main'></i>{product.product.ratingsAverage}</span>
              </p>
            </div>
            <div className="col-md-2">
              <button onClick={() => removeCartProduct(product.product._id)} className='btn text-danger d-block mb-5'>Remove</button>
              <div className="d-flex align-items-center">
                <button onClick={() => updateProductCount(product.product._id, product.count - 1, index)} className='btn bg-main mx-2 text-white'>-</button>
                <span>{product.count}</span>
                <button onClick={() => updateProductCount(product.product._id, product.count + 1, index)} className='btn bg-main mx-2 text-white'>+</button>
              </div>
            </div>
          </div>
        })
      }

      <div className='text-end my-5 d-flex justify-content-between'>
        <Link to={'/address/'+ cartId} className='btn bg-main text-white'>Checkout</Link>
        <p><span className='fw-bolder'>Total Cart Price:</span> {totalCartPrice}EGP</p>
      </div>
    </>
  )
}

export default Cart