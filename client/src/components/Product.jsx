import React from 'react'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { addToCart } from '../actions/cart'
import { useDispatch } from 'react-redux'


const Product = (props) => {
    const dispatch = useDispatch()
    const { _id, name, image, price, numReviews, rating, countInStock } = props.product
    const handleAddToCart = (id, qty) => {
        dispatch(addToCart(id, qty))
        toast('Product added to cart!', {
            position: "top-right",
            autoClose:3000,
            className:'toasterMsg',
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            progress: undefined,
        });
    }
    return (
        <>

            <Card className='my-2 productCard' style={{ width: '20rem' }}>

                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Link to={`/product/${_id}`}>
                        <Card.Title className='cartTitle'>{name}</Card.Title>
                    </Link>
                    <Card.Text>
                        <Rating rating={rating} numReviews={`${numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text className='price'>
                        {`$${price}`}
                    </Card.Text>
                    {
                        countInStock > 0 ?

                            <Button className='addToCart' onClick={() => handleAddToCart(_id, 1)} variant="dark" size="lg">
                                ADD TO CART
                            </Button> :
                            <div className='out_of_stock'>

                                <p>Out of stock</p>
                            </div>
                    }
                </Card.Body>

            </Card>

            <ToastContainer/>
        </>
    )
}

export default Product
