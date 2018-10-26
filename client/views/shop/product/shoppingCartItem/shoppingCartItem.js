Template.ShoppingCartItem.events({
    "click #remove": function () {
        ShoppingCart.update(this._id, {$set: {isAdded: false}});
        console.log('items removed');
        // hide shipping methods to recalculate total
        Session.set('showShipping',false);
    },
    "click #add": function () {
        ShoppingCart.update(this._id,{$set: {isAdded: true}});
        console.log('items added back');
        Session.set('showShipping',false);
    },
    "mousedown #increment, mouseup, mouseout": function (event) {
        if (event.type == "mousedown") {
            console.log("product items incremented");

            // add some condition for the upper bound given stock quantity
            ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 1}});
            Session.set('showShipping',false);
        }
    },
    "mousedown #decrement, mouseup, mouseout": function (event) {
        if (event.type == "mousedown") {
          console.log('product item decremented');
            if (this.quantity > 1) {
                ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 1}});
                Sesssion.set('showShipping',false);
            }
        }
    }
});


Template.ShoppingCartItem.helpers({
   isAddedFunc: function () {
       return this.isAdded;
   },
   totalPrice: function () {
       return this.price * this.quantity;
   }
});
