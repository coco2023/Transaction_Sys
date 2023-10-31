$(document).ready(function () {
  // Function to extract query parameters from the URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Get the payment_intent_id & stripe_api_key from the URL
  const paymentIntentId = getQueryParam("payment_intent_id");
  const stripeAPIKey = getQueryParam("stripe_api_key");
  console.log(
    "paymentIntentId: " + paymentIntentId,
    "stripeAPIKey: " + stripeAPIKey
  );

  // Replace with your Stripe API endpoint for retrieving payment events
  const stripeEndpoint = `https://api.stripe.com/v1/checkout/sessions/${paymentIntentId}`;
  console.log("stripeEndpoint: " + stripeEndpoint);

  // Make an AJAX request to fetch the payment event data from Stripe
  $.ajax({
    url: stripeEndpoint,
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      // Set the Stripe API key in the request headers
      xhr.setRequestHeader("Authorization", `Bearer ${stripeAPIKey}`);
    },
    success: function (data) {
      console.log("data: " + JSON.stringify(data));

      const checkoutDetails = document.getElementById("checkout-details");

      // Function to display checkout session details
      function displayCheckoutDetails(data) {
        // Create HTML content to display the details
        const detailsHTML = `
                  <div class="session-details">
                      <h2>Checkout Session Details</h2>
                      
                      <div class="detail-item">
                          <span class="description">ID:</span>
                          <span class="value id-value">${data.id}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Payment Intent ID:</span>
                          <span class="value">${data.payment_intent}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Object:</span>
                          <span class="value">${data.object}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer:</span>
                          <span class="value">${data.customer_details.name}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer Email:</span>
                          <span class="value">${data.customer_email}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer ID:</span>
                          <span class="value">${data.metadata.custom_id}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Order ID:</span>
                          <span class="value">${data.metadata.custom_order_id}</span>
                      </div>
                </div>

                    `;

        // Update the 'order-details' div with the details
        checkoutDetails.innerHTML = detailsHTML;
      }

      // Call the function to display checkout session details
      displayCheckoutDetails(data);
    },
    error: function (xhr, textStatus, error) {
      console.error("Error fetching payment event data:", error);
    },
  });
});
