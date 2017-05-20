resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
};

var myForm = {};

Template.Contact.events({
    'submit #myForm': function (event) {

        // prevent form from submitting (along with event func. returning false)
        event.preventDefault();

        // grab data from input fields
        const contactForm = {
            first_name: myForm.find('[name=first_name]').val(),
            last_name: myForm.find('[name=last_name]').val(),
            phone: myForm.find('[name=phone]').val(),
            email: myForm.find('[name=email]').val(),
            mainBody: myForm.find('[name=message ]').val()
        };

        // call getContact method to insert Contact object into Contacts collection and send email
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

        // show the modal on submit event
        $('.ui.basic.modal').modal('show');

        // clear the fields of the form
        resetForm(myForm);
    }
});

Template.Contact.onRendered(function() {

    // flip ui piled segment
    $('.ui.piled.segment').transition('hide');
    $('.ui.piled.segment').transition('horizontal flip');

    myForm = $('#myForm');

    myForm.form({
        inline: false,
        fields: {
            first_name: {
                identifier: 'first_name',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'First name is required'
                    },
                    {
                        type : 'regExp[/^[A-Z][a-z]*$/]',
                        prompt : 'Invalid first name. Did you capitalize your first name?'
                    }
                ]
            },
            last_name: {
                identifier: 'last_name',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Last name is required'
                    },
                    {
                        type : 'regExp[/^[A-Z][a-z]*$/]',
                        prompt : 'Invalid last name. Did you capitalize your last name?'
                    }
                ]
            },
            phone: {
                identifier: 'phone',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Phone number is required'
                    },
                    {
                        type : 'regExp[/^([2-9][0-9]{2}-[2-9][0-9]{2}-[0-9]{4})|([2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4})$/]',
                        prompt : 'Invalid phone number. XXX-XXX-XXXX or X*10 are acceptable'
                    }
                ]

            },
            email: {
                identifier: 'email',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Email is required'
                    },
                    {
                        type : 'email',
                        prompt : 'Invalid email'
                    }
                ]

            },
            message: {
                identifier: 'message',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'How can we help you?'
                    }
                ]

            }
        }
    });

    // flip ui form
    $('.ui.form').transition('hide');
    $('.ui.form').transition('horizontal flip');

});