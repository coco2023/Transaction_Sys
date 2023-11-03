// const express = require("express");
// const app = express();
// const PORT = 5000;

// const cors = require("cors");
// // Use it before your routes
// app.use(cors());

// app.get("/api", (req, res) => {
//   console.log("API endpoint hit!");
//   res.json({ message: "HIIIII!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const dotenv = require("dotenv");
dotenv.config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// frontend app calls' setup
const YOUR_DOMAIN = "http://localhost:3000";
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only the frontend origin during development
  })
);

// Generate a unique orderId and customerId using the prefix, current date/time, and a random number
const crypto = require("crypto");
function generateUniqueId(prefix) {
  const currentDate = new Date().valueOf().toString();
  const random = Math.random().toString();
  return (
    prefix +
    crypto
      .createHash("sha1")
      .update(currentDate + random)
      .digest("hex")
  );
}

// Generate IDs for the current checkout session
const orderId = generateUniqueId("ORDER_");
const customerId = generateUniqueId("CUSTOMER_");
const currency = "usd";
const product_1 = "UmiUni Donation";
const image_1 = `http://us.umiuni.com/static/media/umiunilogo.a719a0b5ab0c15d2fa0d.jpg`;

const quantity = 1;
const customerEmail = "customer@gmail.com"; // Replace this with the customer's email if available

app.post("/create-checkout-session", async (req, res) => {
  const totalPrice = req.body.totalPrice || req.body.customPrice;
  if (isNaN(totalPrice)) {
    return res.status(400).send("Invalid total_price provided.");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail, // Optional, only if you have the customer's email beforehand
      metadata: {
        custom_order_id: orderId,
        custom_id: customerId,
      },
      success_url: `${YOUR_DOMAIN}/success?payment_intent_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
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
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).send("Error creating Stripe Checkout session");
  }
});

app.listen(4242, () => {
  console.log("Server started on http://localhost:4242");
});
