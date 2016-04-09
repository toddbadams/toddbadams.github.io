/*
* tbaDeleteDialog - Version 1.0
* Nov 11, 2012 - Inital Build
*
* This jQuery plugin and its content is copyright of Todd B. Adams 
* © Todd B. Adams 2012. All rights reserved.
*
* Any redistribution or reproduction of part or all of the contents in 
* any form is prohibited.
*
* http://www.toddbadams.co.uk/
*/

// A standard jQuery plugin, http://docs.jquery.com/Plugins/Authoring
(function ($) {

    var methods = {
        init: function () {
            // store this object
            var self = this;

            // merge data attributes with defaults   
            self.settings = $.extend({
                'Message': 'Are you sure that you want to permanently delete this item?'
            }, {
                'Message': self.attr("data-Message")
            });

            self.click(event, function () {
                event.preventDefault();
                $.msgbox(self.settings.Message, {
                    type: "confirm",
                    buttons: [
                      { type: "submit", value: "Yes" },
                      { type: "cancel", value: "No" },
                      { type: "cancel", value: "Cancel" }
                    ]
                }, function (result) {
                    if (result) {
                        window.location = self.attr('href');
                    }
                });
            });

            return self;
        } // END Init
    };

    $.fn.tbaDeleteDialog = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaDeleteDialog');
        }
    };
})(jQuery);

