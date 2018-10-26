Template.searchSelectionDropdown.onRendered(function(){
    $('.ui.dropdown').dropdown();
});

Template.searchSelectionDropdown.events({
    "change #searchSelectionDropdown": function () {

        // parse categoryId from dropdown
        const categoryId = parseInt($('#searchSelectionDropdown').val());
        Session.set('parentCategoryId',categoryId);


        Meteor.call('getPriceMinMax',Session.get('parentCategoryId'), function (error,result) {
            if (!error) {

                console.log(result);
                // reset price sorting mechanism to highest to lowest
                Session.set('isHighestToLowest',1);

                // set new path
                var curCtrl = Router.current();

                var newPath = curCtrl.route.path({productsLimit: 5,
                    catId: categoryId, lb1: result[0],
                    ub1: result[1], lb2: result[0], ub2: result[1], sortNum: 1 });

                // set Session vars
                Session.set('_slider',[result[0],result[1]]);
                Session.set('_sliderBounds',[result[0],result[1]]);

                Router.go(newPath);

            } else {
                console.log(error.message);
            }
        });

    }
});
