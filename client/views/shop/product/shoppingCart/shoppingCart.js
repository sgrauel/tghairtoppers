Session.setDefault('total',0.0);
Session.setDefault('final_total',0.0);
Session.setDefault('shipping_cost',0.0);
Selected_shipping_method = '';
Session.setDefault('isShowStripeProcessNotif',false);
Session.setDefault('showSubtotalPlusST',false);
Session.setDefault('order',{});
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
        bitcoin: false
        /*,
        billingAddress: true,
        shippingAddress: true
        */
    });
});

Template.ShoppingCart.onDestroyed(function() {
  Session.set('showSubtotalPlusST', false);
});

Template.ShoppingCart.events({
    'click #customButton': function(e) {

        // give user reinforcement for checking out
        $('.ui.button').transition('tada');

        // Open Checkout with further options:
        handler.open({
            name: 'T.G. Hair Toppers, Inc.',
            description: 'Go forward, faith will come to you',
            amount: (Session.get('final_total') * 100),
            email: 'shawn.m.grauel@gmail.com',
            token: function(token) {

                // console.log(token);
                // show a message on successful processing of request for 3s, then hide
                // animation for lower notification
                $('.ui.positive.message').transition('hide');
                $('.ui.positive.message').transition('fade');
                setTimeout(hideLowerNotif,3000);
                Session.set('isShowStripeProcessNotif',true);


                // (i) charge the customer for the order using their payment token
                // creates a Charge object

                const ids = {
                  'order_id': Session.get('order').id,
                  'selected_shipping_id': Session.get('shipping_methods')[Selected_shipping_method]._id
                };

                Meteor.call('chargeCard', Session.get('final_total'), token.id, ids, function (error) {
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
        return Session.get('total');
        //return zs.reduce((x,y) => x + y,0);
    },
    isShowStripeProcessNotif: function () {
        return Session.get('isShowStripeProcessNotif');
    },
    printShippingMethods: function () {
      let shipping_methods = Session.get('order').shipping_methods;
      for (let i = 0; i < shipping_methods.length; i++) {
        shipping_methods[i].amount = (shipping_methods[i].amount * 0.01).toFixed(2);
        shipping_methods[i]._id = shipping_methods[i].id;
        shipping_methods[i].id = i;
      }
      Session.set('shipping_methods',shipping_methods);
      return Session.get('shipping_methods');
    },
    subtotalPlusST: function() {
      // calculate taxes
      const items = Session.get('order').items;
      const taxItems = items.filter(item => item.type == 'tax');
      let taxes = parseFloat(taxItems[0].amount);

      let shipping_cost = parseFloat(Session.get('shipping_cost'));
      let total = Session.get('total');
      let final_total =  (total + shipping_cost + taxes);
      Session.set('final_total',final_total);
      return Session.get('final_total');
    },
    showSubtotalPlusST: function() {
      return Session.get('showSubtotalPlusST');
    },
    taxesFunc: function() {
      const items = Session.get('order').items;
      const taxItems = items.filter(item => item.type == 'tax');
      console.log(typeof parseInt(taxItems[0]));
      return taxItems[0];
    }
});
