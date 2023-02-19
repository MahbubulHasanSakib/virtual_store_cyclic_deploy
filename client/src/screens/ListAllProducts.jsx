import React from 'react'
import Swal from 'sweetalert2'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchProducts,deleteProduct} from '../actions/products'
import {Spinner,Alert,Table} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
const ListAllProducts = () => {
    const {products,loading,error}=useSelector((state)=>state.productReducer)
    const {userInfo}=useSelector(state=>state.userReducer)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>
    {
           try {
            if(userInfo && userInfo.isAdmin)
            {
              dispatch(fetchProducts())
            }
             else
             {
                 navigate('/login')
             }
         
           } catch (error) {
               console.log(error)
           }
         
    },[userInfo,dispatch,navigate])

    console.log(products)

    const handleDelete=(productId)=>{
        /*const res=window.confirm('You want to delete ?')
        if(res)*/
        Swal.fire({
          title: 'Are you sure to delete?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteProduct(productId))
          }
        })
       
    }
    const handleEdit=(productId)=>{
     navigate(`/editProducts/${productId}`)
    }

    const handleAddProduct=()=>
    {
        navigate('/addProducts')
    }
    return (
        <div>
            <h1>Products List</h1>
            {
                loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />
                :error?<Alert  variant='warning'>{error}</Alert>:
                <>
             {(products && products.length>0)?
             <>
              <Button onClick={handleAddProduct} className='createProductBtn my-2' variant="secondary" size="lg" active>
              <i className="fas fa-plus"></i> Create Product
            </Button>
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price</th>
      <th>Category</th>
      <th>Brand</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {products.map((product,index)=>{
    return <tr key={index}>
    <td>{product._id}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.category}</td>
    <td>{product.brand}</td>
    <td className='action'><span style={{color:'green',marginRight:'5px'}}><i onClick={(e)=>handleEdit(product._id)} className="far fa-edit"></i></span><span style={{color:'red'}}><i onClick={(e)=>handleDelete(product._id)} className="fas fa-trash"></i></span></td>
    </tr>
  })
}

  </tbody>
</Table>
</>:<h1>Products list is empty</h1>
}
                </>
            }
        </div>
    )
}

export default ListAllProducts
