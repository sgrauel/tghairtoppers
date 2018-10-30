Stripe = StripeAPI(Meteor.settings.private.stripe_test);
Result = {}
Config = {}
Billing_Addr = {}

Meteor.methods({
    setBillingAddr: function(billing_addr) {
        Billing_Addr = billing_addr;
    },
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
    chargeCard: async function(amt,stripeToken,ids,same_ship) {

        // set billing information for payment
        let billing_info = {};

        if (same_ship) {
          billing_info.address_line1 = Config.shipping.address.line1
          billing_info.address_line2 = Config.metadata.address_line2
          billing_info.address_city = Config.shipping.address.city
          billing_info.address_state = Config.shipping.address.state
          billing_info.address_country = Config.shipping.address.country
          billing_info.address_zip = Config.shipping.address.postal_code
        } else {
          billing_info.address_line1 = Billing_Addr.address_line1
          billing_info.address_line2 = Billing_Addr.address_line2
          billing_info.address_city = Billing_Addr.city
          billing_info.address_state = Billing_Addr.state
          billing_info.address_country = Billing_Addr.country
          billing_info.address_zip = Billing_Addr.zip
        }

        const customer = await Stripe.customers.create({
          description: 'Customer for ' + Config.email,
          source: stripeToken.id, // obtained with Stripe.js
          email: Config.email,
          shipping: {
            address: {
              line1: Config.shipping.address.line1,
              line2: Config.metadata.address_line2,
              city: Config.shipping.address.city,
              state: Config.shipping.address.state,
              country: Config.shipping.address.country,
              postal_code: Config.shipping.address.postal_code
            },
            name: Config.shipping.name
            // phone:
          },
          metadata: {
            'isWholesale': Config.metadata.isWholesale
          }
        });

        console.log('customer:');
        console.log(customer);

        // update card info with billing address
        const card = await Stripe.customers.updateCard(
          customer.id,
          stripeToken.card.id,
          billing_info);

        console.log('card:');
        console.log(card);

        // charge card
        const amtCents = amt * 100;

        Stripe.charges.create({
            amount: amtCents,
            currency: "usd",
            source: card.id, // obtained with Stripe.js
            description: ("Charge of " + amt + " to " + Config.email),
            receipt_email: Config.email,
            shipping: {
              address: {
                line1: Config.shipping.address.line1,
                line2: Config.metadata.address_line2,
                city: Config.shipping.address.city,
                state: Config.shipping.address.state,
                country: Config.shipping.address.country,
                postal_code: Config.shipping.address.postal_code
              },
              name: Config.shipping.name
            },
            customer: customer.id
        }, function(err, charge) {
            if(!err){
              Stripe.orders.update(ids.order_id,{
                'selected_shipping_method': ids.selected_shipping_id
              }, function(err) {
                if (!err) {
                  console.log('update succeeded!');
                } else {
                  console.log('update failed');
                  console.log(err.message);
                }
              });
            } {
              console.log("stripe failed to create a charge on " + stripeToken.id);
              console.log(err);
              console.log(charge);
            }
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
