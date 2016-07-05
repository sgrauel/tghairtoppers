Session.setDefault('showNotifShop',false);
Session.setDefault('productId',-1);

Template.ProductItem.events({
    "click #addToCartShop": function () {
        Session.set('showNotifShop',true);
        Session.set('productId',this._id);



        // NOTE: minor optimisation; find returns cursor and does not
        // read and return the whole collection like findOne

        var product = Products.findOne(this._id);

        // add properties for the following features
        /*
            * add / remove feature in shopping cart
            * quantity of item wanted by customer
         */
        product.isAdded = true;
        product.quantity = 1;

        if (ShoppingCart.find(this._id,{limit: 1}).count() == 0) {
            console.log(product);
            ShoppingCart.insert(product);
        }

    },
    "click #closeNotif": function () {
        Session.set('showNotifShop',false);
    }
});

Template.ProductItem.helpers({
    showNotifShop: function () {
        return Session.get('showNotifShop');
    },
    showProduct: function () {
        return Products.findOne(Session.get('productId'));
    }
});