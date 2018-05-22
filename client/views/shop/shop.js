Session.setDefault("_isViewProduct",false);
Session.setDefault("productModalSeen",false);

Template.Shop.events({
    'click #viewStylists': function () {
        if (Session.get("_isViewProduct") == true) {
            Session.set("_isViewProduct",false);
        }

    },
    'click #viewProducts' : function () {

        if (Session.get('productModalSeen') == false) {
            $('.ui.small.modal').modal('show');
            $('.ui.small.modal').modal('attach events','#productModalButton','hide');
        }

        if (Session.get("_isViewProduct") == false) {
            Session.set("_isViewProduct",true);
            Session.set("productModalSeen",true)
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
    // make sidebar not overlay content
    $('.sidebar').sidebar('overlay',false);
};
