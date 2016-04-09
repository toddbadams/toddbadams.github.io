/*
* tbaCaesarCipher - Version 1.0
* Nov 2, 2012 - Initial Build
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
                'MessageId': 'message',
                'AllResultsId': 'all-results',
                'EncyrptButtonId': 'encrypt'
            }, {
                'MessageId': self.attr("data-MessageId"),
                'AllResultsId': self.attr("data-AllResultsId"),
                'EncyrptButtonId': self.attr("data-EncyrptButtonId")
            });

            // Get jQuery elements for inputs and outputs
            self.$Message = $('#' + self.settings.MessageId);
            self.AllResults = $('#' + self.settings.AllResultsId);
            self.EncyrptButton = $('#' + self.settings.EncyrptButtonId);

            // perform Caesar shift and return encrypted message
            self.CaesarCipher = function (shift, message) {
                var encrypted = "";
                for (var i = 0; i < message.length; i++)
                    encrypted += String.fromCharCode(Math.abs((message.charCodeAt(i) - 65 + shift) % 26) + 65);
                return encrypted;
            }

            // precondition the message
            self.PreCondition = function (message) {
                message = message.toUpperCase();
                message = message.replace(/ /g, "");
                message = message.replace(/[^A-Z]+/g, "");
                return message;
            }

            // start button
            self.EncyrptButton.click(function () {
                self.$Message.val(self.PreCondition(self.$Message.val()));
                var allResults = "<ul style='list-style: none'>\n\r";
                for (var i = 1; i < 26; i++)
                    allResults += "<li><strong>" + i + "</strong>  " + self.CaesarCipher(i, self.$Message.val()) + "</li>\n\r";
                allResults += "</ul>\n\r";
                $('#all-results').html(allResults);
            });

            return self;
        } // END Init
    };

    $.fn.tbaCaesarCipher = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaCaesarCipher');
        }
    };
})(jQuery);
