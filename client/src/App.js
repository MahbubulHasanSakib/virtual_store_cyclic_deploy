import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { Container, Row } from 'react-bootstrap'
import { BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetails from './screens/OrderDetails';
import ListAllUsers from './screens/ListAllUsers';
import EditUsers from './screens/EditUsers';
import ListAllProducts from './screens/ListAllProducts';
import AddProducts from './screens/AddProducts';
import EditProducts from './screens/EditProducts';
import ListAllOrders from './screens/ListAllOrders';

function App() {
  return (
  
      <div className="App">
          <Router>
        <Header />

        <main className='my-3'>
          <Container>
            <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductDetailsScreen/>} exact />
            <Route path='/cart' element={<CartScreen/>} exact />
            <Route path='/login' element={<LoginScreen/>} exact />
            <Route path='/register' element={<RegisterScreen/>} exact />
            <Route path='/profile' element={<UserProfileScreen/>} exact />
            <Route path='/shipping' element={<ShippingScreen/>} exact />
            <Route path='/payment' element={<PaymentScreen/>} exact />
            <Route path='/placeOrder' element={<PlaceOrderScreen/>} exact />
            <Route path='/users' element={<ListAllUsers/>} exact />
            <Route path='/listProducts' element={<ListAllProducts/>} exact />
            <Route path='/listOrders' element={<ListAllOrders/>} exact />
            <Route path='/addProducts' element={<AddProducts/>} exact />
            <Route path='/order/:id' element={<OrderDetails/>} exact />
            <Route path='/editUsers/:id' element={<EditUsers/>} exact />
            <Route path='/editProducts/:id' element={<EditProducts/>} exact />
            <Route path='*' element={<Navigate replace to="/" />}/>
            </Routes>
          </Container>
        </main>

        <Footer />
        </Router>
      </div>
   
  );
}

export default App;
