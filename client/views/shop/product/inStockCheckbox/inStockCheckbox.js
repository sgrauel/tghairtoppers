Session.setDefault("checked",true);

isChecked = function () {
  return Session.get("checked") == true;
};

Template.inStockCheckbox.helpers({
   checked: function () { return isChecked(); }
});


Template.inStockCheckbox.events({
    "change #instock": function () {
        if (Session.get("checked") == true) {
            Session.set("checked",false);
        } else {
            Session.set("checked",true);
        }
    }
});

