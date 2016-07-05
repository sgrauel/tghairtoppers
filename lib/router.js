
countShopTemplateRenderings = 0;
countLoadingTemplateRenderings = 0;

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

ProductsListController = RouteController.extend({
    template: 'Shop',
    increment: 5,
    baseCat: 0,
    baseLb1: 0,
    baseUb1: 2400,
    baseLb2: 0,
    baseUb2: 2400,
    baseSortNum: 1,
    subscriptions: function () {
        return [Meteor.subscribe('products',this.findQuery(this.categoryIdLimit()),this.findOptions(),this.categoryIdLimit()),Meteor.subscribe('categories')];
    },
    productsLimit: function() { return parseInt(this.params.productsLimit) || this.increment; },
    categoryIdLimit:  function() { return parseInt(this.params.catId) || this.baseCat;},
    lowerBound1: function () { return parseInt(this.params.lb1) || this.baseLb1;},
    upperBound1: function () { return parseInt(this.params.ub1) || this.baseUb1; },
    lowerBound2: function () { return parseInt(this.params.lb2) || this.baseLb2;},
    upperBound2: function () { return parseInt(this.params.ub2) || this.baseUb2; },
    sortNum: function () { return parseInt(this.params.sortNum) || this.baseSortNum; },
    findSort: function (num) {

        if (num == 1) {
            // sort price highest to lowest
            return {price: -1};
        } else {
            // sort price lowest to highest
            return {price: 1};
        }
    },
    findOptions: function() {
        // sort: this.findSort(//some arg)
        return {limit: this.productsLimit(), sort: this.findSort(this.sortNum())};
    },
    findQuery: function(catId) {

        const categoryMap = new Map();
        const topLevelCategories = Categories.find({parent: {$not: {$ne: 0}}}).fetch();
        topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id,topLevelCategory.name));

        const lb = parseInt(this.lowerBound1());
        const ub = parseInt(this.upperBound1());


        if (catId != 0) {

            const catNameArr = [];
            const catName = categoryMap.get(catId);
            catNameArr.push(catName);

            return {categories: {$in: catNameArr}, price: {$gte: lb, $lte: ub }};
        } else {

            return {price: {$gte: lb, $lte: ub }};

        }
    },
    action: function () {

        if (this.productsLimit() != 5) {
            this.next();
        } else {
            if (this.ready()) {
                console.log('shop template rendering');
                countShopTemplateRenderings++;
                console.log('shop template has rendered '+countShopTemplateRenderings+' times');
                this.render('Shop');
            } else {
                console.log('loading template rendering');
                this.render('loading');
                countLoadingTemplateRenderings++;
                console.log('loading template has rendered '+countLoadingTemplateRenderings+' times')
                console.log(countLoadingTemplateRenderings);
            }
            this.next();
        }


    },
    onRun: function () {

        Meteor.call('getWoocommerceProducts', function (error) {
            if (!error) {
                console.log('success products!');

            } else {
                console.log(error);
            }
        });

        Meteor.call('getProductCategories', function (error) {
            if (!error) {
                console.log('success categories!');
            } else {
                console.log(error);
            }
        });

        this.next();
    },
    data: function() {
        return {
            isMoreProducts: function () { return !(Router.current().limit == this.products().count()); },
            products: function() {
                /*
                console.log('call products helper in lib/router.js');
                console.log('Router.current().findQuery(Router.current().categoryIdLimit()) '+Router.current().findQuery(Router.current().categoryIdLimit()));
                console.log('categoryIdLimit() '+Router.current().categoryIdLimit());
                console.log('Router.current().findOptions() '+Router.current().findOptions());
                console.log(Products.find('count :'+Router.current().findQuery(Router.current().categoryIdLimit()), Router.current().findOptions()).count());
                */
                return Products.find(Router.current().findQuery(Router.current().categoryIdLimit()), Router.current().findOptions());
            },
            topLevelProductCategories: function () {
                return Categories.find({parent: {$not: {$ne: 0}}});
            },
            nextPath: this.route.path({productsLimit: this.productsLimit() + this.increment, catId: this.categoryIdLimit(),
                lb1: this.lowerBound1(), ub1: this.upperBound1(),
                lb2: this.lowerBound2(), ub2: this.upperBound2(),
                sortNum: this.sortNum()
            })
    };
}});

ProductPageController = RouteController.extend({
    template: 'ProductPage',
    subscriptions: function () { return [Meteor.subscribe('products')] },
    data: function () {
        return  Products.findOne(this.params._id);
    }
});

ShoppingCartController = RouteController.extend({
   template: 'ShoppingCart'
});



Router.map(function() {
    this.route('Home', {path: '/'});
    this.route('MeetTeam', {path: '/teamwork'});
    this.route('Contact', {path: '/contact'});

    this.route('Shop',
        { path: '/shop/:productsLimit?/:catId?/:lb1?/:ub1?/:lb2?/:ub2?/:sortNum?',
          controller: 'ProductsListController'
        });

    this.route('ProductPage',{
        path: '/product/:_id',
        controller: 'ProductPageController'
    });

    this.route('ShoppingCart',{
        path: '/shopping-cart',
        controller: 'ShoppingCartController'
    });
});

