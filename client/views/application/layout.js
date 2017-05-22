Template.layout.helpers({
    menu: {
        home2: function() { return Router.current().route.getName() == 'Home'; }
    },
    isNotContactPage: function() { return !(Router.current().route.getName() === 'Contact'); },
    isNotServicesPage: function() { return Session.get("_isViewProduct") || !(Router.current().route.getName() === 'Shop'); }
});


Template.layout.events({
   "click #viewWigCareServices" : function () {
       Session.set("_isViewProduct",false);
   }
});

Template.layout.onRendered(function() {
    $('.ui.massive.fluid.image').transition('hide');
    $('.ui.massive.fluid.image').transition('fade');
});