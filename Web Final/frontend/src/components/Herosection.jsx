import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './herosection.css';
import Visited from './Visited';
import { CiLocationOn } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";
import Popular from './Popular';
import Mainsection from './Mainsection';
import Star from './Star';
import { NavLink } from 'react-router-dom';

function Herosection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Popular.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Popular.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="video">
        <video src="videos/beach.mp4" muted autoPlay loop type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero-text">
        <h2>Welcome to Travella!</h2>
        <p>Travella helps you</p>
        <p>making your travel plan.</p>

        <div className="hero-btn">
          <button className='start'>
            <NavLink to='/plans'>
              Get Started  <FaRegPlayCircle className='play' />
            </NavLink>
          </button>
        </div>
      </div>

      <Mainsection />

      <div className="top-dest" data-aos="fade-up">
  <h2>Top destinations</h2>

  <div className="top" data-aos="fade-right">
      <div className="topcircle">
        <img src='https://img.freepik.com/premium-photo/cruise-ship-with-large-red-maple-leaf-side_865967-9630.jpg?w=740' alt="Toronto" />
        <p>Toronto</p>
      </div>

      <div className="topcircle">
        <img src='https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1714743795~exp=1714747395~hmac=d6d86d60d30c08e122d50aee62e38c283bac7c728410f8baf257a32a841e5e80&w=740' alt="Bangladesh" />
        <p>Bangladesh</p>
      </div>

      <div className="topcircle">
        <img src='https://img.freepik.com/free-photo/general-view-toledo-from-hill_1398-4496.jpg?t=st=1714744670~exp=1714748270~hmac=f1d7df46df25710cb3799bb77381c5be48c375c925aab75ece9ad758bc178c9c&w=740' alt="Turkey" />
        <p>Turkey</p>
      </div>

      <div className="topcircle">
        <img src='https://img.freepik.com/free-photo/cable-car-snow-mountain-gulmark-kashmir-india_1232-4784.jpg?t=st=1714744941~exp=1714748541~hmac=8dce3eb2dc30a8356c6243464bfd9016f6b2929effd78e3f399614261c55bec4&w=740' alt="Switzerland" />
        <p>Switzerland</p>
      </div>
   
  </div>
</div>


      <div className="visited">        
        <div className="visited-heading"> <h2>Most Visited Destination</h2></div>
        <p className='explore'>Explore top destinations voted by travellers</p>
        <div className="visited-container">            
          {Visited.map((curElem) => {
            const { id, country, text, image, budget, place, stars } = curElem;
            return (
              <div className="visited-card-container" key={id} data-aos="fade-up">
                <div className="visited-image-container">
                  <img src={image} alt="Visited Place" />
                  <div className="text-overlay">
                    <div className="bud-plc">
                      <div className="place">
                        <div className="icon"><CiLocationOn /></div>
                        <h3>{place}</h3>
                      </div>
                      <NavLink className="toplans" to='/plans'>
                        <div className="budget">
                          <p>$ {budget}</p>
                        </div> 
                      </NavLink>                                                       
                    </div>
                  </div>
                  <div className="cntry">
                    <div className="cntry-name">
                      <h3>{country}</h3> 
                      <div className='stars'> <Star stars={stars} /></div> 
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>





        <div className="popular">        
        <div className="popular-heading"> <h2>Most Popular Tours</h2></div>
             <p className='explore'>Popular tours rated by travellers</p>
         <div className="popular-container"> 

        <button className="prev" onClick={prevSlide}>
        &#10094;
        </button>

        {

            Popular.map((curElem , index) => {
                    const {id, tour, stay, image, place, text}  = curElem;
                return(
                        <>
                        <div className={`popular-card-container ${index === currentIndex ? 'slide active' : 'slide'}`}  key={id}>                   
                            <div className="popular-image-container">
                                <img src={image} ></img>
                            </div>
                            <div className="pop-cntry">          
                            <div className="pop-cntry-name">
                                <h3>{place}</h3>  
                            </div>
                            <div className="pop-bud-plc">
                            <div className="pop-place">
                                <h3> {stay}</h3>
                            </div>

                            <NavLink className="toblog" to="/blogs">
                            <div className="pop-budget">
                                    <p className='tours'> {tour} </p>
                            </div>
                            </NavLink>  

                            </div>  
                            <br></br>
                            <hr></hr> 

                            <p className='text'> {text} </p>
                            
                            </div>                                                                   
                        </div>                 
                        </>
                    )
                })
            } 

      
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
        
        </div>
        </div>  




    <div data-aos="fade-right" className="pop-tours">
    <img src='images/globe.png'></img>
    <div className="pop-tours-text">
        <h2>Tours by regions</h2>
        <p>Explore exotic destinations, embrace cultural marvels,</p> 
        <p>and create lifelong memories with our curated selection of popular tours. </p>

        <div className="pop-tour-sec">
            <p>Europe<span>(12)</span></p>
            <p>Asia<span>(24)</span></p>
            <p>Middle east<span>(05)</span></p>
            <p>Africa<span>(04)</span></p>
        </div>

        <button className='all-dest'><NavLink to='/plans'>All destinations </NavLink></button>
    </div>
</div>


    </>
  );
}

export default Herosection;
