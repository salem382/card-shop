
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Notfound from './components/Notfound';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element = {<Home />}/>
          <Route path='/cart' element = {<Cart />} />
          <Route path='*' element = {<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
