Session.setDefault("_isViewProduct",false);

Template.Shop.events({
    'click #viewStylists': function () {
        if (Session.get("_isViewProduct") == true) {
            Session.set("_isViewProduct",false);
        }

    },
    'click #viewProducts' : function () {
        if (Session.get("_isViewProduct") == false) {
            Session.set("_isViewProduct",true);
        }
    }
});

Template.Shop.helpers({
    shop: {
        viewProduct: function () {
            return Session.get("_isViewProduct");
        }
    }
});

Template.Shop.onRendered = function() {
    $('.sidebar').sidebar('overlay',false);
};
