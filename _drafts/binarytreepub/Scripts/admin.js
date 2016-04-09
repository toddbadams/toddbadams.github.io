// create our tba object if not present
// holds all of the tba plugins - useful for debug
//tba = Object();

// On document read
$(document).ready(function () {
    /* delete button creates dialog box to confirm */
    $('#delete-button').tbaDeleteDialog();

    // date picker
    $('#date-picker').datepicker()

    // group buttons
    //$('div.btn-group[data-toggle-name=*]').each(function () {
    //    var group = $(this);
    //    var form = group.parents('form').eq(0);
    //    var name = group.attr('data-toggle-name');
    //    var hidden = $('input[name="' + name + '"]', form);
    //    $('button', group).each(function () {
    //        var button = $(this);
    //        button.live('click', function () {
    //            hidden.val($(this).val());
    //        });
    //        if (button.val() == hidden.val()) {
    //            button.addClass('active');
    //        }
    //    });
    //});

});