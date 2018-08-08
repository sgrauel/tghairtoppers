Template.Home.events({
   "click #bookingButton": function() {
       var user = Meteor.users.findOne();
       var isVerified = user.emails[0].verified;

       if (!isVerified) {
           $('.small.modal').modal('show');
       }
   }
});


Template.Home.onRendered(function () {

    $('.ui.center.aligned.segment').transition('hide');
    $('.ui.center.aligned.segment').transition('horizontal flip');
    $('.ui.centered.medium.bordered.circular.image').transition('flash');

});

Template.Home.onCreated(function () {
    ga('send', 'pageview');
});
