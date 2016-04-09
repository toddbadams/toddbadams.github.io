/*
* tbaAutoHeight - Version 1.0
* Version 1.0 - October 10, 2012 - initial build
*
* This jQuery plugin and its content is copyright of Todd B. Adams. 
* All rights reserved.
*
* Any redistribution or reproduction of part or all of the contents in 
* any form is prohibited.
*
* http://www.toddbadams.co.uk/
* for more on plugins: http://docs.jquery.com/Plugins/Authoring
*/
(function ($) {

    var methods = {
        init: function () {
            // store this object
            var self = this;

            // merge data attributes with defaults   
            self.settings = $.extend({
                'speed': 1000,                      // transition speed (milliseconds)
            }, {
                'speed': self.attr("data-speed")
            });

            function SetHeight() {
                var windowHeight = $(window).height();
                windowHeight = windowHeight > 834 ? 834 : windowHeight;
                self.height(windowHeight - 6);
            }

            // on resize set the height
            $(window).resize(function () {
                SetHeight()
            });

            // inital hieght set
            SetHeight();

        }
    };

    $.fn.tbaAutoHeight = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaAutoHeight');
        }
    };
})(jQuery);