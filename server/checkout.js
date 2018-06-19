Stripe = StripeAPI('sk_test_28pvn0BRfYU4RKc7wTU1Qt02');

Meteor.methods({
    /*
    TASK: charges customer credit card
    INPUT:
      i. subtotal of charges in dollars from the shopping cart
      ii. stripe token id
      iii. customer email
    OUTPUT: create a charge object at Stripe API endpoint
      * amount
      * stripeTokenId
      * email
     */
    chargeCard: function(amt, stripeTokenId, email) {

        const amtCents = amt * 100;

        Stripe.charges.create({
            amount: amtCents,
            currency: "usd",
            source: stripeTokenId, // obtained with Stripe.js
            description: ("Charge of " + amt + " to " + email),
            receipt_email: email
        }, function(err, charge) {
            console.log("stripe failed to create a charge on " + stripeTokenId);
            console.log(err);
            console.log(charge);
        });

    },
    createOrder: function(config) {
      const order = Stripe.orders.create(config, function(err) {
        console.log('stripe failed to create an order for ' + config.email);
        console.log(err);
      });
      return order;
    }
});
