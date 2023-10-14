import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';

function Login() {
  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState("")
  let [isLoading, setIsLoading] = useState(false)

  let { setIsUserLoggedIn } = useContext(AuthContext)

  async function login(values) {
    setErrorMessage('')
    setIsLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setErrorMessage(err.response.data.message)
      setIsLoading(false)
    })
    if (data.message == "success") {
      localStorage.setItem("token", data.token)
      Cookies.set("token", data.token)
      setIsUserLoggedIn(true)
      navigate('/home')
    }
    setIsLoading(false)
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must have special character, letter, number and must be greater than 7'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: login,
    validationSchema
  })

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>login Now: </h1>
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-3' type="email" id='email' name='email' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">
            {formik.errors.email}
          </div> : null}

          <label htmlFor="password">Password: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-3' type="password" id='password' name='password' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">
            {formik.errors.password}
          </div> : null}

          {errorMessage ? <div className="alert alert-danger">
            {errorMessage}
          </div> : null}


          {isLoading ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>
            : <button type='submit' className='btn bg-main text-white ms-auto d-block'>login</button>
          }


        </form>
      </div>
    </>
  )
}

export default Login