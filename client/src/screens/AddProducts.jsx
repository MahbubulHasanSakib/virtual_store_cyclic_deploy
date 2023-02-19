import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { createProducts, resetCreateProduct } from '../actions/products'
import { useSelector, useDispatch } from 'react-redux'
const AddProducts = () => {

    const dispatch = useDispatch()
    const { product, success, error, loading } = useSelector(state => state.addProductReducer)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name + ' ' + price + ' ' + image + ' ' + brand + ' ' + countInStock + ' ' + category + ' ' + description)
        dispatch(createProducts(name, price, image, brand, countInStock, category, description))
        setName('')
        setPrice('')
        setImage('')
        setBrand('')
        setCountInStock('')
        setCategory('')
        setDescription('')
    }

    useEffect(() => {
        if (success || error) {
            const timeId = setTimeout(() => {
                dispatch(resetCreateProduct())
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        }
    }, [product, success, error]);
    const handleFileChange=(e)=>{
        setImage(e.target.files[0])
    }
    return (
        <div className='Add_product_form'>
            <h1>Add Products</h1>
            {success && <Alert variant='success'>Product Added Successfully</Alert>}
            {error && <Alert variant='warning'>{error}</Alert>}
            <Form  onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
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
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default AddProducts
