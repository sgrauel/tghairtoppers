Template.ShoppingCartItem.events({
    "click #remove": function () {
        ShoppingCart.update(this._id, {$set: {isAdded: false}});
    },
    "click #add": function () {
        ShoppingCart.update(this._id,{$set: {isAdded: true}});
    },
    "mousedown #increment, mouseup, mouseout": function (event) {
        if (event.type == "mousedown") {
            console.log("mousedown");

            // add some condition for the upper bound given stock quantity
            ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 1}});
        }
    },
    "mousedown #decrement, mouseup, mouseout": function (event) {
        if (event.type == "mousedown") {
            if (this.quantity > 1) {
                ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 1}});
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