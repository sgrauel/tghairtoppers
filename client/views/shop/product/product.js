Session.setDefault('parentCategoryId',-1);
Session.setDefault('_slider', [18,2000]);
Session.setDefault('_sliderBounds', [18, 2000]);
sliderRenderShopCount = 0;

// default assigned to main category filter
// price filter = 1
// category filter = 2
Session.setDefault('filterUsed',1);

reLoadSlider = function () {

    Session.set('_slider', [Router.current().lowerBound1(),Router.current().upperBound1()]);
    Session.set('_sliderBounds', [Router.current().lowerBound2(),Router.current().upperBound2()]);

    this.$('.ui.dropdown').dropdown({
        allowCategorySelection: true
    });

    // INITIALIZE SLIDER 1
    this.$("#slider1").noUiSlider({
        start: Session.get('_slider'),
        connect: true,
        range: {
            'min': Session.get('_sliderBounds')[0],
            'max': Session.get('_sliderBounds')[1]
        }
    });
};

Template.Products.onRendered(function () {
    // console.log('onRendered in Products called!');
    reLoadSlider();
    sliderRenderShopCount++;
    // console.log('sliderRenderShopCount :'+sliderRenderShopCount);
});


Template.Products.events({
    "slide #slider1": function (values, handle, unencoded, tap) {
        // set real values on 'slide' event
        Session.set('_slider', unencoded);
    },
    "change #slider1": function (values, handle, unencoded, tap) {

        // set filter utilization to category filter
        Session.set('filterUsed', 1);

        // round off values on 'change' event
        // var xs = [Math.round(unencoded[0]), Math.round(unencoded[1])];
        Session.set('_slider', [Math.round(unencoded[0]), Math.round(unencoded[1])]);

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
                    sortNum: curCtrl.sortNum()
                });
                Router.go(newPath);

            } else {
                console.log("first Meteor call");
                console.log(error.message);
            }

        });
    }

});


Template.twoHandleSliders.helpers({
    sliderFunc1: function () {

        console.log('filterUsed :'+Session.get('filterUsed'));

        if (Session.get('filterUsed') == 1) {
            // transition from one set of price handle values to another
                return Session.get('_slider');
        } else {
            return Session.get('_sliderBounds');
        }

    }
});

