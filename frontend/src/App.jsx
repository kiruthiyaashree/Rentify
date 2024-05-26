
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SellerHome from './components/SellerHome';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import SellerDetails from './components/SellerDetails';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/sellerdetails' element={<SellerDetails/>}/>


        </Routes>
      </Router>

    </>
  )
}

export default App
