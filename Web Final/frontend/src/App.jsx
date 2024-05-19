import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home';
import Plans from './Pages/Plans';
import Contact from './Pages/Contact';
import Blogs from './Pages/Blogs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Gallery from './Pages/Gallery';
import Reg from './components/Reg';
import Login from './components/Login';
import Error from './components/Error';
import Logout from './components/Logout';
import List from './components/List';



function App() {
  

  return (
    <>

        <BrowserRouter>

            <Navbar/>


            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/gallery' element={<Gallery/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/plans' element={<Plans/>}/> 
              <Route path='/blogs' element={<Blogs/>}/>
              <Route path='/registration' element={<Reg/>}/> 
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/> 
              <Route path='/lists' element={<List/>}/> 
              <Route path='/*' element={<Error/>}/> 
              

            </Routes>

            <Footer/>

        </BrowserRouter>
    
    </>
  )
}

export default App
