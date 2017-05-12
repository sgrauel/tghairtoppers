
/*
set the layout and loading templates
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


/*
controller for list of products in the product portion of the shop
 */
ProductsListController = RouteController.extend({
    template: 'Shop',
    increment: 5, // number defining the increment by which products should be loaded by the infinite scroll in the shop
    baseCat: -1, // default category id ; -1 for all products
    baseLb1: 18, // lower bound and upper bound respectively for slider handle positioning
    baseUb1: 2000,
    baseLb2: 18, // lower bound and upper bound for slider bounds
    baseUb2: 2000,
    baseSortNum: 1, // default sorting arrangement; 1 for highest to lowest
    subscriptions: function () {
        return [Meteor.subscribe('products'),Meteor.subscribe('categories')];
    },
    /*
    getter functions for returning query string parameters or defaults
     */
    productsLimit: function() {
        if (Meteor.isClient) {
            return parseInt(this.params.productsLimit) || this.increment;
        }
    },
    categoryIdLimit:  function() {
        if (Meteor.isClient) {
            return parseInt(this.params.catId) || this.baseCat;
        }
    },
    lowerBound1: function () {
        if (Meteor.isClient) {
            return parseInt(this.params.lb1) || this.baseLb1;
        }
    },
    upperBound1: function () {
        if (Meteor.isClient) {
            return parseInt(this.params.ub1) || this.baseUb1;
        }
    },
    lowerBound2: function () {
        if (Meteor.isClient) {
            return parseInt(this.params.lb2) || this.baseLb2;
        }
    },
    upperBound2: function () {
        return parseInt(this.params.ub2) || this.baseUb2;
    },
    sortNum: function () {
        if (Meteor.isClient) {
            return parseInt(this.params.sortNum) || this.baseSortNum;
        }
    },
    findSort: function (num) {
        if (Meteor.isClient) {
            if (num == 1) {
                // sort price highest to lowest
                return {price: -1};
            } else {
                // sort price lowest to highest
                return {price: 1};
            }
        }
    },
    findOptions: function() {
        if (Meteor.isClient) {
            return {limit: this.productsLimit(), sort: this.findSort(this.sortNum())};
        }
    },
    findQuery: function(catId) {

        if (Meteor.isClient) {

            const categoryMap = new Map();
            const topLevelCategories = Categories.find({parent: {$not: {$ne: 0}}}).fetch();
            topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id, topLevelCategory.name));


            const lb1 = parseInt(this.lowerBound1());
            const ub1 = parseInt(this.upperBound1());

            console.log('lb1 ' + lb1);
            console.log('ub1 ' + ub1);


            if (catId != -1) {

                const catNameArr = [];
                const catName = categoryMap.get(catId);
                catNameArr.push(catName);

                return {categories: {$in: catNameArr}, price: {$gte: lb1, $lte: ub1}};
            } else {

                return {price: {$gte: lb1, $lte: ub1}};

            }
        }
    },
    action: function () {
        if (Meteor.isClient) {
            if (this.productsLimit() != 5) {
                this.next();
            } else {
                if (this.ready()) {
                    this.render('Shop');
                } else {
                    this.render('loading');
                }
            }
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

    },
    data: function() {
        return {
            isMoreProducts: function () {
                if (Meteor.isClient) {
                    return !(Router.current().limit == this.products().count());
                }
            },
            products: function() {
                if (Meteor.isClient) {
                    return Products.find(Router.current().findQuery(Router.current().categoryIdLimit()), Router.current().findOptions());
                } else {
                    return Products.find({});
                }
            },
            topLevelProductCategories: function () {
                if (Meteor.isClient) {
                    return Categories.find({parent: {$not: {$ne: 0}}});
                } else {
                    return Categories.find({});
                }
            },
            nextPath: this.route.path({
                        productsLimit: this.productsLimit() + this.increment, catId: this.categoryIdLimit(),
                        lb1: this.lowerBound1(), ub1: this.upperBound1(),
                        lb2: this.lowerBound2(), ub2: this.upperBound2(),
                        sortNum: this.sortNum()
            })

        };
    }
});

ProductPageController = RouteController.extend({
    template: 'ProductPage',
    subscriptions: function () { return [Meteor.subscribe('products')] },
    data: function () {
        if (Meteor.isClient) {
            let idNum = parseInt(this.params.id);
            return Products.findOne({id: idNum});
        }
    }
});

ShoppingCartController = RouteController.extend({
   template: 'ShoppingCart'
});

ContactController = RouteController.extend({
   template: 'Contact'
});


Router.map(function() {
    this.route('Home', {
        path: '/'
    });

    this.route('Shop', {
        path: '/shop/:productsLimit?/:catId?/:lb1?/:ub1?/:lb2?/:ub2?/:sortNum?',
        controller: 'ProductsListController'
    });

    this.route('Contact', {
        path: '/contact-us',
       controller: 'ContactController'
    });

    this.route('ProductPage', {
        path: '/product/:id',
        controller: 'ProductPageController'
    });

    this.route('ShoppingCart',{
        path: '/shopping-cart',
        controller: 'ShoppingCartController'
    });
});

