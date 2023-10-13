import React from 'react';
import './GetStarted.css';

const GetStarted = () => {
  return (
    <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
            <div className="flexColCenter inner-container">
                <span className='primaryText'>Get Started with Us</span>
                <span className='secondaryText'>
                    Subscribe our service
                    <br/>
                    For your success
                </span>
                <button className="button">
                    <a href="mailto:abc@test.com">Get Started</a>
                </button>
            </div>
        </div>
    </section>
  )
};

export default GetStarted;
