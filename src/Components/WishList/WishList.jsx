import styles from './WishList.module.css'
import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, FormCheck } from 'react-bootstrap';
import { wishListContext } from '../../context/WishList';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import ProductLoader from '../ProductLoader/ProductLoader';
import BgHeader from '../bgHeader/bgHeader';
import { CartContext } from '../../context/Cart';
import { priceContext } from '../../context/Price';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const { wishListItems, deleteFromWshList, getUserWishList, isLoading } = useContext(wishListContext)
    const { addToCart, setCartLength, } = useContext(CartContext)
    const { priceCHange } = useContext(priceContext);

    function handeDelFromWishList(productId) {
        deleteFromWshList(productId)
    }
    async function handeAddToCart(productId) {
        let { data } = await addToCart(productId)
        setCartLength(data?.numOfCartItems)
        if (data.status === 'success') {
            toast.success(data.message, { position: "top-center" });
            deleteFromWshList(productId)
        } else {
            toast.error(data.message, { position: "top-center" });
        }
    }

    return (
        <div className="main">
            <Helmet>
                <title>WishList</title>
                <meta name="description" content="WishList" />
                <meta name="keywords" content="WishList" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/wishList" />
            </Helmet>
            <BgHeader mainName="wishList" subName="" />
            <div className={`${styles.pageContent} pb-5`}>
                {isLoading ? <>
                    <ProductLoader />
                </>
                    : <>
                        <BreadCrumb product={{ title: "WishList" }} />
                        {wishListItems?.length !== 0 ? (
                            <div className="wishList">
                                <Container fluid className='pb-5 emptyContainer'>
                                    <Row className="pb-5">
                                        <Col md={12} className='p-0'>
                                            <Table
                                                striped
                                                variant="white"
                                                hover
                                                size="sm"
                                                className={`table ${styles.tablewishList} table-mobile`}>
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Cart</th>
                                                        <th>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {wishListItems?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className={`${styles.productCol}`}>
                                                                <div className={`${styles.product}`}>
                                                                    <div className={`${styles.productMedia}`}>
                                                                        <Link className={`${styles.productImg}`} to={`/details/${item._id}`}>
                                                                            <img
                                                                                src={item.imageCover}
                                                                                alt="product"
                                                                                className="img-fluid rounded-4"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <p className={`${styles.productName}  textHover `}>
                                                                        {item?.title.split(' ').slice(0, 2).join(' ')}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className={`${styles.priceCol}`}>
                                                                {
                                                                    priceCHange === 'usd' ?
                                                                        <>
                                                                            {(item.price / 30).toFixed(2)}<span className="fs-6">$</span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            ${item.price}<span className="fs-6">EGP</span>
                                                                        </>
                                                                }
                                                            </td>
                                                            <td className={`${styles.cartCol}`}>
                                                                <Button className="bg-transparent w-50 p-2  text-white mustard-Btn border-0" onClick={() => { handeAddToCart(item.id) }} >
                                                                    <i className="fa fa-shopping-cart fa-lg" />
                                                                </Button>
                                                            </td>
                                                            <td className="remove-col">
                                                                <Button className="bg-transparent w-50 p-2 text-white pink-Color border-0" onClick={() => { handeDelFromWishList(item.id) }}>
                                                                    <i className="fa fa-trash fa-lg" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        ) : (
                            <Container fluid className="emptyContainer bg-light py-5 my-5 d-flex justify-content-center align-items-center" >
                                <div className={`${styles.emptyWishList}`}>
                                    <h1 className="text-center">Your WishList is Empty </h1>
                                    <p className="text-center">It looks like your wishList is empty. You can add items to your wishList! </p>
                                    <div className="text-center mt-4">
                                        <Link to="/" className={`${styles.btn} `}>
                                            <span>Shop Now</span>
                                        </Link>
                                    </div>
                                </div>
                            </Container>
                        )}
                    </>}
            </div>
        </div>
    )
}

