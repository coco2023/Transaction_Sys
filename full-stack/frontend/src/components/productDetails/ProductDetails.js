import React, { useState } from "react";
import "./product-details-style.css";

const ProductDetails = () => {
  // State for the selected price and custom price
  const [customPrice, setCustomPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("1000"); // Default selected value

  const handlePriceChange = (event) => {
    setTotalPrice(event.target.value);
    // If custom price is selected, clear the custom price input
    if (event.target.value !== "custom") {
      setCustomPrice("");
    }
  };

  const handleCustomPriceChange = (event) => {
    setCustomPrice(event.target.value);
    // Automatically select the custom price option
    setTotalPrice("custom");
  };

  return (
    <div className="container">
      <div className="product-image">
        <img
          src="https://p9.itc.cn/q_70/images03/20230725/f00f781f18c3436083de53f999ce6654.jpeg"
          alt="Product"
        />
      </div>
      <div className="product-info">
        <h1>Donate UmiUni !</h1>
        <span className="rating">
          ⭐⭐⭐⭐⭐ 6.66 ( Wish you all the best! )
        </span>
        <p className="description">
          Thank you to all who have generously donated to UmiUni. 🌳🌸🌟
          <br />
          Your kindness not only supports our mission but also reinforces the
          belief that together 👭💜🌼
          <br />
          we can make a big difference! 💪🚀🎯
          <br />
          Here's to a brighter and unified future! 🌊💙💖💫💌
        </p>

        <form id="checkout-form" method="POST" action="http://localhost:4242/create-checkout-session">
          <p className="price" id="displayPrice">
            ${(totalPrice === "custom" ? customPrice : totalPrice) / 100}
          </p>

          <div className="product-options">
            <label className="option-label">
              <input
                type="radio"
                name="totalPrice"
                value="1000"
                checked={totalPrice === "1000"}
                onChange={handlePriceChange}
              />
              <div className="product-wrapper">
                <img
                  src="https://inews.gtimg.com/om_bt/OulEPZqTuYgSUe1sup0B5VtZ7bGeukZjaDuWg0W6VGunkAA/641"
                  className="product-image"
                />
                <span className="product-description">$10.00</span>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="totalPrice"
                value="5000"
                checked={totalPrice === "5000"}
                onChange={handlePriceChange}
              />
              <div className="product-wrapper">
                <img
                  src="http://pic.enorth.com.cn/005/007/154/00500715496_e4b9c075.png"
                  alt="Brown Bag"
                  className="product-image"
                />
                <span className="product-description">$50.00</span>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="totalPrice"
                value="10000"
                checked={totalPrice === "10000"}
                onChange={handlePriceChange}
              />
              <div className="product-wrapper">
                <img
                  src="https://inews.gtimg.com/om_bt/OulEPZqTuYgSUe1sup0B5VtZ7bGeukZjaDuWg0W6VGunkAA/641"
                  alt="test-pic"
                  className="product-image"
                />
                <span className="product-description">$100.00</span>
              </div>
            </label>

            <div className="option-label custom-price-option">
              <div className="custom-price-container">
                <label htmlFor="customPrice" className="custom-price-label">
                  Customize Price ($ cent)
                  <br />
                  <input
                    type="text"
                    id="customPrice"
                    name="customPrice"
                    value={customPrice}
                    placeholder="Enter custom price $ cent"
                    onChange={handleCustomPriceChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-order">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
