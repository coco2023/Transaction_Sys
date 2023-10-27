package com.stripe.sample;

import java.nio.file.Paths;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import static spark.Spark.port;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.sample.Server.CreatePayment;
import com.stripe.sample.Server.CreatePaymentResponse;

import io.github.cdimascio.dotenv.Dotenv;

public class Server {
  private static Gson gson = new Gson();

  static class CreatePaymentItem {
    @SerializedName("id")
    String id;

    public String getId() {
      return id;
    }
  }

  static class CreatePayment {
    @SerializedName("items")
    CreatePaymentItem[] items;

    public CreatePaymentItem[] getItems() {
      return items;
    }
  }

  static class CreatePaymentResponse {
    private String clientSecret;

    public CreatePaymentResponse(String clientSecret) {
      this.clientSecret = clientSecret;
    }
  }

  static int calculateOrderAmount(Object[] items) {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  }

  public static void main(String[] args) {
    port(4242);
    staticFiles.externalLocation(Paths.get("public").toAbsolutePath().toString());

    // This is a public sample test API key.
    // Don’t submit any personally identifiable information in requests made with
    // this key.
    // Sign in to see your own test API key embedded in code samples.
    // Load environment variables from .env file
    Dotenv dotenv = Dotenv.configure().load();
    // Access environment variables
    Stripe.apiKey = dotenv.get("STRIPE_API_KEY");
    String stripeAPIKey = Stripe.apiKey;

    post("/create-payment-intent", (request, response) -> {
      response.type("application/json");
      CreatePayment postBody = gson.fromJson(request.body(), CreatePayment.class);

      // set the order info
      String YOUR_DOMAIN = "http://localhost:4242";
      String orderId = "12345"; // request.queryParams("order_id");
      String customerId = "customer_333"; // request.queryParams("customer_id");
      Long total_price = 80L; // Long.valueOf(request.queryParams("total-price"));
      String customerEmail = "work@gmail.com";

      PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
          .setAmount(total_price)
          .setCurrency("usd")
          // In the latest version of the API, specifying the `automatic_payment_methods`
          // parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
              PaymentIntentCreateParams.AutomaticPaymentMethods
                  .builder()
                  .setEnabled(true)
                  .build())
          .putMetadata("order_id", orderId)
          .putMetadata("customer_id", customerId)
          .putMetadata("total_price", total_price.toString())
          .putMetadata("customer_email", customerEmail)

          .build();

      // Create a PaymentIntent with the order amount and currency
      PaymentIntent paymentIntent = PaymentIntent.create(params);
      System.out.println("****paymentIntent: " + paymentIntent + ", ID: " + paymentIntent.getId());

      CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret());

      // // set a successUrl after finish the payment
      // String successUrl = YOUR_DOMAIN + "/success.html" +
      // "?order_id=" + orderId +
      // "&customer_id=" + customerId +
      // "&total_price=" + total_price +
      // "&payment_intent_id=" + paymentIntent.getId();

      // // Redirect to the successful URL
      // response.redirect(successUrl);

      return gson.toJson(paymentResponse);
      // return "";

    });
  }
}