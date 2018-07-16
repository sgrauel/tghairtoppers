let myShippingAddress = {};

Template.ShippingAddress.onRendered(function() {
    myShippingAddress = $('#myShippingAddress');
});


Template.ShippingAddress.events({
    'submit #myShippingAddress': function (event) {

        // prevent form from submitting (along with event func. returning false)
        event.preventDefault();

        // grab data from input fields
        const shippingContactForm = {
            email: myShippingAddress.find('[name=email]').val(),
            name: (myShippingAddress.find('[name=first_name]').val() + ' ' + myShippingAddress.find('[name=last_name]').val()),
            address_line1: myShippingAddress.find('[name=address]').val(),
            city: myShippingAddress.find('[name=city]').val(),
            state: myShippingAddress.find('[name=state]').val(),
            zip: myShippingAddress.find('[name=zip]').val(),
            country: myShippingAddress.find('[name=country]').val()
        };

        console.log(shippingContactForm);


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
               line1: shippingContactForm.address_line1  ,
               city: shippingContactForm.city,
               state: shippingContactForm.state,
               postal_code: shippingContactForm.zip,
               country: shippingContactForm.country,
             },
           },
         }

        // call getContact method to insert Contact object into Contacts collection and send email
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
