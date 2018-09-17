/*
const stripe = require('stripe')('pk_test_3oPENdHQ65sigMm5Hpp47Rkh');

Template.Charge.onRendered(function() {
  // include stripe node module
  // this is equivalent to the standard node require:
  // const stripe = require('stripe')('pk_test_3oPENdHQ65sigMm5Hpp47Rkh');
  const elements = stripe.elements({
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
      },
    ]
  });

  const elementStyles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#424770',
      },

      '::placeholder': {
        color: '#9BACC8',
      },

      ':focus::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  const elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
  };

  const cardNumber = elements.create('cardNumber', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardNumber.mount('#card-number');

  const cardExpiry = elements.create('cardExpiry', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardExpiry.mount('#card-expiry');

  const cardCvc = elements.create('cardCvc', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardCvc.mount('#card-cvc');

  registerElements([cardNumber, cardExpiry, cardCvc], 'example3');
});

Template.Charge.events({
  'submit #payment-form' : function(event) {
    event.preventDefault();

  }
});

*/
