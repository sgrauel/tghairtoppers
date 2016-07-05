Template.searchSelectionDropdown.events({

    'click .ui.dropdown.item': function () {

       Session.set('filterUsed',2);

        var categoryId = parseInt($('#searchSelectionDropdown').val());

       Meteor.call('getPriceMinMax',categoryId, function (error,result) {
           if (!error) {

               Session.set('isHighestToLowest',1);

               // set new path
               var curCtrl = Router.current();
               var newPath = curCtrl.route.path({productsLimit: 5,
                   catId: categoryId, lb1: result[0] ,
                   ub1: result[1], lb2: result[0], ub2: result[1], sortNum: 1 });

               // set Session vars
               Session.set('_slider',[result[0],result[1]]);
               Session.set('_sliderBounds',[result[0],result[1]]);

               Router.go(newPath);

           } else {
               console.log("first Meteor call");
               console.log(error.message);
           }
       });

   },
    "change #searchSelectionDropdown": function () {
        var categoryId = parseInt($('#searchSelectionDropdown').val());

        Session.set('parentCategoryId',categoryId);

        Meteor.call("setParentCategoryId", categoryId, function (error) {
            if (!error) {
                console.log("success");
            } else {
                console.log(error.message);
            }
        });
    }

});