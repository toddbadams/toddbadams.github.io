(function() {
    'use strict'


    var standardScale = [
            { property: 'low', label: 'low', attribute: 'low' },
            { property: 'mediumMinus', label: 'medium -', attribute: 'medium-minus' },
            { property: 'medium', label: 'medium', attribute: 'medium' },
            { property: 'mediumPlus', label: 'medium +', attribute: 'medium-plus' },
            { property: 'high', label: 'high', attribute: 'high' },
        ],
        intensityScale = [
            { property: 'light', label: 'light', attribute: 'light' },
            { property: 'mediumMinus', label: 'medium -', attribute: 'medium-minus' },
            { property: 'medium', label: 'medium', attribute: 'medium' },
            { property: 'mediumPlus', label: 'medium +', attribute: 'medium-plus' },
            { property: 'pronounced', label: 'pronounced', attribute: 'pronounced' },
        ],
        bodyScale = [
            { property: 'light', label: 'light', attribute: 'light' },
            { property: 'mediumMinus', label: 'medium -', attribute: 'medium-minus' },
            { property: 'medium', label: 'medium', attribute: 'medium' },
            { property: 'mediumPlus', label: 'medium +', attribute: 'medium-plus' },
            { property: 'full', label: 'full', attribute: 'full' },
        ],
        colorScale = [
            { property: 'pale', label: 'pale', attribute: 'pale' },
            { property: 'medium', label: 'medium', attribute: 'medium' },
            { property: 'deep', label: 'deep', attribute: 'deep' },
        ],
        climateScale = [
            { property: 'cool', label: 'cool', attribute: 'cool' },
            { property: 'moderate', label: 'moderate', attribute: 'moderate' },
            { property: 'warm', label: 'warm', attribute: 'warm' },
            { property: 'hot', label: 'hot', attribute: 'hot' },
        ],
        ripeningScale = [
            { property: 'early', label: 'early', attribute: 'early' },
            { property: 'late', label: 'late', attribute: 'late' }
        ];


    function standardScaleTemplate(label, options) {
        var html = '<div ng-show="$ctrl.isVisible" class="wt-scale">' +
            '<span class="label">' + label + '</span>';

        options.forEach(function(option) {
            html += '<span class="option" ng-class="{full: $ctrl.' + option.property + '}">' + option.label + '</span>';
        })
        html += '</div>';
        return html;
    }

    function ScaleComponentFactory(label, options) {

        function createController(Scale) {
            function controller($element) {
               // $element.addClass('grape-variety-item');
                setModelScale(this, $element, Scale);
            }
            controller.$inject = ['$element'];
            return controller;
        }

        function setModelScale(model, $element, options) {
            model.isVisible = false;
            options.forEach(function(option) {
                model[option.property] = hasAttribute($element, option.attribute);
                model.isVisible = model.isVisible || model[option.property];
            });
        }

        function hasAttribute($element, attr) {
            var a = $element.attr(attr);
            if (!angular.isString(a)) return false;
            a = a.toLowerCase();
            return a === '' || a === 'true';
        }

        return {
            controller: createController(options),
            template: standardScaleTemplate(label, options)
        }
    }



    angular.module('wt', ['ngMaterial'])
        .component('wineTastingItem', {
            bindings: {
                label: '@'
            },
            replace: true,
            transclude: true,
            template: '<li><span>{{$ctrl.label}}</span><span ng-transclude></span></li>'
        })
        .component('wineTasting', {
            bindings: {
                title: '@',
                date: '@'
            },
            controller: wineTasting,
            transclude: true,
            template: ['<h3>{{$ctrl.title}}</h3>',
                '<h4>{{$ctrl.date}}</h4>',
                '<ul ng-transclude></ul>'
            ].join('')
        })
        .component('grapeVariety', {
            transclude: true,
            controller: grapeVariety,
            template: '<ng-transclude></ng-transclude>'
        })
        .component('grapeVarietyDetails', {
            transclude: true,
            controller: grapeVarietyDetails,
            template: '<ng-transclude></ng-transclude>'
        })
        .component('wtScaleAcidity', ScaleComponentFactory('acidity', standardScale))
        .component('wtScaleAlcohol', ScaleComponentFactory('alcohol', standardScale))
        .component('wtScaleTannin', ScaleComponentFactory('tannin', standardScale))
        .component('wtScaleIntensity', ScaleComponentFactory('intensity', intensityScale))
        .component('wtScaleBody', ScaleComponentFactory('body', bodyScale))
        .component('wtScaleColor', ScaleComponentFactory('color', colorScale))
        .component('wtScaleClimate', ScaleComponentFactory('climate', climateScale))
        .component('wtScaleRipening', ScaleComponentFactory('ripening', ripeningScale))
        .component('wtScaleBudding', ScaleComponentFactory('budding', ripeningScale));

    wineTasting.$inject = ['$element'];

    function wineTasting($element) {
        $element.addClass('wine-tasting');
    }



    grapeVariety.$inject = ['$element'];

    function grapeVariety($element) {
        $element.addClass('grape-variety');
    }

    grapeVarietyDetails.$inject = ['$element'];

    function grapeVarietyDetails($element) {
        $element.addClass('grape-variety-detail');
    }

})();
