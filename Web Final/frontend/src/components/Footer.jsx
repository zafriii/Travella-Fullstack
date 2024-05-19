import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdUnsubscribe } from "react-icons/md";
import './footer.css'

function Footer() {


  return (
    <>

    <div className="footcontainer">

    <div className="footer">

      <div className="foot-cont1">

      <p> Follow us on social media</p>
       <div className="icons">
       <a href="#" > <CiFacebook className='social-icons'/> </a>
       <a href="#" > <FaInstagram className='social-icons'/> </a>
       <a href="#" > <FaTwitter className='social-icons'/> </a>
       </div>

      </div>


      <div className="foot-cont2">

           <p>Subscribe to our newsletter</p>
          <input type='text' placeholder='Enter your email' />
          <button><MdUnsubscribe /></button>


      </div>
       
       
    </div>

    <p className='reserved'>© Travella  {new Date().getFullYear()} | All rights reserved</p> 

    </div>
    
    </>
  )
}

export default Footer