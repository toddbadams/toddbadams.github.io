(function() {
    'use strict'

    angular.module('wt.theme', ['ngMaterial'])
        .config(config)
        .component('wineTastingItem', {
            bindings: {
                label: '@'
            },
            replace: true,
            template: '<li><span>{{$ctrl.label}}</span><span ng-transclude></span></li>'
        })
        .component('wineTasting', {
            bindings: {
                title: '@',
                date: '@'
            },
            controller: wineTasting,
            template: ['<h3>{{$ctrl.title}}</h3>',
                '<h4>{{$ctrl.date}}</h4>',
                '<ul ng-transclude></ul>'].join('')
        });

    config.$inject = ['$mdThemingProvider'];

    function config($mdThemingProvider) {
        var customPrimary = {
                '50': '#ffffff',
                '100': '#ffffff',
                '200': '#ffffff',
                '300': '#ffffff',
                '400': '#ffffff',
                '500': '#fafafa',
                '600': '#ededed',
                '700': '#e0e0e0',
                '800': '#d4d4d4',
                '900': '#c7c7c7',
                'A100': '#ffffff',
                'A200': '#ffffff',
                'A400': '#ffffff',
                'A700': '#bababa'
            },
            customAccent = {
                '50': '#ffffff',
                '100': '#ffffff',
                '200': '#ffffff',
                '300': '#f3f3f3',
                '400': '#e7e7e7',
                '500': '#dadada',
                '600': '#cdcdcd',
                '700': '#c0c0c0',
                '800': '#b4b4b4',
                '900': '#a7a7a7',
                'A100': '#ffffff',
                'A200': '#ffffff',
                'A400': '#ffffff',
                'A700': '#9a9a9a'
            },
            customWarn = {
                '50': '#ffb280',
                '100': '#ffa266',
                '200': '#ff934d',
                '300': '#ff8333',
                '400': '#ff741a',
                '500': '#ff6400',
                '600': '#e65a00',
                '700': '#cc5000',
                '800': '#b34600',
                '900': '#993c00',
                'A100': '#ffc199',
                'A200': '#ffd1b3',
                'A400': '#ffe0cc',
                'A700': '#803200'
            },
            customBackground = {
                '50': '#ffffff',
                '100': '#ffffff',
                '200': '#ffffff',
                '300': '#ffffff',
                '400': '#ffffff',
                '500': '#ffffff',
                '600': '#f2f2f2',
                '700': '#e6e6e6',
                '800': '#d9d9d9',
                '900': '#cccccc',
                'A100': '#ffffff',
                'A200': '#ffffff',
                'A400': '#ffffff',
                'A700': '#bfbfbf'
            };


        $mdThemingProvider.definePalette('customPrimary', customPrimary);
        $mdThemingProvider.definePalette('customAccent', customAccent);
        $mdThemingProvider.definePalette('customWarn', customWarn);
        $mdThemingProvider.definePalette('customBackground', customBackground);
        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground')
    }

    wineTasting.$inject = ['$element'];
    function($element){
        $element.addClass('wine-tasting');
    }
})();
