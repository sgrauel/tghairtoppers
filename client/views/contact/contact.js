resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
};

var myForm = {};

Template.Contact.events({
    'click #submit': function (event) {

        // prevent form from submitting (along with event func. returning false)
        event.preventDefault();

        // grab data from input fields
        const contactForm = {
            subject: myForm.find('[name=subject]').val(),
            phone: myForm.find('[name=phone]').val(),
            email: myForm.find('[name=email]').val(),
            mainBody: myForm.find('[name=message ]').val()
        };


        console.log(contactForm);

        // call getContact method to insert Contact object into Contacts collection
        Meteor.call('getContact',contactForm,function(err) {
            if (!err) {
                console.log("Submitted!");
            } else {
                console.err("Something went wrong");
                console.err(err);
            }
        });


        // user reinforcement for hitting submit
        $('.ui.submit.button').transition('tada');

        // show the modal on submit click event
        $('.ui.basic.modal').modal('show');

        // clear the fields of the form
        resetForm(myForm);

        return false;
    }
});

Template.Contact.onRendered(function() {
    myForm = $('#myForm');

    $('.ui.form').transition('hide');
    $('.ui.form').transition('horizontal flip');

});