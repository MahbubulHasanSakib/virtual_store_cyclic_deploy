import React from 'react'
import { Form, Button, Alert ,Spinner} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductToEdit, editAndUpdateProduct, resetProductUpdate } from '../actions/products'


const EditProducts = () => {
    const dispatch = useDispatch()
    const { product, success,loading, error } = useSelector(state => state.productDetailsReducer)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [currImage, setCurrImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()

    useEffect(() => {
        if (!product.name || product._id !== id)
            dispatch(getProductToEdit(id))
        else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCurrImage(product.image)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setCategory(product.category)
            setDescription(product.description)
        }
    }, [product])


    useEffect(() => {
        if (success || error) {
            const timeId = setTimeout(() => {
                dispatch(resetProductUpdate())
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        }
    }, [product, success, error]);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editAndUpdateProduct(id, name, price, image, brand, countInStock, category, description))
    }

    const handleFileChange=(e)=>{
        setImage(e.target.files[0])
    }

    return (
        <div className='Edit_product_form'>
            {loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
            <>
            <h1>Edit Product</h1>
            {success && <Alert variant='success'>Product Updated Successfully</Alert>}
            {error && <Alert variant='warning'>{error}</Alert>}
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name='email' value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter price" />
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                    <Form.Control onChange={handleFileChange} name="productImage" type="file" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                  {(!loading && currImage==='')?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
            <img style={{width:'300px',height:'200px'}} src={currImage}/>
                   }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control value={brand} onChange={(e) => setBrand(e.target.value)} name="brand" type="text" placeholder="Enter brand" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCountInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control value={countInStock} onChange={(e) => setCountInStock(e.target.value)} name="countInStock" type="number" placeholder="Enter count In Stock" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} name="category" type="text" placeholder="Enter category" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text" placeholder="Enter desciption" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            </>
            }
        </div>
    )
}

export default EditProducts
