Stripe = StripeAPI('sk_test_28pvn0BRfYU4RKc7wTU1Qt02');

Meteor.methods({
    chargeCard: function(amt, stripeTokenId, email) {

        const amtCents = amt * 100;

        Stripe.charges.create({
            amount: amtCents,
            currency: "usd",
            source: stripeTokenId, // obtained with Stripe.js
            description: ("Charge of " + amt + " to " + email),
            receipt_email: email
        }, function(err, charge) {
            console.err("stripe failed to create a charge on " + stripeTokenId);
            console.log(err);
            console.log(charge);
        });

    }
});