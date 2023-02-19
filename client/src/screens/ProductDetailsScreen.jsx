import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, ListGroup, Spinner, Dropdown, Form,Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductDetails,addReview } from '../actions/products'
import { addToCart, fetchCartItems } from '../actions/cart'
import { Link } from 'react-router-dom'
const ProductDetailsScreen = () => {
    const [userRating,setUserRating]=useState(0);
    const [comment,setComment]=useState('')
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [qty, setQty] = useState(1)
    const [message,setMessage]=useState(null)
    const {userInfo}=useSelector(state=>state.userReducer)
    const { product, loading,error } = useSelector((state) => state.singleProductReducer)
    const { countInStock } = product
    console.log(product)
    useEffect(() => {
        const fetchDetails = () => {
            try {
                    dispatch(fetchProductDetails(id))

            } catch (error) {
                console.log(error)
            }
        }
        fetchDetails()
    }, [id, dispatch])
    const numArr = [];
    for (let i = 1; i <= product.countInStock; i++) numArr.push(i)
    const handleSelect = (e) => {

        setQty(e)
    }
    const handleAddToCart = (id, qty) => {
        dispatch(addToCart(id, qty))
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        console.log(userRating+" "+comment)
        if(userInfo )
        {
            const findReview=product.reviews.find((r)=>r.user.toString()===userInfo._id)
            if(Number(userRating)===0 ||comment==='')
            setMessage('Please fill all fields');
            else
            {
                if(findReview)
                setMessage('You have already reviewed the product')
                else
                dispatch(addReview(id,Number(userRating),comment))
            }
           
        }
        else navigate('/login')
    }
   
    return (
        <div >
            {
                loading ? <Spinner style={{ width: "60px", height: "60px" }} className='mx-auto' animation="border" variant="dark" /> :
                error? <Alert  variant='warning'>{error}</Alert>:
                    (

                        <>
                            <div className='singleProduct'>
                                <Link to='/'>
                                    <div className='backToHome'>
                                        <i className="fas fa-angle-double-left"></i><span>Back</span>
                                    </div>
                                </Link>
                                <div className='product_left'>

                                    <div className='product_img'>
                                        <img src={product.image} />
                                    </div>
                                    <div className='product_details'>
                                        <h3>{product.name}</h3>
                                        <p className='rating_part'>
                                            {product.rating >= 1 ? <i className="fas fa-star"></i> : product.rating >= 0.5 ?
                                                <i className="fas fa-star-half-alt"></i> :
                                                <i className="far fa-star"></i>}

                                            {product.rating >= 2 ? <i className="fas fa-star"></i> : product.rating >= 1.5 ?
                                                <i className="fas fa-star-half-alt"></i> :
                                                <i className="far fa-star"></i>}

                                            {product.rating >= 3 ? <i className="fas fa-star"></i> : product.rating >= 2.5 ?
                                                <i className="fas fa-star-half-alt"></i> :
                                                <i className="far fa-star"></i>}

                                            {product.rating >= 4 ? <i className="fas fa-star"></i> : product.rating >= 3.5 ?
                                                <i className="fas fa-star-half-alt"></i> :
                                                <i className="far fa-star"></i>}

                                            {product.rating >= 5 ? <i className="fas fa-star"></i> : product.rating >= 4.5 ?
                                                <i className="fas fa-star-half-alt"></i> :
                                                <i className="far fa-star"></i>}
                                            <span style={{ color: "#000000" }}>{` ${product.numReviews} reviews`}</span>
                                        </p>

                                        <p className='product_price'>Price: ${product.price}</p>
                                        <p>Description:{product.description}</p>
                                    </div>
                                </div><div className='product_right'>

                                    <ListGroup>
                                        <ListGroup.Item><p>Price:{`      $${product.price}`}</p></ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.countInStock > 0 ? <p>Status:In Stock</p> : <p>Status:Out of Stock</p>}
                                        </ListGroup.Item>
                                        {product.countInStock > 0 ?
                                            <ListGroup.Item>
                                                <p className='quantity_title'>Select Quantity:</p>
                                                <br />
                                                <Dropdown onSelect={(e) => handleSelect(e)}>
                                                    <Dropdown.Toggle style={{ width: '100%' }} id="dropdown-button-dark-example1" variant="secondary">
                                                        {qty}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{ width: '100%' }} variant="light">
                                                        {
                                                            numArr.map((num) => {
                                                                return <Dropdown.Item eventKey={num} key={num}>{num}</Dropdown.Item>
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ListGroup.Item> : null}

                                        <ListGroup.Item>
                                            {
                                                countInStock > 0 ?

                                                    <Button className='add_to_cart_btn' variant="dark" size="lg" onClick={() => handleAddToCart(product._id, qty)}>
                                                        ADD TO CART
                                                    </Button> :
                                                    <Button disabled className='add_to_cart_btn' variant="dark" size="lg">
                                                        ADD TO CART
                                                    </Button>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>

                                </div>
                            </div>
                            <div className="reviews">
                                {
                                    product.numReviews > 0 ?
                                        <>
                                            <h1>Reviews</h1>
                                            {
                                              product.reviews.map((r,index) => {
                                                    return (
                                                        <div key={index}>
                                                            <h6>{r.name}</h6>
                                                            <p>
                                                                {r.rating >= 1 ? <i className="fas fa-star"></i> : r.rating >= 0.5 ?
                                                                    <i className="fas fa-star-half-alt"></i> :
                                                                    <i className="far fa-star"></i>}

                                                                {r.rating >= 2 ? <i className="fas fa-star"></i> : r.rating >= 1.5 ?
                                                                    <i className="fas fa-star-half-alt"></i> :
                                                                    <i className="far fa-star"></i>}

                                                                {r.rating >= 3 ? <i className="fas fa-star"></i> : r.rating >= 2.5 ?
                                                                    <i className="fas fa-star-half-alt"></i> :
                                                                    <i className="far fa-star"></i>}

                                                                {r.rating >= 4 ? <i className="fas fa-star"></i> : r.rating >= 3.5 ?
                                                                    <i className="fas fa-star-half-alt"></i> :
                                                                    <i className="far fa-star"></i>}

                                                                {r.rating >= 5 ? <i className="fas fa-star"></i> : r.rating >= 4.5 ?
                                                                    <i className="fas fa-star-half-alt"></i> :
                                                                    <i className="far fa-star"></i>}
                                                            </p>
                                                            <p>{r.createdAt.substring(0, 10)}</p>
                                                            <p>{r.comment}</p>
                                                            <hr />
                                                        </div>
                                                    )

                                                })
                                            }
                                        </> : <h1>No reviews</h1>
                                }
                                <h1>Add a review as customer</h1>
                                {message && <Alert  variant='warning'>{message}</Alert>}
                              
                                <Form  onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicRating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Select onChange={(e)=>setUserRating(e.target.value)} aria-label="Default select example">
                                            <option value={0}>--select--</option>
                                            <option value={1}>1 star</option>
                                            <option value={2}>2 star</option>
                                            <option value={3}>3 star</option>
                                            <option value={4}>4 star</option>
                                            <option value={5}>5 star</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicComment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control onChange={(e)=>setComment(e.target.value)} name="comment" type="text" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default ProductDetailsScreen
