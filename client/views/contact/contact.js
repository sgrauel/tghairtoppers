resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
        .removeAttr('checked').removeAttr('selected');
};

myForm = $('#myForm');

Template.Contact.events({
    'click #submit': function (event) {

        // prevent form from submitting (along with event func. returning false)
        event.preventDefault();

        // grap data from input fields
        const contactForm = {
            subject: myForm.find('[name=subject]').val(),
            phone: myForm.find('[name=phone]').val(),
            email: myForm.find('[name=email]').val(),
            mainBody: myForm.find('[name=message ]').val()
        };

        // call getContact method to insert Contact object into Contacts collection
        Meteor.call('getContact',contactForm,function(err) {
            if (!err) {
                console.log("Submitted!");
            } else {
                console.err("Something went wrong");
                console.err(err);
            }
        });

        // show the modal on submit click event
        $('.ui.basic.modal').modal('show');

        // clear the fields of the form
        resetForm(myForm);

        return false;
    }
});