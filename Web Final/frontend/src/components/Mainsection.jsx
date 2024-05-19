import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './mainsection.css';

function Mainsection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="main-sec" data-aos="fade-right">
        <div className="main-img">
          <img src='images/travell.jpg' alt="Travel" />
        </div>
        <div className="main-text">
          <h2>Find the next place to <span>visit</span></h2>
          <p>Travella helps you plan holidays by suggesting the best destinations according to your budget. So, explore exciting travel destinations tailored to fit your budget on our site. Discover the perfect holiday spots without breaking the bank, Embark on unforgettable adventures without worrying about your wallet. Our site offers curated travel options to suit every budget, ensuring memorable experiences at affordable prices.</p>
        </div>      
      </div>
    </>
  );
}

export default Mainsection;
