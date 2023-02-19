import React from 'react'
import {useEffect,useState} from 'react'
import {Row,Col,Spinner} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Product from '../components/Product'
import {fetchProducts} from '../actions/products'
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import CarouselSlides from '../components/CarouselSlides'

const HomeScreen = () => {
    const dispatch =useDispatch()
    const {searchText}=useParams()
    const {products,loading}=useSelector((state)=>state.productReducer)
    console.log("from home")
    console.log(searchText)
    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage]=useState(4)
    useEffect(()=>
    {
           try {
            dispatch(fetchProducts(searchText))
           } catch (error) {
               console.log(error)
           }
         
    },[dispatch,searchText])
    
    const indexOfLastProduct=currentPage*productsPerPage
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage
    const curProducts=products.slice(indexOfFirstProduct,indexOfLastProduct)
    console.log(curProducts)
    const changePageNumber=(num)=>{
        setCurrentPage(num);
    }
    return (
        <div>

            <Row>
           {
               loading? <Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
               <>
               <CarouselSlides products={products} loading={loading}/>
               <h4 className='text-center'>All Products</h4>
              { (products.length>0) && (  curProducts.map((product,index)=>{
                return(
                 <Col sm={12} md={6} lg={4} xl={4} xxl={3}>
                <Product key={index}  product={product}/>
                </Col>
                )
            }))}
            <br/>
            {(products.length>0) && <Pagination productsPerPage={productsPerPage} changePageNumber={changePageNumber} totalProducts={products.length}/>}
         
           </>
           }
           </Row>
          </div>
    )
}

export default HomeScreen
