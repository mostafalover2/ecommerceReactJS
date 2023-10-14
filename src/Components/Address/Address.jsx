import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom';

function Address() {

    let { cartId } = useParams()


    async function checkout(shippingAddress) {
        console.log(shippingAddress);
        console.log(cartId);


        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        console.log(res.data.session.url);
        window.location.href = res.data.session.url
    }


    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: checkout
    })
    return (
        <form className='w-75 m-auto pt-5 mt-5' onSubmit={formik.handleSubmit}>

            <label htmlFor="details">Details: </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className='form-control mb-3' type="text" id='details' name='details' />


            <label htmlFor="phone">Phone: </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-3' type="tel" id='phone' name='phone' />

            <label htmlFor="city">City: </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className='form-control mb-3' type="text" id='city' name='city' />



            <button type='submit' className='btn bg-main text-white ms-auto d-block'>Order</button>

        </form>
    )
}

export default Address