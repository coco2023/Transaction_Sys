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
    Stripe.apiKey = dotenv.get("STRIPE_API_KEY");

    staticFiles.externalLocation(
        Paths.get("public").toAbsolutePath().toString());

    post("/create-checkout-session", (request, response) -> {

      String YOUR_DOMAIN = "http://localhost:4242";
      String orderId = request.queryParams("order_id");
      String customerId = request.queryParams("customer_id");
      Long totalPrice = Long.valueOf(request.queryParams("total-price"));
      String customerEmail = "work@gmail.com";

      SessionCreateParams params = SessionCreateParams.builder()
          .setMode(SessionCreateParams.Mode.PAYMENT)
          .setSuccessUrl(
              YOUR_DOMAIN +
                  "/success.html?payment_intent_id={CHECKOUT_SESSION_ID}&stripe_api_key=" + Stripe.apiKey)
          .setCancelUrl(YOUR_DOMAIN + "/cancel.html")
          .setCustomerEmail(customerEmail)
          .addLineItem(
              SessionCreateParams.LineItem.builder()
                  .setQuantity(1L)
                  .setPriceData(
                      SessionCreateParams.LineItem.PriceData.builder()
                          .setCurrency("usd")
                          .setUnitAmount(totalPrice) // Amount in cents (e.g., $50.00)
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

      response.redirect(session.getUrl(), 303);
      return "";
    });
  }
}