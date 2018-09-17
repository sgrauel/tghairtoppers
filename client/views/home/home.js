Accounts.onLogin(function(){

  ga('set', 'page', '/login');
  ga('send', 'pageview')

  /*
  // login segmentation by new user / returning user
  let userId = Meteor.userId();
  let user = Meteor.user();

  console.log('hasNotLoginCount: ' + !Meteor.user().profile.hasOwnProperty('login_count'));
  if (!Meteor.user().profile.hasOwnProperty('login_count')) {
    Meteor.users.update({"_id": userId},{$set: {"profile.login_count": 1 }});
    // Meteor.users.update({_id: userId, login_count: {$exists: false}},{$set: {login_count: 1 }});

  } else {
    const inc = user.profile.login_count + 1;
    // Meteor.users.update({_id: userId},{$set: {login_count: inc }});
    Meteor.users.update({"_id": userId},{$set: {"profile.login_count": inc }});
  }

  user = Meteor.user();

  console.log('user login count: ' + user.profile.login_count);
  if (user.profile.login_count > 1) {
    ga('send', 'pageview', {
      'dimension1' : 'false'
    });
  } else {
    ga('send', 'pageview', {
      'dimension1' : 'true'
    });
  }
  */

});


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
