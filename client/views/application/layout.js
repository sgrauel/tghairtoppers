Template.layout.helpers({
    menu: {
        home2: function() { return Router.current().route.getName() == 'Home'; }
    },
    isNotContactPage: function() { return !(Router.current().route.getName() === 'Contact'); }
});

Template.layout.onRendered(function() {
    $('.ui.massive.fluid.image').transition('hide');
    $('.ui.massive.fluid.image').transition('fade');
});