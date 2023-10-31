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
                          <span class="description">ID</span>
                          <span class="value id-value">${data.id}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Payment Intent ID</span>
                          <span class="value">${data.payment_intent}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Object</span>
                          <span class="value">${data.object}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer</span>
                          <span class="value">${data.customer_details.name}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer Email</span>
                          <span class="value">${data.customer_email}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Customer ID</span>
                          <span class="value">${data.metadata.custom_id}</span>
                      </div>
                      
                      <div class="detail-item">
                          <span class="description">Order ID</span>
                          <span class="value">${data.metadata.custom_order_id}</span>
                      </div>

                      <div class="detail-item">
                        <span class="description">Subtotal (Cents)</span>
                        <span class="value">${data.amount_subtotal}</span>
                      </div>

                      <div class="detail-item">
                        <span class="description">Total (Cents)</span>
                        <span class="value">${data.amount_total}</span>
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

  // download as pdf
  $("#download-btn").on("click", function () {
    const pdf = new window.jspdf.jsPDF();

    let yOffset = 20; // starting vertical position
    const maxWidth = 80; // maximum width for the value text in the PDF

    // Iterate through each item in checkout details
    $("#checkout-details .detail-item").each(function (index, item) {
      let description = $(item).find(".description").text();
      let value = $(item).find(".value").text();

      // If the text is for 'ID', we wrap it if it's too long
      if (description === "ID") {
        value = pdf.splitTextToSize(value, maxWidth);
      }

      // Add each item to the PDF
      pdf.text(description, 10, yOffset);
      pdf.text(value, 100, yOffset); // Adjust x position as needed

      yOffset += (Array.isArray(value) ? value.length : 1) * 10;  // Move down for next item, considering potential wrapped lines
    });

    pdf.save("checkout_details.pdf");
  });

  // // download as html viewd pdf
  // $("#download-btn").on("click", function () {
  //   var element = document.getElementById("checkout-details");

  //   html2canvas(element).then(function (canvas) {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new window.jspdf.jsPDF({
  //       orientation: "portrait",
  //     });

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("checkout_details.pdf");
  //   });
  // });

  // // Download as PDF functionality
  // $("#download-btn").on("click", function () {
  //   const { jsPDF } = window.jspdf;
  //   const doc = new jsPDF();
  //   doc.text("Checkout Session Details", 10, 10);
  //   doc.text("ID: " + $(".id-value").text(), 10, 20);
  //   doc.text("Payment Intent ID: " + $(".payment-intent-value").text(), 10, 30);
  //   // Continue for other details...
  //   doc.save("checkout_details.pdf");
  // });

  //   // Download functionality as html
  //   $("#download-btn").on("click", function() {
  //     var content = $("#checkout-details").prop('outerHTML');
  //     var blob = new Blob([content], { type: "text/html" });
  //     var url = window.URL.createObjectURL(blob);
  //     var a = document.createElement("a");
  //     a.href = url;
  //     a.download = "checkout_details.pdf";
  //     document.body.appendChild(a); // Necessary for Firefox
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a); // Cleanup
  // });
});
