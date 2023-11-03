import React from "react";
import "./prac.css"; // Make sure to import your CSS file

const Prac = () => {
  return (
    <div className="container">
      <div className="product-image">
        <div className="product-image-small">
          <img
            src="/assets/img/img_slider/image-slider-1.jpg"
            alt="Small Image"
          />
          <img
            src="/assets/img/img_slider/image-slider-1.jpg"
            alt="Small Image"
          />
          <img
            src="/assets/img/img_slider/image-slider-1.jpg"
            alt="Small Image"
          />
          <img
            src="/assets/img/img_slider/image-slider-1.jpg"
            alt="Small Image"
          />
        </div>

        <div className="product-image-overview">
          <img src="/assets/img/img_overview/1.jpg" alt="Big Image" />
        </div>
      </div>

      <div className="product-info">
        <h1>Hello!</h1>
      </div>
    </div>
  );
};

export default Prac;
