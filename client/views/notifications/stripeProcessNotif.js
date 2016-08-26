removeNotif = function() {

    $('.ui.fixed.top.sticky.positive.message').transition('drop');

    Session.set('isShowStripeProcessNotif',false);

};


Template.stripeProcessNotif.onRendered(function(){

    // animation for top notification
    $('.ui.fixed.top.sticky.positive.message').transition('hide');
    $('.ui.fixed.top.sticky.positive.message').transition('drop');

    setTimeout(removeNotif,3000);

});