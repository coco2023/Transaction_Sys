$(document).ready(function () {
    // Replace with your Stripe API endpoint for retrieving payment events
    const stripeEndpoint = 'https://api.stripe.com/v1/events/cs_test_a1sYAXCQ3Kyx4KeRq4VxrWZoiTSoaV1x9E9ZwKgMDSBBuDxuEN';

    // Make an AJAX request to fetch the payment event data from Stripe
    $.ajax({
        url: stripeEndpoint,
        type: 'GET',
        beforeSend: function (xhr) {
            // Set the Stripe API key in the request headers
            xhr.setRequestHeader('Authorization', 'Bearer YOUR_STRIPE_API_KEY');
        },
        success: function (data) {
            // Function to display checkout session details
            function displayCheckoutDetails(data) {
                const checkoutDetails = document.getElementById('checkout-details');
                checkoutDetails.innerHTML = `
                    <p>ID: ${data.id}</p>
                    <p>Object: ${data.object}</p>
                    <p>Customer Email: ${data.customer_email}</p>
                    <p>Custom ID: ${data.metadata.custom_id}</p>
                    <p>Custom Order ID: ${data.metadata.custom_order_id}</p>
                    <p>Mode: ${data.mode}</p>
                    <p>Payment Intent: ${data.payment_intent}</p>
                    <p>Payment Status: ${data.payment_status}</p>
                    <p>Phone Number Collection Enabled: ${data.phone_number_collection.enabled}</p>
                `;
            }

            // Call the function to display checkout session details
            displayCheckoutDetails(data.object);
        },
        error: function (xhr, textStatus, error) {
            console.error('Error fetching payment event data:', error);
        }
    });
});
