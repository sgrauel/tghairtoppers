Stripe = StripeAPI('sk_test_28pvn0BRfYU4RKc7wTU1Qt02');
Result = {}
Config = {}

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
    chargeCard: function(amt, stripeTokenId) {

        const amtCents = amt * 100;

        Stripe.charges.create({
            amount: amtCents,
            currency: "usd",
            source: stripeTokenId, // obtained with Stripe.js
            description: ("Charge of " + amt + " to " + Config.email),
            receipt_email: Config.email,
            metadata: {
              "name": Config.shipping.name,
              "address_line1": Config.shipping.address.line1,
              "address_line2": Config.metadata.address_line2,
              "city": Config.shipping.address.city,
              "state": Config.shipping.address.state,
              "postal_code": Config.shipping.address.postal_code,
              "country": Config.shipping.address.country
            }
        }, function(err, charge) {
            console.log("stripe failed to create a charge on " + stripeTokenId);
            console.log(err);
            console.log(charge);
        });

    },
    createOrder: function(config) {

      const promise = Stripe.orders.create(config, function(err,result) {
        if (!err) {
          Config = config;
          console.log(result);
        } else {
          console.log('stripe failed to create an order for ' + config.email);
          console.log(err.message);
        }
      });

      console.log(promise);
      return promise;

    }
});
