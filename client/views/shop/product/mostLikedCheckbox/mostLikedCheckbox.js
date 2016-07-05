Session.setDefault("checked1",true);

isChecked1 = function () {
    return Session.get("checked1") == true;
};

Template.mostLikedCheckbox.helpers({
    checked1: function () { return isChecked1(); }
});


Template.mostLikedCheckbox.events({
    "change #mostLiked": function () {
        if (Session.get("checked1") == true) {
            Session.set("checked1",false);
        } else {
            Session.set("checked1",true);
        }
    }
});