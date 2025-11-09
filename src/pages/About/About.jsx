import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page-wrapper">
      <h1>About Us</h1>

      <p className="about-intro">
        Just Decor is a simple marketplace for people who love making their space feel like home. 
        We focus on quality pieces, clean design, and a smooth shopping experience without any clutter.
      </p>

      <div className="about-content-blocks">
        <div className="about-block">
          <h2>What We Offer</h2>
          <p>
            You’ll find a curated mix of wall art, lighting, small furniture, and handmade items. 
            Every product is selected with care so you can shop confidently.
          </p>
        </div>

        <div className="about-block">
          <h2>How We Work</h2>
          <p>
            We partner with independent creators and trusted suppliers. 
            Our goal is to make it easy for you to discover pieces that fit your style without feeling overwhelmed.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Promise</h2>
          <p>
            Fair pricing, clear descriptions, and helpful support. 
            If something feels off, we’re here to fix it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
