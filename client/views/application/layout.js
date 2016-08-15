Template.layout.helpers({
    menu: {
        home2: function() { return Router.current().route.getName() == 'Home'; }
    }
});