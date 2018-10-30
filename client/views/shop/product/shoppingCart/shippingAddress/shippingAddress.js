let myShippingAddress = {};
Email = '';
Wholesale = false;

Template.ShippingAddress.onRendered(function() {
    myShippingAddress = $('#myShippingAddress');

    myShippingAddress.form({
        inline: false,
        fields: {
            email: {
                identifier: 'email',
                rules: [
                  {
                      type : 'empty',
                      prompt : 'Email is required'
                  },
                  {
                      type : 'email',
                      prompt : 'Invalid email'
                  }
                ]
            },
            first_name: {
                identifier: 'first_name',
                rules: [
                  {
                      type : 'empty',
                      prompt : 'First name is required'
                  },
                  {
                      type : 'regExp[/^[A-Z][a-z]*$/]',
                      prompt : 'Invalid first name. Did you capitalize your first name?'
                  }
                ]
            },
            last_name: {
                identifier: 'last_name',
                rules: [
                  {
                      type : 'empty',
                      prompt : 'Last name is required'
                  },
                  {
                      type : 'regExp[/^[A-Z][a-z]*$/]',
                      prompt : 'Invalid last name. Did you capitalize your last name?'
                  }
                ]

            },
            address: {
                identifier: 'address',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Address is required'
                    }
                ]

            },
            city: {
                identifier: 'city',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'City is required'
                    }
                ]

            },
            state: {
                identifier: 'state',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'State is required'
                    }
                ]

            },
            zip: {
                identifier: 'zip',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Zipcode is required'
                    },
                    {
                        type : 'regExp[/^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/]',
                        prompt : 'Invalid zip code'
                    }
                ]

            },
            country: {
                identifier: 'country',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Country is required'
                    }
                ]

            }
        }
    });
});


Template.ShippingAddress.events({
    'submit #myShippingAddress': function (event) {

       Session.set('showShipping', true);
        // prevent form from submitting (along with event func. returning false)
        event.preventDefault();

        // virtual page view for form submission
        ga('set', 'page', '/estimate_button');
        ga('send', 'pageview');

        // give user reinforcement for checking out
        $('.ui.button').transition('tada');

        // grab data from input fields
        const shippingContactForm = {
            isWholesale: myShippingAddress.find('[name=wholesale]').val(),
            email: myShippingAddress.find('[name=email]').val(),
            name: (myShippingAddress.find('[name=first_name]').val() + ' ' + myShippingAddress.find('[name=last_name]').val()),
            address_line1: myShippingAddress.find('[name=address]').val(),
            address_line2: myShippingAddress.find('[name=address2]').val(),
            city: myShippingAddress.find('[name=city]').val(),
            state: myShippingAddress.find('[name=state]').val(),
            zip: myShippingAddress.find('[name=zip]').val(),
            country: myShippingAddress.find('[name=country]').val()
        };

        Email = shippingContactForm.email;

        // set global variable wholesale to segment/track wholesale vs. regular users
        if (shippingContactForm.isWholesale == "on") {
          Wholesale = true;
        } else {
          Wholesale = false;
        }


        // create a new order using Stripe order's API
        class SKU {
          constructor(id,quantity) {
            this.type = 'sku';
            this.parent = id.toString();
            this.quantity = quantity;
          }
        }

        let shoppingCartXs = ShoppingCart.find({}).fetch();
        shoppingCartXs = shoppingCartXs.filter(item => item.isAdded);
        shoppingCartXs = shoppingCartXs.map(item => new SKU(item.id, item.quantity));

        const config = {
           currency: 'usd',
           email: shippingContactForm.email,
           items: shoppingCartXs,
           shipping: {
             name: shippingContactForm.name,
             address: {
               line1: shippingContactForm.address_line1,
               city: shippingContactForm.city,
               state: shippingContactForm.state,
               postal_code: shippingContactForm.zip,
               country: shippingContactForm.country,
             }
           },
           metadata: {
             'address_line2': shippingContactForm.address_line2,
             'isWholesale' : Wholesale
           }
         };

        Meteor.call('createOrder',config,function(err,result) {
            if (!err) {
                console.log("Submitted!");
                console.log(result);
                Session.set('order',result);
                // console.log(result.shipping_methods);
                // methods = result.shipping_methods;
                // methods.map(method => ShippingMethods.insert(method));
            } else {
                console.err("Something went wrong");
                console.err(err);
            }
        });

    }
});
