/*
* tbaThumbs - Version 1.0
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

            // page intro text
            self.$pageIntro = $('#page-intro');
            self.IsPageIntroVisible = true;

            // merge data attributes with defaults   
            self.settings = $.extend({
                'speed': 1000,                      // transition speed (milliseconds)
            }, {
                'speed': self.attr("data-speed")
            });

            // find images
            self.$Images = self.find('.images img');

            // find thumbs
            self.$Thumbs = self.find('.thumbs img');

            // show an image at currentIndex within array of elements $Images
            function ShowImage($Images, currentIndex) {
                // loop through each section
                for (var i = 0; i < $Images.length; i++) {
                    // Is this our requested section?
                    if (i != currentIndex) {
                        // hide it.
                        $($Images[i]).fadeOut(0);
                    }; // END if
                }; // END for

                $($Images[currentIndex]).fadeIn(self.settings['speed']);
            }

            // Create click events for each of the thumbs
            self.$Thumbs.each(function (index, element) {
                $(element).click(function () {
                    ShowImage(self.$Images, index);
                    if (self.IsPageIntroVisible) {
                        self.I = false;
                        self.$pageIntro.fadeOut('fast');
                    }
                });
            });

            // set current image to start
            ShowImage(self.$Images, 0);
        }
    };

    $.fn.tbaThumbs = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaThumbs');
        }
    };
})(jQuery);

