import React, { useContext } from 'react'
import logo from '../../Assets/Images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
// import { wishListContext } from '../../context/WishList'

function Navbar() {
    let navigate = useNavigate()

    function logOut() {
        localStorage.removeItem("token")
        setIsUserLoggedIn(false)
        navigate("/login")
        // const { wishListCount, getUserWishList, isLoading } = useContext(wishListContext)
    }

    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <img src={logo} alt="" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse align-items-center" id="collapsibleNavId">
                    {isUserLoggedIn ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/home'} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/cart'} >Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/orders'} >All Orders</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to={'/Wishlist'} >All Orders</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to={'/products'}  >Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/categories'} >Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'brands'} >Brands</Link>
                        </li>
                    </ul> : null}


                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <i className="fab fa-instagram mx-2"></i>
                            <i className="fab fa-facebook mx-2"></i>
                            <i className="fab fa-tiktok mx-2"></i>
                            <i className="fab fa-twitter mx-2"></i>
                            <i className="fab fa-linkedin mx-2"></i>
                            <i className="fab fa-youtube mx-2"></i>
                        </li>
                    </ul>
                    <ul className=" d-flex list-unstyled mt-3">
                        {!isUserLoggedIn ? <>
                            <li className="mx-2">
                                <Link className='nav-link' to={'register'}>Register</Link>
                            </li>
                            <li className="mx-2">
                                <Link className='nav-link' to={'login'}>Login</Link>
                            </li></> : null}
                        {isUserLoggedIn ? <li className="mx-2">
                            <a onClick={logOut} className='cursor-pointer nav-link'>Logout</a>
                        </li> : null}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar