Template.ShoppingCart.events({
});

Template.ShoppingCart.helpers({
    shoppingCart : function () {
        return ShoppingCart.find({});
    },
    cartItemQuantity: function () {
        /*
         * return collection of shopping cart objects and convert to list
         * filter for items where the isAdded property is true
         * map over list of added products to get a sum of quantities of items
         * reduce to obtain summation of quantities; accumulator set to 0
        */
        const xs = ShoppingCart.find({}).fetch();
        const ys = xs.filter(obj => obj.isAdded);
        const zs = ys.map(obj => obj.quantity);
        return zs.reduce((x,y) => x + y,0);
    },
    subtotal: function () {
        /*
         * return collection of shopping cart objects and convert to list
         * filter for items where the isAdded property is true
         * map over list of added products to get a sum of products of price * quantity
         * reduce to obtain summation of item prices in shopping cart; accumulator set to 0
        */
        const xs = ShoppingCart.find({}).fetch();
        const ys = xs.filter(obj => obj.isAdded);
        const zs = ys.map(obj => obj.price * obj.quantity);
        return zs.reduce((x,y) => x + y,0);
    }
});