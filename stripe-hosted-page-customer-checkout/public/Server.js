/**
 * basic settings
 */
const express = require("express");
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Middleware to serve static files from the 'pic' directory
const path = require("path");
app.use('/pic', express.static(__dirname + '/pic'));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config();

const YOUR_DOMAIN = "http://localhost:4242";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_API_KEY);

/**
 * generate orderId and customerId
 */
const crypto = require("crypto");
// Generate a unique ID using the prefix, current date/time, and a random number
function generateUniqueId(prefix) {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return (
    prefix +
    crypto
      .createHash("sha1")
      .update(current_date + random)
      .digest("hex")
  );
}

/**
 * set basic checkout information
 */
const orderId = generateUniqueId("ORDER_");
const customerId = generateUniqueId("CUSTOMER_");
console.log("Generated Order ID:", orderId);
console.log("Generated Customer ID:", customerId);
const currency = "usd";
const product_1 = "UmiUni Donation";
const image_1 = `http://us.umiuni.com/static/media/umiunilogo.a719a0b5ab0c15d2fa0d.jpg`;

/**
 * send checkout post request
 */
app.post("/create-checkout-session", async (req, res) => {
  const totalPrice = req.body.totalPrice
    ? req.body.totalPrice
    : req.body.customPrice;
  if (isNaN(totalPrice)) {
    return res.status(400).send("Invalid total_price provided.");
  }

  const quantity = 1;
  const customerEmail = "work@gmail.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      metadata: {
        custom_order_id: orderId,
        custom_id: customerId,
      },
      success_url: `${YOUR_DOMAIN}/success.html?payment_intent_id={CHECKOUT_SESSION_ID}&stripe_api_key=${process.env.STRIPE_API_KEY}`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: product_1,
              images: [image_1],
            },
            unit_amount: totalPrice, // Stripe works with the smallest currency unit, like cents
          },
          quantity: quantity,
        },
      ],
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Stripe Checkout session");
  }
});

app.listen(4242, () => {
  console.log("Server started on http://localhost:4242");
});
