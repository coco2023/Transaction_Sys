package com.stripe.sample;

import java.nio.file.Paths;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import io.github.cdimascio.dotenv.Dotenv;

public class Server {

  public static void main(String[] args) {
    String YOUR_DOMAIN = "http://localhost:4242";
    port(4242);

    // Load environment variables from .env file
    Dotenv dotenv = Dotenv.configure().load();
    Stripe.apiKey = dotenv.get("STRIPE_API_KEY");

    staticFiles.externalLocation(
        Paths.get("public").toAbsolutePath().toString());

    post("/create-checkout-session", (request, response) -> {

      String orderId = request.queryParams("order_id");
      String customerId = request.queryParams("customer_id");
      String currency = "usd";
      String product_1 = "iphone13";
      String image_1 = "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-13-pink-09142021?fmt=webp";
      String product_2 = "iphone15";
      String image_2 = "https://ss7.vzw.com/is/image/VerizonWireless/iphone-14-purple-fall22-a";
      Long totalPrice = Long.valueOf(request.queryParams("total-price"));
      Long quantity = 1L;
      String customerEmail = "work@gmail.com";

      SessionCreateParams params = SessionCreateParams.builder()
          .setMode(SessionCreateParams.Mode.PAYMENT)
          .setCustomerEmail(customerEmail)
          .putMetadata("custom_order_id", orderId) // Set the custom_order_id metadata key
          .putMetadata("custom_id", customerId) // Set the custom_order_id metadata key
          .setSuccessUrl(
              YOUR_DOMAIN +
                  "/success.html?payment_intent_id={CHECKOUT_SESSION_ID}&stripe_api_key=" + Stripe.apiKey)
          .setCancelUrl(YOUR_DOMAIN + "/cancel.html")

          .addLineItem(
              SessionCreateParams.LineItem.builder()
                  .setQuantity(quantity) // the quantity of the line item being purchased
                  .setPriceData( // Data used to generate a new Price object inline
                      SessionCreateParams.LineItem.PriceData.builder()
                          .setCurrency(currency)
                          .setUnitAmount(totalPrice) // Amount in cents representing how much to charge (e.g., $50.00)
                          .setProductData( // Data used to generate a new product object inline
                              SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                  .setName(product_1)
                                  .addImage(image_1)
                                  .build())
                          .build())
                  .build())
          .build();

      Session session = Session.create(params);

      response.redirect(session.getUrl(), 303);
      return "";
    });
  }
}