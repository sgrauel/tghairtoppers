Session.setDefault('isHighestToLowest',1);

Template.sortingInterface.events({
   "click #priceLowestHighest": function () {
       console.log("filtering from lowest to highest");

       Session.set('isHighestToLowest',2);

       Meteor.call('getPriceMinMax', Session.get('parentCategoryId'), function (error, result) {
           console.log('getPriceMinMax called in Template.Products.events!!!');
           console.log('result[0] '+result[0]);
           console.log('result[0] '+result[1]);

           if (!error) {
               var curCtrl = Router.current();

               var newPath = curCtrl.route.path({
                   productsLimit: curCtrl.productsLimit(),
                   catId: curCtrl.categoryIdLimit(),
                   lb1: Session.get('_slider')[0],
                   ub1: Session.get('_slider')[1],
                   lb2: result[0],
                   ub2: result[1],
                   sortNum: Session.get('isHighestToLowest')
               });
               Router.go(newPath);

           } else {
               console.log("first Meteor call");
               console.log(error.message);
           }

       });

   },
    "click #priceHighestLowest": function () {
        console.log("filtering from highest to lowest");

        Session.set('isHighestToLowest',1);

        Meteor.call('getPriceMinMax', Session.get('parentCategoryId'), function (error, result) {
            console.log('getPriceMinMax called in Template.Products.events!!!');
            console.log('result[0] '+result[0]);
            console.log('result[0] '+result[1]);

            if (!error) {
                var curCtrl = Router.current();

                var newPath = curCtrl.route.path({
                    productsLimit: curCtrl.productsLimit(),
                    catId: curCtrl.categoryIdLimit(),
                    lb1: Session.get('_slider')[0],
                    ub1: Session.get('_slider')[1],
                    lb2: result[0],
                    ub2: result[1],
                    sortNum: Session.get('isHighestToLowest')
                });
                Router.go(newPath);

            } else {
                console.log("first Meteor call");
                console.log(error.message);
            }

        });

    }
});

Template.sortingInterface.helpers({
   isHighestToLowest: function () {
       if (Session.get('isHighestToLowest') == 1) {
           return true;
       } else {
           return false;
       }
   }
});