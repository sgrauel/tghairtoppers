removeNegNotif = function() {

    $('.ui.fixed.top.sticky.negative.message').transition('drop');

    Session.set('isShowStripeNegNotif',false);

};


Template.stripeProcessNotif.onRendered(function(){

    // animation for top notification
    $('.ui.fixed.top.sticky.negative.message').transition('hide');
    $('.ui.fixed.top.sticky.negative.message').transition('drop');

    setTimeout(removeNegNotif,3000);

});

Template.stripeNegNotif.helpers({
    showShippingMethod: function() {
      return Session.get('shipping_methods')[Selected_shipping_method].description;
    }
});
