/*
* tbaFadeToId - Version 1.0
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

            // find all children of this element
            // An array of objects, each holding a Portfolio page section
            self.childIds = new Array();
            self.children().each(function (index, element) {
                self.childIds[index] = element.id;
            });

            function HashHasChanged(ids) {
                // get the requested id name
                var hashLocation = window.location.hash.substring(1);

                // default hash location 
                if (hashLocation == "") hashLocation = ids[0];

                // if the hash is not in the set of ids do nothing
                var found = false;
                for (var i = 0; i < ids.length; i++) {
                    if (ids[i] == hashLocation) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    // loop through each section
                    for (var i = 0; i < ids.length; i++) {
                        // Is this our requested section?
                        if (ids[i] != hashLocation) {
                            // hide it.
                            $('#' + self.childIds[i]).fadeOut(0);
                            $('#btn-' + self.childIds[i]).fadeIn(self.settings.speed);
                        }; // END if
                    }; // END for

                    $('#' + hashLocation).fadeIn(self.settings.speed);
                    $('#btn-' + hashLocation).fadeOut(0);
                }
            }

            // bind to window hash changes and transition to that id
            $(window).bind('hashchange', function () { HashHasChanged(self.childIds) });

            // run hash change on inital load
            HashHasChanged(self.childIds);
        }
    };

    $.fn.tbaFadeToId = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaFadeToId');
        }
    };
})(jQuery);