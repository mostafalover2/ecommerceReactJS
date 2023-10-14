import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

function Register() {
  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState("")
  let [isLoading, setIsLoading] = useState(false)

  async function register(values) {
    setErrorMessage('')
    console.log(values);
    setIsLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
      setErrorMessage(err.response.data.message)
      setIsLoading(false)
    })
    console.log(data);
    if (data.message == "success") {
      navigate('/login')
    }
    setIsLoading(false)
  }

  // function validate(values) {
  //   let errors = {}

  //   if (values.name == '') {
  //     errors.name = "Name is required"
  //   } else if (values.name.length < 3) {
  //     errors.name = "Min Length must be greater than 3 letters"
  //   } else if (values.name.length > 20) {
  //     errors.name = "Max Length must be less than 20 letters"
  //   }

  //   if (values.email == "") {
  //     errors.email = "Email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = "Invalid email"
  //   }

  //   if (values.password == "") {
  //     errors.password = "Password is required"
  //   } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
  //     errors.password = "Password must have special character, letter, number and must be greater than 7"
  //   }

  //   if (values.rePassword == "") {
  //     errors.rePassword = "RePassword is required"
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = "Password and rePassword doesn't match"
  //   }

  //   if (values.phone == "") {
  //     errors.phone = "Phone number is required"
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "Enter valid Egyptian number"
  //   }


  //   return errors
  // }


  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min Length must be greater than 3 letters').max(20, 'Max Length must be less than 20 letters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must have special character, letter, number and must be greater than 7'),
    rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')]),
    phone: Yup.string().required('Phone number in required').matches(/^01[0125][0-9]{8}$/, 'Enter valid number')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: register,
    validationSchema
  })

  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Register Now: </h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-3' type="text" id='name' name='name' />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">
            {formik.errors.name}
          </div> : null}

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

          <label htmlFor="rePassword">RePassword: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-3' type="password" id='rePassword' name='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">
            {formik.errors.rePassword}
          </div> : null}

          <label htmlFor="phone">Phone: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-3' type="tel" id='phone' name='phone' />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">
            {formik.errors.phone}
          </div> : null}

          {errorMessage ? <div className="alert alert-danger">
            {errorMessage}
          </div> : null}


          {isLoading ? <button disabled type='button' className='btn bg-main text-white ms-auto d-block'> <i className='fas fa-spinner fa-spin'></i> </button>
            : <button type='submit' className='btn bg-main text-white ms-auto d-block'>Register</button>
          }


        </form>
      </div>
    </>
  )
}

export default Register