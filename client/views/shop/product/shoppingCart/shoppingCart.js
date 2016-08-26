Session.setDefault('total',0.0);
Session.setDefault('isShowStripeProcessNotif',false);
handler = {};

hideLowerNotif = function(){
    $('.ui.positive.message').transition('hide');
};


Template.ShoppingCart.onRendered(function() {

    // vertically flip table
    $('.ui.selectable.large.table').transition('hide');
    $('.ui.selectable.large.table').transition('vertical flip');

    handler =  StripeCheckout.configure({
        key: 'pk_test_3oPENdHQ65sigMm5Hpp47Rkh',
        image: 'https://s3.amazonaws.com/stripe-uploads/acct_18hIJbEtRwJmPSv0merchant-icon-1470919150448-TG_black_on_white.jpg',
        locale: 'auto',
        bitcoin: true,
        billingAddress: true
    });
});


Template.ShoppingCart.events({
    'click #customButton': function(e) {

        // give user reinforcement for checking out
        $('.ui.button').transition('tada');

        // Open Checkout with further options:
        handler.open({
            name: 'TG Hair Toppers',
            description: 'Go forward, faith will come to you',
            amount: (Session.get('total') * 100),
            token: function(token) {

                // show a message on successful processing of request for 3s, then hide
                // animation for lower notification
                $('.ui.positive.message').transition('hide');
                $('.ui.positive.message').transition('fade');
                setTimeout(hideLowerNotif,3000);

                Session.set('isShowStripeProcessNotif',true);

                // create a new customer or do nothing if returning customer

                // create an order with shopping cart items

                // charge the customer for the order using their payment token
                Meteor.call('chargeCard', Session.get('total'), token.id, token.email, function (error) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log('chargeCard has been invoked!');
                        console.log(token.id);
                        console.log(token.email);
                        console.log(Session.get('total'));
                    }
                });

            }
        });

        e.preventDefault();
    },
    "click #closeStripeProcessNotif": function () {
        Session.set('isShowStripeProcessNotif',false);
    }
});

Template.ShoppingCart.helpers({
    shoppingCart : function () {
        return ShoppingCart.find({});
    },
    cartItemQuantity: function () {
        /*
         * return collection of shopping cart objects and convert to list
         * filter for items where the isAdded property is true
         * map over list of added products to get a sum of quantities of items
         * reduce to obtain summation of quantities; accumulator set to 0
        */
        const xs = ShoppingCart.find({}).fetch();
        const ys = xs.filter(obj => obj.isAdded);
        const zs = ys.map(obj => obj.quantity);
        return zs.reduce((x,y) => x + y,0);
    },
    subtotal: function () {
        /*
         * return collection of shopping cart objects and convert to list
         * filter for items where the isAdded property is true
         * map over list of added products to get a sum of products of price * quantity
         * reduce to obtain summation of item prices in shopping cart; accumulator set to 0
        */
        const xs = ShoppingCart.find({}).fetch();
        const ys = xs.filter(obj => obj.isAdded);
        const zs = ys.map(obj => obj.price * obj.quantity);
        Session.set('total',zs.reduce((x,y) => x + y,0));
        return zs.reduce((x,y) => x + y,0);
    },
    isShowStripeProcessNotif: function () {
        return Session.get('isShowStripeProcessNotif');
    }
});