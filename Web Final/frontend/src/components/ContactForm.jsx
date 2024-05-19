import { useState} from "react";
import './contact.css'
import { useAuth } from '../store/Auth'


function ContactForm() {

  const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };
  
  
    const [contact, setContact] = useState(defaultContactFormData);
  
    const [userData, setUserData] = useState(true);
  
    const { user } = useAuth();
  
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
  
      setUserData(false);
    }

     
    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      setContact({
        ...contact,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
    };

    return (
      <>


            <div className='contact'>

            <h2 className='contact-title'>If you have any quetion Contact Us</h2>

            <div className="contact-container">

                <img src='images/con.jpg'></img>


                    <div className="contact-form">

                    <form  action="https://formspree.io/f/xjvnzzdn" method="POST" className="contact-inputs"> 

                        <h3 className='phn'>Get in touch (Phone - +880172105509)</h3>
                         <h3>Email : travella@gmail.com</h3>

                              <input
                              type="text"
                              name="username"
                              id="username"
                              placeholder="Enter name..."
                              autoComplete="off"
                              value={contact.username}
                              onChange={handleInput}
                              required
                            />

                            <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email..."
                            autoComplete="off"
                            value={contact.email}
                            onChange={handleInput}
                            required
                          />

                          <textarea
                          name="Message"
                          cols="30"
                          rows="5"
                          required
                          autoComplete="off"
                          placeholder=" Message..."></textarea>

                        <input type="submit" value="send" className='submit'/>

                        </form>

                    </div>

            </div>

            </div>

      </>
    )
}

export default ContactForm








