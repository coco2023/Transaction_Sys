package com.stripe.sample;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import spark.ModelAndView;
import spark.Request;
import spark.Response;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import spark.Route;
import spark.Spark;
import io.github.cdimascio.dotenv.Dotenv;

public class Server {

  public static void main(String[] args) {
    port(4242);

    // Load environment variables from .env file
    Dotenv dotenv = Dotenv.configure().load();
    // Access environment variables
    Stripe.apiKey = dotenv.get("STRIPE_API_KEY");
    String stripeAPIKey = Stripe.apiKey;

    staticFiles.externalLocation(
        Paths.get("public").toAbsolutePath().toString());

    post("/create-checkout-session", (request, response) -> {
      String YOUR_DOMAIN = "http://localhost:4242";
      String orderId = request.queryParams("order_id");
      String customerId = request.queryParams("customer_id");
      Long total_price = Long.valueOf(request.queryParams("total-price"));
      String customerEmail = "work@gmail.com";

      SessionCreateParams params = SessionCreateParams.builder()
          .setMode(SessionCreateParams.Mode.PAYMENT)
          .setSuccessUrl(
              YOUR_DOMAIN +
                  "/success.html?payment_intent_id={CHECKOUT_SESSION_ID}&stripe_api_key=" + stripeAPIKey)
          // "/success")
          .setCancelUrl(YOUR_DOMAIN + "/cancel.html")
          .setCustomerEmail(customerEmail)
          .addLineItem(
              SessionCreateParams.LineItem.builder()
                  .setQuantity(1L)
                  .setPriceData(
                      SessionCreateParams.LineItem.PriceData.builder()
                          .setCurrency("usd")
                          .setUnitAmount(total_price) // Amount in cents (e.g., $50.00)
                          .setProductData(
                              SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                  .setName(orderId)
                                  .build())
                          .build())
                  .build())
          .putMetadata("custom_order_id", orderId) // Set the custom_order_id metadata key
          .putMetadata("custom_id", customerId) // Set the custom_order_id metadata key

          .build();

      Session session = Session.create(params);

      // // Store payment_intent_id in the session
      // request.session().attribute("payment_intent_id", session.getPaymentIntent());
      // request.session().attribute("stripe_api_key", stripeAPIKey);
      // System.out.println(request);

      response.redirect(session.getUrl(), 303);
      return "";
    });

    // Define a route for the success page
    get("/success", new Route() {
      @Override
      public Object handle(Request request, Response response) throws Exception {

        // Retrieve payment_intent_id and stripeAPIKey from session or server-side
        // storage
        String paymentIntentId = request.session().attribute("payment_intent_id"); // request.queryParams("payment_intent_id");
                                                                                   // // Retrieve payment_intent_id from
                                                                                   // session or
        // storage
        String stripeAPIKey = request.session().attribute("stripe_api_key"); // request.queryParams("stripe_api_key");
                                                                             // // Retrieve stripeAPIKey from session or
                                                                             // storage

        // String paymentIntentId = request.queryParams("payment_intent_id");

        // // Handle success and update your order status
        // // use paymentIntentId to retrieve payment details
        // // Redirect or display a success message
        System.out.println("paymentId: " + paymentIntentId);
        System.out.println("stripe_api_key: " + stripeAPIKey);

        // Fetch payment details and any other necessary data from Stripe using
        // paymentIntentId
        // Keep stripeAPIKey secure on the server-side and do not expose it to the
        // client-side.
        Map<String, Object> model = new HashMap<>();
        model.put("paymentIntentId", paymentIntentId);
        model.put("stripeAPIKey", stripeAPIKey); // Pass the Stripe API key to the client-side

        // return "";
        return new ModelAndView(model, "/success");

      }
    });

    // Define a route for the cancel page
    get("/cancel", new Route() {
      @Override
      public Object handle(Request request, Response response) throws Exception {
        // Handle payment cancellation
        // Redirect or display a cancellation message
        return "Payment cancelled.";
      }
    });

  }
}