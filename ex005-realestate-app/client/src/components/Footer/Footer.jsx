import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <section className='f-wrapper'>
        <div className="paddings innerWidth flexCenter f-container">
            {/* left side */}
            <div className="flexColStart f-left">
                <img src="./logo2.png" alt="" width={120}/>
                <span className="secondaryText">
                    Our vision is to create a good life
                    <br/>
                    for everyone in the world.
                </span>
            </div>
            {/* right side */}
            <div className="flexColStart f-right">
                <span className='primaryText'>Information</span>
                <span className='secondaryText'>123 Some Town, ST 1234, Some Country</span>
                <div className="flexCenter f-menu">
                    <span>Property</span>
                    <span>Services</span>
                    <span>Product</span>
                    <span>About</span>
                </div>
            </div>
        </div>
    </section>    
  )
};

export default Footer;
